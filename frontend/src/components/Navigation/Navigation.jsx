import React from "react";
import avatar from "../../img/avatar.png";
import { menuItems } from "../../utils/menuItems";
import { useGlobalContext } from "../../context/globalContext";

function Navigation({ active, setActive }) {
  const { totalBalance } = useGlobalContext();
  return (
    <nav className="p-8 w-[300px] h-full bg-[#1f2937] border-[1.5px] border-white backdrop-blur-md rounded-2xl flex flex-col justify-between gap-8">
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt=""
          className="w-[4rem] h-[4rem] rounded-full object-cover bg-[#fcf6f9] border-2 border-white p-1 shadow-md"
        />
        <div className="text">
          <h2 className="text-[#fff] text-2xl">Anshul</h2>
          <p className="text-[#fff]">₹ {totalBalance()}</p>
        </div>
      </div>

      <ul className="flex-1 flex flex-col">
        {menuItems.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`grid grid-cols-[40px_auto] items-center mb-2.5 font-medium cursor-pointer pl-4 relative transition-all duration-300 ${
                active === item.id
                  ? 'text-[#fff] before:content-[""] before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-[#fff] before:rounded-r-lg'
                  : "text-[#fff]"
              }`}
            >
              <span
                className={`text-xl transition-all duration-300 ${
                  active === item.id ? "text-[#fff]" : "text-[#fff]"
                }`}
              >
                {item.icon}
              </span>
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navigation;
