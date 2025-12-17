/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext();


const googleProvider = new GoogleAuthProvider

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const registerWithEmailPassword = (email, pass) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const loginWithEmailPassword = (email, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  }

  const handleGoogleSignin = ()=>{
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
  }

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  }

  const handleUpdateProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
    });
};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return ()=>{
        unsubscribe()
    }
  }, []);

  const authData = {
    registerWithEmailPassword,
    setUser,
    user,
    handleGoogleSignin,
    loading,
    loginWithEmailPassword,
    logOut,
    handleUpdateProfile
  };

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
