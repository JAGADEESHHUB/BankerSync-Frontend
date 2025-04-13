import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { loginUser } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import { useAlert } from '../context/AlertContext';
import AnimatedBackground from '../components/background/AnimatedBackground';
import '../styles/NeonLogin.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showAlert } = useAlert();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const userData = await loginUser({ username, password });
      await login(userData);
      showAlert('Login successful!', 'success');
      navigate('/');
    } catch (error) {
      showAlert('Invalid username or password', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'relative'
    }}>
      <AnimatedBackground />
      <div className="neon-login-box">
        <div className="logo-container">
          <img
            src="/src/assets/FullLogo_Transparent_NoBuffer.png"
            alt="BankerSync Logo"
          />
          <h2>Login to BankerSync</h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <label>Password</label>
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;