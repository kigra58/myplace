import React from "react";
import { AuthEndpoints } from "../../../routes/routes";
import useForm from "../../../hooks/useForm";
import usePost from "../../../hooks/usePost";

const Signup: React.FC = () => {
  const { formData: newUser, onChangeHandler } = useForm({
    accountType: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { postData, loading } = usePost({
    url: `${AuthEndpoints.SIGNUP}`,
    payload: newUser,
  });

  return (
    <div>
      <div className="form-floating mb-3">
        <input
          onChange={(e) => onChangeHandler(e)}
          value={newUser.firstName}
          name="firstName"
          type="text"
          className="form-control"
          required
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
          required
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
          required
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
          required
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
              required
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
              required
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
          disabled={loading}
          className="btn btn-primary col-md-12 shadow"
          onClick={postData}
        >
          REGISTER {
            loading &&(
              <span
                className="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              />
            )
          }
        </button>
      </div>
    </div>
  );
};

export default Signup;
