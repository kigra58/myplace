import React, { useEffect, useState } from "react";
import {  TestEndpoints, } from "../../constant";
import axios from "axios";


interface ISolution{
  questionId:string;
  answer:string
}

const MCQ: React.FC = () => {
  const [mcqList, setMCQList] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [changeText,setChangeText]=useState({
  //   questionId:"",
  //   answer:""
  // });
  const [userSolution,setUserSolution]=useState<ISolution[]>([]);

  const onChangeHandler=(e: React.ChangeEvent<HTMLInputElement>,questionId:string)=>{
    const {value}=e.target;
    const checkId = userSolution.find(i => i.questionId === questionId);
    if(checkId){
     // update solution
      console.log("=================update")
      const updateAnswer = userSolution.filter((item) => {
        if (item.questionId === questionId){
          item.answer = value;
        }
        return item;
      });
      setUserSolution(updateAnswer);
    }else{ 
     // insert solution
     console.log("==================insert")
     setUserSolution([...userSolution,{questionId,answer:value}])
    }    
  };

  const postData=async()=>{
    try {
      const {data}=await axios.post(`${TestEndpoints.SUBMIT_SOLUTION}`,{
        userId:"101",
        userSolution
      });
      if(data && data.success){
       alert("data submitted");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getMCQ = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${TestEndpoints.MCQ_LIST}`);
      if (data && data.success) {
        setMCQList(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const getSolution=async()=>{
     try {
      const {data}=await axios.get(`${TestEndpoints.GET_USER_SOLUTION}`);
      if(data && data.success){
         console.log("==============response",data.data)
      }
     } catch (error) {
      console.error(error);
     };
  };

  useEffect(() => {
    getMCQ();
  }, []);

  console.log("===================tttttttttt",userSolution);
 
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
          ):loading?"Loading...":"data not found"
        }
      </ul>

      <div>
          <button className="btn btn-dark" onClick={()=>postData()}> Submit </button>
      </div>
      <div className="mt-5">
          <button className="btn btn-dark" onClick={()=>getSolution()}> solutions </button>
      </div>
    </div>
  );
};

export default MCQ;
