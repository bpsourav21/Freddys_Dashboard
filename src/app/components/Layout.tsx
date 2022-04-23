import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="mainWrapper">
      <Navbar />
      <div className="wrapper">
        <Sidebar />
        <div className="main-outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
