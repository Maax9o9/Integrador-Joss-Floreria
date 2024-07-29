import React from 'react';
import SignInForm from '../LoginForm/sign-in-form';
import './sign-in-organism.css';

const SignInOrganism = ({ onSubmit }) => {
  return (
    <div className="sign-in-organism">
      <h2>Sign In</h2>
      <SignInForm onSubmit={onSubmit} />
    </div>
  );
};

export default SignInOrganism;
