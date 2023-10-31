import React, {  useState } from "react";
import { RootState } from "../../../rtk/store";
import { useSelector } from "react-redux";
import { TestEndpoints } from "../../../routes/routes";
import usePost from "../../../hooks/usePost";
import useFeth from "../../../hooks/useFetch";



interface ISolution{
  questionId:string;
  answer:string
}

const MCQ: React.FC = () => {
  const authData=useSelector((state:RootState)=>state.auth.authData);
  const [userSolution,setUserSolution]=useState<ISolution[]>([]);

  const onChangeHandler=(e: React.ChangeEvent<HTMLInputElement>,questionId:string)=>{
    const {value}=e.target;
    const checkId = userSolution.find(i => i.questionId === questionId);
    if(checkId){
     // update solution
      const updateAnswer = userSolution.filter((item) => {
        if (item.questionId === questionId){
          item.answer = value;
        }
        return item;
      });
      setUserSolution(updateAnswer);
    }else{ 
     // insert solution
     setUserSolution([...userSolution,{questionId,answer:value}]);
    }    
  };

  console.log("=================authData",authData);

  const {data:mcqList,loading:listLoading}= useFeth(`${TestEndpoints.MCQ_LIST}`,"await");
  const {postData,loading:postLoading}=usePost({
    url:`${TestEndpoints.SUBMIT_SOLUTION}`,
    payload:{
      userId:authData && authData.user && authData.user._id,
      userSolution
    }
  });


 
  return (
    <div className="container">
      <ul>
        {mcqList &&
          mcqList.length > 0 ?
          mcqList.map(
            (item: {_id:string; question: string; options: string[]}, index) => {
              return (
                <li key={index}>
                  <h6>Q{index+1}: {item.question} </h6>
                  {item &&
                    item.options &&
                    item.options.length > 0 &&
                    item.options.map((it,idx) => {
                      return (
                        <div className="form-check" key={idx}>
                          <input
                            key={idx}
                            className="form-check-input"
                            type="radio"
                            name="answer"
                            id="exampleRadios1"
                            value={it}
                            onChange={(e)=>onChangeHandler(e,item._id)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios1"
                          >
                          {it}
                          </label>
                        </div>
                      );
                    })}
                </li>
              )}
          ):listLoading?"Loading...":"data not found"
        }
      </ul>

      <div>
          <button className="btn btn-dark" disabled={postLoading} onClick={()=>postData()}>
             Submit 
             {postLoading &&(
              <div className="spinner-grow spinner-grow-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
             )}
          </button>
      </div>
      {/* <div className="mt-5">
          <button className="btn btn-dark" onClick={()=>getSolution()}> solutions </button>
      </div> */}
    </div>
  );
};

export default MCQ;
