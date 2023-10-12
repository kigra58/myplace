import React, { useEffect, useState } from "react";
import Problems from "./problems.json";
import Categorys from "./category.json";

interface IProblems{
    id:number;
    title:string;
    category_id:number;
    code_id:number;
}

const ProblemList: React.FC = () => {
    const [listt,setListt]=useState<any[]>()
  /**
   *  GROUP BY THE PROBLEMS BY CATEGORY ID
   */

  const groupBy = (arr: any[], key: string): any[] => {

     return arr.reduce((acc, curr) => {
      acc[curr[key]] = acc[curr[key]] || [];
      acc[curr[key]].push(curr);
      return acc;
    
    }, {});
  };

  useEffect(()=>{
    setListt(groupBy(Problems, "category_id"))
  },[])
 
  console.log("=================0000000000",listt)
  return (
    <div>
    
      { listt && listt.length > 0 &&
        listt.map((it, ind) => (
          <ul className="list-group">
            <li key={ind} className="list-group-item active" aria-current="true">
                {Categorys[it.id].title}
            </li>
            {it && it.length>0 && it.map((itt:IProblems,indx:number)=>(
                    <li key={indx} className="list-group-item"> {itt?.title} </li>
                ))
            }
          </ul>
        ))} 
     
    </div>
  );
};

export default ProblemList;
