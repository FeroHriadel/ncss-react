import { useState } from "react";
import SignInForm, { type SignInFormData} from "../components/forms/SignInForm";
import Container from "../components/wrappers/Container";



export default function FormsPage() {
  const [signInLoading, setSignInLoading] = useState(false);


  function handleSignInSubmit(data: SignInFormData) {
    setSignInLoading(true);
    setTimeout(() => { setSignInLoading(false); }, 1000);
    setTimeout(() => { alert(`Sign In Data:\n\n${JSON.stringify(data, null, 2)}`); }, 1050);
  }


  return (
    <Container className="pt-24 px-4 pb-8">
      <SignInForm onSubmit={handleSignInSubmit} loading={signInLoading} disabled={signInLoading} validate />
    </Container>
  );
}