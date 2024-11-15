import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signup.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${API_BASE_URL}/api/auth/signup`, { username, email, password });
      setLoading(false);
      setError('');
      navigate('/profile');
    } catch (error) {
      setLoading(false);
      setError('Signup failed. Please try again later.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>Get Started</h1>
        <p className="tagline">Join the Car Management Community</p>
        <form className="signup-form" onSubmit={handleSignup}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <div className="login-link">
          <p>
            Already a member? <a href="/login">Log In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
