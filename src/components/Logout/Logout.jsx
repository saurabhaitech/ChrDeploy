import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };
  return (
    <div className=" p-10 ">
      <button
        onClick={handleLogout}
        className="flex gap-2  w-full items-center justify-center text-secondary"
      >
        <IoIosLogOut size={24} />
        <p className="text-[11px] leading-[14px] font-medium">Logout</p>
      </button>
    </div>
  );
};

export default Logout;
