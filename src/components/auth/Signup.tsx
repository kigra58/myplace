import axios from "axios";
import React, {  } from "react";
import { AuthEndpoints } from "../../constant";
import useForm from "../../hooks/useForm";

const Signup: React.FC = () => {


 const {formData:newUser,onChangeHandler}=useForm({ 
 accountType:"",
 firstName:"",
 lastName: "",
 email: "",
 password:"",
});
  
  const createNewUser = async (args: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    accountType:string;
  }) => {
    try {
      const { data } = await axios.post(`${AuthEndpoints.SIGNUP}`, args);
      if (data && data.success) {
        console.log("==============responseeeeee", data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log("=================newuser",newUser);

  return (
    <div>
      <div className="form-floating mb-3">
        <input
          onChange={(e) => onChangeHandler(e)}
          value={newUser.firstName}
          name="firstName"
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput">First Name</label>
      </div>
      <div className="form-floating mb-3">
        <input
          onChange={(e) => onChangeHandler(e)}
          value={newUser.lastName}
          name="lastName"
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder=""
        />
        <label htmlFor="floatingInput">Last Name</label>
      </div>
      <div className="form-floating mb-3">
        <input
          onChange={(e) => onChangeHandler(e)}
          value={newUser.email}
          type="email"
          name="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating">
        <input
          onChange={(e) => onChangeHandler(e)}
          value={newUser.password}
          type="password"
          name="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>

      <div className="row mt-3">
        <div className="col-md-5">
          <div className="form-check">
            <input
              onChange={(e) => onChangeHandler(e)}
              value={newUser.accountType}  
              className="form-check-input"
              type="radio"
              name="accountType"
              id="flexRadioDefault1"
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Student
            </label>
          </div>
        </div>
        <div className="col-md-5">
          <div className="form-check">
            <input
             onChange={(e) => onChangeHandler(e)}
             value={newUser.accountType}  
              className="form-check-input"
              type="radio"
              name="accountType"
              id="flexRadioDefault2"
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Company
            </label>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button
          className="btn btn-primary col-md-12 shadow"
          onClick={() => createNewUser(newUser)}
        >
          REGISTER{" "}
        </button>
      </div>
    </div>
  );
};

export default Signup;
