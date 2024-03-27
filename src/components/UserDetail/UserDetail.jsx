import React, { useEffect, useState } from "react";
import styles from "./UserDetail.module.css";
import { CgSpinner } from "react-icons/cg";
import axios from "axios";

import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/baseUrl";
import { useNavigate } from "react-router-dom";
const UserDetail = () => {
  const userData = useSelector((state) => state.user);
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("this is the error");
  const [formData, setFormData] = useState({
    name: "",
    pin_code: "",
    pan_number: "",
    dob: "",
  });
  const [notificationsAgree, setNotificationAgree] = useState(false);
  const [termsAgree, setTermsAgree] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const panRegex = /^[A-Za-z0-9]*$/;
    var { name, value } = e.target;
    if (name === "pan_number") {
      if (/^[A-Za-z0-9]*$/.test(value)) {
        value = value.toUpperCase();
      } else {
        return;
      }
    }
    if (name === "pin_code") {
      value = value.slice(0, 6);
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validHandler = () => {
    if (
      !notificationsAgree ||
      !termsAgree ||
      formData.name.length < 2 ||
      formData.pin_code.length !== 6 ||
      formData.pan_number.length !== 10 ||
      formData.dob.length !== 10
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  useEffect(() => {
    validHandler();
  }, [
    termsAgree,
    notificationsAgree,
    formData.pan_number,
    formData.pin_code,
    formData.dob,
    formData.name,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!isValid) {
      if (formData.name.length < 2) {
        setErrorMsg("Name must be greater than 2 chars.");
        setIsError(true);
        return;
      } else if (formData.pin_code.length !== 6) {
        setErrorMsg("Enter a valid pincode");
        setIsError(true);
        return;
      } else if (!notificationsAgree || !termsAgree) {
        setErrorMsg("Please check both the checkboxes");
        setIsError(true);
        return;
      }
    }

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.pan_number)) {
      setErrorMsg("Invalid PAN number (Valid: 'AAAA1234A')");
      setIsError(true);
      return;
    }

    setIsLoading(true);
    //api request

    let data = JSON.stringify(formData);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/v3/onboarding/saveuserdetail`,
      headers: {
        "Content-Type": "application/json",
        auth_token: userData.auth_token,
      },
      data: data,
    };

    try {
      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setIsLoading(false);
          if (response.data.status === true) {
            navigate("/selectplan");
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className={`${styles.UserDetail_wrap} w-full flex flex-col gap-6`}>
      <div className="mx-6 mt-2 text-xl font-bold text-center">
        Enter basic details to get your report
      </div>
      <p className="-my-4 w-full text-center text-sm font-medium text-primary">
        {isError && errorMsg}
      </p>
      <form onSubmit={submitHandler} className="w-full flex flex-col gap-2">
        <div
          className={`flex flex-col gap-6 ${
            isValid ? "text-black" : "text-neutral06"
          }`}
        >
          <div className="w-full h-[52px]  border-neutral10 rounded-[10px] border-2 flex flex-col justify-center">
            <input
              className={`text-sm font-medium mx-4 `}
              style={{ outline: "none", border: "none" }}
              value={formData.name}
              onChange={handleChange}
              onBlur={validHandler}
              placeholder="Name (as per PAN)"
              name="name"
              type="text"
              maxLength={30}
              minLength={2}
              required
            />
          </div>
          <div className="w-full h-[52px] border-neutral10 rounded-[10px] border-2 flex flex-col justify-center">
            <input
              className="text-sm font-medium mx-4"
              style={{ outline: "none", border: "none" }}
              value={formData.dob}
              onChange={handleChange}
              onBlur={validHandler}
              placeholder="Date of Birth"
              name="dob"
              type="date"
              required
            />
          </div>
          <div className="w-full h-[52px] border-neutral10 rounded-[10px] border-2 flex flex-col justify-center">
            <input
              className="text-sm font-medium mx-4"
              style={{ outline: "none", border: "none" }}
              value={formData.pin_code}
              onChange={handleChange}
              onBlur={validHandler}
              placeholder="Pincode"
              name="pin_code"
              type="number"
              maxLength={6}
              minLength={6}
              required
            />
          </div>
          <div className="w-full h-[52px] border-neutral10 rounded-[10px] border-2 flex flex-col justify-center">
            <input
              className="text-sm font-medium mx-4"
              style={{ outline: "none", border: "none" }}
              value={formData.pan_number}
              onChange={handleChange}
              onBlur={validHandler}
              placeholder="PAN Number"
              name="pan_number"
              type="text"
              maxLength={10}
              minLength={10}
            />
          </div>
        </div>
        <div className="text-[10px] font-medium flex flex-col gap-2">
          <div
            className="flex flex-row items-center cursor-pointer"
            onClick={() => {
              setNotificationAgree(!notificationsAgree);
            }}
          >
            {notificationsAgree ? (
              <MdOutlineCheckBox
                size={16}
                className="w-[20px] mr-1 text-primary"
              />
            ) : (
              <MdOutlineCheckBoxOutlineBlank
                size={16}
                className="w-[20px] mr-1"
              />
            )}
            <span className="w-[85%]">
              Receive offers & notifications on Whatsapp
            </span>
          </div>
          <div
            className="flex flex-row items-center cursor-pointer"
            onClick={() => {
              setTermsAgree(!termsAgree);
            }}
          >
            {termsAgree ? (
              <MdOutlineCheckBox
                size={16}
                className="w-[20px] mr-1 text-primary"
              />
            ) : (
              <MdOutlineCheckBoxOutlineBlank
                size={16}
                className="w-[20px] mr-1"
              />
            )}
            <span className="w-[85%]">
              I have read and agreed to User Consent for TUCIBIL's CIR and CKYC
            </span>
          </div>
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className={`${
            isValid ? "bg-primary" : "bg-disabled"
          } flex flex-row item-center justify-center text-white py-3 text-sm mt-6 mb-1 rounded-[8px]`}
        >
          {isLoading ? (
            <CgSpinner className="animate-spin" size={20} />
          ) : (
            <span className="">Continue</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default UserDetail;
