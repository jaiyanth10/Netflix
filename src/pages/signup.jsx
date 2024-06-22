import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirm_password] = useState("");
  const { user, signUp } = UserAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset the error message
    try {
      if (password !== Confirmpassword) {
        alert("Password doesn't match!");
      } else if (password.length < 6) {
        alert("Password length must be more than 5!");
      } else {
        const result = await signUp(email, password);
        if (result.success) {
          navigate("/"); // Programmatic navigation only if sign-up is successful
        } else {
          throw new Error(result.message);
        }
      }
    } catch (error) {
      const errorMessage = error.code
        ? `Error during sign-up: ${error.code.replace(/firebase/gi, "")}`
        : error.message;
      setError(errorMessage);
    }
  };

  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="/"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        <div className="fixed w-full px-4 mt-20 z-50">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              {error ? <p className="p-1 bg-red-400 mt-1">{error}</p> : null}
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col py-4"
              >
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 my-1 bg-gray-700 rouded"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 my-1 bg-gray-700 rouded"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <input
                  onChange={(e) => setConfirm_password(e.target.value)}
                  className="p-2 my-1 bg-gray-700 rouded"
                  type="password"
                  placeholder="Confirm Password"
                  autoComplete="current-password"
                />
                <button className="bg-red-600 py-3 my-6 rounded font-bold">
                  Sign Up
                </button>
                <p className="py-5">
                  <span className="text-gray-600 sm:text-lg">
                    Already an user?
                  </span>
                  <Link className="ml-1" to="/login">
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
