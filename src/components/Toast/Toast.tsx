import React from "react";
import { Toast } from "react-bootstrap";

interface IProps {
  message: string;
  success: boolean;
}

const Toast1: React.FC<IProps> = ({ message, success }) => {
  // console.log("==============oooooooooo", message, success);
  if (message !== "") {
    return (
      <Toast delay={5000} bg={`${success ? "primary" : "danger"} text-white`}>
        {/* <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header> */}
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    );
  } else {
    return null;
  }
};

export default Toast1;
