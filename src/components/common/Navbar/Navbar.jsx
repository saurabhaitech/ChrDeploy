import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import logo from "../../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const Links = [
  {
    linkName: "Apply Now",
    linkPath: "/",
  },
  {
    linkName: "Make a Payment",
    linkPath: "/",
  },
  {
    linkName: "Calculate EMI",
    linkPath: "/",
  },
  {
    linkName: "About Us",
    linkPath: "/",
  },
  {
    linkName: "Meet Our Founders",
    linkPath: "/",
  },
];

const Navbar = () => {
  // const navigate = useNavigate();
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // useEffect(() => {
  //   if (!isDrawerOpen) {
  //     document
  //       .getElementById(`drawer`)
  //       .classList.replace("h-[90vh]", "h-[0vh]");
  //   } else {
  //     document
  //       .getElementById(`drawer`)
  //       .classList.replace("h-[0vh]", "h-[90vh]");
  //   }
  // }, [isDrawerOpen]);

  // const drawerhandler = () => {
  //   setIsDrawerOpen(!isDrawerOpen);
  // };

  return (
    <div className="select-none w-screen fixed top-0 left-0 right-0 h-[10vh] z-50">
      <div className="bg-white flex flex-row px-10 justify-between items-center w-full h-full">
        <div onClick={() => navigate("/")} className="cursor-pointer flex flex-row justify-center items-center">
          <img src={logo} />
        </div>
        {/* <div className="hidden md:flex flex-row gap-4 justify-center items-center">
          <div
            className="text-sm font-bold text-secondary cursor-pointer hover:underline transition-all  duration-500 hover:text-base"
            onClick={() => {
              navigate("/");
            }}
          >
            Apply Now
          </div>
          <div
            className="text-sm font-bold text-secondary cursor-pointer hover:underline transition-all  duration-500 hover:text-base"
            onClick={() => {
              navigate("/");
            }}
          >
            Make a Payment
          </div>
          <div
            className="text-sm font-bold text-secondary cursor-pointer hover:underline transition-all  duration-500 hover:text-base"
            onClick={() => {
              navigate("/");
            }}
          >
            Calculate EMI
          </div>
          <div
            className="text-sm font-bold text-secondary cursor-pointer hover:underline transition-all  duration-500 hover:text-base"
            onClick={() => {
              navigate("/");
            }}
          >
            About Us
          </div>
          <div
            className="text-sm font-bold text-secondary cursor-pointer hover:underline transition-all  duration-500 hover:text-base"
            onClick={() => {
              navigate("/");
            }}
          >
            Meet Our Founders
          </div>
        </div> */}
        {/* <div className="h-[80%] hidden md:flex">
          <button className="border-2 rounded-[30px] border-secondary h-full px-8 text-sm font-bold text-secondary">
            Get Stashfin app
          </button>
        </div> */}
        {/* <div className="md:hidden transition-all duration-500">
          {isDrawerOpen ? (
            <IoClose size={30} onClick={drawerhandler} />
          ) : (
            <IoMdMenu size={30} onClick={drawerhandler} />
          )}
        </div> */}
      </div>
      {/* <div
        id="drawer"
        className="md:hidden w-screen z-[10px] fixed top-[10vh] left-0 right-0 h-[0vh] transition-all duration-500 overflow-hidden"
      >
        <div className="flex flex-col gap-10 bg-white py-10 w-screen h-full border-t-2 border-secondary">
          <div className="flex flex-col gap-10 justify-center items-center">
            <div
              className="text-sm font-bold text-secondary cursor-pointer hover:underline transition-all  duration-500 hover:text-base"
              onClick={() => {
                navigate("/");
              }}
            >
              Apply Now
            </div>
            <div
              className="text-sm font-bold text-secondary cursor-pointer hover:underline transition-all  duration-500 hover:text-base"
              onClick={() => {
                navigate("/");
              }}
            >
              Make a Payment
            </div>
            <div
              className="text-sm font-bold text-secondary cursor-pointer hover:underline transition-all  duration-500 hover:text-base"
              onClick={() => {
                navigate("/");
              }}
            >
              Calculate EMI
            </div>
            <div
              className="text-sm font-bold text-secondary cursor-pointer hover:underline transition-all  duration-500 hover:text-base"
              onClick={() => {
                navigate("/");
              }}
            >
              About Us
            </div>
            <div
              className="text-sm font-bold text-secondary cursor-pointer hover:underline transition-all  duration-500 hover:text-base"
              onClick={() => {
                navigate("/");
              }}
            >
              Meet Our Founders
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <button className="border-2 rounded-[30px] border-secondary h-full py-3 px-10 text-sm font-bold text-secondary">
              Get Stashfin app
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Navbar;
