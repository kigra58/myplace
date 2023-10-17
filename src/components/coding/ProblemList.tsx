import React, { useEffect, useState } from "react";
import axios from "axios";

const ProblemList: React.FC = () => {
  const [listt, setListt] = useState<any[]>();
  const [loading, setLoading] = useState(false);
  /**
   *  GROUP BY THE PROBLEMS BY CATEGORY ID
   */

  const getProblemList = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:3005/api/coding/problems`
      );
      if (data && data.success) {
        setListt(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProblemList();
  }, []);

  return (
    <div className="row container mt-5 mx-auto">
      {listt && listt.length > 0
        ? listt.map((it, index) => {
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
          })
        : loading
        ? "Loading..."
        : "Data Not Found"}
    </div>
  );
};

export default ProblemList;
