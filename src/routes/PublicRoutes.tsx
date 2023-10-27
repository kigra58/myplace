import React from "react";
import { Navbar } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "../constant";
import { useSelector } from "react-redux";
import { RootState } from "../rtk/store";

import ProtectedRoutes from "./ProtectedRoutes";
import ProblemList from "../components/coding/ProblemList";
import AddProblem from "../components/coding/AddProblem";
import CodeEditor from "../components/coding/CodeEditor";
import AuthPage from "../components/auth/AuthPage";
import AddMCQ from "../components/coding/AddMCQ";
import MCQ from "../components/coding/MCQ";
import Home from "../components/auth/AuthPage";
import AddBlog from "../components/blog/AddBlog";
import BlogList from "../components/blog/BlogList";
import TestDetails from "../components/userTest/TestDetails";
import TestList from "../components/userTest/TestList";

// interface Props {
//   component: React.ComponentType;
// }

// const ProtectWithNavbar: React.FC<Props> = ({ component }) => {
//   return (
//     <>
//       <ProtectedRoutes component={component} />
//     </>
//   );
// };

const PublicRoutes: React.FC = () => {
  const authData = useSelector((state: RootState) => state.auth.authData);
  console.log("===============authData", authData);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={<ProtectedRoutes component={Home} />}
        />
        <Route
          path={ROUTES.CREATE_NEW_MCQ}
          element={<ProtectedRoutes component={AddMCQ} />}
        />
        <Route
          path={ROUTES.PROBLEMS}
          element={<ProtectedRoutes component={ProblemList} />}
        />
        <Route
          path={ROUTES.MCQ}
          element={<ProtectedRoutes component={MCQ} />}
        />
        <Route
          path={ROUTES.CREATE_NEW_PROBLEM}
          element={<ProtectedRoutes component={AddProblem} />}
        />
        <Route
          path={ROUTES.COMPILER}
          element={<ProtectedRoutes component={CodeEditor} />}
        />

        <Route
          path={ROUTES.ADD_BLOG}
          element={<ProtectedRoutes component={AddBlog} />}
        />

        <Route
          path={ROUTES.BLOG_LIST}
          element={<ProtectedRoutes component={BlogList} />}
        />

        <Route
          path={ROUTES.TEST_DETAILS}
          element={<ProtectedRoutes component={TestDetails} />}
        />

        <Route
          path={ROUTES.TEST_LIST}
          element={<ProtectedRoutes component={TestList} />}
        />

        <Route
          path={ROUTES.HOME}
          element={authData ? <Navigate to={ROUTES.HOME} /> : <AuthPage />}
        />


      </Routes>
    </>
  );
};

export default PublicRoutes;
