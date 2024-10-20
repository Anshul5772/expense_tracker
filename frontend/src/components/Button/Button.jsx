import React from "react";

function Button({ name, icon, onClick, bg, bPad, color, bRad }) {
  return (
    <button
      className={`${bg} ${bPad} ${color} ${bRad} flex items-center gap-2 transition-all duration-400 ease-in-out cursor-pointer`}
      onClick={onClick}
    >
      {icon}
      {name}
    </button>
  );
}

export default Button;
