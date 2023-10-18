

import React from "react";
import CodeEditor from "./components/coding/CodeEditor";
import ProblemList from "./components/coding/ProblemList";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Endpoints } from "./constant";


const App: React.FC = () => {
  return (
    <div>

      <Router>
        <Navbar />
        <Routes>
          <Route path={Endpoints.PROBLESMS} element={<ProblemList />} />
          <Route path={Endpoints.COMPILER} element={<CodeEditor />} />
        </Routes>
      </Router>

    </div>
  );
};

export default App;
