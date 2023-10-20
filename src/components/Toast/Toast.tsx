import React from "react";

interface IProps {
  message:string;
  success:boolean
}

const Toast: React.FC<IProps> = ({ message,success}) => {
console.log("==============oooooooooo",message,success);
  if (message !== "") {
    return (
      <div
        className={`toast align-items-center text-white ${success ? "bg-primary":"bg-dangers"} border-0 shadow`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
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
  } else {
    return null;
  }
};

export default Toast;
