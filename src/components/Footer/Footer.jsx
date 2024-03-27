import React, { useEffect, useState } from "react";
import {
  FaAngleDown,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import styles from "./Footer.module.css";
import Logo from "../../assets/Logo.png";

const Footer = () => {

  return (
    <div className="bg-secondary w-screen]">
      <div className="w-screen">
        <div className={`${styles.footer_one}`}>
          <div className={`${styles.company_des} flex flex-col gap-6`}>
            <div className="Logo flex flex-row justify-between items-center">
              <img src={Logo} alt="StashFin" />
              <div className={styles.brands_logo_des}>
                <div>
                  <FaInstagram size={20} />
                </div>
                <div>
                  <FaFacebook size={20} />
                </div>
                <div>
                  <FaLinkedin size={20} />
                </div>
                <div>
                  <FaYoutube size={20} />
                </div>
              </div>
            </div>
            <p className="text-[#78779a] text-[13px] font-medium gap-2 flex flex-col gap-6">
              <span className="text-balance">
                We offer loans up to ₹5,00,000 with repayment periods up-to
                months. We offer interest rates starting from 11.99% APR (Annual
                Percentage Rate), however rates may vary case to case. All loans
                are paid through Equal Monthly Instaliments (EMIs) via
                electronic payment. We do charge low platform fees and have no
                other hidden costs.
              </span>
              <span className="text-balance">
                Example: if a customer takes a loan of ₹10,000 for a period 3
                months, at an annual Interest rate of 11.99% APR, then the
                customer will pay an EMI for 3 months of ₹3,400 per month. Total
                payment over 3 months will be ₹10,200 (including principal and
                Interest).
              </span>
            </p>
          </div>
          <div
            className={`${styles.footer_link_wrap} flex flex-col text-[#78779a] text-[13px] font-medium`}
          >
            <div className={`${styles.footer_link_intwrap}`}>
              <div className={`${styles.footer_link_box} w-[100%] md:w-[35%] border-b-[1.5px] border-[#414794] md:border-b-0`}>
                <p
                  className="text-white text-sm font-semibold my-2 flex flex-row justify-between"
                  onClick={() => {
                    document
                      .getElementById("companyLinks")
                      .classList.toggle("hidden");
                    document
                      .getElementById("companyArrow")
                      .classList.toggle("rotate-[180deg]");
                  }}
                >
                  Company{" "}
                  <FaAngleDown
                    id="companyArrow"
                    size={20}
                    className="transition-all duration-500 md:hidden"
                  />
                </p>
                <ul className="hidden md:block" id="companyLinks">
                  <li>Home</li>
                  <li>Instant Personal Loans</li>
                  <li>Why Us</li>
                  <li>About Us</li>
                  <li>Customer Service</li>
                  <li>Investors and Media Queries</li>
                  <li>Sentinel</li>
                  <li>Sitemap</li>
                </ul>
              </div>
              <div
                className={`${styles.footer_link_box} w-[100%] md:w-[25%] border-b-[1.5px] border-[#414794] md:border-b-0`}
              >
                <p
                  className="text-white text-sm font-semibold my-2 flex flex-row justify-between"
                  onClick={() => {
                    document
                      .getElementById("recoursesLinks")
                      .classList.toggle("hidden");
                    document
                      .getElementById("resourseArrow")
                      .classList.toggle("rotate-[180deg]");
                  }}
                >
                  Resources{" "}
                  <FaAngleDown
                    size={20}
                    id="resourseArrow"
                    className="transition-all duration-500 md:hidden"
                  />
                </p>
                <ul className="hidden md:block" id="recoursesLinks">
                  <li>Blog</li>
                  <li>News</li>
                  <li>FAQs</li>
                  <li>Calculator</li>
                  <li>Partners</li>
                </ul>
              </div>
              <div className={`${styles.footer_link_box} w-[100%] md:w-[40%] border-b-[1.5px] border-[#414794] md:border-b-0`}>
                <p
                  className="text-white text-sm font-semibold my-2 flex flex-row justify-between"
                  onClick={() => {
                    document
                      .getElementById("legalLinks")
                      .classList.toggle("hidden");
                    document
                      .getElementById("legalArrow")
                      .classList.toggle("rotate-[180deg]");
                  }}
                >
                  Legal
                  <FaAngleDown
                    size={20}
                    id="legalArrow"
                    className="transition-all duration-500 md:hidden"
                  />
                </p>
                <ul className="hidden md:block" id="legalLinks">
                  <li>Privacy Policy (EQX)</li>
                  <li>Privacy Policy (AKARA)</li>
                  <li>Terms and Conditions</li>
                  <li>Grievance Redressal Mechanism</li>
                  <li>Interest Rate Policy</li>
                  <li className="flex flex-col">
                    NBFC Certificate
                    <span>
                      (Follow this link to search for AKARA Capital Advisors
                      Pvt. Ltd. in the list of RBI Regulated NBFCs)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <p
                className="text-white text-sm font-semibold my-2 flex flex-row justify-between"
                onClick={() => {
                  document
                    .getElementById("citiesLinks")
                    .classList.toggle("hidden");
                  document
                    .getElementById("cityArrow")
                    .classList.toggle("rotate-[180deg]");
                }}
              >
                Cities{" "}
                <FaAngleDown size={20} id="cityArrow" className="transition-all duration-500 md:hidden" />
              </p>
              <span className="hidden transition-all duration-500 md:block" id="citiesLinks">
                Delhi | Chandigarh | Bangalore | Hyderabad | Indore | Mumbai |
                Pune | Chennai | Kolkata | Gurugram | Noida | Lucknow | Bhopal |
                Agra | Dehradun | Kanpur | Nagpur | Aurangabad | Madurai | Salem
                | Rajkot | Kurnool | Vellore | Krishna, Andhra Pradesh |
                Warangal | Anantapur | Patna | Karimnagar | Ludhiana
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-screen border-t-[3px] border-[#414794]">
        <div
          className={`${styles.footer_two} text-white text-[13px] font-medium flex flex-row justify-center items-center mx-auto`}
        >
          <div className={styles.brands_logo_wrap}>
            <div>
              <FaInstagram size={25} />
            </div>
            <div>
              <FaFacebook size={25} />
            </div>
            <div>
              <FaLinkedin size={25} />
            </div>
            <div>
              <FaYoutube size={25} />
            </div>
          </div>
          <div
            className={`${styles.copyright_wrap} text-[13px] flex flex-col gap-3`}
          >
            <span>@ 2024 by Stashfin</span>
            <span className="-mt-3">
              Trademark of EQX Analytics Private Limited
            </span>
            <span>
              Credit enhanchements (which may include funding or guarantee) by:
            </span>
            <span className="text-blue-700">
              AKARA Capital Advisors Private Limited
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
