import React from 'react';
import PropTypes from 'prop-types';
import Login from '../components/auth/Login.js'
import '../components/auth/Login.css';

const LoginPage = ({ setUser }) => {
  const handleLogin = (userData) => {
    if (!userData || typeof userData.email !== 'string' || userData.email.trim() === '') {
      console.warn('LoginPage.handleLogin: invalid userData', userData);
      return;
    }
    setUser({
      email: userData.email,
      name: userData.email.split('@')[0]
    });
  };

  return (
    <div className="login-page">
      <Login onLogin={handleLogin} />
    </div>
  );
};

LoginPage.propTypes = {
  setUser: PropTypes.func.isRequired
};

export default LoginPage;