import React from "react";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import { mapStateToProps, mapDispatchToProps, BaseProps } from "../hooks";
import { HomeState } from "../reducers/homeReducer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

class Home extends React.Component<BaseProps, {}> {
  render() {
    const homeState: HomeState = this.props.rootState.home;
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
