import React from "react";
import Navbar from "../../components/common/Navbar/Navbar.jsx";
import ntcImg from "../../assets/ntcImg.png";
import ntcBanner from "../../assets/ntcBanner.png";
import ntcBannerLg from "../../assets/ntcBannerLg.png";
import { TbLogout } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/slices/userSlice.jsx";
import { clearChrData } from "../../store/slices/chrDataSlice.jsx";

const Ntc = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    dispatch(logoutUser());
    dispatch(clearChrData());
    navigate("/");
  };

  return (
    <div className="w-screen h-[90vh] min-h-[550px] md:min-h-[90vh] bg-secondary02 flex flex-col mt-[10vh]">
      <Navbar />
      <div className="flex flex-col justify-center items-center bg-white rounded-[16px] mt-8 w-[90%] mx-auto md:w-[60%] h-[85%] md:h-[90%]">
        <div className="flex flex-col gap-[15%] md:gap-[15%] justify-end h-[100%]  items-center w-[100%] p-4 md:p-6">
          <div className="flex flex-col justify-between gap-4 items-center h-[50%] md:h-[65%] md:w-[326px]">
            <div className="text-center flex flex-col justify-center items-center gap-4">
              <img src={ntcImg} alt="" />
              <p className="font-semibold text-[20px] text-danger">Oops!</p>
              <p className="text-center font-normal text-neutral02 text-[11px] leading-[18px] w-[300px]">
                Based on the information you provided during enrollment, we
                could not locate your credit data in the CIBIL records
              </p>
            </div>
            <div className="bg-lightBlue py-[8px] px-[10px] md:px-[18px] rounded-[8px]">
              <p className="text-[11px] font-medium text-[#02006B]">
                Your refund will be initiated within 7 business days.
              </p>
            </div>
          </div>
          <div className="w-[100%]">
            <img className="md:hidden w-full" src={ntcBanner} />
            <img className="hidden md:flex w-full" src={ntcBannerLg} />
          </div>
        </div>
      </div>
      <div className="md:absolute md:top-[15vh] md:right-[12%] mx-auto md:mx-0 mt-[5%] md:mt-0">
        <button
          onClick={handleLogout}
          className="flex items-center text-sm font-medium"
        >
          <TbLogout size={18} className="mr-1 text-secondary" />
          <span className="text-secondary font-medium"> Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Ntc;
