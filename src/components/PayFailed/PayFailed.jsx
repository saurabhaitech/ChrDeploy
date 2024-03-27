import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import PayFail from "../../assets/PayFail.png";
import { CgSpinner } from "react-icons/cg";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { MdPending } from "react-icons/md";
import axios from "axios";
import { setChrData } from "../../store/slices/chrDataSlice";
import {
  chrDataReceived,
  loginUser,
  setUserDetails,
} from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/baseUrl";
import { closeModal } from "../../store/slices/modalSlice";

const PayFailed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const mobile = localStorage.getItem("mobile");
  const order_id = localStorage.getItem("order");
  const auth_token = localStorage.getItem("authToken");
  const [payStatus, setPayStatus] = useState("wait");
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    if (payStatus === "wait") {
      checkPaymentStatus();
    }

    if (payStatus === "pending") {
      const timer = setInterval(() => {
        checkPaymentStatus();
        setTimeLeft(15);
      }, 15000);

      const countdown = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
        clearInterval(countdown);
      };
    }
  }, [payStatus]);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (
      payStatus === "success" &&
      userData.isLoggedIn &&
      userData.isUserData &&
      userData.isChrData
    ) {
      dispatch(closeModal());
      navigate("/reportdashboard");
      console.log(
        userData.isLoggedIn,
        userData.isChrData,
        userData.isUserData,
        payStatus
      );
    }
  }, [userData.isLoggedIn, userData.isChrData, userData.isUserData, payStatus]);

  const checkPaymentStatus = async () => {
    // Make API call to check payment status
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/v3/getpaymentstatus?order_id=${order_id}`,
      headers: {
        auth_token: auth_token,
      },
    };

    try {
      console.log("Api is hit");
      axios
        .request(config)
        .then((response) => {
          console.log(response.data);
          if (response.data.status === true) {
            if (response.data.results.payment_status === 1) {
              setPayStatus("success");
            } else if (response.data.results.payment_status === 2) {
              setPayStatus("pending");
            } else if (response.data.results.payment_status === 3) {
              setPayStatus("failed");
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Error checking payment status:", error);
    }
  };

  const getUserData = () => {
    if (userData.isLoggedIn && userData.isUserData && userData.isChrData) {
      console.log("Data already saved");
      return;
    }

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://devapi.stashfin.com/v3/onboarding/getuserchrdetails?refresh_report=false`,
      headers: {
        auth_token: auth_token,
        "Content-Type": "application/json",
      },
    };

    try {
      axios
        .request(config)
        .then((response) => {
          dispatch(setChrData(response.data));
          if (response.data.results.credit_report_data) {
            dispatch(chrDataReceived());
          }
          const { dob, name, pan_number, pin_code } =
            response.data.results.user_data[0];
          dispatch(setUserDetails({ dob, name, pan_number, pin_code }));
          dispatch(loginUser({ auth_token, phoneNumber: mobile }));
          console.log("user data saved");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const buttonHandler = () => {
    if (payStatus === "failed") {
      dispatch(closeModal());
      navigate("/selectplan");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 h-[250px]">
      <div className="">
        {payStatus === "wait" && (
          <CgSpinner className="animate-spin text-primary" size={40} />
        )}
        {payStatus === "success" && (
          <IoCheckmarkCircleSharp className="text-[#77CC9D]" size={40} />
        )}
        {payStatus === "failed" && <img src={PayFail} />}
        {payStatus === "pending" && (
          <MdPending className="text-[#FCCE5B]" size={40} />
        )}
      </div>
      <p className="text-[20px] font-semibold">
        {payStatus === "wait" && "Checking Payment Status..."}
        {payStatus === "success" && "Payment Successful"}
        {payStatus === "failed" && "Payment Failed"}
        {payStatus === "pending" && "Payment Pending"}
      </p>
      <p className="text-xs text-neutral05 text-center text-balance">
        {payStatus === "wait" &&
          "Please wait, we are checking your payment status."}
        {payStatus === "success" &&
          "Payment is successful. You will be redirected to you credit report page shortly."}
        {payStatus === "failed" &&
          "Please try again. If any amount is debited, we will process a refund within 7 business days."}
        {payStatus === "pending" &&
          "Payment is pending. Please wait until it has been fully captured or finalized."}
      </p>
      <div className="mt-6">
        {payStatus !== "wait" && (
          <button
            className="flex items-center justify-center bg-primary text-white px-[48px] py-[10px] text-xs rounded-[8px] font-medium"
            onClick={buttonHandler}
          >
            {payStatus === "success" && (
              <CgSpinner className="animate-spin text-white mr-2" size={20} />
            )}
            {payStatus === "success" && "Redirecting"}
            {payStatus === "failed" && "Retry"}
            {payStatus === "pending" && `Rechecking in ${timeLeft} sec`}
          </button>
        )}
      </div>
    </div>
  );
};

export default PayFailed;
