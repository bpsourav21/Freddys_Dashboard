import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/authActions";
import { ReactComponent as FreddysLogo } from "../helpers/svg/Freddys_Logo.svg";
import { BaseProps, mapStateToProps, mapDispatchToProps } from "../hooks";

class Sidebar extends React.Component<BaseProps, {}> {
  private onLogoutPressed() {
    this.props.dispatch(logout());
  }
  render(): React.ReactNode {
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
            <span onClick={() => this.onLogoutPressed()}>Logout</span>
          </Link>
        </div>
      </nav>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
