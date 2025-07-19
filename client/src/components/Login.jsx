import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postDataViaAuth } from '../helpers/fetchData';

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        postDataViaAuth('/auth/login', formData).then(data => {
            localStorage.setItem('token', data.token);
        }).catch(error => {
                setError(error.message);
                console.error('Failed to submit data:', error);
            })
            .finally(() => {
                setLoading(false);
            });;
        // try {
        //     const response = await fetch(`http://localhost:3000/api/auth/login`, {
        //         method: "POST",
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(formData)


        //     });
            
        //     const data = await response.json();

        //     if (response.ok) {
        //         // Store the JWT token
        //         localStorage.setItem('token', data.token);
        //         // Redirect to contacts or dashboard
        //         // navigate('/');
        //     } else {
        //         setError(data.message || 'Login failed');
        //     }
        // } catch (error) {
        //     console.error('Login error:', error);
        //     setError('Network error. Please try again.');
        // }
    };

    if (loading) return <div>Loading contacts...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <form onSubmit={handleSubmit}>
            {error && <div style={{color: 'red'}}>{error}</div>}
            
            <label htmlFor="email">Email</label>
            <input 
                type="email" 
                required 
                placeholder="example@gmail.com" 
                name="email" 
                id="email"
                value={formData.email}
                onChange={handleChange}
            />
            
            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                required 
                name="password" 
                id="password"
                value={formData.password}
                onChange={handleChange}
            />
            
            <button type="submit">Login</button>
        </form>
    );
}