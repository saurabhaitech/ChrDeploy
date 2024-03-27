import React, { useEffect, useState } from "react";
// import cibilLogo from "../../assets/CibilLogo.png";
import CIBLLogo from "../../assets/CIBLLogo.png";
import Navbar from "../../components/common/Navbar/Navbar";
import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";
import { IoCheckmark } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import Logout from "../../components/Logout/Logout";
import UserPlans from "../../components/UserPlans/UserPlans";
import { CgSpinner } from "react-icons/cg";

export const FeatureCards = ({ plansData }) => {
  const { products = [], features = [] } = plansData.results || {};
  let plans = [];
  if (plansData.results) {
    plans = [plansData.results.plans[0], plansData.results.plans[1]];
  }

  const getFeaturesList = (product) => {
    return product.feature_ids.map((featureId) =>
      features.find((featureItem) => featureItem.id === featureId)
    );
  };
  return (
    <>
      {plans.length > 0 &&
        plans.map((planItem) => (
          <React.Fragment key={planItem.id}>
            <div
              className={` h-[381px] w-[60px]   rounded-xl ${
                planItem.recommended === true
                  ? "bg-gradient-to-b from-[#151573] to-[#6E6EA9]"
                  : "bg-light"
              } `}
            >
              <div
                className={`flex flex-col gap-4 items-center ${
                  planItem.recommended === true ? "text-light" : "text-dark/40"
                }`}
              >
                <div className="text-center mt-4">
                  <p className="font-semibold leading-[13px] text-[10px]">
                    {planItem?.product_type}
                  </p>
                </div>
                <div className="flex flex-col gap-8">
                  {features.map((feature) => (
                    <div key={feature.id}>
                      <div>
                        {getFeaturesList(
                          products.find(
                            (product) => product.id === planItem.product_id
                          )
                        ).includes(feature) ? (
                          planItem.recommended === true ? (
                            <IoCheckmark color="white" />
                          ) : (
                            <IoCheckmark />
                          )
                        ) : planItem.recommended === true ? (
                          <IoCloseOutline color="white" />
                        ) : (
                          <IoCloseOutline />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
    </>
  );
};

export const PriceCards = ({ plansData, selectedPlan, setSelectedPlan }) => {
  const { plans = [] } = plansData.results || {};
  return (
    <div className="flex w-full justify-between text-center">
      {plans.length > 0 &&
        plans.map((planItem) => (
          <div
            key={planItem.id}
            className={`flex flex-col items-center justify-center relative ${
              planItem.id === selectedPlan.id ? "border-primary" : ""
            } w-[32%] h-[77px] px-1 border-2 rounded-lg`}
            onClick={() => setSelectedPlan(planItem)}
          >
            <div
              className={` ${
                planItem.id === selectedPlan.id ? "" : "hidden"
              } absolute top-[-10px] right-[-5px] z-40 bg-light p-[2px]`}
            >
              <FaCheckCircle color="AA013F" size={20} />
            </div>
            <div
              className={`absolute left-4  top-[-30px] ${
                planItem.recommended === true ? "block" : "hidden"
              } bg-[#01AA6C] px-2 py-1 rounded `}
            >
              <p className="triangle"></p>
              <p className="text-light font-medium text-[8px] leading-[10px]">
                Recommended
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[12px] font-semibold text-dark/60 leading-[12px]">
                {planItem.product_type}
              </p>

              <div className="">
                <span className="text-[14px] font-semibold leading-[21px]">
                  ₹{planItem.discounted_price}
                </span>{" "}
                <span className="text-[10px] text-dark/60 font-medium leading-[15px]">
                  /{planItem.duration_text}
                </span>
              </div>
            </div>
            <div className="flex justify-center w-full">
              {planItem.discount_text.length > 0 && (
                <div className="bg-[#ECD352] px-1 rounded py-1 w-[50%]">
                  <p className=" text-[8px] leading-[10px] font-semibold">
                    {planItem.discount_text}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

const SelectPlan = () => {
  const [plansData, setPlansData] = useState({});
  const [selectedPlan, setSelectedPlan] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const feature = "chr";
    axios
      .get(`${BASE_URL}/v3/getplans`, {
        headers: {
          "Content-type": "application/json",
        },
        params: {
          feature: feature,
        },
      })
      .then((res) => {
        setPlansData(res.data);
        setSelectedPlan(
          res.data.results.plans.find((item) => item.recommended === true)
        );
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const getPaymentLink = (planItem, authToken) => {
    axios
      .get(`${BASE_URL}/v3/getpaymentlink`, {
        headers: {
          "Content-Type": "application/json",
          auth_token: authToken,
        },
        params: {
          feature: "chr",
          product_id: planItem.id,
        },
      })
      .then((res) => {
        const { order_id, redirect_url } = res.data.results;
        localStorage.setItem("order", order_id);
        window.location.href = redirect_url;
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const { features = [] } = plansData.results || {};
  const handlePlanClick = (planItem) => {
    setLoading(true);
    const authToken = localStorage.getItem("authToken");
    if (authToken === null) {
      setLoading(false);
      dispatch(openModal("mobile"));
    } else {
      getPaymentLink(planItem, authToken);
    }
  };
  return (
    <>
      <div className="md:hidden">
        <div className=" pt-[10vh] px-4">
          <Navbar />
          <div className="mb-10 mt-4 flex flex-col gap-2">
            <IoChevronBack color="black" />
            <div className="flex justify-between items-center">
              <h1 className=" font-semibold text-[18px] leading-[26px] w-[150px]">
                CIBIL Report
              </h1>
              <div>
                <img className="min-w-[37px]" src={CIBLLogo} alt="" />
              </div>
            </div>
            <p className="font-normal text-[12px] leading-[18px] text-dark/60">
              Select your desired plan to track and improve your CIBIL score and
              always be loan-ready
            </p>
          </div>
          <div className="flex  justify-between">
            <div className="flex-col">
              <div style={{ visibility: "hidden" }} className="mb-[17px] ">
                Lorem
              </div>
              <ul className="flex flex-col gap-9">
                {features.map((feature) => (
                  <li
                    className="font-medium text-dark text-[12px] leading-[13px]"
                    key={feature.id}
                  >
                    {feature.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex ">
              <FeatureCards plansData={plansData} />
            </div>
          </div>
          <div className="flex mt-10">
            <PriceCards
              plansData={plansData}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
            />
          </div>
          <button
            disabled={loading}
            onClick={() => handlePlanClick(selectedPlan)}
            className="w-full rounded mt-4 min-h-[48px] outline-none text-light  bg-primary text-center text-[14px] leading-[21px] font-medium"
          >
            {loading ? (
              <>
                Continue{" "}
                <CgSpinner className="animate-spin inline-block h-5 w-5 ml-2" />
              </>
            ) : (
              "Continue"
            )}
          </button>
        </div>
        <Logout />
      </div>
      <div className="hidden md:block">
        <div className=" pt-[10vh] px-4">
          <Navbar />
          <div className="px-10">
            <UserPlans />
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectPlan;
