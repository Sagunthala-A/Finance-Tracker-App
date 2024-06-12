import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import SignUpSignIn from "../SignUpSignIn/SignUpSignIn";
import { ConfigProvider } from "antd";

const Signup = () => {
  const [themeColor, setThemeColor] = useState(
    localStorage.getItem("themeColorSignUp") ||
      getComputedStyle(document.documentElement).getPropertyValue("--theme") ||
      "#2970ff"
  );

  useEffect(() => {
    const color =
      localStorage.getItem("themeColorSignUp") ||
      getComputedStyle(document.documentElement).getPropertyValue("--theme") ||
      "#2970ff";
    setThemeColor(color);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--theme", themeColor);
    localStorage.setItem("themeColorSignUp", themeColor);
  }, [themeColor]);

  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: themeColor,
            borderRadius: 2,
          },
        }}
      >
        <Header setThemeColor={setThemeColor} />
        <div className="signInSignUp__wrapper">
          <SignUpSignIn />
        </div>
      </ConfigProvider>
    </div>
  );
};

export default Signup;
