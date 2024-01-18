import React from 'react'
import Header from '../Header/Header'
import SignUpSignIn from '../SignUpSignIn/SignUpSignIn'


const Signup = () => {
  return (
    <div>
        <Header/>
        <div className="signInSignUp__wrapper">
            <SignUpSignIn />
        </div>
        
    </div>
  )
}

export default Signup