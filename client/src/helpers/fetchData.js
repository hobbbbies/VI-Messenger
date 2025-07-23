export function sendRequestViaAuth(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        // Only add body to the options if it's not null
        ...(body && { body: JSON.stringify(body) })
    };
    
    return fetch(`${import.meta.env.VITE_SERVER_URL}${endpoint}`, options)
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

// For requests that require no authentication 
export function sendRequestNoAuth(endpoint, method, body = {}) {
    return fetch(`${import.meta.env.VITE_SERVER_URL}${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json'
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
        console.error('Error:', error);
        throw error;
    });
}