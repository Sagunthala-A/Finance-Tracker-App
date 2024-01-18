import React,{useEffect, useState} from 'react';
import './SignUpSignIn.css'
import Input from '../Input/Input';
import Button from '../Button/Button';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../firebase';

const SignUpSignIn = () => {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setconfirmPassword] = useState('');
    const [loading,setLoading] = useState(false);

    function signUpWithEmail(){
        
        setLoading(true)

        if(name!="" && email!="" && password!="" && confirmPassword !=""){
            if(password === confirmPassword ){
                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                toast.success("User created successfully")
                // ...
                setLoading(false)
                setName('')
                setEmail('');
                setPassword('');
                setconfirmPassword('');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.error(errorMessage)
                    setLoading(false)
                    // ..
                });
            }else{
                toast.error('Password and Confirm Password must be the same')
                setLoading(false)
            }
        }else{
            toast.error('All fields are mandatory')
            setLoading(false)
        }
    }

  return (
    <div className='signUp__wrapper'>
        <p>Sign Up on <span>Financely</span></p>
        <form className='form__wrapper'>
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
                setState={setconfirmPassword}
            />

            <Button
                disable={loading}
                onClick ={signUpWithEmail}
                text={loading? "Loading..." :"Signup Using Email and Password"}
                isBlue={false}
            />

            <p style={{textAlign:"center",fontSize:"1.2rem",fontWeight:"400"}}>or</p>

            <Button
                disable={loading}
                text={loading? "Loading..." : "Signup Using Google"}
                isBlue={true}
            />
        </form>

    </div>
  )
}

export default SignUpSignIn