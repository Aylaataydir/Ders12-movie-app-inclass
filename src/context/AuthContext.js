import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../auth/firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { toastError, toastSuccess, toastWarn } from '../helpers/ToastNotify';
import { useNavigate } from 'react-router-dom';

export const AuthKontext = createContext()


const AuthContext = ({ children }) => {

  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState()



  // REGISTRY 

  const createUser = async (email, password, displayName) => {

    try {

      await createUserWithEmailAndPassword(auth, email, password);

      toastSuccess("Registered Successfully")
      navigate("/")

      await updateProfile(auth.currentUser, {
        displayName: displayName

      });


    } catch (error) {
      toastError(error)
    }

  }


  // SIGN OUT 

  const cikis = async () => {

    await signOut(auth)

    setCurrentUser(null)
    toastSuccess("logout basarili")
    navigate("/");

  }

  // LOGIN 

  const signIn = async (email, password) => {

    try {

      await signInWithEmailAndPassword(auth, email, password);
      toastSuccess("Logged in Successfully");
      navigate("/");

    } catch (error) {
      toastError(error);
    }
  };



  // SET USER 

  const userTakip = () => {

    onAuthStateChanged(auth, (user) => {
      console.log(user)

      if (user) {

        const { email, photoUrl, displayName } = user

        setCurrentUser({ email: email, photoUrl: photoUrl, displayName: displayName })
      }


    })
  }


  // SIGNIN GOOGLE

  const signUpWithGoogle = async () => {

    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider)

    try {
      toastSuccess("Login success")
      navigate("/");
    } catch (error) {
      console.log(error);
    }

  }


  const forgotPassword = async (email) => {

   

    try {

       await sendPasswordResetEmail(auth, email)
       toastWarn("check your email")
      
    } catch (error) {
      console.log(error)
      
    }
    
  
  }



  useEffect(() => {

    userTakip()

  }, [])



  return (
    <AuthKontext.Provider value={{ createUser, currentUser, signIn, cikis, signUpWithGoogle, forgotPassword }}>
      {children}
    </AuthKontext.Provider>
  )
}

export default AuthContext