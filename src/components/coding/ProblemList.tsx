import React, { useEffect, useState } from "react";
import Problems from "./problems.json";
import Categorys from "./category.json";
import axios from "axios";

interface IProblems {
  id: number;
  title: string;
  category_id: number;
  code_id: number;
}

const ProblemList: React.FC = () => {
  const [listt, setListt] = useState<any[]>();
  /**
   *  GROUP BY THE PROBLEMS BY CATEGORY ID
   */

  const getProblemList = async () => {
    const { data } = await axios.get(
      `http://localhost:3005/api/coding/problems`
    );

    if (data && data.success) {
      setListt(data.data);
    }
  };

  useEffect(() => {
    getProblemList();
  }, []);

  return (
    <div className="row container mt-5 mx-auto">
      {listt &&
        listt.length > 0 &&
        listt.map((it, index) => {
          return (
            <div className="col-md-4 ">
              <ul key={index} className="list-group">
                <li
                  key={it.category}
                  className="list-group-item active"
                  aria-current="true"
                >
                  {it?.category}
                </li>

                {it &&
                  it.problems &&
                  it.problems.length > 0 &&
                  it.problems.map((item: { title: string }, ind: number) => {
                    return (
                      <li key={ind} className="list-group-item shadow">
                        {item?.title}
                      </li>
                    );
                  })}
              </ul>
            </div>
          );
        })}
    </div>
  );
};

export default ProblemList;
