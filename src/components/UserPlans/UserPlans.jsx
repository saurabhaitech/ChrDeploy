import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/baseUrl";
import greenCheck from "../../assets/greenCheck.png";
import redCheck from "../../assets/redCheck.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/slices/modalSlice";

export const PlanCards = ({ plansData }) => {
  const { plans = [], products = [], features = [] } = plansData.results || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const getFeaturesList = (product) => {
    return product.feature_ids.map((featureId) =>
      features.find((featureItem) => featureItem.id === featureId)
    );
  };

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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePlanClick = (planItem) => {
    const authToken = localStorage.getItem("authToken");
    if (!!userData.isLoggedIn) {
      getPaymentLink(planItem, authToken);
    } else {
      dispatch(openModal("mobile"));
    }
  };
  return (
    <>
      {plans.length > 0 &&
        plans.map((planItem, index) => (
          <React.Fragment key={index}>
            <div
              className={`hidden md:block relative
               h-[580px] md:w-[180px] xl:w-[200px]  rounded-xl ${
                 planItem.recommended === true
                   ? "bg-gradient-to-b from-[#151573] to-[#6E6EA9]"
                   : "bg-light"
               } `}
              key={planItem?.id}
            >
              {planItem.recommended === true && (
                <div className="absolute w-full z-10 -top-[10px]">
                  <div className="text-[9px] w-fit mx-auto font-semibold bg-[#F0E193] px-4 py-[4px] rounded-[10px]">
                    Recommended
                  </div>
                </div>
              )}
              {!!planItem.discount_text === true && (
                <div className="absolute w-full -top-[10px]">
                  <div className="text-[9px] w-fit mx-auto font-semibold bg-[#F0E193] px-4 py-[4px] rounded-[10px]">
                    {planItem.discount_text}
                  </div>
                </div>
              )}
              <div
                className={`flex flex-col gap-10 items-center ${
                  planItem.recommended === true
                    ? "text-light"
                    : "text-neutral01"
                }`}
              >
                <div className="text-center mt-10">
                  <p className="font-medium leading-4">
                    {planItem?.product_type}
                  </p>
                  <p className="font-bold text-[2rem]">₹{planItem.price}</p>
                  <p className="text-neutral06 font-normal text-[13px] leading-4">
                    /{planItem.duration_text}
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
                          <img src={greenCheck} alt="" />
                        ) : (
                          <img src={redCheck} alt="" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handlePlanClick(planItem)}
                  className="mt-4 w-[146px] h-[42px] border bg-light border-primary text-primary rounded-lg text-base leading-7 font-semibold"
                >
                  Choose Plan
                </button>
              </div>
            </div>

            <div className="relative md:hidden h-[573px] min-w-[300px] bg-light rounded-xl">
              {planItem.recommended === true && (
                <div className="absolute w-full -top-[10px]">
                  <div className="text-[9px] w-fit mx-auto font-semibold bg-[#F0E193] px-4 py-[4px] rounded-[10px]">
                    Recommended
                  </div>
                </div>
              )}
              {!!planItem.discount_text === true && (
                <div className="absolute w-full -top-[10px]">
                  <div className="text-[9px] w-fit mx-auto font-semibold bg-[#F0E193] px-4 py-[4px] rounded-[10px]">
                    {planItem.discount_text}
                  </div>
                </div>
              )}
              <div
                className={`flex flex-col gap-10 text-neutral01 items-center `}
              >
                <div className="text-center mt-10">
                  <p className="font-medium leading-4">
                    {planItem?.product_type}
                  </p>
                  <p className="font-bold text-[2rem]">₹{planItem.price}</p>
                  <p className="text-neutral06 font-normal text-[13px] leading-4">
                    /{planItem.duration_text}
                  </p>
                </div>
                <div className="flex w-[85%] flex-col gap-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex justify-between">
                      <p className="text-[12px]  w-[80%] leading-[14px] text-neutral02 font-medium">
                        {feature.text}
                      </p>
                      <div key={feature.id}>
                        {getFeaturesList(
                          products.find(
                            (product) => product.id === planItem.product_id
                          )
                        ).includes(feature) ? (
                          <img src={greenCheck} alt="" />
                        ) : (
                          <img src={redCheck} alt="" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handlePlanClick(planItem)}
                  className="mt-16 w-[90%] h-[42px] border  text-light bg-primary rounded-lg text-base leading-7 font-semibold"
                >
                  Choose Plan
                </button>
              </div>
            </div>
          </React.Fragment>
        ))}
    </>
  );
};

const UserPlans = () => {
  const [plansData, setPlansData] = useState({});
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
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const { features = [] } = plansData.results || {};

  return (
    <>
      <div className="bg-secondary01 hidden md:flex justify-between mt-10 md:mt-20  rounded-2xl md:p-10 xl:p-10 2xl:p-20 mx-auto">
        <div className="flex flex-col gap-[70px]">
          <p className="text-secondary font-bold text-[36px] mb-10">
            Our Plans
          </p>
          <ul className="flex flex-col gap-8">
            {features.map((feature) => (
              <li
                className="font-medium text-neutral01 leading-[15px]"
                key={feature.id}
              >
                {feature.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex md:gap-4 xl:gap-10">
          <PlanCards plansData={plansData} />
        </div>
      </div>

      <div className="md:hidden bg-secondary01 top-10 h-[642px] overflow-x-scroll scroll-smooth flex items-center px-8 gap-10">
        <PlanCards plansData={plansData} />
      </div>
    </>
  );
};

export default UserPlans;
