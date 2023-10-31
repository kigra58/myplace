import React from "react";
import { TestListTH } from "../../../helper/constant";
import useFeth from "../../../hooks/useFetch";
import { ROUTES, StudentEndpoints } from "../../../routes/routes";
import { RootState } from "../../../rtk/store";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

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
            <th scope="col">SNo</th>
            <th scope="col">Total Question</th>
            <th scope="col">Total Marks</th>
            <th scope="col">Obtained Marks </th>
            <th scope="col">Percentage</th>
            <th scope="col"> Date </th>
            <th scope="col"> View </th>
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
                    <td>{moment(it?.created_at).format("MMM DD YYYY")}</td>
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
