import React from "react";
import { NavLink } from "react-router-dom";
import { Endpoints } from "../../constant";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="#">
        <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="" width="30" 
           height="24" className="d-inline-block align-text-top"/>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link " aria-current="page" to={Endpoints.PROBLEMS} >
              Coding Problems
            </NavLink>
            {/* <NavLink className="nav-link " to={Endpoints.COMPILER} >
              Compiler
            </NavLink> */}
            <NavLink className="nav-link " to={Endpoints.CREATE_NEW_PROBLEM} >
               Add Problem
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
