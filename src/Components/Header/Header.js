import React, { useEffect, useState } from 'react';
import './Header.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import userSvg from '../../assets/userSvg.svg';
import theme from '../../assets/theme.png';

const Header = ({setThemeColor }) => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [themeOpen, setThemeOpen] = useState(false);
  // const [themeColor, setThemeColor] = useState("#2970ff");
  const [customThemeColor, setCustomThemeColor] = useState("");

  function logOut() {
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

  const changeTheme = (color) => {
    setThemeColor(color);
    document.documentElement.style.setProperty("--theme", color);
  };

  return (
    <nav className="navbar">
      <p className="navbar__logo">Financely</p>
      <div className="navbar__rightwrapper">
        {user && (
          <div className="logout__wrapper" onClick={logOut}>
            <img
              src={user.photoURL ? user.photoURL : userSvg}
              width={user.photoURL ? "32" : "24"}
              style={{ borderRadius: "50%" }}
            />
            <p className="navbar__logout">Logout</p>
          </div>
        )}
        <img
          src={theme}
          alt="theme-icon"
          onClick={() => {
            setThemeOpen(!themeOpen);
          }}
        />
        {themeOpen && (
          <div className="color__switcher">
            {/* Add your theme buttons here */}
            <div
              className="color-option"
              style={{ backgroundColor: "#e83e8c" }}
              onClick={() => changeTheme("#e83e8c")}
            ></div>

            <div
              className="color-option"
              style={{ backgroundColor: "#20bf6b" }}
              onClick={() => changeTheme("#20bf6b")}
            ></div>
            <div
              className="color-option"
              style={{ backgroundColor: "#6842ef" }}
              onClick={() => changeTheme("#6842ef")}
            ></div>
            <div
              className="color-option"
              style={{ backgroundColor: "tomato" }}
              onClick={() => changeTheme("tomato")}
            ></div>
            <div
              className="color-option"
              style={{ backgroundColor: "#2970ff" }}
              onClick={() => changeTheme("#2970ff")}
            ></div>
            <input
              type="color"
              value={customThemeColor}
              onInput={(e) => {
                setCustomThemeColor(e.target.value);
                changeTheme(customThemeColor);
              }}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header