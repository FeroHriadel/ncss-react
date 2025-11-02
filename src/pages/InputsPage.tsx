import { useRef, useState } from 'react';
import Card from "../components/cards/Card";
import Break from "../components/spacers/Break";
import Container from "../components/wrappers/Container";
import Input from "../components/inputs/Input";
import Email from "../components/inputs/Email";
import type { EmailHandle } from "../components/inputs/Email";
import Password from "../components/inputs/Password";
import type { PasswordHandle } from "../components/inputs/Password";
import Textarea from "../components/inputs/Textarea";
import Checkbox from "../components/inputs/Checkbox";
import type { CheckboxHandle } from "../components/inputs/Checkbox";
import Button from "../components/buttons/Button";
import { Highlight, themes } from "prism-react-renderer";
import { 
  inputCode, 
  inputWithErrorCode, 
  inputWithMessageCode, 
  inputDisabledCode,
  emailCode,
  emailValidationCode,
  passwordCode,
  passwordValidationCode,
  passwordVisibilityCode,
  textareaCode,
  textareaWithErrorCode,
  textareaHeightCode,
  checkboxCode,
  checkboxControlledCode,
  checkboxRefCode,
  checkboxDisabledCode
} from "../utils/InputsPageCode";

export default function InputsPage() {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const emailRef = useRef<EmailHandle>(null);
  const passwordRef = useRef<PasswordHandle>(null);
  const checkboxRef = useRef<CheckboxHandle>(null);

  const handleValidateEmail = () => {
    const errors = emailRef.current?.validate();
    if (errors && errors.length > 0) {
      setEmailError(errors[0]);
    } else {
      setEmailError('');
      alert('Email is valid!');
    }
  };

  const handleValidatePassword = () => {
    const errors = passwordRef.current?.validate();
    if (errors && errors.length > 0) {
      setPasswordError(errors.join(', '));
    } else {
      setPasswordError('');
      alert('Password is valid!');
    }
  };

  return (
    <Container className="px-2 pt-24">
      {/* INTRO */}
      <h1 className="mb-4 uppercase font-bold text-3xl">Input Components</h1>
      <p className="text-gray-800 text-lg mb-12">Input components: <code>Input</code>, <code>Email</code>, <code>Password</code>, <code>Textarea</code>, <code>Checkbox</code></p>
      <Card className="mb-12 p-4 bg-gray-100 flex flex-col gap-4">
        <a href="#input"><div><code>Input</code> is a basic text input with label, error, and message support <br /></div></a>
        <a href="#email"><div><code>Email</code> is like Input but with email validation exposed via imperative handle <br /></div></a>
        <a href="#password"><div><code>Password</code> is like Input but with password visibility toggle and validation rules <br /></div></a>
        <a href="#textarea"><div><code>Textarea</code> is a multi-line text input with the same functionality as Input <br /></div></a>
        <a href="#checkbox"><div><code>Checkbox</code> is a checkbox input with custom styling and imperative handle for programmatic control <br /></div></a>
      </Card>
      <hr />
      <Break amount={3} />

      {/* INPUT */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="input">Input</h2>
      <p className="text-gray-700 mb-4">
        The <code>Input</code> component provides a styled text input with label, error message, and helper message support.
      </p>

      <Input
        label="Username"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        width="260px"
        className="mb-8"
      />

      <Highlight
        theme={themes.vsLight}
        code={inputCode}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: '#e5e7eb' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* INPUT WITH ERROR */}
      <h3 className="mb-4 text-xl font-semibold">Input with Error Message</h3>
      <p className="text-gray-700 mb-4">Display validation errors below the input:</p>

      <Input
        label="Username"
        placeholder="Enter your username"
        value=""
        onChange={() => {}}
        errorMessage="Username is required"
        width="260px"
        className="mb-8"
      />

      <Highlight
        theme={themes.vsLight}
        code={inputWithErrorCode}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: '#e5e7eb' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* INPUT WITH MESSAGE */}
      <h3 className="mb-4 text-xl font-semibold">Input with Helper Message</h3>
      <p className="text-gray-700 mb-4">Display helper text below the input:</p>

      <Input
        label="Username"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        message="Choose a unique username"
        width="260px"
        className="mb-8"
      />

      <Highlight
        theme={themes.vsLight}
        code={inputWithMessageCode}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: '#e5e7eb' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* INPUT DISABLED */}
      <h3 className="mb-4 text-xl font-semibold">Disabled Input</h3>
      <p className="text-gray-700 mb-4">Inputs can be disabled:</p>

      <Input
        label="Username"
        placeholder="Enter your username"
        value="disabled-user"
        disabled
        width="260px"
        className="mb-8"
      />

      <Highlight
        theme={themes.vsLight}
        code={inputDisabledCode}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: '#e5e7eb' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      <Card className="bg-gray-100 border border-gray-200 rounded p-4 mb-12">
        <h3 className="text-lg font-semibold mb-2">Input Props</h3>
        <ul className="space-y-2">
          <li><code>type</code> (optional, default: 'text'): Input type</li>
          <li><code>label</code> (optional): Label text displayed above the input</li>
          <li><code>value</code> (optional): Input value (string or number)</li>
          <li><code>onChange</code> (optional): Change handler function</li>
          <li><code>placeholder</code> (optional): Placeholder text</li>
          <li><code>errorMessage</code> (optional): Error message displayed below input in red</li>
          <li><code>message</code> (optional): Helper message displayed below input in gray</li>
          <li><code>width</code> (optional): Custom width (e.g., "300px", "100%")</li>
          <li><code>required</code> (optional): Marks field as required (adds * to label)</li>
          <li><code>disabled</code> (optional): Disables the input</li>
          <li><code>className</code> (optional): Additional CSS classes</li>
          <li><code>style</code> (optional): Inline styles</li>
          <li><code>name</code> (optional): Input name attribute</li>
          <li><code>id</code> (optional): Input id attribute</li>
          <li><code>title</code> (optional): Input title attribute</li>
        </ul>
      </Card>
      <hr />
      <Break amount={3} />

      {/* EMAIL */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="email">Email</h2>
      <p className="text-gray-700 mb-4">
        The <code>Email</code> component is similar to Input but includes email validation accessible via ref. 
        It exposes a <code>validate()</code> method that returns an array of error messages.
      </p>

      <div className="mb-8">
        <Email
          label="Email Address"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          errorMessage={emailError}
          required
          width="260px"
          ref={emailRef}
        />
        <Button onClick={handleValidateEmail} className="mt-6">Validate Email</Button>
      </div>

      <Highlight
        theme={themes.vsLight}
        code={emailCode}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: '#e5e7eb' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* EMAIL VALIDATION */}
      <h3 className="mb-4 text-xl font-semibold">Email Validation</h3>
      <p className="text-gray-700 mb-4">
        The validation method checks if the email is in valid format. If <code>required</code> is true, 
        it also checks if the field is empty.
      </p>

      <Highlight
        theme={themes.vsLight}
        code={emailValidationCode}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: '#e5e7eb' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      <Card className="bg-gray-100 border border-gray-200 rounded p-4 mb-12">
        <h3 className="text-lg font-semibold mb-2">Email Props</h3>
        <ul className="space-y-2">
          <li><code>label</code> (optional): Label text with required indicator (*) if required prop is true</li>
          <li><code>value</code> (optional): Input value</li>
          <li><code>onChange</code> (optional): Change handler function</li>
          <li><code>placeholder</code> (optional): Placeholder text</li>
          <li><code>errorMessage</code> (optional): Error message displayed below input</li>
          <li><code>message</code> (optional): Helper message displayed below input</li>
          <li><code>width</code> (optional, default: "300px"): Input width</li>
          <li><code>required</code> (optional): Marks field as required (adds * to label and validates emptiness)</li>
          <li><code>disabled</code> (optional): Disables the input</li>
          <li><code>autoComplete</code> (optional): Autocomplete attribute</li>
          <li><code>className</code> (optional): Additional CSS classes</li>
          <li><code>style</code> (optional): Inline styles</li>
          <li><code>name</code> (optional): Input name attribute</li>
          <li><code>id</code> (optional): Input id attribute</li>
          <li><code>ref</code>: Forward ref to access the validate() method</li>
        </ul>
        <h3 className="text-lg font-semibold mb-2 mt-4">Email Imperative Handle</h3>
        <ul className="space-y-2">
          <li><code>validate()</code>: Returns string[] of validation errors (empty array if valid)</li>
        </ul>
      </Card>
      <hr />
      <Break amount={3} />

      {/* PASSWORD */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="password">Password</h2>
      <p className="text-gray-700 mb-4">
        The <code>Password</code> component is similar to Input but for passwords. It supports visibility toggle 
        (eye icon) and advanced validation rules accessible via ref.
      </p>

      <div className={`${passwordError ? "mb-20" : "mb-8"} flex gap-2`}>
        <Password
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          errorMessage={passwordError}
          canShowPassword
          minLength={8}
          requireNumber
          requireSpecialCharacter
          requireUpperCase
          width="260px"
          ref={passwordRef}
        />
        <Button onClick={handleValidatePassword} className="mt-6">Validate Password</Button>
      </div>

      <Highlight
        theme={themes.vsLight}
        code={passwordCode}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: '#e5e7eb' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* PASSWORD VALIDATION */}
      <h3 className="mb-4 text-xl font-semibold">Password Validation</h3>
      <p className="text-gray-700 mb-4">
        The Password component supports multiple validation rules. Use the validation props to enforce 
        password requirements, and call the <code>validate()</code> method to check them.
      </p>

      <Highlight
        theme={themes.vsLight}
        code={passwordValidationCode}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: '#e5e7eb' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* PASSWORD VISIBILITY */}
      <h3 className="mb-4 text-xl font-semibold">Password Visibility Toggle</h3>
      <p className="text-gray-700 mb-4">
        When <code>canShowPassword</code> is true, an eye icon appears that allows users to toggle 
        between showing and hiding the password.
      </p>

      <div className="flex gap-4 mb-8">
        <Password
          label="With Eye Icon"
          value="secret123"
          canShowPassword={true}
          width="250px"
        />
        <Password
          label="Without Eye Icon"
          value="secret123"
          canShowPassword={false}
          width="250px"
        />
      </div>

      <Highlight
        theme={themes.vsLight}
        code={passwordVisibilityCode}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: '#e5e7eb' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      <Card className="bg-gray-100 border border-gray-200 rounded p-4 mb-12">
        <h3 className="text-lg font-semibold mb-2">Password Props</h3>
        <ul className="space-y-2">
          <li><code>label</code> (optional): Label text displayed above the input</li>
          <li><code>value</code> (optional): Input value</li>
          <li><code>onChange</code> (optional): Change handler function</li>
          <li><code>placeholder</code> (optional): Placeholder text</li>
          <li><code>errorMessage</code> (optional): Error message displayed below input</li>
          <li><code>message</code> (optional): Helper message displayed below input</li>
          <li><code>width</code> (optional, default: "300px"): Input width</li>
          <li><code>required</code> (optional): Marks field as required (adds * to label)</li>
          <li><code>canShowPassword</code> (optional): Shows eye icon to toggle password visibility</li>
          <li><code>minLength</code> (optional): Minimum password length requirement</li>
          <li><code>requireNumber</code> (optional): Password must contain at least one number</li>
          <li><code>requireSpecialCharacter</code> (optional): Password must contain special character</li>
          <li><code>requireUpperCase</code> (optional): Password must contain uppercase letter</li>
          <li><code>disabled</code> (optional): Disables the input</li>
          <li><code>className</code> (optional): Additional CSS classes</li>
          <li><code>style</code> (optional): Inline styles</li>
          <li><code>name</code> (optional): Input name attribute</li>
          <li><code>id</code> (optional): Input id attribute</li>
          <li><code>title</code> (optional): Input title attribute</li>
          <li><code>ref</code>: Forward ref to access the validate() method</li>
        </ul>
        <h3 className="text-lg font-semibold mb-2 mt-4">Password Imperative Handle</h3>
        <ul className="space-y-2">
          <li><code>validate()</code>: Returns string[] of validation errors based on the validation props (empty array if valid)</li>
        </ul>
        <h3 className="text-lg font-semibold mb-2 mt-4">Validation Error Messages</h3>
        <ul className="space-y-2">
          <li>"Password must be at least {'{minLength}'} characters long"</li>
          <li>"Password must contain at least one number"</li>
          <li>"Password must contain at least one special character"</li>
          <li>"Password must contain at least one uppercase letter"</li>
        </ul>
      </Card>
      <hr />
      <Break amount={3} />

      {/* TEXTAREA */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="textarea">Textarea</h2>
      <p className="text-gray-700 mb-4">
        The <code>Textarea</code> component is a multi-line text input with the same styling and functionality as Input.
      </p>

      <Textarea
        label="Description"
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        width="300px"
        rows={4}
        className="mb-8"
      />

      <Highlight
        theme={themes.vsLight}
        code={textareaCode}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: '#e5e7eb' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* TEXTAREA WITH ERROR */}
      <h3 className="mb-4 text-xl font-semibold">Textarea with Error Message</h3>
      <p className="text-gray-700 mb-4">Display validation errors below the textarea:</p>

      <Textarea
        label="Description"
        placeholder="Enter description"
        value=""
        onChange={() => {}}
        errorMessage="Description is required"
        width="300px"
        rows={4}
        className="mb-8"
      />

      <Highlight
        theme={themes.vsLight}
        code={textareaWithErrorCode}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: '#e5e7eb' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* TEXTAREA HEIGHTS */}
      <h3 className="mb-4 text-xl font-semibold">Textarea Heights</h3>
      <p className="text-gray-700 mb-4">Control textarea height with rows or custom height:</p>

      <div className="flex gap-4 mb-8">
        <Textarea
          label="Short (2 rows)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          width="250px"
        />
        <Textarea
          label="Tall (8 rows)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={8}
          width="250px"
        />
      </div>

      <Highlight
        theme={themes.vsLight}
        code={textareaHeightCode}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: '#e5e7eb' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      <Card className="bg-gray-100 border border-gray-200 rounded p-4 mb-12">
        <h3 className="text-lg font-semibold mb-2">Textarea Props</h3>
        <ul className="space-y-2">
          <li><code>label</code> (optional): Label text displayed above the textarea</li>
          <li><code>value</code> (optional): Textarea value</li>
          <li><code>onChange</code> (optional): Change handler function</li>
          <li><code>placeholder</code> (optional): Placeholder text</li>
          <li><code>errorMessage</code> (optional): Error message displayed below textarea in red</li>
          <li><code>message</code> (optional): Helper message displayed below textarea in gray</li>
          <li><code>width</code> (optional): Custom width (e.g., "300px", "100%")</li>
          <li><code>height</code> (optional): Custom height (e.g., "200px")</li>
          <li><code>rows</code> (optional, default: 4): Number of visible text rows</li>
          <li><code>required</code> (optional): Marks field as required (adds * to label)</li>
          <li><code>disabled</code> (optional): Disables the textarea</li>
          <li><code>className</code> (optional): Additional CSS classes</li>
          <li><code>style</code> (optional): Inline styles</li>
          <li><code>name</code> (optional): Textarea name attribute</li>
          <li><code>id</code> (optional): Textarea id attribute</li>
          <li><code>title</code> (optional): Textarea title attribute</li>
        </ul>
      </Card>
      <Break amount={3} />

      {/* CHECKBOX */}
      <hr />
      <Break amount={3} />
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="checkbox">Checkbox</h2>
      <p className="text-gray-700 mb-4">
        The <code>Checkbox</code> component provides a custom-styled checkbox with label support and imperative handle for programmatic control.
      </p>

      <Checkbox
        label="Subscribe to newsletter"
        onChange={(e) => console.log('Checkbox changed:', e.target.checked)}
        className="mb-8"
      />

      <Highlight
        theme={themes.vsLight}
        code={checkboxCode}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: '#e5e7eb' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* CHECKBOX CONTROLLED */}
      <h3 className="mb-4 text-xl font-semibold">Controlled Checkbox</h3>
      <p className="text-gray-700 mb-4">Control the checkbox state from parent component:</p>

      <div className="mb-4">
        <Checkbox
          label="Accept terms and conditions"
          checked={acceptTerms}
          onChange={(e) => setAcceptTerms(e.target.checked)}
          className="mb-2"
        />
        <p className="text-sm text-gray-600">Accepted: {acceptTerms ? 'Yes' : 'No'}</p>
      </div>

      <Highlight
        theme={themes.vsLight}
        code={checkboxControlledCode}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: '#e5e7eb' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* CHECKBOX WITH REF */}
      <h3 className="mb-4 text-xl font-semibold">Checkbox with Imperative Handle</h3>
      <p className="text-gray-700 mb-4">Use ref to programmatically get or set the checkbox state:</p>

      <div className="mb-4">
        <Checkbox
          label="Enable notifications"
          ref={checkboxRef}
          className="mb-2"
        />
        <div className="flex gap-2">
          <Button
            onClick={() => {
              const isChecked = checkboxRef.current?.getChecked();
              alert(`Checkbox is ${isChecked ? 'checked' : 'unchecked'}`);
            }}
          >
            Get State
          </Button>
          <Button
            onClick={() => {
              checkboxRef.current?.setChecked(true);
            }}
          >
            Check
          </Button>
          <Button
            onClick={() => {
              checkboxRef.current?.setChecked(false);
            }}
          >
            Uncheck
          </Button>
        </div>
      </div>

      <Highlight
        theme={themes.vsLight}
        code={checkboxRefCode}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: '#e5e7eb' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* CHECKBOX DISABLED */}
      <h3 className="mb-4 text-xl font-semibold">Disabled Checkboxes</h3>
      <p className="text-gray-700 mb-4">Disabled checkboxes cannot be interacted with:</p>

      <div className="flex gap-4 mb-8">
        <Checkbox
          label="Disabled unchecked"
          disabled
        />
        <Checkbox
          label="Disabled checked"
          checked={true}
          disabled
        />
      </div>

      <Highlight
        theme={themes.vsLight}
        code={checkboxDisabledCode}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: '#e5e7eb' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      <Card className="bg-gray-100 border border-gray-200 rounded p-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">Checkbox Props</h3>
        <ul className="space-y-2">
          <li><code>checked</code> (optional): Controlled checked state</li>
          <li><code>disabled</code> (optional): Disables the checkbox</li>
          <li><code>label</code> (optional): Label text displayed next to checkbox</li>
          <li><code>onChange</code> (optional): Change handler function</li>
          <li><code>className</code> (optional): Additional CSS classes</li>
          <li><code>id</code> (optional): Checkbox id attribute</li>
          <li><code>name</code> (optional): Checkbox name attribute</li>
        </ul>
      </Card>

      <Card className="bg-blue-50 border border-blue-200 rounded p-4 mb-12">
        <h3 className="text-lg font-semibold mb-2">Checkbox Imperative Handle</h3>
        <p className="text-gray-700 mb-2">Methods available via ref:</p>
        <ul className="space-y-2">
          <li><code>getChecked()</code>: Returns the current checked state (boolean)</li>
          <li><code>setChecked(checked: boolean)</code>: Programmatically set the checked state</li>
        </ul>
      </Card>
      <Break amount={3} />

    </Container>
  );
}
