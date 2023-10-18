<<<<<<< HEAD
import React from 'react'
import CodeEditor from './components/coding/CodeEditor'
import ProblemList from './components/coding/ProblemList'
import Test from './components/Test'
// import Navbar from './components/Navbar/Navbar'
=======
import React from "react";
import CodeEditor from "./components/coding/CodeEditor";
import ProblemList from "./components/coding/ProblemList";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Endpoints } from "./constant";
>>>>>>> 6b9da5c356471de4ce0451e61b65b2c2dae06ab7

const App: React.FC = () => {
  return (
    <div>
<<<<<<< HEAD

      {/* <Navbar/> */}
      {/* <CodeEditor/> */}
      {/* <ProblemList/> */}
      <Test/>
=======
      <Router>
        <Navbar />
        <Routes>
          <Route path={Endpoints.PROBLESMS} element={<ProblemList />} />
          <Route path={Endpoints.COMPILER} element={<CodeEditor />} />
        </Routes>
      </Router>
>>>>>>> 6b9da5c356471de4ce0451e61b65b2c2dae06ab7
    </div>
  );
};

export default App;
