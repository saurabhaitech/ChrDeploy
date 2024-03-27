import Navbar from "../../components/common/Navbar/Navbar";
import { FaCheckCircle } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import UserReport from "../../components/UserReport.jsx/UserReport";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/slices/userSlice";
import { clearChrData } from "../../store/slices/chrDataSlice";
import { useNavigate } from "react-router-dom";
const ReportDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    dispatch(logoutUser());
    dispatch(clearChrData());
    navigate("/");
  };

  return (
    <div className="w-screen h-[90vh] min-h-[700px] md:min-h-[90vh] bg-secondary02 flex flex-col justify-center mt-[10vh]">
      <Navbar />
      <div className="flex flex-col justify-center items-center bg-white rounded-[16px] w-[90%]  mx-auto md:w-[60%] md:max-w-[790px] h-[95%] max-h-[650px]">
        <UserReport />
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

export default ReportDashboard;
