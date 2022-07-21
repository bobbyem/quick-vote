import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <div
      className="text-center bg-blue-400 cursor-pointer"
      onClick={() => {
        navigate("/");
      }}
    >
      <h1>Quick Vote</h1>
    </div>
  );
}

export default Header;
