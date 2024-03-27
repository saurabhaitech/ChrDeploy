import React from "react";
import RepeatImg from "../../assets/RepeatNotify.png";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar/Navbar";
import { TbLogout } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/slices/userSlice";
import { clearChrData } from "../../store/slices/chrDataSlice";

const Repeat = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    dispatch(logoutUser());
    dispatch(clearChrData());
    navigate("/");
  };

  return (
    <div className="w-screen h-[90vh] min-h-[700px] md:min-h-[90vh] bg-disabled flex flex-col justify-center mt-[10vh]">
      <Navbar/>
      <div className="flex flex-col justify-center items-center bg-white rounded-[16px] w-[90%] mx-auto md:w-[60%] h-[95%] max-h-[650px]">
        <div className="flex flex-col justify-evenly h-[100%] py-4 md:py-6 justify-center items-center w-[100%] w-max-[375px]">
          <div className="flex flex-col items-center gap-1">
            <p className="text-3xl font-bold">Hey Sumit!</p>
            <span className="text-sm font-medium text-neutral05">
              We have new updates for you
            </span>
          </div>
          <div className="w-[186px]">
            <img src={RepeatImg} alt="Notification Img" />
          </div>
          <div className="px-3">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3 p-4 rounded-[12px] bg-tipsbg">
                <div className="flex flex-row justify-start text-xs font-medium gap-1">
                  <FaCheckCircle
                    className="mt-[2px] text-[#43B438]"
                    size={12}
                  />
                  <p className="w-[95%]">
                    Get <span className="font-bold">expert advice</span> for
                    score improvement
                  </p>
                </div>
                <div className="flex flex-row justify-start text-xs font-medium gap-1">
                  <FaCheckCircle
                    className="mt-[2px] text-[#43B438]"
                    size={12}
                  />
                  <p className="">
                    Understand what's affecting your{" "}
                    <span className="font-bold">CIBIL score</span>
                  </p>
                </div>
                <div className="flex flex-row justify-start text-xs font-medium gap-1">
                  <FaCheckCircle
                    className="mt-[2px] text-[#43B438]"
                    size={12}
                  />
                  <p className="w-[95%]">
                    Get <span className="font-bold">detailed insights</span> on
                    credit performance
                  </p>
                </div>
                <button className="bg-primary rounded-[8px] p-3 text-center text-white text-xs font-semibold">
                  Get Credit Report (Advanced) at ₹200
                </button>
              </div>
              <button onClick={() => navigate('/?scrollToUserPlan=true')} className="w-full bg-white rounded-[8px] p-3 text-center text-primary border-2 border-primary text-xs font-semibold">
                Get Basic Report Only
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="md:absolute md:top-[15vh] md:right-[12%] mx-auto md:mx-0 mt-[5%] md:mt-0">
        <button onClick={handleLogout} className="flex items-center text-sm font-medium">
          <TbLogout size={18} className="mr-1" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Repeat;
