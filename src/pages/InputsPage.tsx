import { useRef, useState } from 'react';
import Card from "../components/cards/Card";
import Break from "../components/spacers/Break";
import Container from "../components/wrappers/Container";
import Input, { type InputHandle } from "../components/inputs/Input";
import Email, { type EmailHandle } from "../components/inputs/Email";
import Password, { type PasswordHandle } from "../components/inputs/Password";
import Textarea, { type TextareaHandle } from "../components/inputs/Textarea";
import Checkbox, { type CheckboxHandle } from "../components/inputs/Checkbox";
import Switch, { type SwitchHandle } from "../components/inputs/Switch";
import FileUpload, { type FileUploadHandle } from "../components/inputs/FileUpload";
import Button from "../components/buttons/Button";
import { Highlight, themes } from "prism-react-renderer";
import {
  inputCode,
  inputTypesCode,
  inputValidationCode,
  inputErrorCode,
  inputMessageCode,
  inputDisabledCode,
  emailCode,
  emailValidationCode,
  emailHandleCode,
  passwordCode,
  passwordValidationCode,
  passwordHandleCode,
  textareaCode,
  textareaValidationCode,
  textareaHeightCode,
  textareaHandleCode,
  checkboxCode,
  checkboxUncontrolledCode,
  checkboxHandleCode,
  checkboxDisabledCode,
  switchCode,
  switchUncontrolledCode,
  switchSizesCode,
  switchHandleCode,
  switchDisabledCode,
  fileUploadCode,
  fileUploadOptionsCode,
  fileUploadValidationCode,
  fileUploadHandleCode,
  fileUploadDisabledCode
} from "../utils/InputsPageCode";

