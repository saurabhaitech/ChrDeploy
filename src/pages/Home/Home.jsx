import React, { useEffect, useRef, useState } from "react";
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer/Footer";
import UserPlans from "../../components/UserPlans/UserPlans";
import Faq from "../../components/Faq/Faq";
import Modal from "../../components/common/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../../store/slices/modalSlice";
import { BASE_URL } from "../../utils/baseUrl";
import axios from "axios";
import OtpInput from "react-otp-input";
import UserDetail from "../../components/UserDetail/UserDetail";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar/Navbar";
import CryptoJS from "crypto-js";
import PayFailed from "../../components/PayFailed/PayFailed";
import { CgSpinner } from "react-icons/cg";
import {
  chrDataReceived,
  loginUser,
  logoutUser,
  setUserDetails,
} from "../../store/slices/userSlice";
import { setChrData } from "../../store/slices/chrDataSlice";

const OtpModal = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(() =>
    localStorage.getItem("mobile")
  );
  const [resendTimeout, setResendTimeout] = useState(30);
  const dispatch = useDispatch();
  const handleOtpSubmit = () => {
    setLoading(true);
    if (otp.length < 4) {
      setLoading(false);
      return setError("Enter 4 digit OTP");
    }

    const requestBody = {
      phone: parseInt(phoneNumber, 10),
      otp: parseInt(otp, 10),
      register: 1,
      utm_source: "Credit_Report",
    };

    axios
      .post(`${BASE_URL}/magneto/auth/login`, requestBody, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        console.log("checkr", res.data.success);
        if (res.data.success === true) {
          localStorage.setItem("authToken", res.data.data.access_token);
          dispatch(
            loginUser({ auth_token: res.data.data.access_token, phoneNumber })
          );
          dispatch(openModal("spinnerModal"));
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Incorrect OTP");
        setLoading(false);
      });
  };

  const handleResend = () => {
    const requestBody = {
      phone: parseInt(phoneNumber, 10),
      register: 1,
    };

    axios
      .post(`${BASE_URL}/magneto/auth/request-otp`, requestBody, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          console.log("OTP Resent");
          setResendTimeout(30);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let timer;
    if (resendTimeout > 0) {
      timer = setInterval(() => {
        setResendTimeout((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [resendTimeout]);
  return (
    <>
      <div className="items-center flex flex-col justify-between h-[287px] md:h-[250px]">
        <div className="w-full gap-5 flex flex-col items-center">
          <p className="font-bold leading-[30px] text-[18px]">
            OTP Verification
          </p>
          <p className="font-medium leading-5 text-[14px] text-dark/50">
            OTP has been sent to +91 {phoneNumber}
          </p>
          <div className="w-full flex flex-col items-center justify-center">
            <OtpInput
              shouldAutoFocus={true}
              value={otp}
              onChange={(otpValue) => {
                setError("");
                setOtp(otpValue);
              }}
              numInputs={4}
              otpType="number"
              renderSeparator={<span> </span>}
              renderInput={(props) => <input {...props} />}
              inputStyle={{
                border: "1px solid #474747",
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                marginRight: "10px",
                fontSize: "24px",
                fontWeight: "500",
              }}
              inputType="number"
            />
            {error.length > 0 && (
              <p className="text-primary font-medium">{error}</p>
            )}
          </div>
        </div>
        <div className="w-full text-center">
          {resendTimeout === 0 ? (
            <button
              disabled={loading}
              onClick={handleResend}
              className={`text-primary w-[90%] pb-4 h-[48px] rounded-lg `}
            >
              Resend Code
            </button>
          ) : (
            <div className="flex items-center justify-center gap-[5px] pb-4 w-full text-sm font-medium">Resend code in <p className="text-secondary w-[40px]">{resendTimeout < 10 ? "00:0"+resendTimeout : "00:"+resendTimeout}</p></div>
          )}
          <button
            disabled={loading}
            onClick={handleOtpSubmit}
            className={`text-light w-[98%] h-[48px] rounded-lg  ${
              otp.length < 4 ? "bg-neutral09" : "bg-primary"
            } `}
          >
            {loading ? (
              <>
                Verifying{" "}
                <CgSpinner className="animate-spin inline-block h-5 w-5 ml-2" />
              </>
            ) : (
              "Verify"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

const MobileModal = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handlePhoneSubmit = () => {
    setLoading(true);
    if (phoneNumber.length < 10) {
      setLoading(false);
      return setError("Please enter a 10 digit number");
    }

    const requestBody = {
      phone: parseInt(phoneNumber, 10),
      register: 1,
    };

    axios
      .post(`${BASE_URL}/magneto/auth/request-otp`, requestBody, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          console.log("OTP Received");
          dispatch(openModal("otp"));
          localStorage.setItem("mobile", phoneNumber);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    setError("");
  };
  return (
    <div className="items-center flex flex-col justify-between  h-[287px] md:h-[250px]">
      <div className="w-full gap-10 flex flex-col items-center">
        <p className="font-bold leading-[30px] text-[18px]">
          Enter your mobile number
        </p>
        <div className="w-full text-center">
          <input
            autoFocus={true}
            maxLength={10}
            value={phoneNumber}
            onChange={(e) => {
              setError("");
              setPhoneNumber(e.target.value);
            }}
            className="w-[98%] h-[52px] outline-none border rounded-xl p-[20px] border-neutral10"
            type="text"
            placeholder="Mobile Number"
          />
          {error.length > 0 && (
            <p className="text-primary font-medium">{error}</p>
          )}
        </div>
      </div>
      <div className="w-full text-center">
        <button
          disabled={loading}
          className={`text-light ${
            phoneNumber.length === 10 ? "bg-primary" : "bg-neutral09"
          }  w-[98%] h-[48px] rounded-lg`}
          onClick={handlePhoneSubmit}
        >
          {loading ? (
            <>
              Sending OTP{" "}
              <CgSpinner className="animate-spin inline-block h-5 w-5 ml-2" />
            </>
          ) : (
            "Send OTP"
          )}
        </button>
      </div>
    </div>
  );
};

const SpinnerModal = ({ userPlanRef }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);

  const getUserData = () => {
    if (userData.isLoggedIn && userData.isUserData && userData.isChrData) {
      console.log("Data already saved");
      return;
    }
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/v3/onboarding/getuserchrdetails?refresh_report=false`,
      headers: {
        auth_token: userData.auth_token,
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
          const { credit_report_data } = response.data.results;
          const { dob, name, pan_number, pin_code } =
            response.data.results.user_data[0];

          if (
            dob !== null &&
            pan_number !== null &&
            pin_code !== null &&
            name.length > 2
          ) {
            dispatch(setUserDetails({ name, dob, pan_number, pin_code }));
          }

          if (
            dob === null ||
            pan_number === null ||
            pin_code === null ||
            name.length <= 2
          ) {
            dispatch(openModal("userForm"));
          } else if (credit_report_data === null) {
            dispatch(closeModal());
            navigate("/selectplan");
          } else if (credit_report_data.user_state === "normal") {
            navigate("/reportdashboard");
          } else if (credit_report_data.user_state === "repeat") {
            navigate("/repeat");
          } else if (credit_report_data.user_state === "ntc") {
            navigate("/ntc-user");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[250px] gap-3">
      <CgSpinner className="animate-spin text-primary" size={54} />
      <p className="font-semibold text-[20px] leading-[26px]">
        Fetching User Details...
      </p>
      <p className="text-xs text-neutral05 text-center text-balance">
        Pleas wait, we are fetching your details
      </p>
    </div>
  );
};

const Home = () => {
  const mobile = localStorage.getItem("mobile");
  const auth_token = localStorage.getItem("authToken");
  const userPlanRef = useRef(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const queryParams = new URLSearchParams(location.search);
  const paymentRedirect = queryParams.get("paymentRedirect");
  const [loginLoad, setLoginLoad] = useState(false);

  useEffect(() => {
    dispatch(closeModal());
    const scrollToUserPlan = queryParams.get("scrollToUserPlan");
    if (scrollToUserPlan === "true" && userPlanRef.current) {
      window.scrollTo({
        top: userPlanRef.current.offsetTop - 70,
        behavior: 'smooth',
      });
    }
    if (paymentRedirect === "true") {
      dispatch(openModal("paymentCheck"));
    }
  }, []);

  useEffect(() => {
    const auth_token = localStorage.getItem("authToken");
    if (!!auth_token && paymentRedirect !== "true") {
      console.log("checking user data");
      getUserData();
    }
  }, []);

  const { isOpen, modalType } = useSelector((state) => state.modal);

  const onClose = () => {
    dispatch(closeModal());
  };

  const getUserData = () => {
    if (userData.isLoggedIn && userData.isUserData && userData.isChrData) {
      console.log("Data already saved");
      return;
    }
    setLoginLoad(true);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/v3/onboarding/getuserchrdetails?refresh_report=false`,
      headers: {
        auth_token: auth_token,
        "Content-Type": "application/json",
      },
    };

    try {
      axios
        .request(config)
        .then((response) => {
          console.log("data rece");
          dispatch(setChrData(response.data));
          dispatch(loginUser({ auth_token, phoneNumber: mobile }));
          if (response.data.results.credit_report_data) {
            dispatch(chrDataReceived());
          }
          const { credit_report_data } = response.data.results;
          const { dob, name, pan_number, pin_code } =
            response.data.results.user_data[0];
          if (
            dob !== null &&
            pan_number !== null &&
            pin_code !== null &&
            name.length > 2
          ) {
            dispatch(setUserDetails({ name, dob, pan_number, pin_code }));
          }

          if (
            dob === null ||
            pan_number === null ||
            pin_code === null ||
            name.length <= 2
          ) {
            dispatch(openModal("userForm"));
          }
          setLoginLoad(false);
        })
        .catch((error) => {
          console.log(error);
          setLoginLoad(false);
        });
    } catch (error) {
      console.log(error);
      setLoginLoad(false);
    }
  };

  return (
    <div className="bg-light  w-screen h-full pt-[10vh]">
      <Navbar />
      {/* <div className="bg-light px-4 md:px-24"> */}
      <div className="bg-light ">
        <Hero userPlanRef={userPlanRef} loginLoad={loginLoad}/>

        {isOpen && (
          <div>
            {modalType === "mobile" && (
              <Modal isOpen={isOpen} onClose={onClose}>
                <MobileModal />
              </Modal>
            )}
            {modalType === "otp" && (
              <Modal isOpen={isOpen} onClose={onClose}>
                <OtpModal />
              </Modal>
            )}
            {modalType === "userForm" && (
              <Modal isOpen={isOpen} onClose={onClose}>
                <UserDetail />
              </Modal>
            )}
            {modalType === "spinnerModal" && (
              <Modal isOpen={isOpen} onClose={onClose}>
                <SpinnerModal userPlanRef={userPlanRef} />
              </Modal>
            )}
            {modalType === "paymentCheck" && (
              <Modal isOpen={isOpen} onClose={onClose}>
                <PayFailed />
              </Modal>
            )}
          </div>
        )}
        <div ref={userPlanRef} className="px-0 md:px-10 xl:px-24">
          <UserPlans />
        </div>
        <Faq />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
