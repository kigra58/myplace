import React, { useEffect } from "react";

interface IProps {
  message: string;
  success: boolean;
}

const ToastMsg: React.FC<IProps> = ({ message, success }) => {
  console.log("==============oooooooooo", message, success);
  const  ele = document.getElementById("toast");
  ele && ele.setAttribute("class", "show");
 
  useEffect(()=>{
    const timeout=  setTimeout(()=>{
      if(ele)
       ele.className = ele.className.replace("show", ""); 
    }, 500);
    return () => clearTimeout(timeout);
  },[message]);


    return (
      <div
        className="toast align-items-center text-white bg-primary border-0"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        id="toast"
      >
        <div className="d-flex">
          <div className="toast-body">{message}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    );
  
};

export default ToastMsg;
