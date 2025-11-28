import React, { useState } from 'react';
import Card from "../cards/Card";
import Input from "../inputs/Input";
import Email from "../inputs/Email";
import Password from "../inputs/Password";
import Button from "../buttons/Button";
import Break from "../spacers/Break";
import './SignUpForm.css'; // Reusing SignInForm styles for now as they are likely similar
import { Link } from "react-router-dom";

export interface SignUpFormData {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

export interface SignUpFormProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  loading?: boolean;
  title?: string | React.ReactNode;
  email?: boolean;
  username?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
  passwordMinLength?: number;
  passwordSpecialChar?: boolean;
  passwordNumber?: boolean;
  passwordUpperCase?: boolean;
  onSubmit: (data: SignUpFormData) => void;
  validate?: boolean;
  customContent?: React.ReactNode;
  signInLink?: string | boolean;
}

type FormElements = HTMLFormControlsCollection & {
  email?: HTMLInputElement;
  username?: HTMLInputElement;
  password?: HTMLInputElement;
  confirmPassword?: HTMLInputElement;
}

export default function SignUpForm(props: SignUpFormProps) {
  const { 
    className = "", 
    id = "sign-up-form", 
    style = {},
    disabled = false,
    loading = false,
    title = "Please Sign Up",  
    email = true, 
    username = false, 
    password = true, 
    confirmPassword = false,
    passwordMinLength, 
    passwordSpecialChar,
    passwordNumber,
    passwordUpperCase, 
    onSubmit = () => {},
    validate = true,
    customContent, 
    signInLink = true 
  } = props;

  const [pwdValue, setPwdValue] = useState('');
  const [confirmPwdValue, setConfirmPwdValue] = useState('');
  const [confirmError, setConfirmError] = useState('');

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPwdValue(e.target.value);
    if (confirmPassword && confirmPwdValue && e.target.value !== confirmPwdValue) {
      setConfirmError("Passwords do not match");
    } else {
      setConfirmError("");
    }
  }

  function handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPwdValue(e.target.value);
    if (pwdValue && e.target.value !== pwdValue) {
      setConfirmError("Passwords do not match");
    } else {
      setConfirmError("");
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    
    if (confirmPassword && pwdValue !== confirmPwdValue) {
      setConfirmError("Passwords do not match");
      return;
    }

    // get email, username and password values
    const formElements = (event.target as HTMLFormElement).elements as FormElements;
    const { email: emailInput, username: usernameInput, password: passwordInput, confirmPassword: confirmPasswordInput } = formElements;
    const data: SignUpFormData = {};
    if (email && emailInput) data.email = emailInput.value;
    if (username && usernameInput) data.username = usernameInput.value;
    if (password && passwordInput) data.password = passwordInput.value;
    if (confirmPassword && confirmPasswordInput) data.confirmPassword = confirmPasswordInput.value;
    
    onSubmit(data);
  }

  function isTitleText() {
    return typeof title === 'string';
  }
  
  return (
    <Card className={`sign-up-wrap ${className}`} style={style}>
      {/* Title Section - can be string or custom HTML */}
      {
        isTitleText() 
        ? 
        <>
          <h2 className="sign-up-form-title">{title}</h2> 
          <Break amount={1} />
        </>
        : 
        title
      }

      {/* Form */}
      <form className="sign-up-form" onSubmit={handleSubmit} id={id}>
        { /* Email Input */ }
        {
          email
          &&
          <>
            <Email
              label="Email Address"
              name="email"
              id="email"
              placeholder="Enter your email"
              required
              validate={validate}
              width="100%"
              disabled={disabled}
            />
            <Break amount={1} />
          </>
        }

        { /* Username Input */ }
        {
          username
          &&
          <>
            <Input
              label="Username"
              name="username"
              id="username"
              placeholder="Enter your user name"
              required
              validate={validate}
              width="100%"
              disabled={disabled}
            />
            <Break amount={1} />
          </>
        }

        { /* Password Input */ }
        {
          password
          &&
          <>
            <Password
              label="Password"
              name="password"
              id="password"
              placeholder="Enter your password"
              required
              validate={validate}
              width="100%"
              minLength={passwordMinLength}
              requireSpecialCharacter={passwordSpecialChar}
              requireNumber={passwordNumber}
              requireUpperCase={passwordUpperCase}
              disabled={disabled}
              canShowPassword
              onChange={handlePasswordChange}
            />
            <Break amount={1} />
          </>
        }

        { /* Confirm Password Input */ }
        {
          confirmPassword
          &&
          <>
            <Password
              label="Confirm Password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm your password"
              required
              validate
              width="100%"
              disabled={disabled}
              canShowPassword
              onChange={handleConfirmPasswordChange}
              errorMessage={confirmError}
            />
            <Break amount={1} />
          </>
        }

        <Button type="submit" variant="dark" disabled={disabled || (confirmPassword && !!confirmError)}>
          {loading ? 'Loading...' : 'Sign Up'}
        </Button>

        { /* Custom Content */ }
        {customContent}


        { /* Sign in link */ }
        {
          signInLink
          &&
          <span className="sign-up-form-link">
            <i>Already have an account? {' '}</i>
            <Link to={typeof signInLink === 'string' ? signInLink : '/signin'}>
              <b>Sign In!</b>
            </Link>
          </span>
        }
      </form>
    </Card>
  );
}
