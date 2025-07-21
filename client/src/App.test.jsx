import {describe, it, expect, beforeEach, afterEach, vi} from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { fetchDataViaAuth, postDataViaAuth, postDataNoAuth } from './helpers/fetchData';
import Chat from './components/Chat/Chat';

vi.mock('react-router-dom', () => ({
    useParams: () => ({contactId: 123}),
    useNavigateq: vi.fn()
}));

// Mock fetch globally
global.fetch = vi.fn();

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn()
};

// Mock environment variable
vi.mock('import.meta.env', () => ({
  VITE_SERVER_URL: 'http://localhost:3000/api'
}));

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('fetchData utilities', () => {
  beforeEach(() => {
    fetch.mockClear();
    mockLocalStorage.getItem.mockClear();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('fetchDataViaAuth', () => {
    it('should make GET request with auth headers', async () => {
      // Mock localStorage token
      mockLocalStorage.getItem.mockReturnValue('fake-jwt-token');
      
      // Mock successful response
      const mockData = { id: 1, username: 'testuser' };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData)
      });

      const result = await fetchDataViaAuth('/users');

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

      await expect(fetchDataViaAuth('/api/users')).rejects.toThrow('Invalid request: 404');
    });
  });

  describe('postDataViaAuth', () => {
    it('should make POST request with auth headers and body', async () => {
      mockLocalStorage.getItem.mockReturnValue('fake-jwt-token');
      
      const mockResponse = { success: true, id: 1 };
      const requestBody = { name: 'John Doe' };
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await postDataViaAuth('/users', requestBody);

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

    it('should handle server errors', async () => {
      mockLocalStorage.getItem.mockReturnValue('fake-jwt-token');
      
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 400
      });

      await expect(postDataViaAuth('/users', {})).rejects.toThrow('400');
    });
  });

  describe('postDataNoAuth', () => {
    it('should make POST request without auth headers', async () => {
      const mockResponse = { success: true };
      const requestBody = { email: 'test@example.com' };
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await postDataNoAuth('/auth/login', requestBody);

      expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      expect(result).toEqual(mockResponse);
      expect(mockLocalStorage.getItem).not.toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('should handle network errors', async () => {
      mockLocalStorage.getItem.mockReturnValue('fake-jwt-token');
      
      fetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(fetchDataViaAuth('/users')).rejects.toThrow('Network error');
    });
  });
});

describe('chat component', () => {
    beforeEach(() => {
        fetch.mockClear();
        mockLocalStorage.getItem.mockClear();
    });

    afterEach(() => {
        vi.resetAllMocks();
        vi.restoreAllMocks(); // ✅ Restore original functions
    });

    it('renders all messages with specific contactId', async () => {
        mockLocalStorage.getItem.mockReturnValue('fake-jwt-token');
        
        const mockData = {
            data: [
                {id: 1, content: "testmessage", user: {username: "tester"}, createdAt: "fake-date"}, 
                {id: 2, content: "testmessage2", user: {username: "tester2"}, createdAt: "fake-date2"}
            ]
        };

        const fetchDataModule = await import('./helpers/fetchData');
        const fetchSpy = vi.spyOn(fetchDataModule, 'fetchDataViaAuth')
            .mockResolvedValue(mockData);
        
        render(<Chat />);
        
        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getAllByText(/testmessage/i)[0]).toBeInTheDocument();
        });

        expect(screen.getAllByText(/testmessage/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/testmessage2/i)[0]).toBeInTheDocument();
        
        expect(fetchSpy).toHaveBeenCalledWith('/contacts/123/messages');
    });
});