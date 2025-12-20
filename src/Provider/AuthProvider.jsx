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
import useAxios from "../hooks/useAxios";

export const AuthContext = createContext();


const googleProvider = new GoogleAuthProvider

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(''); 
  const [roleLoading, setRoleLoading] = useState(true);
  const [userStatus, setUserStatus] = useState('');
  const axiosInstance = useAxios();

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
      if (currentUser) {
        axiosInstance.get(`/users/role/${currentUser.email}`)
          .then(res => {
            setRole(res.data.role);
            console.log("User:", res.data);
            setUserStatus(res.data.status); 
            console.log("User role fetched:", res.data.role);
            setLoading(false);
            setRoleLoading(false);
          })
          .catch(err => {
            console.log(err.message);
            setLoading(false); // Also set loading to false on error
          });
      } else {
        setRole(''); // Clear role on logout
        setLoading(false);
      }
      console.log("Auth State Changed:", currentUser);
    });
    return () => {
      unsubscribe();
    }
  }, [axiosInstance]);

   

  const authData = {
    registerWithEmailPassword,
    setUser,
    user,
    role,
    handleGoogleSignin,
    loading,
    loginWithEmailPassword,
    logOut,
    handleUpdateProfile,
    roleLoading,
    userStatus
  };

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
