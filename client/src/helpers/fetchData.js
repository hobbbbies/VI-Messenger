export function fetchDataViaAuth(endpoint) {
    console.log('SERVER URL: ', import.meta.env.VITE_SERVER_URL);
    return fetch(`${import.meta.env.VITE_SERVER_URL}${endpoint}`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        } 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Invalid request: ${response.status}`); 
        }
        return response.json(); 
    })
    .catch(error => { 
        console.error('Error:', error);
        throw error; 
    });
}

export function postDataViaAuth(endpoint, body = {}) {
    return fetch(`${import.meta.env.VITE_SERVER_URL}${endpoint}`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(body)  
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`); 
        }
        return response.json(); 
    })
    .catch(error => { 
        throw error;
    });
}

export function postDataNoAuth(endpoint, body = {}) {
    return fetch(`${import.meta.env.VITE_SERVER_URL}${endpoint}`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)  
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Invalid request: ${response.status}`); 
        }
        return response.json(); 
    })
    .catch(error => { 
        console.error('Error:', error);
        throw error; 
    });
}

export function deleteDataViaAuth(endpoint, body) {
    return fetch(`${import.meta.env.VITE_SERVER_URL}${endpoint}`, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(body)  
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response.json(); 
    })
    .catch(error => { 
        throw error;
    });
}