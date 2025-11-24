// Input
export const inputCode = `import Input from '../components/inputs/Input';

<Input
  label="Username"
  placeholder="Enter your username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>`;

export const inputTypesCode = `import Input from '../components/inputs/Input';

<Input type="text" placeholder="Text input" />
<Input type="number" placeholder="Number input" />
<Input type="tel" placeholder="Phone number" />
<Input type="url" placeholder="Website URL" />
<Input type="search" placeholder="Search..." />`;

export const inputValidationCode = `import { useRef } from 'react';
import Input, { InputHandle } from '../components/inputs/Input';

const inputRef = useRef<InputHandle>(null);

// With internal validation
<Input
  label="Username"
  placeholder="Enter username"
  validate
  required
  ref={inputRef}
/>

// Programmatic validation
const handleSubmit = () => {
  const error = inputRef.current?.validate();
  if (error) {
    console.log('Validation error:', error);
  }
};`;

export const inputErrorCode = `import Input from '../components/inputs/Input';

<Input
  label="Username"
  placeholder="Enter username"
  errorMessage="Username is required"
/>`;

export const inputMessageCode = `import Input from '../components/inputs/Input';

<Input
  label="Username"
  placeholder="Enter username"
  message="Choose a unique username"
/>`;

export const inputDisabledCode = `import Input from '../components/inputs/Input';

<Input
  label="Username"
  value="disabled-user"
  disabled
/>`;

// Email
export const emailCode = `import Email from '../components/inputs/Email';

<Email
  label="Email Address"
  placeholder="your@email.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>`;

export const emailValidationCode = `import Email from '../components/inputs/Email';

// Automatic validation on blur
<Email
  label="Email Address"
  placeholder="your@email.com"
  validate
  required
/>`;

export const emailHandleCode = `import { useRef } from 'react';
import Email, { EmailHandle } from '../components/inputs/Email';

const emailRef = useRef<EmailHandle>(null);

<Email
  label="Email"
  ref={emailRef}
/>

// Available methods:
emailRef.current?.validate(); // Returns error string
emailRef.current?.getValue(); // Returns current value
emailRef.current?.setValue('test@example.com');
emailRef.current?.clear();`;

// Password
export const passwordCode = `import Password from '../components/inputs/Password';

<Password
  label="Password"
  placeholder="Enter password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  canShowPassword
/>`;

export const passwordValidationCode = `import Password from '../components/inputs/Password';

<Password
  label="Password"
  placeholder="Enter password"
  validate
  required
  minLength={8}
  requireNumber
  requireSpecialCharacter
  requireUpperCase
  canShowPassword
/>`;

export const passwordHandleCode = `import { useRef } from 'react';
import Password, { PasswordHandle } from '../components/inputs/Password';

const passwordRef = useRef<PasswordHandle>(null);

<Password
  label="Password"
  ref={passwordRef}
/>

// Available methods:
passwordRef.current?.validate(); // Returns error string
passwordRef.current?.getValue();
passwordRef.current?.setValue('newPassword123');
passwordRef.current?.clear();`;

// Textarea
export const textareaCode = `import Textarea from '../components/inputs/Textarea';

<Textarea
  label="Description"
  placeholder="Enter description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  rows={4}
/>`;

export const textareaValidationCode = `import Textarea from '../components/inputs/Textarea';

<Textarea
  label="Description"
  placeholder="Enter description"
  validate
  required
/>`;

export const textareaHeightCode = `import Textarea from '../components/inputs/Textarea';

<Textarea
  label="Description"
  rows={6}
  height="200px"
/>`;

export const textareaHandleCode = `import { useRef } from 'react';
import Textarea, { TextareaHandle } from '../components/inputs/Textarea';

const textareaRef = useRef<TextareaHandle>(null);

<Textarea
  label="Description"
  ref={textareaRef}
/>

// Available methods:
textareaRef.current?.validate();
textareaRef.current?.getValue();
textareaRef.current?.setValue('New text');
textareaRef.current?.clear();`;

// Checkbox
export const checkboxCode = `import Checkbox from '../components/inputs/Checkbox';

<Checkbox
  label="Accept terms and conditions"
  checked={accepted}
  onChange={(e) => setAccepted(e.target.checked)}
/>`;

export const checkboxUncontrolledCode = `import Checkbox from '../components/inputs/Checkbox';

// Works without checked/onChange
<Checkbox label="Remember me" />`;

export const checkboxHandleCode = `import { useRef } from 'react';
import Checkbox, { CheckboxHandle } from '../components/inputs/Checkbox';

const checkboxRef = useRef<CheckboxHandle>(null);

<Checkbox
  label="Accept terms"
  ref={checkboxRef}
/>

// Available methods:
const isChecked = checkboxRef.current?.getChecked();
checkboxRef.current?.setChecked(true);`;

export const checkboxDisabledCode = `import Checkbox from '../components/inputs/Checkbox';

<Checkbox
  label="Disabled checkbox"
  checked={true}
  disabled
/>`;

// Switch
export const switchCode = `import Switch from '../components/inputs/Switch';

<Switch
  label="Enable notifications"
  checked={notifications}
  onChange={(e) => setNotifications(e.target.checked)}
/>`;

export const switchUncontrolledCode = `import Switch from '../components/inputs/Switch';

// Works without checked/onChange
<Switch label="Dark mode" />`;

export const switchSizesCode = `import Switch from '../components/inputs/Switch';

<Switch label="Small" width="40px" height="20px" />
<Switch label="Medium" width="50px" height="25px" />
<Switch label="Large" width="60px" height="30px" />`;

export const switchHandleCode = `import { useRef } from 'react';
import Switch, { SwitchHandle } from '../components/inputs/Switch';

const switchRef = useRef<SwitchHandle>(null);

<Switch
  label="Toggle feature"
  ref={switchRef}
/>

// Available methods:
const isOn = switchRef.current?.getChecked();
switchRef.current?.setChecked(true);`;

export const switchDisabledCode = `import Switch from '../components/inputs/Switch';

<Switch
  label="Disabled switch"
  checked={true}
  disabled
/>`;

// FileUpload
export const fileUploadCode = `import FileUpload from '../components/inputs/FileUpload';

<FileUpload
  label="Upload files"
  onChange={(files) => setUploadedFiles(files)}
/>`;

export const fileUploadOptionsCode = `import FileUpload from '../components/inputs/FileUpload';

<FileUpload
  label="Upload images"
  accept={['image/png', 'image/jpeg']}
  max={3}
  onChange={(files) => setImages(files)}
/>`;

export const fileUploadValidationCode = `import FileUpload from '../components/inputs/FileUpload';

<FileUpload
  label="Required document"
  validate
  required
/>`;

export const fileUploadHandleCode = `import { useRef } from 'react';
import FileUpload, { FileUploadHandle } from '../components/inputs/FileUpload';

const fileUploadRef = useRef<FileUploadHandle>(null);

<FileUpload
  label="Upload files"
  ref={fileUploadRef}
/>

// Available methods:
fileUploadRef.current?.validate();
const files = fileUploadRef.current?.getValue();
fileUploadRef.current?.clear();`;

export const fileUploadDisabledCode = `import FileUpload from '../components/inputs/FileUpload';

<FileUpload
  label="Upload disabled"
  disabled
/>`;
