import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { sendRequestViaAuth, sendRequestNoAuth } from './helpers/fetchData';
import Chat from './components/Chat/Chat';

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
    useParams: () => ({ contactId: 123 }),
    useNavigateq: vi.fn()
}));

// Global fetch mock
global.fetch = vi.fn();

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn()
};

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

// Mock environment variable
vi.mock('import.meta.env', () => ({
  VITE_SERVER_URL: 'http://localhost:3000/api'
}));

describe('sendRequestViaAuth', () => {
  beforeEach(() => {
    fetch.mockClear();
    mockLocalStorage.getItem.mockClear();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should make GET request with auth headers', async () => {
    // Set token for Authorization header
    mockLocalStorage.getItem.mockReturnValue('fake-jwt-token');

    // Mock successful response
    const mockData = { id: 1, username: 'testuser' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData)
    });

    const result = await sendRequestViaAuth('/users');

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer fake-jwt-token'
      }
    });

    expect(result).toEqual(mockData);
  });

  it('should throw error when response is not ok', async () => {
    mockLocalStorage.getItem.mockReturnValue('fake-jwt-token');

    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    });

    await expect(sendRequestViaAuth('/users')).rejects.toThrow('HTTP 404');
  });

  it('should make POST request with auth headers and body', async () => {
    mockLocalStorage.getItem.mockReturnValue('fake-jwt-token');
    
    const mockResponse = { success: true, id: 1 };
    const requestBody = { name: 'John Doe' };
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    // Call sendRequestViaAuth with method "POST" and the body
    const result = await sendRequestViaAuth('/users', 'POST', requestBody);

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer fake-jwt-token'
      },
      body: JSON.stringify(requestBody)
    });

    expect(result).toEqual(mockResponse);
  });
});

describe('sendRequestNoAuth', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should make POST request without auth headers', async () => {    
    const mockResponse = { success: true };
    const requestBody = { email: 'test@example.com' };
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const result = await sendRequestNoAuth('/auth/login', 'POST', requestBody);

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    expect(result).toEqual(mockResponse);
    
    // No auth calls, so localStorage should not be used
    expect(mockLocalStorage.getItem).not.toHaveBeenCalled();
  });
  
  it('should handle network errors', async () => {
    mockLocalStorage.getItem.mockReturnValue('fake-jwt-token');
    
    fetch.mockRejectedValueOnce(new Error('Network error'));
    
    await expect(sendRequestViaAuth('/users')).rejects.toThrow('Network error');
  });
});

describe('Chat component', () => {
  beforeEach(() => {
    fetch.mockClear();
    mockLocalStorage.getItem.mockClear();
  });

  afterEach(() => {
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  it('renders all messages with specific contactId', async () => {
    mockLocalStorage.getItem.mockReturnValue('fake-jwt-token');
    
    const mockData = {
      data: [
        { id: 1, content: "testmessage", user: { username: "tester" }, createdAt: "fake-date" },
        { id: 2, content: "testmessage2", user: { username: "tester2" }, createdAt: "fake-date2" }
      ]
    };

    // Use sendRequestViaAuth for fetching messages (as Chat internally calls it)
    const fetchDataModule = await import('./helpers/fetchData');
    const fetchSpy = vi.spyOn(fetchDataModule, 'sendRequestViaAuth')
      .mockResolvedValue(mockData);
    
    render(<Chat />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByText(/testmessage/i)[0]).toBeInTheDocument();
    });

    expect(screen.getAllByText(/testmessage/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/testmessage2/i)[0]).toBeInTheDocument();
    
    expect(fetchSpy).toHaveBeenCalledWith('/contacts/123/messages', 'GET', null);
  });
});