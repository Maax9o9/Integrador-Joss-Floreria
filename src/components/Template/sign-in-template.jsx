import React from 'react';
import SignInOrganism from '../Organisms/sign-in-organism';
import './sign-in.css';

const SignInTemplate = ({ onSubmit }) => {
  return (
    <div className="sign-in-template">
      <SignInOrganism onSubmit={onSubmit} />
    </div>
  );
};

export default SignInTemplate;
