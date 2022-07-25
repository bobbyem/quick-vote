import React from "react";
import logo from "../assets/img/qv-logo-v4.png";
function Logo() {
  return (
    <img
      src={logo}
      className="h-3rem w-3rem logo fadeinright animation-duration-1000"
      alt="logo"
    />
  );
}

export default Logo;
