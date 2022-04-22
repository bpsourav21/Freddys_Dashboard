import { Link } from "react-router-dom";
import { logout } from "../actions/authActions";
import { ReactComponent as FreddysLogo } from "../helpers/svg/Freddys_Logo.svg";
import { useAppDispatch } from "../hooks";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  return (
    <nav className="sidebar">
      <div className="sidebar-img">
        <FreddysLogo width={100} height={100} />
      </div>
      <div
        className="nav flex-column nav-pills"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
      >
        <Link className="nav-link" to="/dashboard">
          Dashboard
        </Link>
        <Link className="nav-link" to="/orders">
          Orders
        </Link>
        <Link className="nav-link" to="/login">
          <span onClick={() => dispatch(logout())}>Logout</span>
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
