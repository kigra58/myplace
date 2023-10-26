import React from "react";
import { AuthEndpoints } from "../../constant";
import axios from "axios";
import useForm from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { login } from "../../rtk/reducer";


const Login: React.FC = () => {
    const dispatch=useDispatch();
    const {formData:loginData,onChangeHandler}=useForm({
        email: "",
        password:"",
    });
    
    const loginUser=async(args: { email: string; password: string; })=>{
        try {
          const {data}=await axios.post(`${AuthEndpoints.LOGIN}`,args);
          if(data && data.success){
            localStorage.setItem("ATK",JSON.stringify(data.data))
            dispatch(login(data.data));
          };
        } catch (error) {
          console.error(error);
        }
    };

  return (
    <div >
      <div className="form-floating mb-3">
        <input
          onChange={(e)=>onChangeHandler(e)}
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          name="email"
          value={loginData.email}
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating">
        <input
          onChange={(e)=>onChangeHandler(e)}
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          name="password"
          value={loginData.password}
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>

      <div className="mt-4">
        <button className="btn btn-primary col-md-12 shadow"
         onClick={()=>loginUser(loginData)}
        > SIGN IN </button>
      </div>
      <div className="mt-3 text-center">
        <h6> Not a member ? Register</h6>
      </div>
    </div>
  );
};

export default Login;
