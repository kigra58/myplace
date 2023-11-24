import React from "react";
import { useDispatch } from "react-redux";
import { AuthEndpoints } from "../../../routes/routes";
import { login } from "../../../rtk/reducer";
import useForm from "../../../hooks/useForm";
import usePost from "../../../hooks/usePost";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const { formData: loginData, onChangeHandler } = useForm({
    email: "",
    password: "",
  });

  const { postData, responeData, loading } = usePost({
    url: `${AuthEndpoints.LOGIN}`,
    payload: loginData,
  });

  if (responeData) {
    localStorage.setItem("ATK", JSON.stringify(responeData));
    dispatch(login(responeData as any));
  }

  return (
    <div>
      <div className="form-floating mb-3">
        <input
          onChange={(e) => onChangeHandler(e)}
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          required
          name="email"
          value={loginData.email}
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating">
        <input
          onChange={(e) => onChangeHandler(e)}
          type="password"
          className="form-control"
          required
          id="floatingPassword"
          placeholder="Password"
          name="password"
          value={loginData.password}
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>

      <div className="mt-4">
        <button
          className="btn btn-primary col-md-12 shadow"
          disabled={loading}
          onClick={postData}
        >
          SIGN IN
          <span
            className="spinner-grow spinner-grow-sm"
            role="status"
            aria-hidden="true"
          ></span>
        </button>
      </div>
      <div className="mt-3 text-center">
        <h6> Not a member ? Register</h6>
      </div>
    </div>
  );
};

export default Login;
