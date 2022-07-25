import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

function Header() {
  const navigate = useNavigate();
  return (
    <div
      className="pl-2 flex gap-4 text-center align-items-center cursor-pointer min-w-full bg-pink-200 text-white text-sm"
      onClick={() => {
        navigate("/");
      }}
    >
      <h1 className="display fadeinleft animation-duration-1000">QUICK VOTE</h1>
      <Logo />
    </div>
  );
}

export default Header;
