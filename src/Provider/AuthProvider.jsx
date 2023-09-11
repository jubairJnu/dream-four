import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);


// *** atuh provider routes
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // authentication system

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const login = (email, password) =>{
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logOut = () =>{
   return signOut(auth);
  }

  const updateUserProfile =(name,photo)=>{
    return updateProfile(auth.currentUser, {
       displayName: name, photoURL: photo
     })
     
   }

   useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, currentUser =>{
      setUser(currentUser);
      setLoading(false)
    });
    return () => {
      unsubscribed();
    }
   },[])

  // pass function
  const authInfo = {
    user,
    loading,
    createUser,
    login,
    logOut,
    updateUserProfile
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;