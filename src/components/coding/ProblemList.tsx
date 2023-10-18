import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Endpoints } from "../../constant";
import axios from "axios";
import lodash from "lodash"

const ProblemList: React.FC = () => {
  const [listt, setListt] = useState<any[]>();
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()

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
        ? listt.sort().map((it, index) => {
            return (
              <div key={index} className="col-md-4 p-4">
                <ul key={index} className="list-group">
                  <li
                    key={it.category}
                    className="list-group-item active"
                    aria-current="true"
                  >
                    {lodash.upperFirst(it?.category)}
                  </li>

                  {it &&
                    it.problems &&
                    it.problems.length > 0 &&
                    it.problems.map((item: { title: string ,code:string,_id:string}, ind: number) => {
                      return (
                        <li key={ind} className="list-group-item shadow"  style={{cursor: "pointer"}}
                        onClick={()=>navigate(Endpoints.COMPILER.replace(":id",item._id),
                        {state:{code:item.code}})}
                        >
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
