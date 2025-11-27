import Card from "../cards/Card";
import Input from "../inputs/Input";
import Email from "../inputs/Email";
import Password from "../inputs/Password";
import Button from "../buttons/Button";
import Break from "../spacers/Break";
import './SignInForm.css';
import { Link } from "react-router-dom";



export interface SignInFormData {
  email?: string;
  username?: string;
  password?: string;
}


export interface SignInFormProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  loading?: boolean;
  title?: string | React.ReactNode;
  email?: boolean;
  username?: boolean;
  password?: boolean;
  passwordMinLength?: number;
  passwordSpecialChar?: boolean;
  passwordNumber?: boolean;
  passwordUpperCase?: boolean;
  onSubmit: (data: SignInFormData) => void;
  customContent?: React.ReactNode;
  signUpLink?: string;
  resetPasswordLink?: string;
}

type FormElements = HTMLFormControlsCollection & {
  email?: HTMLInputElement;
  username?: HTMLInputElement;
  password?: HTMLInputElement;
}



export default function SignInForm(props: SignInFormProps) {
  const { 
    className = "", 
    id = "sign-in-form", 
    style = {},
    disabled = false,
    loading = false,
    title = "Please Sign In",  
    email = true, 
    username = false, 
    password = true, 
    passwordMinLength, 
    passwordSpecialChar,
    passwordNumber,
    passwordUpperCase, 
    onSubmit = () => {},
    customContent, 
    signUpLink = true, 
    resetPasswordLink = true } = props;


  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    // get email, username and password values
    const formElements = (event.target as HTMLFormElement).elements as FormElements;
    const { email: emailInput, username: usernameInput, password: passwordInput } = formElements;
    const data: {[key: string]: string} = {};
    if (email && emailInput) data.email = emailInput.value;
    if (username && usernameInput) data.username = usernameInput.value;
    if (password && passwordInput) data.password = passwordInput.value;
    onSubmit(data);
  }

  function isTitleText() {
    return typeof title === 'string';
  }

  
  return (
    <Card className={`sign-in-wrap ${className}`} style={style}>
      {/* Title Section - can be string or custom HTML */}
      {
        isTitleText() 
        ? 
        <>
          <h2 className="sign-in-form-title">{title}</h2> 
          <Break amount={1} />
        </>
        : 
        title
      }

      {/* Form */}
      <form className="sign-in-form" onSubmit={handleSubmit} id={id}>
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
              validate
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
              validate
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
              validate
              width="100%"
              minLength={passwordMinLength}
              requireSpecialCharacter={passwordSpecialChar}
              requireNumber={passwordNumber}
              requireUpperCase={passwordUpperCase}
              disabled={disabled}
            />
            <Break amount={1} />
          </>
        }

        <Button type="submit" variant="dark" disabled={disabled}>
          {loading ? 'Loading...' : 'Sign In'}
        </Button>
        <Break amount={2} />

        { /* Custom Content */ }
        {customContent}


        { /* Sign up link */ }
        {
          signUpLink
          &&
          <span className="sign-in-form-links">
            <i>Don't have an account? {' '}</i>
            <Link to='/signup'>
              <b>Sign Up!</b>
            </Link>
          </span>
        }

        { /* Reset password link */ }
        {
          resetPasswordLink
          &&
          <span className="sign-in-form-links">
            <i>Forgot password? {' '}</i>
            <Link to='/reset-password'>
              <b>Reset Password.</b>
            </Link>
          </span>
        }
      </form>
    </Card>
  );
}