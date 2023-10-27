import React, { useState } from "react";
import axios from "axios";
import { useSelector} from "react-redux";
import { RootState } from "../../../rtk/store";
import useForm from "../../../hooks/useForm";
import { TestEndpoints } from "../../../routes/routes";


const AddMCQ: React.FC = () => {
  const authData=useSelector((state:RootState)=>state.auth.authData);
  console.log("===============authdataaaaaa",authData)
  const [loading, setLoading] = useState(false);
  const {formData:changeText,onChangeHandler,setFormData}=useForm({
    question: "",
    answer: "",
    category: "",
    option0: "",
    option1: "",
    option2: "",
    option3: "",
});


  //   const addNewInput=()=>{
  //     const inputEle=document.getElementById("addInputDiv");
  //     const clone:Node|undefined = inputEle?.cloneNode(true);
  //     const parentEle  =document.getElementById("parentDiv");
  //     if(clone) parentEle?.appendChild(clone);
  //   };

  /**
   * ON SUBMIT HANDLER
   */
  const onSubmitHandler = async () => {
    const tempArr = [];
    try {
      setLoading(true);
      if (
        changeText.option0 !== "" &&
        changeText.option1 !== "" &&
        changeText.option2 !== "" &&
        changeText.option3 !== "" &&
        changeText.answer !== "" &&
        changeText.question !== "" &&
        changeText.category !== ""
      ) {
        tempArr.push(changeText.option0);
        tempArr.push(changeText.option1);
        tempArr.push(changeText.option2);
        tempArr.push(changeText.option3);
        const { data } = await axios.post(`${TestEndpoints.CREATE_NEW_MCQ}`, {
          question: changeText.question,
          answer: changeText.answer,
          category: changeText.category,
          options: tempArr,
        });
        if (data && data.success) {
          setFormData({
            question: "",
            answer: "",
            category: "",
            option0: "",
            option1: "",
            option2: "",
            option3: "",
          });
          alert("MCQ created");
        }
      } else {
        alert("All fields are required");
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      {/* QUESTION  */}
      <div className="form-floating">
        <textarea
          className="form-control"
          name="question"
          value={changeText.question}
          onChange={(e) => onChangeHandler(e)}
          placeholder=" Enter Question"
          id="floatingTextarea2"
          style={{ height: 100 }}
        ></textarea>
        <label htmlFor="floatingTextarea2">Enter Question</label>
      </div>

      <div className="row mt-4 ">
        {/* ANSWER  */}
        <div className="col-md-6">
          <div className="form-floating mb-3">
            <input
              type="text"
              name="answer"
              value={changeText.answer}
              onChange={(e) => onChangeHandler(e)}
              className="form-control"
              id="floatingInput"
              placeholder="Enter Answer"
            />
            <label htmlFor="floatingInput">Enter Answer </label>
          </div>
        </div>
        {/* CATEGORY  */}
        <div className="col-md-6">
          <div className="form-floating mb-3">
            <input
              type="text"
              name="category"
              value={changeText.category}
              onChange={(e) => onChangeHandler(e)}
              className="form-control"
              id="floatingInput"
              placeholder="Enter Category"
            />
            <label htmlFor="floatingInput">Enter Category </label>
          </div>
        </div>
      </div>

      {/* ADD OPTIONS   */}
      <div className="row " id="parentDiv">
        <div className="col-md-6" id="addInputDiv">
          <div className="form-floating mb-3">
            <input
              type="text"
              name={`option0`}
              value={changeText.option0}
              onChange={(e) => onChangeHandler(e)}
              className="form-control"
              id="floatingInput"
              placeholder="option"
            />
            <label htmlFor="floatingInput"> Enter option 1</label>
          </div>
        </div>
        <div className="col-md-6" id="addInputDiv">
          <div className="form-floating mb-3">
            <input
              type="text"
              name={`option1`}
              value={changeText.option1}
              onChange={(e) => onChangeHandler(e)}
              className="form-control"
              id="floatingInput"
              placeholder="option"
            />
            <label htmlFor="floatingInput"> Enter option 2</label>
          </div>
        </div>
        <div className="col-md-6" id="addInputDiv">
          <div className="form-floating mb-3">
            <input
              type="text"
              name={`option2`}
              value={changeText.option2}
              onChange={(e) => onChangeHandler(e)}
              className="form-control"
              id="floatingInput"
              placeholder="option"
            />
            <label htmlFor="floatingInput"> Enter option 3</label>
          </div>
        </div>
        <div className="col-md-6" id="addInputDiv">
          <div className="form-floating mb-3">
            <input
              type="text"
              name={`option3`}
              value={changeText.option3}
              onChange={(e) => onChangeHandler(e)}
              className="form-control"
              id="floatingInput"
              placeholder="option"
            />
            <label htmlFor="floatingInput"> Enter option 4 </label>
          </div>
        </div>
      </div>
      <button
        className="btn btn-dark  "
        onClick={() => onSubmitHandler()}
        type="button"
        disabled={loading}
      >
        Submit
        {loading && (
          <div className="spinner-grow spinner-grow-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default AddMCQ;
