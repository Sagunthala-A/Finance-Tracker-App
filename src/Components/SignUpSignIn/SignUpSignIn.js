import React,{useEffect, useState} from 'react';
import './SignUpSignIn.css'
import Input from '../Input/Input';
import Button from '../Button/Button';
import { toast } from 'react-toastify';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, provider, db } from "../../firebase";
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from "firebase/firestore"; 

const SignUpSignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();

  async function signUpWithEmail(e) {
    e.preventDefault();
    setLoading(true);
    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password === confirmPassword) {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;
          await createUserDocument(user);
          toast.success("Signed Up successfully!");
          // Reset form fields
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          navigate("/dashboard");
        } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
          // ..
        }
      } else {
        toast.error("Password and Confirm Password must be the same");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  }

  async function loginWithEmail(e) {
    e.preventDefault();
    setLoading(true);
    const auth = getAuth();
    if (email !== "" && password !== "") {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        toast.success("Logged In Successfully!");
        setLoading(false);
        setEmail("");
        setPassword("");
        navigate("/dashboard");
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  }

  const createUserDocument = async (user) => {
    setLoading(true);
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();
      try {
        await setDoc(userRef, {
          name: displayName ? displayName : name,
          email,
          photoURL: photoURL ? photoURL : "",
          createdAt,
        });
        toast.success("Account Created!");
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        console.error("Error creating user document: ", error);
        setLoading(false);
      }
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await createUserDocument(user);
      toast.success("User Authenticated Successfully!");
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      console.error("Error creating user document: ", error.message);
    }
  };

  return (
    <div className="signUp__wrapper">
      {loginForm ? (
        <>
          <p>
            Login on <span>Financely</span>
          </p>
          <form className="form__wrapper">
            <Input
              label={"Email"}
              placeholder={"JohnDoe@gmail.com"}
              type={"email"}
              state={email}
              setState={setEmail}
            />

            <Input
              label={"Password"}
              placeholder={"Example@123"}
              type={"password"}
              state={password}
              setState={setPassword}
            />

            <Button
              disable={loading}
              onClick={loginWithEmail}
              text={loading ? "Loading..." : "Login Using Email and Password"}
              isBlue={false}
            />

            <p className="signUp__pTag">or</p>

            <Button
              disable={loading}
              text={loading ? "Loading..." : "Login Using Google"}
              isBlue={true}
              onClick={signInWithGoogle}
            />

            <p
              className="signUp__pTag"
              onClick={() => {
                setLoginForm(!loginForm);
              }}
              style={{ cursor: "pointer" }}
            >
              Or Don't Have An Account? Click Here.
            </p>
          </form>
        </>
      ) : (
        <>
          <p>
            Sign Up on <span>Financely</span>
          </p>
          <form className="form__wrapper">
            <Input
              label={"Full Name"}
              placeholder={"John Doe"}
              type={"text"}
              state={name}
              setState={setName}
            />

            <Input
              label={"Email"}
              placeholder={"JohnDoe@gmail.com"}
              type={"email"}
              state={email}
              setState={setEmail}
            />

            <Input
              label={"Password"}
              placeholder={"Example@123"}
              type={"password"}
              state={password}
              setState={setPassword}
            />
            <Input
              label={"Confirm Password"}
              placeholder={"Example@123"}
              type={"password"}
              state={confirmPassword}
              setState={setConfirmPassword}
            />

            <Button
              disable={loading}
              onClick={signUpWithEmail}
              text={loading ? "Loading..." : "Signup Using Email and Password"}
              isBlue={false}
            />

            <p className="signUp__pTag">or</p>

            <Button
              disable={loading}
              text={loading ? "Loading..." : "Signup Using Google"}
              isBlue={true}
              onClick={signInWithGoogle}
            />

            <p
              className="signUp__pTag"
              onClick={() => {
                setLoginForm(!loginForm);
              }}
              style={{ cursor: "pointer" }}
            >
              Or Have An Account Already? Click Here
            </p>
          </form>
        </>
      )}
    </div>
  );
};

export default SignUpSignIn;