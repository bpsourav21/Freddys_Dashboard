import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  render(): React.ReactNode {
    return (
      <nav className="navbar fixed-top navbar-dark bg-secondary mb-5">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Freddy's Dashboard
          </Link>
        </div>
      </nav>
    );
  }
}

export default Navbar;
