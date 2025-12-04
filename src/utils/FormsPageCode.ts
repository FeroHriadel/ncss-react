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

export const formServiceExampleCode = `
import { useForm } from '../components/services/formService';
import Input from '../components/inputs/Input';
import Checkbox from '../components/inputs/Checkbox';
import MultiSelect from '../components/dropdowns/MultiSelect';
import Select from '../components/dropdowns/Select';
import Password from '../components/inputs/Password';
import Email from '../components/inputs/Email';
import Button from '../components/buttons/Button';

export default function FormExample() {
  const { getFormValues, isEmail, isPasswordCompliant } = useForm();

  return (
    <form id="example-form" className="flex flex-col">
      <Input name="firstName" label="First Name" placeholder="John" />
      <Input name="age" label="Age" type="number" placeholder="30" />
      <Checkbox name="subscribe" label="Subscribe to newsletter" />
      <Checkbox name="terms" label="Accept Terms and Conditions" />
      <MultiSelect 
        name="multi-select" 
        label="MultiSelect" 
        options={[
          {value: 'opt1', displayValue: 'Option 1'}, 
          {value: 'opt2', displayValue: 'Option 2'}
        ]} 
      />
      <select name="country">
        <option value="">Select Country</option>
        <option value="us">United States</option>
      </select>
      <Select 
        name="city" 
        label="NCSS Select" 
        options={[
          {value: 'ny', displayValue: 'New York'}, 
          {value: 'la', displayValue: 'Los Angeles'}
        ]} 
      />
      <Password name="password" label="Password" />
      <Email name="email" label="Email" />

      <Button type="button" onClick={() => {
        const values = getFormValues('example-form');
        console.log(values);
        
        // Validate email
        console.log('Is Email Valid?:', isEmail(values['email']));
        
        // Validate password compliance
        console.log('Is Password Compliant?:', isPasswordCompliant({
          value: values['password'],
          upperCase: true,
          lowerCase: false,
          number: true,
          specialChar: true,
          minLength: 8
        }));
      }}>
        Get Values
      </Button>
    </form>
  );
}
`;