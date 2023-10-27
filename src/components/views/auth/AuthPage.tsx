import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";


const Home: React.FC = () => {
  const [isTap, setIsTap] = useState(false);

  return (
    <div className="container">
      <div className="col-md-4 mx-auto mt-5">
        <div className="row mb-4 mt-3">
          <div className="col-md-5">
            <button
              type="button"
              onClick={() => {
                setIsTap(false);
              }}
              className={`btn btn-${isTap ? "light" : "primary"} `}
            >
              Login{" "}
            </button>
          </div>
          <div className="col-sm-5">
            <button
              type="button"
              onClick={() => {
                setIsTap(true);
              }}
              className={`btn btn-${!isTap ?   "light":"primary"} `}
            >
              Register{" "}
            </button>
          </div>
        </div>
        {isTap ?  <Signup/>:<Login/>}
      </div>
    </div>
  );
};

export default Home;
