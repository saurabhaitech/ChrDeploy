import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import store from "./store/store";
import { Provider } from "react-redux";
import Repeat from "./pages/Repeat/Repeat";
import ReportDashboard from "./pages/ReportDashboard/ReportDashboard";
import SelectPlan from "./pages/SelectPlan/SelectPlan";
import Ntc from "./pages/Ntc/Ntc";
function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/repeat" element={<Repeat />}></Route>
            <Route
              path="/reportdashboard"
              element={<ReportDashboard />}
            ></Route>
            <Route path="/selectplan" element={<SelectPlan />}></Route>
            <Route path="/ntc-user" element={<Ntc />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
