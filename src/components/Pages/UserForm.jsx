import { useState, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { checkValidate } from "@/utils/checkValidate";
import { login } from "@/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserForm() {
  //  const {isAuthenticated, user} = useSelector(state=> state.auth);

  const dispatch = useDispatch();
  const [isSignIn, setisSignIn] = useState(true);

  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);

  const handleSignInForm = () => {
    setisSignIn(!isSignIn);
  };

  const handleButtonClick = () => {
    // let message = checkValidate(email.current.value, password.current.value);
    // console.log(message);
    console.log(email.current.value, password);

    if (!isSignIn) {
      let check = checkValidate(email.current.value);
      if (check) return;
      postData();
    } else {
      let check = checkValidate(email.current.value);
      if (check) return;
      loginUser();
    }
  };

  const postData = async () => {
    let user = {
      fullName: fullName.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    await axios.post(`${import.meta.env.VITE_API_URL}/register`, { user });
  };

  const loginUser = async () => {
    let userdata = {
      email: email.current.value,
      password: password.current.value,
    };
    const loggedIn = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
      userdata,
    });
    console.log(loggedIn.data);

    const { success } = loggedIn.data;
    console.log(success);
    if (success) {
      dispatch(login(loggedIn.data));
      navigate('/home')
    } else {
      alert("some thing went wrong");
    }
  };

  return (
    <div className="h-screen">
      <form
        className="bg-black flex flex-col w-full h-full justify-center items-center"
        onSubmit={(e) => e.preventDefault()}
      >
        {!isSignIn && (
          <Input
            ref={fullName}
            type="text"
            placeholder="Full Name"
            className="p-2 m-2"
          />
        )}
        <Input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-2 m-2"
        />
        <Input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 m-2"
        />
        <Button
          className="bg-red-700 rounded-lg p-4 m-4 text-white"
          onClick={handleButtonClick}
        >
          {isSignIn ? "Login" : "Register"}
        </Button>
        <p className="py-4 text-white text-bold" onClick={handleSignInForm}>
          {isSignIn
            ? "New Here? Sign Up Now"
            : "Already Registered? Sign In Now."}{" "}
        </p>
      </form>
    </div>
  );
}

export default UserForm;
