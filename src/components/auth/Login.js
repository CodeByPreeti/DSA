import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isSignUp) {
      // Validate signup
      if (password !== confirmPassword) {
        setError('Passwords do not match!');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long!');
        return;
      }
      if (!name.trim()) {
        setError('Please enter your name!');
        return;
      }
      // Store user data in localStorage (simple implementation)
      const userData = { email, password, name };
      localStorage.setItem(`user_${email}`, JSON.stringify(userData));
      alert('Account created successfully! Please login.');
      setIsSignUp(false);
      setName('');
      setConfirmPassword('');
      return;
    }

    // Login validation
    const storedUser = localStorage.getItem(`user_${email}`);
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.password === password) {
        onLogin({ email, password, name: userData.name });
      } else {
        setError('Incorrect password!');
      }
    } else {
      // Default admin login
      onLogin({ email, password });
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setName('');
    setConfirmPassword('');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <img src="/ok.png" alt="DSA Logo" className="login-logo-img" />
        </div>
        <h2 className="login-title">
          {isSignUp ? 'Create Your Account' : 'Welcome to DSA Storyteller'}
        </h2>
        <p className="login-subtitle">
          {isSignUp ? 'Join the adventure and start learning!' : 'Learn Data Structures through Stories'}
        </p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          {isSignUp && (
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              minLength={isSignUp ? 6 : undefined}
            />
          </div>

          {isSignUp && (
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your password"
              />
            </div>
          )}
          
          <button type="submit" className="login-button">
            {isSignUp ? 'Create Account' : 'Start Learning Journey'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>
            {isSignUp ? 'Already have an account? ' : 'New adventurer? '}
            <span className="signup-link" onClick={toggleMode}>
              {isSignUp ? 'Login' : 'Create Account'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;