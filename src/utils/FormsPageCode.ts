export const simpleSignInFormCode = `
import React, { useState } from 'react';
import SignInForm from '../components/forms/SignInForm';

export default function SimpleSignInForm() {
  const [loading, setLoading] = useState(false);

  function handleSignInSubmit(data) {
    setLoading(true);
    setTimeout(() => { setLoading(false); }, 1000);
    setTimeout(() => { alert('Sign In Data: ', data); }, 1050);
  }

  return (
    <SignInForm onSubmit={handleSignInSubmit} loading={loading} disabled={loading} validate />
  );
}
`;

export const complexSignInFormCode = `
<SignInForm 
  username
  passwordMinLength={3}
  passwordSpecialChar
  passwordNumber
  passwordUpperCase
  onSubmit={handleSignInSubmit}
  loading={signInLoading}
  disabled={signInLoading}
  validate
  style={{ maxWidth: '500px' }}
  className=""
  id='custom-sign-in-form'
  title={
    <span className="mb-8 text-center">
      <h2 className="text-3xl font-bold mb-4">Custom Sign In</h2>
      <p>Password must contain at least 3 characters, a special character, a number, and an uppercase letter.</p>
    </span>
  }
  customContent={
    <span className="text-sm">
      <Button variant="dark" width="100%" className="mt-2 mb-8">Sign In with Google</Button>
    </span>
  }
  signUpLink={false}
  resetPasswordLink="https://example.com/reset-password"
/>
`;