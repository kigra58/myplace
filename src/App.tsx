import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Endpoints } from "./constant";
import CodeEditor from "./components/coding/CodeEditor";
import ProblemList from "./components/coding/ProblemList";
import Navbar from "./components/Navbar/Navbar";
import CreateNewProblem from "./components/coding/AddProblem";
import AddMCQ from "./components/coding/AddMCQ";
import MCQ from "./components/coding/MCQ";


const App: React.FC = () => {
  return (
    <div>

      <Router>
        <Navbar />
        <Routes>
          <Route path={Endpoints.PROBLEMS} element={<ProblemList />} />
          <Route path={Endpoints.COMPILER} element={<CodeEditor />} />
          <Route path={Endpoints.CREATE_NEW_PROBLEM} element={<CreateNewProblem />} />
          <Route path={Endpoints.CREATE_NEW_MCQ} element={<AddMCQ />} />
          <Route path={Endpoints.MCQ} element={<MCQ />} />
        </Routes>
      </Router>

    </div>
  );
};

export default App;
