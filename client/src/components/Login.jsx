import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postDataNoAuth } from '../helpers/fetchData';

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false);
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
        postDataNoAuth('/auth/login', formData).then(data => {
            localStorage.setItem('token', data.token);
        }).catch(error => {
                setError(error.message);
                console.error('Failed to submit data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (loading) return <div>Loading contacts...</div>;

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