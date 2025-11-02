export const inputCode = `import Input from '../components/inputs/Input';

<Input
  label="Username"
  placeholder="Enter your username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>`;

export const inputWithErrorCode = `import Input from '../components/inputs/Input';

<Input
  label="Username"
  placeholder="Enter your username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  errorMessage="Username is required"
/>`;

export const inputWithMessageCode = `import Input from '../components/inputs/Input';

<Input
  label="Username"
  placeholder="Enter your username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  message="Choose a unique username"
/>`;

export const inputDisabledCode = `import Input from '../components/inputs/Input';

<Input
  label="Username"
  placeholder="Enter your username"
  value="disabled-user"
  disabled
/>`;

export const emailCode = `import { useRef } from 'react';
import Email, { EmailHandle } from '../components/inputs/Email';

const emailRef = useRef<EmailHandle>(null);

<Email
  label="Email Address"
  placeholder="your@email.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
  ref={emailRef}
/>

// Validate from parent
const handleSubmit = () => {
  const errors = emailRef.current?.validate();
  if (errors && errors.length > 0) {
    console.log('Validation errors:', errors);
  }
};`;

export const emailValidationCode = `import { useRef, useState } from 'react';
import Email, { EmailHandle } from '../components/inputs/Email';

const emailRef = useRef<EmailHandle>(null);
const [emailError, setEmailError] = useState('');

const handleValidate = () => {
  const errors = emailRef.current?.validate();
  if (errors && errors.length > 0) {
    setEmailError(errors[0]);
  } else {
    setEmailError('');
  }
};

<Email
  label="Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  errorMessage={emailError}
  required
  ref={emailRef}
/>
<Button onClick={handleValidate}>Validate</Button>`;

export const passwordCode = `import { useRef } from 'react';
import Password, { PasswordHandle } from '../components/inputs/Password';

const passwordRef = useRef<PasswordHandle>(null);

<Password
  label="Password"
  placeholder="Enter your password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  canShowPassword
  ref={passwordRef}
/>`;

export const passwordValidationCode = `import { useRef } from 'react';
import Password, { PasswordHandle } from '../components/inputs/Password';

const passwordRef = useRef<PasswordHandle>(null);

<Password
  label="Password"
  placeholder="Enter your password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  canShowPassword
  minLength={8}
  requireNumber
  requireSpecialCharacter
  requireUpperCase
  ref={passwordRef}
/>

// Validate from parent
const handleSubmit = () => {
  const errors = passwordRef.current?.validate();
  if (errors && errors.length > 0) {
    console.log('Password errors:', errors);
    // errors could be:
    // ["Password must be at least 8 characters long"]
    // ["Password must contain at least one number"]
    // ["Password must contain at least one special character"]
    // ["Password must contain at least one uppercase letter"]
  }
};`;

export const passwordVisibilityCode = `import Password from '../components/inputs/Password';

<Password
  label="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  canShowPassword={true}  // Shows eye icon to toggle visibility
/>

<Password
  label="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  canShowPassword={false}  // No eye icon, always hidden
/>`;

export const textareaCode = `import Textarea from '../components/inputs/Textarea';

<Textarea
  label="Description"
  placeholder="Enter description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  rows={4}
/>`;

export const textareaWithErrorCode = `import Textarea from '../components/inputs/Textarea';

<Textarea
  label="Description"
  placeholder="Enter description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  errorMessage="Description is required"
  rows={4}
/>`;

export const textareaHeightCode = `import Textarea from '../components/inputs/Textarea';

<Textarea
  label="Short Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  rows={2}
/>

<Textarea
  label="Long Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  rows={8}
/>

// Or use custom height
<Textarea
  label="Custom Height"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  height="200px"
/>`;

export const checkboxCode = `import Checkbox from '../components/inputs/Checkbox';

<Checkbox
  label="Accept terms and conditions"
  checked={accepted}
  onChange={(checked) => setAccepted(checked)}
/>`;

export const checkboxControlledCode = `import { useState } from 'react';
import Checkbox from '../components/inputs/Checkbox';

const [isChecked, setIsChecked] = useState(false);

<Checkbox
  label="I agree"
  checked={isChecked}
  onChange={(checked) => setIsChecked(checked)}
/>`;

export const checkboxRefCode = `import { useRef } from 'react';
import Checkbox, { CheckboxHandle } from '../components/inputs/Checkbox';

const checkboxRef = useRef<CheckboxHandle>(null);

<Checkbox
  label="Subscribe to newsletter"
  ref={checkboxRef}
/>

// Get checked status
const isChecked = checkboxRef.current?.getChecked();

// Programmatically check/uncheck
checkboxRef.current?.setChecked(true);
checkboxRef.current?.setChecked(false);`;

export const checkboxDisabledCode = `import Checkbox from '../components/inputs/Checkbox';

<Checkbox
  label="Disabled unchecked"
  checked={false}
  disabled
/>

<Checkbox
  label="Disabled checked"
  checked={true}
  disabled
/>`;

