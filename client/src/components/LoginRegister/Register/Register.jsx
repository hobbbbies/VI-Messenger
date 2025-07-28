import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { sendRequestNoAuth } from '../../../helpers/fetchData';
import styles from '../LoginRegister.module.css'
import DemoLogin from '../DemoLogin/DemoLogin';

export default function Register() {
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
        sendRequestNoAuth('/auth/signup', 'POST', formData)
            .then(() => {
                // Logs in user after registration
                sendRequestNoAuth('/auth/login', 'POST', formData)
                    .then(data => {
                    localStorage.setItem('token', data.token);
                    navigate('/contacts');
                    }).catch(error => {
                        setError(error.message);
                        console.error('Failed to submit data:', error);
                    })
            })
            .catch(error => {
                setError(error.message);
                console.error('Failed to submit data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (loading) return <div>Loading contacts...</div>;

    return (
        <div className={styles.loginContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
                {error && <div style={{color: 'red'}}>Couldn't register user: {error}</div>}
            
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    required
                    placeholder="John Doe"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                />

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
            
                <button type="submit">Sign Up</button>
                <Link to="/login">Already Have an Account? Login Here</Link>
                <p>Or Use one of these demo accounts: 
                    <DemoLogin demoEmail={"demo@test.com"} demoPassword={"demo123"} demoUsername={"John Doe"}/>,  
                    <DemoLogin demoEmail={"demo3@test.com"} demoPassword={"demo789"} demoUsername={"Joe Brown"}/>
                </p>
            </form>
        </div>
    );
}