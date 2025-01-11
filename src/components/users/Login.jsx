import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { userCredentials } from '../../services/Userbase/api';
import './Login.css';

function Login() {
    const { handleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // סטייט להודעות שגיאה

    const handleSubmit = () => {
        setError(''); // מנקה שגיאות קודמות
        userCredentials({ username, password })
            .then((response) => {
                handleLogin(response);
                navigate('/');
            })
            .catch((error) => {
                setError('Invalid username or password. Please try again.'); // הודעת שגיאה ידידותית
            });
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Login</h1>
            <div className="login-form">
                <input
                    className="login-input"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="login-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login-button" onClick={handleSubmit}>
                    Login
                </button>
                {error && <div className="error-message-login">{error}</div>}
                <p className="login-text">
                    Don't have an account?{' '}
                    <Link to="/register" className="login-link">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;