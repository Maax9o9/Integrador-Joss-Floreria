import React from 'react';
import SignInTemplate from '../Template/sign-in-template';
import './sign-in.css';

const SignInPage = () => {
  const handleSignIn = (data) => {
    console.log('Sign-In data:', data);
  };

  return (
    <div className="sign-in-page">
      <SignInTemplate onSubmit={handleSignIn} />
    </div>
  );
};

export default SignInPage;
