import React, { useEffect } from 'react';
import './Header.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import userSvg from '../../assets/userSvg.svg';


const Header = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  function logOut(){
    // const result = signOut(auth)
    //   try{
    //     toast.success("Logged out successfully");
    //     navigate("/")
    //   }
    //   catch(error) {
    //     // An error happened.
    //     toast.error(error.message);
    //     console.log("Logout failed", error);
    //   };
    auth.signOut();
    navigate("/");
    toast.success("Logged out successfully");
  }
  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  return (
    <nav className="navbar">
      <p className="navbar__logo">Financely</p>
      {user && (
        <div 
          className="logout__wrapper" 
          onClick={logOut}
        >
          <img
            src={user.photoURL ? user.photoURL : userSvg}
            width={user.photoURL ? "32" : "24"}
            style={{ borderRadius: "50%" }}
          />
          <p className="navbar__logout">Logout</p>
        </div>
      )}
    </nav>
  );
}

export default Header