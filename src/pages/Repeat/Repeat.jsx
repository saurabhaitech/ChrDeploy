import React, { useState } from "react";
import RepeatImg from "../../assets/RepeatNotify.png";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar/Navbar";
import { TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/slices/userSlice";
import { clearChrData } from "../../store/slices/chrDataSlice";
import { BASE_URL } from "../../utils/baseUrl";
import axios from "axios";
import { openModal } from "../../store/slices/modalSlice";
import { CgSpinner } from "react-icons/cg";
const Repeat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    dispatch(logoutUser());
    dispatch(clearChrData());
    navigate("/");
  };

  const getAdvancedPlanDetails = async () => {
    const feature = "chr";
    try {
      const res = await axios.get(`${BASE_URL}/v3/getplans`, {
        headers: {
          "Content-type": "application/json",
        },
        params: {
          feature: feature,
        },
      });
      return res.data.results.plans.filter(
        (plan) => plan.product_type === "Advanced"
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleAdvancePlan = async () => {
    const authToken = localStorage.getItem("authToken");
    console.log("userData.isLoggedIn", !!userData.isLoggedIn);
    if (!userData.isLoggedIn) {
      dispatch(openModal("mobile"));
      return;
    }
    setLoading(true);
    try {
      const planItem = await getAdvancedPlanDetails();
      const res = await axios.get(`${BASE_URL}/v3/getpaymentlink`, {
        headers: {
          "Content-Type": "application/json",
          auth_token: authToken,
        },
        params: {
          feature: "chr",
          product_id: planItem[0].id,
        },
      });
      const { order_id, redirect_url } = res.data.results;
      localStorage.setItem("order", order_id);
      window.location.href = redirect_url;
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  return (
    <div className="w-screen h-[90vh] min-h-[700px] md:min-h-[90vh] bg-secondary02 flex flex-col justify-center mt-[10vh]">
      <Navbar />
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
                <button
                  disabled={loading}
                  onClick={handleAdvancePlan}
                  className="bg-primary rounded-[8px] p-3 text-center text-white text-xs font-semibold"
                >
                  Get Credit Report (Advanced) at ₹200{" "}
                  {loading && (
                    <CgSpinner className="animate-spin inline-block h-5 w-5 ml-2" />
                  )}
                </button>
              </div>
              <button
                onClick={() => navigate("/selectplan")}
                className="w-full bg-white rounded-[8px] p-3 text-center text-primary border-2 border-primary text-xs font-semibold"
              >
                Get Basic Report Only
              </button>
            </div>
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

export default Repeat;
