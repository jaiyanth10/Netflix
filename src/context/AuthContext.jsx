import { useState, useEffect, useContext, createContext } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  const signUp = async (email, password) => {
    try {
      // Create user with email and password
      await createUserWithEmailAndPassword(auth, email, password);

      // Create a Firestore document for the user
      await setDoc(doc(db, "users", email), {
        savedShows: [],
        aiPicks: [],
      });

      // Return success
      return { success: true };
    } catch (error) {
      // Return error
      return { success: false, message: error.message, code: error.code };
    }
  };

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
