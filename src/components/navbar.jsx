import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.jsx";
import React, { useState } from "react";
import { FaRobot } from "react-icons/fa";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.js";

export default function NavBar() {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  //clearing aipick in firebase by clicking on logout
  const updateFirebaseMovies = async (movies) => {
    if (!user) return;
    try {
      const userDocRef = doc(db, "users", user.email);
      await updateDoc(userDocRef, {
        aiPicks: [],
      });
    } catch (error) {
      console.error("Error updating Firebase: ", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed top-0 left-0 w-full p-3 bg-black/80 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" onClick={updateFirebaseMovies}>
            <h1 className="text-red-600 sm:text-2xl md:text-4xl font-bold cursor-pointer mr-4">
              NETFLIX
            </h1>
          </Link>
          <Link
            to="/AI"
            className="bg-red-600 px-2 py-1 md:px-3 md:py-2 rounded cursor-pointer text-white text-xs sm:text-base flex items-center"
          >
            <FaRobot className="mr-1" />
            <span>AI</span>
          </Link>
        </div>
        <div className="block md:hidden">
          <button onClick={handleToggle} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        <div
          className={`md:flex ${
            isOpen ? "block" : "hidden"
          } md:flex-col md:items-center md:mt-4`}
        >
          {user?.email ? (
            <div className="flex flex-col md:flex-row items-center">
              <Link to="/account">
                <button className="text-white pr-0 md:pr-4 pb-2 md:pb-0 text-sm sm:text-base">
                  Account
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-2 py-2 md:px-4 md:py-2 rounded cursor-pointer text-white text-sm sm:text-base"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center">
              <Link to="/login">
                <button className="text-white pr-0 md:pr-4 pb-2 md:pb-0 text-sm sm:text-base">
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-red-600 px-2 py-1 md:px-4 md:py-2 rounded cursor-pointer text-white text-sm sm:text-base">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
