import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/common/Navbar/Navbar.jsx";
import ntcImg from "../../assets/ntcImg.png";
import ntcBanner from "../../assets/ntcBanner.png";
import ntcBannerLg from "../../assets/ntcBannerLg.png";
import { TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/slices/userSlice.jsx";
import { clearChrData } from "../../store/slices/chrDataSlice.jsx";

const Ntc = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chrData = useSelector((state) => state.chrData);
  const banner_links = chrData?.results?.banner_links;
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    dispatch(logoutUser());
    dispatch(clearChrData());
    navigate("/");
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollAmount, setScrollAmount] = useState(300);
  const bannerContainerRef = useRef(null);

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
      } else if (index === banner_links.length - 1) {
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
  return (
    <div className="w-screen h-[90vh] min-h-[550px] md:min-h-[90vh] bg-secondary02 flex flex-col mt-[10vh]">
      <Navbar />
      <div className="flex flex-col justify-center items-center bg-white rounded-[16px] mt-8 w-[90%] mx-auto md:w-[60%] h-[85%] md:h-[90%]">
        <div className="flex flex-col gap-[15%] md:gap-[5%] justify-end h-[100%]  items-center w-[100%] p-4 md:p-4">
          <div className="flex flex-col justify-between gap-4 md:gap-2 items-center h-[50%] md:h-[60%] md:w-[326px]">
            <div className="text-center flex flex-col justify-center items-center gap-4">
              <img src={ntcImg} alt="" />
              <p className="font-semibold text-[20px] text-danger">Oops!</p>
              <p className="text-center font-normal text-neutral02 text-[11px] leading-[18px] w-[300px]">
                Based on the information you provided during enrollment, we
                could not locate your credit data in the CIBIL records
              </p>
            </div>
            <div className="bg-lightBlue py-[8px] px-[10px] md:px-[18px] rounded-[8px]">
              <p className="text-[11px] font-medium text-[#02006B]">
                Your refund will be initiated within 7 business days.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center w-[100%]">
            <div
              className={`flex w-[100%] ${
                banner_links?.length >= 2 ? "overflow-x-auto" : "justify-center"
              } ${
                banner_links?.length >= 3
                  ? "overflow-x-auto"
                  : "md:overflow-x-none md:justify-center"
              } min-h-[160px]`}
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
      </div>
      <div className="md:absolute md:top-[17vh] md:right-[12%] mx-auto md:mx-0 mt-[5%] md:mt-0">
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

export default Ntc;
