import React from "react";
import { Link } from "react-router-dom";
import { RootState } from "../../../rtk/store";
import { useSelector } from "react-redux";
import { TestListTH } from "../../../helper/constant";
import { ROUTES, StudentEndpoints } from "../../../routes/routes";
import useFeth from "../../../hooks/useFetch";
import moment from "moment";

const TestList: React.FC = () => {
  const authData = useSelector((state: RootState) => state.auth.authData);

  const { data: testList, loading: listLoading } = useFeth(
    `${StudentEndpoints.TEST_LIST}?userId=${authData.user._id}`,
    "await"
  );

  /**
   * 1. TOTAL MARKS
   * 2. OBTAINED MARKS
   * 3. PERCENTAGE %
   * 4. TOTAL QUESTION
   */

  return (
    <div className="container mt-5">
      <table className="table">
        <thead>
          <tr>
            {TestListTH && TestListTH.length>0 && TestListTH.map((i)=>(
              <th scope="col">{i}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {testList && testList.length > 0
            ? testList.map((it: {_id:string; created_at: number }, index: number) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td> total question </td>
                    <td> total question * 4 </td>
                    <td> correct question *4 </td>
                    <td> % </td>
                    <td>{ moment(it?.created_at).format("MMM DD YYYY")}</td>
                    <td className="text-primary"> <Link to={ROUTES.TEST_DETAILS.replace(":id",it._id)} /> <u> View </u> </td>
                  </tr>
                );
              })
            : listLoading
            ? "Loading"
            : "No test history found"}
        </tbody>
      </table>
    </div>
  );
};

export default TestList;
