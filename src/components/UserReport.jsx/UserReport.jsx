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
import { redirect, useNavigate } from "react-router-dom";

const coodinates = [
  { points: 30, xcor: "46", ycor: "585" },
  { points: 31, xcor: "47", ycor: "570" },
  { points: 32, xcor: "49", ycor: "550" },
  { points: 33, xcor: "52", ycor: "530" },
  { points: 34, xcor: "55", ycor: "510" },
  { points: 35, xcor: "59", ycor: "490" },
  { points: 36, xcor: "65", ycor: "470" },
  { points: 37, xcor: "70", ycor: "450" }, //mid of mids
  { points: 38, xcor: "78", ycor: "430" },
  { points: 39, xcor: "84", ycor: "413" },
  { points: 40, xcor: "91", ycor: "397" },
  { points: 41, xcor: "107", ycor: "364" },
  { points: 42, xcor: "118", ycor: "344" },
  { points: 43, xcor: "135", ycor: "317" },
  { points: 44, xcor: "147", ycor: "300" }, //mids
  { points: 45, xcor: "158", ycor: "284" }, //mids
  { points: 46, xcor: "176", ycor: "262" },
  { points: 47, xcor: "197", ycor: "240" },
  { points: 48, xcor: "218", ycor: "219" },
  { points: 49, xcor: "241", ycor: "199" },
  { points: 50, xcor: "274", ycor: "174" },
  { points: 51, xcor: "306", ycor: "153" },
  { points: 52, xcor: "343", ycor: "133" },
  { points: 53, xcor: "374", ycor: "118" },
  { points: 54, xcor: "400", ycor: "108" },
  { points: 55, xcor: "435", ycor: "97" },
  { points: 56, xcor: "447", ycor: "93" },
  { points: 57, xcor: "465", ycor: "89" },
  { points: 58, xcor: "482", ycor: "85" },
  { points: 59, xcor: "502", ycor: "82" }, // range Bad ends here
  { points: 60, xcor: "563", ycor: "76" }, // range Average start here
  { points: 61, xcor: "583", ycor: "76" },
  { points: 62, xcor: "603", ycor: "76" },
  { points: 63, xcor: "623", ycor: "77" }, //
  { points: 64, xcor: "643", ycor: "78" },
  { points: 65, xcor: "663", ycor: "81" },
  { points: 66, xcor: "685", ycor: "84" }, //
  { points: 67, xcor: "705", ycor: "89" },
  { points: 68, xcor: "721", ycor: "93" },
  { points: 69, xcor: "735", ycor: "97" }, // range Average ends here
  { points: 70, xcor: "793", ycor: "118" }, // range Good Start here
  { points: 71, xcor: "828", ycor: "133" },
  { points: 72, xcor: "863", ycor: "153" },
  { points: 73, xcor: "895", ycor: "174" },
  { points: 74, xcor: "928", ycor: "199" }, // range Good ends here
  { points: 75, xcor: "972", ycor: "240" }, //range Great start here
  { points: 76, xcor: "995", ycor: "265" },
  { points: 77, xcor: "1015", ycor: "290" },
  { points: 78, xcor: "1035", ycor: "317" },
  { points: 79, xcor: "1051", ycor: "344" }, // range Great ends here
  { points: 80, xcor: "1078", ycor: "397" }, //range Excellent start here
  { points: 81, xcor: "1084", ycor: "413" },
  { points: 82, xcor: "1091", ycor: "430" },
  { points: 83, xcor: "1098", ycor: "450" },
  { points: 84, xcor: "1104", ycor: "470" },
  { points: 85, xcor: "1109", ycor: "490" },
  { points: 86, xcor: "1113", ycor: "510" },
  { points: 87, xcor: "1117", ycor: "530" },
  { points: 88, xcor: "1120", ycor: "550" },
  { points: 89, xcor: "1122", ycor: "570" },
  { points: 90, xcor: "1123", ycor: "585" }, // range Excellent end here
];

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
        <GoTriangleDown
          size={25}
          className="absolute top-[-18px] left-[-6px] text-neutral03"
        />
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
  const score = chrData.results?.credit_report_data?.cibil_score || "NH"; // <=---------
  const [pointerColor, setPointerColor] = useState("#FC6265");
  const banner_links = chrData?.results?.banner_links;
  const credit_report_data = chrData?.results?.credit_report_data;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currScore, setCurrScore] = useState(300);
  const [currXCor, setCurrXCor] = useState("46");
  const [currYCor, setCurrYCor] = useState("585");
  const [loadRef, setLoadRef] = useState(false);

  useEffect(() => {
    setLoadRef(true);
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
          (scrollLeft / (scrollWidth - containerWidth)) *
            (banner_links.length - 1)
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
  }, [banner_links?.length]);

  const handleBannerClick = (index) => {
    setActiveIndex(index);
    if (bannerContainerRef.current) {
      let scrollLeft = 0;
      if (index === 0) {
        scrollLeft = 0;
      } else if (index === banner_links?.length - 1) {
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
    window.open(banner_links[index].link);
  };

  const handleDownloadReport = () => {
    // for dev download report
    window.open(
      "https://devapi.stashfin.com/v2/api/cibil_report/6666",
      "_blank"
    );

    // for prod download report
    // const reportUrl = credit_report_data.report_url;
    // window.open(reportUrl, "_blank");
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Increment score by 10
      setCurrScore((prevScore) => {
        var newScore = prevScore + 10;
        if (newScore > 900 || newScore >= score || score === "NH") {
          newScore = score;
          clearInterval(intervalId); // Stop the interval if score exceeds 900
          return newScore; // Return previous score without updating
        } else {
          return newScore;
        }
      });
    }, 25);

    return () => {
      clearInterval(intervalId); // Cleanup: clear the interval when component unmounts
    };
  }, []);

  useEffect(() => {
    if (currScore >= 300 && currScore <= 900) {
      scoreCoor(currScore);
    }

    if( currScore === "NH" ){
      setCurrXCor("46");
      setCurrYCor("585");
    }

    if (currScore >= 300 && currScore <= 600) {
      setPointerColor("#FC6265");
    } else if (currScore > 600 && currScore <= 700) {
      setPointerColor("#FD8645");
    } else if (currScore > 700 && currScore <= 750) {
      setPointerColor("#FED23E");
    } else if (currScore > 750 && currScore <= 800) {
      setPointerColor("#1A94FC");
    } else if (currScore > 800 && currScore <= 900) {
      setPointerColor("#47DA95");
    } else{
      setPointerColor("#999999");
    }
  }, [currScore]);

  const scoreCoor = (scoretoMap) => {
    console.log(scoretoMap);
    var point;

    if (scoretoMap < 300 || scoretoMap > 900 || scoretoMap > score) {
      return;
    }

    if (scoretoMap === 300 || scoretoMap === 900) {
      point = (scoretoMap / 10).toFixed(0);
    } else {
      point = (scoretoMap / 10).toFixed(0);
    }

    if (
      scoretoMap === 750 ||
      scoretoMap === 600 ||
      scoretoMap === 700 ||
      scoretoMap === 800
    ) {
      point = scoretoMap / 10 - 1;
      console.log(point);
    }

    const result = coodinates[point - 30];
    console.log(scoretoMap, point);
    console.log(result);
    setCurrXCor(result.xcor);
    setCurrYCor(result.ycor);
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
        <div
          className={`${styles.card} ${styles.ml} ${loadRef && styles.loaded}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 1172.78 677.29"
          >
            <defs>
              <style>{`
            .a{isolation:isolate;}.b{fill:${currScore === "NH" ? "#cfcfcf" : "#fed23e"};}.c{fill:${currScore === "NH" ? "#9B9B9B" : "#fc6265"};}.d{fill:${currScore === "NH" ? "#A8A8A8" : "#fd8645"};}.e{fill:${currScore === "NH" ? "#ADADAD" : "#47da95"};}.f{fill:${currScore === "NH" ? "#999999" : "#1a94fc"};}.g,.h{fill:#899093;}.h{font-size:48px;font-family:Nunito-Bold, Nunito;font-weight:700;}.i{opacity:0.12;mix-blend-mode:multiply;}.j{fill:#fff;}.k{fill:none;stroke:${pointerColor};stroke-miterlimit:10;stroke-width:20px;}
          `}</style>
            </defs>
            <g className="a">
              <path
                className="b"
                d="M936,189.15l.09-.09a549.06,549.06,0,0,0-136.9-83.17l-2.3-1-.18.5A12.49,12.49,0,1,0,791,129.77a528,528,0,0,1,127.9,77.88l.05-.06.09-.09A12.49,12.49,0,1,0,936,189.15Z"
              />
              <path
                className="c"
                d="M514.28,81.59a12.5,12.5,0,0,0-12.5-12.5,12.33,12.33,0,0,0-4.3.78A551.53,551.53,0,0,0,33.09,585.09h.22a12.49,12.49,0,0,0,25-.5c0-.34,0-.68-.05-1C73,334.85,261,132,503,94.36c0-.11,0-.22,0-.33A12.49,12.49,0,0,0,514.28,81.59Z"
              />
              <path
                className="d"
                d="M740.15,85.31l.16-.46a550.55,550.55,0,0,0-156-22.34q-12.06,0-24,.52l0,.31a12.5,12.5,0,0,0,2.51,24.75,12.08,12.08,0,0,0,2.35-.23q9.54-.35,19.15-.35a525.18,525.18,0,0,1,145.07,20.33,12.49,12.49,0,1,0,10.8-22.53Z"
              />
              <path
                className="d"
                d="M740.15,85.31l.16-.46a550.55,550.55,0,0,0-156-22.34q-12.06,0-24,.52l0,.31a12.5,12.5,0,0,0,2.51,24.75,12.08,12.08,0,0,0,2.35-.23q9.54-.35,19.15-.35a525.18,525.18,0,0,1,145.07,20.33,12.49,12.49,0,1,0,10.8-22.53Z"
              />
              <path
                className="e"
                d="M1135.48,585.09a547.22,547.22,0,0,0-42.58-184.87c-1-2.42-2.09-4.83-3.15-7.24a12.5,12.5,0,0,0-24.47,3.61,12.36,12.36,0,0,0,1.29,5.49l-.22.12a523,523,0,0,1,44,182,13.55,13.55,0,0,0-.09,1.43,12.5,12.5,0,0,0,25,0c0-.17,0-.33,0-.5Z"
              />
              <path
                className="f"
                d="M1061.28,336.82l.16-.08a550.43,550.43,0,0,0-81.33-107l-.25.27A12.49,12.49,0,0,0,963.56,249a530.14,530.14,0,0,1,75.38,99.26l.21-.1a12.49,12.49,0,1,0,22.13-11.33Z"
              />
              <text className={"h"} transform="translate(1080 664.09)">
                900
              </text>
              <text className={"h"} transform="translate(0 664.09)">
                300
              </text>
              <circle className="j" cx={currXCor} cy={currYCor} r="23" />
              {/* *********        */}
              <circle className="k" cx={currXCor} cy={currYCor} r="23" />
              {/* *********       */}
              <text className={styles.score} x={currScore === "NH" ? "52%" :"50%"} y="75%">
                {currScore}
              </text>
              <text className={styles.range} x="660" y="98%">
                {""}
              </text>
            </g>
          </svg>
          <p
            className={`-mt-5 mx-auto text-center text-sm font-semibold`}
            style={{ color: pointerColor }}
          >
            {currScore === "NH" ? "No History" : credit_report_data?.cibil_state_text || "Poor"}
          </p>
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
                credit_report_data?.refresh_remaining_count === 0
                  ? "You cannot refresh your credit score."
                  : "You can refresh your score " +
                    credit_report_data?.refresh_remaining_count +
                    " more time" + `${
                      credit_report_data?.refresh_remaining_count > 1
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
            banner_links?.length >= 2 ? "overflow-x-auto" : "justify-center"
          } ${
            banner_links?.length >= 3
              ? "overflow-x-auto"
              : "md:overflow-x-none md:justify-center"
          } min-h-[160px] ${styles.scrollContainer}`}
          ref={bannerContainerRef}
        >
          <div className={`gap-4 flex`}>
            {banner_links?.map((banner, index) => (
              <img
                key={index}
                className={`max-w-[300px] md:min-w-[320px] h-[160px] rounded-[12px] cursor-pointer`}
                src={banner.image}
                onClick={() => handleBannerClick(index)}
              />
            ))}
          </div>
        </div>
        {banner_links?.length >= 2 && (
          <div className="md:hidden flex gap-2 mt-2">
            {banner_links?.map((_, index) => (
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
        {banner_links?.length >= 3 && (
          <div className="hidden md:flex gap-2 mt-2">
            {banner_links?.map((_, index) => (
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
