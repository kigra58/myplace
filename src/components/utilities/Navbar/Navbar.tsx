import React from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../routes/routes";
import { useSelector } from "react-redux";
import { RootState } from "../../../rtk/store";

const Navbar: React.FC = () => {
  const authData = useSelector((state: RootState) => state.auth.authData);
  // console.log("===========ttttttttttt", authData?.user?.account_type);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to={ROUTES.HOME}>
          <img
            src={`${process.env.PUBLIC_URL}/logo192.png`}
            alt=""
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
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
            {authData?.user?.account_type === "admin" ? (
              <>
                <NavLink
                  className="nav-link "
                  aria-current="page"
                  to={ROUTES.PROBLEMS}
                >
                  Coding Problems
                </NavLink>

                <NavLink className="nav-link " to={ROUTES.BLOG_LIST}>
                  Blogs
                </NavLink>

                <NavLink className="nav-link " to={ROUTES.UI_COMPILER}>
                  UI Compiler
                </NavLink>
                <NavLink className="nav-link " to={ROUTES.CREATE_NEW_PROBLEM}>
                  Add Problem
                </NavLink>
                <NavLink className="nav-link " to={ROUTES.CREATE_NEW_MCQ}>
                  Add MCQ
                </NavLink>
                <NavLink className="nav-link " to={ROUTES.MCQ}>
                  MCQ'S
                </NavLink>
                <NavLink className="nav-link " to={ROUTES.TEST_LIST}>
                  Tests
                </NavLink>
                
                <NavLink className="nav-link " to={ROUTES.CODE_COMPILER}>
                  Compiler
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  className="nav-link "
                  aria-current="page"
                  to={ROUTES.PROBLEMS}
                >
                  Coding Problems
                </NavLink>

                <NavLink className="nav-link " to={ROUTES.BLOG_LIST}>
                  Blogs
                </NavLink>

                <NavLink className="nav-link " to={ROUTES.UI_COMPILER}>
                  UI Compiler
                </NavLink>

                <NavLink className="nav-link " to={ROUTES.CODE_COMPILER}>
                  Compiler
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
