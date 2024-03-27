import React from "react";
import heroImg from "../../assets/heroImg.png";
import monthlyUpdatesImg from "../../assets/monthlyUpdatesImg.png";
import loanOfferImg from "../../assets/loanOfferImg.png";
import guidanceImg from "../../assets/guidanceImg.png";
import cibilImg from "../../assets/cibilImg.png";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/slices/modalSlice";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/slices/userSlice";
import { clearChrData } from "../../store/slices/chrDataSlice";

const Hero = ({ userPlanRef }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authToken = localStorage.getItem("authToken");
  const userData = useSelector((state) => state.user);
  const handleLogin = () => {
    if (userData.isLoggedIn) {
      if (userData.pan_number) {
        navigate("/reportdashboard");
      } else {
        dispatch(openModal("userForm"));
      }
    } else {
      dispatch(openModal("mobile"));
    }
  };
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    dispatch(logoutUser());
    dispatch(clearChrData());
  };
  return (
    <div className="w-full  px-4 md:px-10 xl:px-24 pb-10 md:pb-0  mt-10 mx-auto">
      <div className="flex justify-between">
        <div className="flex flex-col justify-around  md:h-[350px] xl:h-[450px]">
          <div>
            <h1 className="text-neutral01 text-[36px] leading-[39px] text-center mb-4 font-extrabold md:text-left md:text-5xl md:leading-[58px]">
              Check your CIBIL Score <span className="inline"> & Report</span>
            </h1>
            <p className="text-neutral03 text-sm leading-5 text-center font-medium md:text-left md:text-[16px]">
              Know your latest score instantly and monitor your financial health
            </p>
          </div>
          <div className="flex justify-center mt-10 md:mt-0 md:flex-col gap-6 md:gap-4 xl:gap-8">
            <button
              onClick={() =>
                userPlanRef.current.scrollIntoView({ behavior: "smooth" })
              }
              className="w-[150px] h-[48px] xl:w-[195px] xl:h-[60px] rounded-lg text-base leading-7 font-semibold bg-primary text-white"
            >
              Check Now
            </button>
            {!userData.isLoggedIn ? (
              <button
                onClick={handleLogin}
                className="w-[150px] h-[48px] xl:w-[195px] xl:h-[60px] border border-primary text-primary rounded-lg text-base leading-7 font-semibold"
              >
                Login
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="w-[150px] h-[48px] xl:w-[195px] xl:h-[60px] border border-primary text-primary rounded-lg text-base leading-7 font-semibold"
              >
                Logout
              </button>
            )}
          </div>
        </div>
        <div className="hidden md:block">
          <img
            className="lg:min-w-[500px] xl:min-w-[640px] xl:min-h-[453px]"
            src={heroImg}
            alt=""
          />
        </div>
      </div>
      <div
        style={{
          boxShadow:
            " 1px 5px 10px 2px rgba(0, 0, 0, 0.158), 0px 0px 0px 0px rgba(0, 0, 0, 0.034)",
        }}
        className="grid grid-cols-2 gap-4 px-10 justify-items-center p-5 rounded-xl mt-10 md:mt-20 md:grid-cols-7 md:max-w-[600px] xl:max-w-[750px] md:mx-auto"
      >
        <div className="flex flex-col gap-2 items-center">
          <img src={monthlyUpdatesImg} alt="" />
          <p className="text-center text-neutral01 font-medium text-[13px] leading-4">
            Monthly <span className="block"> Updates</span>
          </p>
        </div>
        <div className="hidden md:block h-[100px] border bg-dark/50"></div>
        <div className="flex flex-col gap-2 items-center">
          <img src={loanOfferImg} alt="" />
          <p className="text-center text-neutral01 font-medium text-[13px] leading-4">
            Customized <span className="block"> loan offers</span>
          </p>
        </div>
        <div className="hidden md:block h-[100px] border bg-dark/50"></div>
        <div className="flex flex-col gap-2 items-center">
          <img src={guidanceImg} alt="" />
          <p className="text-center min-w-[150px]  text-neutral01 font-medium text-[13px] leading-4">
            Personalized <span className="block">financial guidance</span>
          </p>
        </div>
        <div className="hidden md:block h-[100px] border bg-dark/50"></div>
        <div className="flex flex-col gap-2 items-center">
          <img src={cibilImg} alt="" />
          <p className="text-center min-w-[150px] text-neutral01 font-medium text-[13px] leading-4">
            No impact on <span className="block"> CIBIL Score</span>
          </p>
        </div>
      </div>
      <p className="md:hidden text-secondary font-bold text-[28px] leading-34 text-center mt-10">
        Our Plans
      </p>
    </div>
  );
};

export default Hero;
