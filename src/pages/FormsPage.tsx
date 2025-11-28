import { useState } from "react";
import SignInForm, { type SignInFormData} from "../components/forms/SignInForm";
import Container from "../components/wrappers/Container";
import Card from "../components/cards/Card";
import Break from "../components/spacers/Break";
import { complexSignInFormCode, simpleSignInFormCode } from "../utils/FormsPageCode";
import { Highlight, themes } from "prism-react-renderer";
import Button from "../components/buttons/Button";
import SignUpForm from "../components/forms/SignUpForm";



export default function FormsPage() {
  const [signInLoading, setSignInLoading] = useState(false);


  function handleSignInSubmit(data: SignInFormData) {
    setSignInLoading(true);
    setTimeout(() => { setSignInLoading(false); }, 1000);
    setTimeout(() => { alert(`Sign In Data:\n\n${JSON.stringify(data, null, 2)}`); }, 1050);
  }


  return (
    <Container className="pt-24 px-4 pb-8">
      {/* INTRO */}
      <h1 className="mb-4 uppercase font-bold text-3xl">Forms</h1>
      <p className="text-lg mb-12">
        Pre-made <code>form</code> components for frequently used forms.
      </p>
      <Card className="mb-12 p-4 bg-gray-100 flex flex-col gap-4">
        <a href="#sign-in"><div><code>SignInForm</code></div></a>
        <a href="#sign-up"><div><code>SignUpForm</code></div></a>
      </Card>
      <hr />
      <Break amount={3} />


      {/* SIGN IN FORM */}
      <section>
        <h2 className="mb-4 text-2xl uppercase font-semibold" id="sign-in">SignIn Form</h2>

        {/* SIGN IN FORM - simple */}
        <p className="mb-4">Simple use</p>
        <SignInForm onSubmit={handleSignInSubmit} loading={signInLoading} disabled={signInLoading} validate />
        <Break amount={2} />

        <Highlight theme={themes.vsDark} code={simpleSignInFormCode} language="tsx">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
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

        {/* SIGN IN FORM - complex */}
        <p className="mb-4">Complex use</p>
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

        <Break amount={2} />
        <Highlight theme={themes.vsDark} code={complexSignInFormCode} language="tsx">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className + " rounded-lg p-6 overflow-x-auto"} style={{ ...style, backgroundColor: 'var(--nc-black-700)' }}>
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
      </section>


      {/* SIGN UP FORM */}
      <section>
        <h2 className="mb-4 text-2xl uppercase font-semibold" id="sign-up">SignUp Form</h2>
        <SignUpForm 
          onSubmit={handleSignInSubmit} 
          confirmPassword 
          customContent={
            <div className="flex flex-wrap justify-center items-center gap-2 w-full">
              <span className="rounded-full w-16 h-16 bg-gray-700 flex items-center justify-center text-white font-bold -rotate-45 mt-8">
                LOGO
              </span>
              <span className="rounded-full w-16 h-16 bg-gray-700 flex items-center justify-center text-white font-bold -rotate-45 mt-8">
                LOGO
              </span>
              <span className="rounded-full w-16 h-16 bg-gray-700 flex items-center justify-center text-white font-bold -rotate-45 mt-8">
                LOGO
              </span>
            </div>
          }
        />
      </section>


      

    </Container>
  );
}