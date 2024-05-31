import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../styles.css';

const SignIn = ({ setUser, setLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const response = await axios.post('http://localhost:5000/users/signin', { email, password });
      if (response.data.user) {
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
        setTimeout(() => { 
          navigate('/home');
          setLoading(false); 
        }, 3000);
      } else {
        setLoading(false); 
        setError('Sign in failed');
      }
    } catch (err) {
      setLoading(false); 
      setError('Sign in failed. Please try again.');
      console.error('Error during sign in:', err.response ? err.response.data : err.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FontAwesomeIcon 
            icon={showPassword ? faEyeSlash : faEye} 
            className="password-icon" 
            onClick={togglePasswordVisibility} 
          />
        </div>
        <button type="submit">Sign In</button>
        <p className="switch-auth">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
        <p className="switch-auth">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;















