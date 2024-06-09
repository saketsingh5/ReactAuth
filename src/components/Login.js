import React, { useRef } from "react";
import Header from "./Header";
import { useState } from "react";
import { checkValidate } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/fireBase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isSignIn, setisSignIn] = useState(true);
  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);

  const handleSignInForm = () => {
    setisSignIn(!isSignIn);
  };

  const handleButtonClick = () => {
    let message = checkValidate(email.current.value, password.current.value);
    console.log(message);
    console.log(email.current.value, password);
    if (message) return;

    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
  };

  return (
    <>
      <Header />
      <form className="bg-black" onSubmit={(e) => e.preventDefault()}>
        {!isSignIn && (
          <input type="text" placeholder="Full Name" className="p-2 m-2" />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-2 m-2"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 m-2"
        />
        <button
          className="bg-red-700 rounded-lg p-4 m-4 text-white"
          onClick={handleButtonClick}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 text-white text-bold" onClick={handleSignInForm}>
          {isSignIn
            ? "New to Netflix? Sign Up Now"
            : "Already Registered? Sign In Now."}{" "}
        </p>
      </form>
    </>
  );
}

export default Login;
