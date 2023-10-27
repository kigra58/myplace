import React from "react";
import { Navbar } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../rtk/store";
import { ROUTES } from "./routes";

import ProtectedRoutes from "./ProtectedRoutes";
import AddProblem from "../components/views/coding/AddProblem";
import CodeEditor from "../components/views/coding/CodeEditor";
import AddMCQ from "../components/views/coding/AddMCQ";
import MCQ from "../components/views/coding/MCQ";
import ProblemList from "../components/views/coding/ProblemList";
import TestList from "../components/views/userTest/TestList";
import Home from "../components/views/auth/AuthPage";
import TestDetails from "../components/views/userTest/TestDetails";
import AddBlog from "../components/views/blog/AddBlog";
import BlogList from "../components/views/blog/BlogList";
import AuthPage from "../components/views/auth/AuthPage";

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
