export function fetchDataViaAuth(endpoint) {
    fetch(`${import.meta.env.SERVER_URL}${endpoint}`, {
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
    .then(data => {
        return data;
    })
    .catch(error => { 
        console.error('Error:', error);
    });
}

export function postDataViaAuth(endpoint, body = {}) {
    fetch(`${import.meta.env.SERVER_URL}${endpoint}`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(body)  
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Invalid request: ${response.status}`); 
        }
        return response.json(); 
    })
    .then(data => {
        return data;
    })
    .catch(error => { 
        console.error('Error:', error);
    });
}