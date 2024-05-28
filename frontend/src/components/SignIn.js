import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';

const SignIn = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users/signin', { email, password });
      if (response.data.user) {
        setUser(response.data.user);
        navigate('/home');
      } else {
        setError('Sign in failed');
      }
    } catch (err) {
      setError('Sign in failed. Please try again.');
    }
  };

  return (
    <div className="auth-container d-flex justify-content-center align-items-center vh-100">
      <form className="auth-form p-4 rounded shadow" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        {error && <p className="error-message text-danger">{error}</p>}
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
        <button type="submit" className="btn btn-primary w-100">Sign In</button>
        <p className="switch-auth mt-3">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;