export default function InputsPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]); console.log(uploadedFiles);

  const inputRef = useRef<InputHandle>(null);
  const emailRef = useRef<EmailHandle>(null);
  const passwordRef = useRef<PasswordHandle>(null);
  const textareaRef = useRef<TextareaHandle>(null);
  const checkboxRef = useRef<CheckboxHandle>(null);
  const switchRef = useRef<SwitchHandle>(null);
  const fileUploadRef = useRef<FileUploadHandle>(null);

  return (
    <Container className="px-4 pt-24">
      {/* INTRO */}
      <h1 className="mb-4 uppercase font-bold text-3xl">Input Components</h1>
      <p className="text-lg mb-12">
        Input components: <code>Input</code>, <code>Email</code>, <code>Password</code>, <code>Textarea</code>, <code>Checkbox</code>, <code>Switch</code>, <code>FileUpload</code>
      </p>
      <Card className="mb-12 p-4 bg-gray-100 flex flex-col gap-4">
        <a href="#input"><div><code>Input</code> is a flexible text input with validation, controlled/uncontrolled modes, and imperative handle</div></a>
        <a href="#email"><div><code>Email</code> is like Input but with built-in email validation</div></a>
        <a href="#password"><div><code>Password</code> is like Input with password visibility toggle and validation rules</div></a>
        <a href="#textarea"><div><code>Textarea</code> is a multi-line text input with the same features as Input</div></a>
        <a href="#checkbox"><div><code>Checkbox</code> is a styled checkbox with controlled/uncontrolled modes</div></a>
        <a href="#switch"><div><code>Switch</code> is a toggle switch with customizable size</div></a>
        <a href="#fileupload"><div><code>FileUpload</code> is a file upload input with drag & drop support</div></a>
      </Card>
      <hr />
      <Break amount={3} />

      {/* INPUT */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="input">Input</h2>
      <p className="mb-4">
        The <code>Input</code> component provides a styled text input with label, validation, error messages, and helper text support.
        It works in both controlled and uncontrolled modes and exposes an imperative handle for programmatic control.
      </p>

      <Input
        label="Username"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        width="260px"
        className="mb-8"
      />

      <Highlight theme={themes.vsDark} code={inputCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* INPUT TYPES */}
      <h3 className="mb-4 text-xl font-semibold">Input Types</h3>
      <p className="mb-4">The Input component supports multiple input types:</p>

      <div className="flex gap-2 mb-8 flex-wrap">
        <Input type="text" placeholder="Text input" />
        <Input type="number" placeholder="Number input" />
        <Input type="tel" placeholder="Phone number" />
      </div>

      <Highlight theme={themes.vsDark} code={inputTypesCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* INPUT VALIDATION */}
      <h3 className="mb-4 text-xl font-semibold">Input Validation</h3>
      <p className="mb-4">
        Use the <code>validate</code> prop for automatic validation on blur, or access the <code>validate()</code> method via ref for manual validation.
      </p>

      <div className="mb-8">
        <Input
          label="Username"
          placeholder="Enter username"
          validate
          required
          ref={inputRef}
        />
        <Button onClick={() => {
          const error = inputRef.current?.validate();
          alert(error || 'Valid!');
        }} className="mt-6">
          Validate
        </Button>
      </div>

      <Highlight theme={themes.vsDark} code={inputValidationCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps}) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* INPUT ERROR */}
      <h3 className="mb-4 text-xl font-semibold">Error Message</h3>
      <p className="mb-4">Display validation errors below the input:</p>

      <Input
        label="Username"
        placeholder="Enter username"
        errorMessage="Username is required"
        className="mb-8"
      />

      <Highlight theme={themes.vsDark} code={inputErrorCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* INPUT MESSAGE */}
      <h3 className="mb-4 text-xl font-semibold">Helper Message</h3>
      <p className="mb-4">Display helper text below the input:</p>

      <Input
        label="Username"
        placeholder="Enter username"
        message="Choose a unique username"
        className="mb-8"
      />

      <Highlight theme={themes.vsDark} code={inputMessageCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* INPUT DISABLED */}
      <h3 className="mb-4 text-xl font-semibold">Disabled State</h3>
      <p className="mb-4">Inputs can be disabled:</p>

      <Input
        label="Username"
        value="disabled-user"
        disabled
        className="mb-8"
      />

      <Highlight theme={themes.vsDark} code={inputDisabledCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
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
          <li><code>type</code> (optional, default: 'text'): Input type ('text' | 'number' | 'tel' | 'url' | 'search')</li>
          <li><code>label</code> (optional): Label text with required indicator (*) if required is true</li>
          <li><code>value</code> (optional): Input value for controlled mode</li>
          <li><code>onChange</code> (optional): Change handler for controlled mode</li>
          <li><code>placeholder</code> (optional): Placeholder text</li>
          <li><code>validate</code> (optional): Enable internal validation (validates on blur, clears on focus)</li>
          <li><code>errorMessage</code> (optional): External error message (takes precedence over internal validation)</li>
          <li><code>message</code> (optional): Helper message</li>
          <li><code>width</code> (optional, default: "260px"): Input width</li>
          <li><code>required</code> (optional): Marks field as required</li>
          <li><code>disabled</code> (optional): Disables the input</li>
          <li><code>autoComplete</code> (optional): Autocomplete attribute</li>
          <li><code>className</code> (optional): Additional CSS classes</li>
          <li><code>style</code> (optional): Inline styles</li>
          <li><code>ref</code> (optional): Forward ref to access imperative handle</li>
        </ul>
        <h3 className="text-lg font-semibold mb-2 mt-4">Input Imperative Handle</h3>
        <ul className="space-y-2">
          <li><code>validate()</code>: Returns error string (empty if valid)</li>
          <li><code>getValue()</code>: Returns current input value</li>
          <li><code>setValue(value)</code>: Sets input value programmatically</li>
          <li><code>clear()</code>: Clears the input</li>
        </ul>
      </Card>
      <hr />
      <Break amount={3} />

      {/* EMAIL */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="email">Email</h2>
      <p className="mb-4">
        The <code>Email</code> component is similar to Input but includes built-in email validation.
        It supports both controlled and uncontrolled modes with automatic validation on blur.
      </p>

      <Email
        label="Email Address"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-8"
      />

      <Highlight theme={themes.vsDark} code={emailCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* EMAIL VALIDATION */}
      <h3 className="mb-4 text-xl font-semibold">Automatic Email Validation</h3>
      <p className="mb-4">
        Enable automatic email format validation with the <code>validate</code> prop:
      </p>

      <Email
        label="Email Address"
        placeholder="your@email.com"
        validate
        required
        className="mb-8"
      />

      <Highlight theme={themes.vsDark} code={emailValidationCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* EMAIL IMPERATIVE HANDLE */}
      <h3 className="mb-4 text-xl font-semibold">Email Imperative Handle</h3>
      <p className="mb-4">
        Access validation and value management methods via ref:
      </p>

      <div className="mb-8">
        <Email label="Email" ref={emailRef} />
        <div className="flex gap-2 mt-4">
          <Button size="sm" onClick={() => alert(emailRef.current?.validate() || 'Valid!')}>Validate</Button>
          <Button size="sm" onClick={() => alert(emailRef.current?.getValue())}>Get Value</Button>
          <Button size="sm" onClick={() => emailRef.current?.setValue('test@example.com')}>Set Value</Button>
          <Button size="sm" onClick={() => emailRef.current?.clear()}>Clear</Button>
        </div>
      </div>

      <Highlight theme={themes.vsDark} code={emailHandleCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      <Card className="bg-gray-100 border border-gray-200 rounded p-4 mb-12">
        <h3 className="text-lg font-semibold mb-2">Email Props</h3>
        <p className="mb-2">Inherits all Input props with the same defaults and behaviors.</p>
        <p className="text-sm">The <code>validate</code> prop automatically validates email format using regex pattern.</p>
      </Card>
      <hr />
      <Break amount={3} />

      {/* PASSWORD */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="password">Password</h2>
      <p className="mb-4">
        The <code>Password</code> component is similar to Input but for passwords. It supports visibility toggle
        (eye icon) and advanced validation rules.
      </p>

      <Password
        label="Password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        canShowPassword
        className="mb-8"
      />

      <Highlight theme={themes.vsDark} code={passwordCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* PASSWORD VALIDATION */}
      <h3 className="mb-4 text-xl font-semibold">Password Validation Rules</h3>
      <p className="mb-4">
        The Password component supports multiple validation rules:
      </p>

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
        className="mb-8"
      />

      <Highlight theme={themes.vsDark} code={passwordValidationCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* PASSWORD IMPERATIVE HANDLE */}
      <h3 className="mb-4 text-xl font-semibold">Password Imperative Handle</h3>
      <p className="mb-4">
        Access validation and value management methods via ref:
      </p>

      <div className="mb-8">
        <Password label="Password" ref={passwordRef} />
        <div className="flex gap-2 mt-4">
          <Button size="sm" onClick={() => alert(passwordRef.current?.validate() || 'Valid!')}>Validate</Button>
          <Button size="sm" onClick={() => alert(passwordRef.current?.getValue())}>Get Value</Button>
          <Button size="sm" onClick={() => passwordRef.current?.clear()}>Clear</Button>
        </div>
      </div>

      <Highlight theme={themes.vsDark} code={passwordHandleCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      <Card className="bg-gray-100 border border-gray-200 rounded p-4 mb-12">
        <h3 className="text-lg font-semibold mb-2">Password Props</h3>
        <p className="mb-2">Inherits all Input props plus:</p>
        <ul className="space-y-2">
          <li><code>canShowPassword</code> (optional): Shows eye icon to toggle password visibility</li>
          <li><code>minLength</code> (optional): Minimum password length</li>
          <li><code>requireNumber</code> (optional): Requires at least one number</li>
          <li><code>requireSpecialCharacter</code> (optional): Requires at least one special character</li>
          <li><code>requireUpperCase</code> (optional): Requires at least one uppercase letter</li>
        </ul>
      </Card>
      <hr />
      <Break amount={3} />

      {/* TEXTAREA */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="textarea">Textarea</h2>
      <p className="mb-4">
        The <code>Textarea</code> component is a multi-line text input with the same functionality as Input.
        It supports validation, error messages, and imperative handle.
      </p>

      <Textarea
        label="Description"
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        className="mb-8"
      />

      <Highlight theme={themes.vsDark} code={textareaCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* TEXTAREA VALIDATION */}
      <h3 className="mb-4 text-xl font-semibold">Textarea Validation</h3>
      <p className="mb-4">
        Use the <code>validate</code> prop for automatic validation:
      </p>

      <Textarea
        label="Description"
        placeholder="Enter description"
        validate
        required
        className="mb-8"
      />

      <Highlight theme={themes.vsDark} code={textareaValidationCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* TEXTAREA HEIGHT */}
      <h3 className="mb-4 text-xl font-semibold">Custom Height</h3>
      <p className="mb-4">
        Control textarea height with <code>rows</code> or <code>height</code> props:
      </p>

      <Textarea
        label="Description"
        rows={6}
        height="200px"
        className="mb-8"
      />

      <Highlight theme={themes.vsDark} code={textareaHeightCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* TEXTAREA IMPERATIVE HANDLE */}
      <h3 className="mb-4 text-xl font-semibold">Textarea Imperative Handle</h3>
      <p className="mb-4">
        Access validation and value management methods via ref:
      </p>

      <div className="mb-8">
        <Textarea label="Description" ref={textareaRef} />
        <div className="flex gap-2 mt-4">
          <Button size="sm" onClick={() => alert(textareaRef.current?.validate() || 'Valid!')}>Validate</Button>
          <Button size="sm" onClick={() => alert(textareaRef.current?.getValue())}>Get Value</Button>
          <Button size="sm" onClick={() => textareaRef.current?.setValue('New text')}>Set Value</Button>
          <Button size="sm" onClick={() => textareaRef.current?.clear()}>Clear</Button>
        </div>
      </div>

      <Highlight theme={themes.vsDark} code={textareaHandleCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      <Card className="bg-gray-100 border border-gray-200 rounded p-4 mb-12">
        <h3 className="text-lg font-semibold mb-2">Textarea Props</h3>
        <p className="mb-2">Inherits most Input props plus:</p>
        <ul className="space-y-2">
          <li><code>rows</code> (optional, default: 4): Number of visible text rows</li>
          <li><code>height</code> (optional): Custom height (e.g., "200px")</li>
        </ul>
      </Card>
      <hr />
      <Break amount={3} />

      {/* CHECKBOX */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="checkbox">Checkbox</h2>
      <p className="mb-4">
        The <code>Checkbox</code> component is a styled checkbox with custom styling and imperative handle.
        It works in both controlled and uncontrolled modes.
      </p>

      <Checkbox
        label="Accept terms and conditions"
        checked={accepted}
        onChange={(e) => setAccepted(e.target.checked)}
        className="mb-8"
      />

      <Highlight theme={themes.vsDark} code={checkboxCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* CHECKBOX UNCONTROLLED */}
      <h3 className="mb-4 text-xl font-semibold">Uncontrolled Checkbox</h3>
      <p className="mb-4">
        Checkbox works without checked/onChange props:
      </p>

      <Checkbox label="Remember me" className="mb-8" />

      <Highlight theme={themes.vsDark} code={checkboxUncontrolledCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* CHECKBOX IMPERATIVE HANDLE */}
      <h3 className="mb-4 text-xl font-semibold">Checkbox Imperative Handle</h3>
      <p className="mb-4">
        Programmatically control checkbox state via ref:
      </p>

      <div className="mb-8">
        <Checkbox label="Accept terms" ref={checkboxRef} />
        <div className="flex gap-2 mt-4">
          <Button size="sm" onClick={() => alert(checkboxRef.current?.getChecked() ? 'Checked' : 'Unchecked')}>Get State</Button>
          <Button size="sm" onClick={() => checkboxRef.current?.setChecked(true)}>Check</Button>
          <Button size="sm" onClick={() => checkboxRef.current?.setChecked(false)}>Uncheck</Button>
        </div>
      </div>

      <Highlight theme={themes.vsDark} code={checkboxHandleCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* CHECKBOX DISABLED */}
      <h3 className="mb-4 text-xl font-semibold">Disabled Checkbox</h3>
      <p className="mb-4">Checkboxes can be disabled:</p>

      <Checkbox label="Disabled checkbox" checked={true} disabled className="mb-8" />

      <Highlight theme={themes.vsDark} code={checkboxDisabledCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      <Card className="bg-gray-100 border border-gray-200 rounded p-4 mb-12">
        <h3 className="text-lg font-semibold mb-2">Checkbox Props</h3>
        <ul className="space-y-2">
          <li><code>label</code> (optional): Label text displayed next to checkbox</li>
          <li><code>checked</code> (optional): Controlled checked state</li>
          <li><code>onChange</code> (optional): Change handler for controlled mode</li>
          <li><code>disabled</code> (optional): Disables the checkbox</li>
          <li><code>className</code> (optional): Additional CSS classes</li>
          <li><code>id</code> (optional): HTML id attribute</li>
          <li><code>name</code> (optional): HTML name attribute</li>
        </ul>
        <h3 className="text-lg font-semibold mb-2 mt-4">Checkbox Imperative Handle</h3>
        <ul className="space-y-2">
          <li><code>getChecked()</code>: Returns current checked state</li>
          <li><code>setChecked(checked)</code>: Sets checked state programmatically</li>
        </ul>
      </Card>
      <hr />
      <Break amount={3} />

      {/* SWITCH */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="switch">Switch</h2>
      <p className="mb-4">
        The <code>Switch</code> component is a toggle switch with animated thumb and imperative handle.
        It works in both controlled and uncontrolled modes and supports custom sizing.
      </p>

      <Switch
        label="Enable notifications"
        checked={notifications}
        onChange={(e) => setNotifications(e.target.checked)}
        className="mb-8"
      />

      <Highlight theme={themes.vsDark} code={switchCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* SWITCH UNCONTROLLED */}
      <h3 className="mb-4 text-xl font-semibold">Uncontrolled Switch</h3>
      <p className="mb-4">
        Switch works without checked/onChange props:
      </p>

      <Switch label="Dark mode" className="mb-8" />

      <Highlight theme={themes.vsDark} code={switchUncontrolledCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* SWITCH SIZES */}
      <h3 className="mb-4 text-xl font-semibold">Custom Sizes</h3>
      <p className="mb-4">
        Customize switch size with width and height props:
      </p>

      <div className="flex gap-4 items-center mb-8">
        <Switch label="Small" width="40px" height="20px" />
        <Switch label="Medium" width="50px" height="25px" />
        <Switch label="Large" width="60px" height="30px" />
      </div>

      <Highlight theme={themes.vsDark} code={switchSizesCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* SWITCH IMPERATIVE HANDLE */}
      <h3 className="mb-4 text-xl font-semibold">Switch Imperative Handle</h3>
      <p className="mb-4">
        Programmatically control switch state via ref:
      </p>

      <div className="mb-8">
        <Switch label="Toggle feature" ref={switchRef} />
        <div className="flex gap-2 mt-4">
          <Button size="sm" onClick={() => alert(switchRef.current?.getChecked() ? 'On' : 'Off')}>Get State</Button>
          <Button size="sm" onClick={() => switchRef.current?.setChecked(true)}>Turn On</Button>
          <Button size="sm" onClick={() => switchRef.current?.setChecked(false)}>Turn Off</Button>
        </div>
      </div>

      <Highlight theme={themes.vsDark} code={switchHandleCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* SWITCH DISABLED */}
      <h3 className="mb-4 text-xl font-semibold">Disabled Switch</h3>
      <p className="mb-4">Switches can be disabled:</p>

      <Switch label="Disabled switch" checked={true} disabled className="mb-8" />

      <Highlight theme={themes.vsDark} code={switchDisabledCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      <Card className="bg-gray-100 border border-gray-200 rounded p-4 mb-12">
        <h3 className="text-lg font-semibold mb-2">Switch Props</h3>
        <ul className="space-y-2">
          <li><code>label</code> (optional): Label text displayed next to switch</li>
          <li><code>checked</code> (optional): Controlled checked state</li>
          <li><code>onChange</code> (optional): Change handler for controlled mode</li>
          <li><code>disabled</code> (optional): Disables the switch</li>
          <li><code>width</code> (optional): Custom switch width</li>
          <li><code>height</code> (optional): Custom switch height</li>
          <li><code>className</code> (optional): Additional CSS classes</li>
          <li><code>style</code> (optional): Inline styles</li>
          <li><code>id</code> (optional): HTML id attribute</li>
          <li><code>name</code> (optional): HTML name attribute</li>
        </ul>
        <h3 className="text-lg font-semibold mb-2 mt-4">Switch Imperative Handle</h3>
        <ul className="space-y-2">
          <li><code>getChecked()</code>: Returns current checked state</li>
          <li><code>setChecked(checked)</code>: Sets checked state programmatically</li>
        </ul>
      </Card>
      <hr />
      <Break amount={3} />

      {/* FILEUPLOAD */}
      <h2 className="mb-4 text-2xl uppercase font-semibold" id="fileupload">FileUpload</h2>
      <p className="mb-4">
        The <code>FileUpload</code> component is a file upload input with drag & drop support and imperative handle.
        It supports file type restrictions, file count limits, and validation.
      </p>

      <FileUpload
        label="Upload files"
        onChange={(files) => setUploadedFiles(files)}
        className="mb-8"
      />

      <Highlight theme={themes.vsDark} code={fileUploadCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* FILEUPLOAD OPTIONS */}
      <h3 className="mb-4 text-xl font-semibold">File Type and Limit</h3>
      <p className="mb-4">
        Restrict file types with <code>accept</code> and limit file count with <code>max</code>:
      </p>

      <FileUpload
        label="Upload images"
        accept={['image/png', 'image/jpeg']}
        max={3}
        onChange={(files) => console.log(files)}
        className="mb-8"
      />

      <Highlight theme={themes.vsDark} code={fileUploadOptionsCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* FILEUPLOAD VALIDATION */}
      <h3 className="mb-4 text-xl font-semibold">FileUpload Validation</h3>
      <p className="mb-4">
        Use the <code>validate</code> and <code>required</code> props for validation:
      </p>

      <FileUpload
        label="Required document"
        validate
        required
        className="mb-8"
      />

      <Highlight theme={themes.vsDark} code={fileUploadValidationCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* FILEUPLOAD IMPERATIVE HANDLE */}
      <h3 className="mb-4 text-xl font-semibold">FileUpload Imperative Handle</h3>
      <p className="mb-4">
        Access validation and file management methods via ref:
      </p>

      <div className="mb-8">
        <FileUpload label="Upload files" ref={fileUploadRef} />
        <div className="flex gap-2 mt-4">
          <Button size="sm" onClick={() => alert(fileUploadRef.current?.validate() || 'Valid!')}>Validate</Button>
          <Button size="sm" onClick={() => {
            const files = fileUploadRef.current?.getValue();
            alert(`${files?.length || 0} file(s) selected`);
          }}>Get Files</Button>
          <Button size="sm" onClick={() => fileUploadRef.current?.clear()}>Clear</Button>
        </div>
      </div>

      <Highlight theme={themes.vsDark} code={fileUploadHandleCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      {/* FILEUPLOAD DISABLED */}
      <h3 className="mb-4 text-xl font-semibold">Disabled FileUpload</h3>
      <p className="mb-4">FileUpload can be disabled:</p>

      <FileUpload label="Upload disabled" disabled className="mb-8" />

      <Highlight theme={themes.vsDark} code={fileUploadDisabledCode} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Break amount={3} />

      <Card className="bg-gray-100 border border-gray-200 rounded p-4 mb-12">
        <h3 className="text-lg font-semibold mb-2">FileUpload Props</h3>
        <ul className="space-y-2">
          <li><code>label</code> (optional): Label text with required indicator (*) if required is true</li>
          <li><code>files</code> (optional): Controlled files array</li>
          <li><code>onChange</code> (optional): Change handler receiving File[] array</li>
          <li><code>accept</code> (optional, default: ['*']): Array of accepted file types (e.g., ['image/png', 'application/pdf'])</li>
          <li><code>max</code> (optional): Maximum number of files allowed</li>
          <li><code>validate</code> (optional): Enable internal validation</li>
          <li><code>required</code> (optional): Marks field as required</li>
          <li><code>errorMessage</code> (optional): External error message</li>
          <li><code>message</code> (optional): Helper message</li>
          <li><code>width</code> (optional, default: "260px"): Component width</li>
          <li><code>disabled</code> (optional): Disables the file upload</li>
          <li><code>className</code> (optional): Additional CSS classes</li>
          <li><code>style</code> (optional): Inline styles</li>
          <li><code>name</code> (optional): HTML name attribute</li>
          <li><code>id</code> (optional): HTML id attribute</li>
        </ul>
        <h3 className="text-lg font-semibold mb-2 mt-4">FileUpload Imperative Handle</h3>
        <ul className="space-y-2">
          <li><code>validate()</code>: Returns error string (empty if valid)</li>
          <li><code>getValue()</code>: Returns File[] array</li>
          <li><code>setValue(files)</code>: Sets files programmatically (limited by browser security)</li>
          <li><code>clear()</code>: Clears selected files</li>
        </ul>
      </Card>
    </Container>
  );
}
