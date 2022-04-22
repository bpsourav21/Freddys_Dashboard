import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Home = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="wrapper">
        <Sidebar />
        <div className="home">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
