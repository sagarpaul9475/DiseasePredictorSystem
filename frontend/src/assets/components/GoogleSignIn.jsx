import { useEffect, useRef } from "react";
import {jwtDecode} from "jwt-decode";
import { useGlobalContext } from "./context";
const SignIn = () => {
const {
    email,
    submitLogin,
    username,
    password,
    submitRegistration,
    } = useGlobalContext();
const userObject = useRef({});
const handleCallback = async (response, event) => {
    console.log(response.credential);
    userObject.current = jwtDecode(response.credential);
    console.log(userObject.current);
    username.current = userObject.current.name;
    email.current = userObject.current.email;
    password.current = response.credential.slice(0, 8);
    console.log(username.current);
    console.log(email.current);
    console.log(password.current);
try {
const fetchResponse = await fetch(
"http://localhost:8000/check_email?email=" + email.current
);
const data = await fetchResponse.json();
      console.log(data.email_exists);
if (data.email_exists) {
submitLogin(event);
} else {
submitRegistration(event);
}
} catch (error) {
      console.error("Error:", error);
}
};
useEffect(() => {
  const initializeGoogleSignIn = () => {
    if (!window.google) {
      console.log("Google script not loaded yet");
      return;
    }

    window.google.accounts.id.initialize({
      client_id: "957686090327-bsqini6j7v6a2sjcevsh6rl4vaj0dh3b.apps.googleusercontent.com",
      callback: (response) => handleCallback(response, null),
    });

    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {
        theme: "outline",
        size: "large",
      }
    );
  };

  initializeGoogleSignIn();
}, []);
return (
<div className="App">
<div id="signInDiv"></div>
</div>
);
};
export default SignIn;