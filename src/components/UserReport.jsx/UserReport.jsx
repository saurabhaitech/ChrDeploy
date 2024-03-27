import React, { useEffect, useRef, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import CIBL from "../../assets/CIBLLogo.png";
import Banner1 from "../../assets/Banner1.png";
import Banner2 from "../../assets/Banner2.png";
import Banner3 from "../../assets/Banner3.png";
import Progress from "../../assets/ProgressSemi.png";
import info from "../../assets/info.png";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import styles from "./UserReport.module.css";
import ReactSpeedometer from "react-d3-speedometer";
import { clearChrData } from "../../store/slices/chrDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { setChrData } from "../../store/slices/chrDataSlice";
import { BASE_URL } from "../../utils/baseUrl";
import axios from "axios";
import { GoTriangleDown } from "react-icons/go";

const Tooltip = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <IoMdInformationCircleOutline className="mb-[.5px]" size={13} />
      {isVisible && (
        <div className="absolute top-[-40px] left-[-215px] bg-neutral03 text-nowrap text-xs text-light font-medium p-2 rounded">
          {message}
        </div>
      )}
      {isVisible && (
        <GoTriangleDown size={25} className="absolute top-[-18px] left-[-6px] text-neutral03" />
      )}
    </span>
  );
};

const UserReport = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollAmount, setScrollAmount] = useState(300);
  const banners = [Banner1, Banner2, Banner3];
  const links = [
    "https://example.com/banner1",
    "https://example.com/banner2",
    "https://example.com/banner3",
  ];
  const bannerContainerRef = useRef(null);
  const chrData = useSelector((state) => state.chrData);

  const score = chrData.results?.credit_report_data?.cibil_score || 200;
  const { banner_links, credit_report_data } = chrData.results;
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setScrollAmount(isMobile ? 300 : 200);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (bannerContainerRef.current) {
        const scrollLeft = bannerContainerRef.current.scrollLeft;
        const scrollWidth = bannerContainerRef.current.scrollWidth;
        const containerWidth = bannerContainerRef.current.clientWidth;
        const newIndex = Math.round(
          (scrollLeft / (scrollWidth - containerWidth)) * (banners.length - 1)
        );
        setActiveIndex(newIndex);
      }
    };

    bannerContainerRef.current.addEventListener("scroll", handleScroll);

    return () => {
      if (bannerContainerRef.current) {
        bannerContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [banner_links.length]);

  const handleBannerClick = (index) => {
    setActiveIndex(index);
    if (bannerContainerRef.current) {
      let scrollLeft = 0;
      if (index === 0) {
        scrollLeft = 0;
      } else if (index === banners.length - 1) {
        scrollLeft = bannerContainerRef.current.scrollWidth;
      } else {
        const direction = index > activeIndex ? 1 : -1;
        scrollLeft =
          bannerContainerRef.current.scrollLeft + scrollAmount * direction;
      }
      bannerContainerRef.current.scrollTo({
        behavior: "auto",
        left: scrollLeft,
      });
    }
  };

  const handleDownloadReport = () => {
    window.open(
      "https://devapi.stashfin.com/v2/api/cibil_report/6666",
      "_blank"
    );
  };

  const handleRefresh = () => {
    const auth_token = localStorage.getItem("authToken");

    axios
      .get(`${BASE_URL}/v3/onboarding/getuserchrdetails`, {
        headers: {
          auth_token,
          "Content-type": "application/json",
        },
        params: {
          refresh_report: true,
        },
      })
      .then((response) => {
        dispatch(setChrData(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex flex-col justify-between h-[100%] py-6 md:py-4 md:gap-4  items-center w-[100%] w-max-[375px]">
      <div className="flex flex-col items-center gap-1">
        <div className="mb-2 md:mb-0">
          <img src={CIBL} />
        </div>
        <p className="text-3xl font-bold">
          Hey {chrData.results?.user_data[0]?.name}!
        </p>
        <p className="text-sm font-medium text-neutral05">
          Your CIBIL Report{" "}
          <span className="text-black">
            ({chrData.results?.credit_report_data?.plan_type_text})
          </span>
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 md:gap-2">
        {/* <div className="w-[80%] mb-8 md:mb-4">
          <img src={Progress} />
        </div> */}
        <div className="h-[180px] ">
          <ReactSpeedometer
            // width={400}
            needleHeightRatio={0.7}
            minValue={200}
            maxValue={800}
            value={score}
            needleColor="black"
            // startColor="yellow"
            customSegmentStops={[200, 500, 700, 800]}
            segmentColors={["yellow", "orange", "red"]}
            // endColor="red"
            valueTextFontSize={"25"}
            ringWidth={20}
            // textColor={textColor}
          />
        </div>
        <div className="">
          <button
            onClick={handleDownloadReport}
            className="flex flex-row items-center jusitfy-center text-primary border-primary border-2 gap-2 px-6 py-2 text-sm rounded-[12px] font-medium "
          >
            <MdOutlineFileDownload size={16} /> Download Report
          </button>
        </div>
        <p className="flex flex-row justify-center items-center gap-1 text-neutral05 text-xs">
          Refresh avilable on {credit_report_data?.refresh_date}
          <span className="relative ">
            <Tooltip
              message={
                credit_report_data.refresh_remaining_count === 0
                  ? "You cannot refresh your credit score."
                  : "You can refresh your score " +
                    credit_report_data.refresh_remaining_count +
                    " more time"`${
                      credit_report_data.refresh_remaining_count > 1
                        ? "s."
                        : "."
                    }`
              }
            />
            {/* <IoMdInformationCircleOutline className="mb-[.5px]" size={13} /> */}
          </span>
        </p>
        {credit_report_data?.refresh_enabled && (
          <button
            onClick={handleRefresh}
            className="text-xs text-primary font-medium underline underline-offset-2"
          >
            Refresh Credit Report
          </button>
        )}
      </div>
      <div className="flex flex-col items-center w-[90%]">
        <div
          className={`flex w-[100%] ${
            banners.length >= 2 ? "overflow-x-auto" : "justify-center"
          } ${
            banners.length >= 3
              ? "overflow-x-auto"
              : "md:overflow-x-none md:justify-center"
          } min-h-[160px] ${styles.scrollContainer}`}
          ref={bannerContainerRef}
        >
          <div className={`gap-4 flex`}>
            {banners.map((banner, index) => (
              <img
                key={index}
                className={`max-w-[300px] md:min-w-[320px] h-[160px] rounded-[12px] cursor-pointer`}
                src={banner}
                onClick={() => handleBannerClick(index)}
              />
            ))}
          </div>
        </div>
        {banners.length >= 2 && (
          <div className="md:hidden flex gap-2 mt-2">
            {banners.map((_, index) => (
              <div
                key={index}
                className={`border border-primary w-3 h-3 rounded-full cursor-pointer ${
                  index === activeIndex ? "bg-primary" : "bg-neutral"
                }`}
                onClick={() => handleBannerClick(index)}
              ></div>
            ))}
          </div>
        )}
        {banners.length >= 3 && (
          <div className="hidden md:flex gap-2 mt-2">
            {banners.map((_, index) => (
              <div
                key={index}
                className={`border border-primary w-3 h-3 rounded-full cursor-pointer ${
                  index === activeIndex ? "bg-primary" : "bg-neutral"
                }`}
                onClick={() => handleBannerClick(index)}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserReport;
