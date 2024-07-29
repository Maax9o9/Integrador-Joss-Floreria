import React from 'react';
import LoginForm from '../LoginForm/login';
import './loginOrganims.css'
const LoginOrganism = ({ onSubmit }) => {
  return (
    <div className='login-organism'>
      <h2>Bienvenido</h2>
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

export default LoginOrganism;
