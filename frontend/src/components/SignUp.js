import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError('Please provide username, email, and password');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/users/register', { username, email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/signin');
      } else {
        setError('Sign up failed');
      }
    } catch (err) {
      console.error('Error during sign up:', err.response ? err.response.data : err);
      setError('Sign up failed. Please try again.');
    }
  };

  return (
    <div className="auth-container d-flex justify-content-center align-items-center vh-100">
      <form className="auth-form p-4 rounded shadow" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {error && <p className="error-message text-danger">{error}</p>}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        <p className="switch-auth mt-3">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;








