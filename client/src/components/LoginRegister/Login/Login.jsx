import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { sendRequestNoAuth } from '../../../helpers/fetchData';
import styles from '../LoginRegister.module.css'
import DemoLogin from '../DemoLogin/DemoLogin';

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
        sendRequestNoAuth('/auth/login', 'POST', formData)
            .then(data => {
            localStorage.setItem('token', data.token);
            navigate('/contacts');
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
        <div className={styles.loginContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
                {error && <div style={{color: 'red'}}>Couldn't find that user: {error}</div>}
            
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
                <Link to="/Register">Don't Have an Account? Register Now</Link>
                <div>Or Use one of these demo accounts: 
                    <DemoLogin demoEmail={"demo@test.com"} demoPassword={"demo123"} demoUsername={"John Doe"}/>,  
                    <DemoLogin demoEmail={"demo3@test.com"} demoPassword={"demo789"} demoUsername={"Joe Brown"}/>
                </div>
            </form>
        </div>
    );
}