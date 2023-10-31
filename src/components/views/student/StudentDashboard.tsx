import React from 'react'
import useFeth from '../../../hooks/useFetch'
import { TestEndpoints } from '../../../routes/routes';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const StudentDashboard:React.FC = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const {data,loading}=useFeth(`${TestEndpoints.GET_USER_SOLUTION}`,"await");   
  
  const datas = {
    // labels: ["Red", "Blue", "Yellow"],
    labels: ["Correct", "In Correct","Not Attemped"],
    datasets: [
      {
        label: "Student Exam",
        data,
        backgroundColor: [
          "rgb(54, 162, 235)",
          "rgb(255, 99, 132)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="container mt-5 mx-auto" style={{ height: 650, width: 700 }}>
      { data && data.length>0 ? 
      <Pie data={datas} />
      : loading? "Loading":" data not found"
      }
    </div>
  );
}

export default StudentDashboard;