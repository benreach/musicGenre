import React, { useEffect } from "react";
import { app } from "../config/firebase.config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { FcGoogle } from "react-icons/fc";
import { FaApple} from 'react-icons/fa'
import { data, replace, useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { validatedUser } from "../api";
import {LoginBg} from "../assets/video/index"

const Login = ({ setAuth }) => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();

  const [{ user }, dispatch] = useStateValue();

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");

        firebaseAuth.onAuthStateChanged((userCred) => {
          if (userCred) {
            userCred.getIdToken().then((token) => {
              validatedUser(token).then((data) => {
                dispatch({
                  type: actionType.SET_USER,
                  user: data,
                });
              });
            });
            navigate("/", { replace: true });
          } else {
            setAuth(false);
            dispatch({
              type: actionType.SET_USER,
              user: data,
            });
            navigate("/login");
          }
        });
      }
    });
  };

  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true") {
      navigate("/", { replace: true });
    }
  }, []);
  return (
    <div className="relative w-screen h-screen ">
      <video
        src={LoginBg}
        type="video/mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
      ></video>
      <div className="absolute inset-0  flex items-center justify-center p-4">
        <div
          className="w-full md:w-[375px] p-4 shadow-2xl rounded-md bg-transparent backdrop-blur-md flex 
        flex-col items-center justify-center text-white"
        >
          <div
            className="flex items-center justify-center gap-2 px-4 py-2 cursor-pointer hover:text-green-500 border-b-2 border-gray-600"
            onClick={loginWithGoogle}
          >
            <FcGoogle className="text-xl" />
            Sign in with Google
          </div>
                    <div
            className="flex items-center justify-center gap-2 px-4 py-2 cursor-pointer hover:text-green-500"
            onClick={loginWithGoogle}
          >
            <FaApple className="text-xl" />
            Sign in with Apple
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
