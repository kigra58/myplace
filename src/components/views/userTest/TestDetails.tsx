import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import useFetch from '../../../hooks/useFetch';




const TestDetails:React.FC = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const { data, loading, error } = useFetch(`http://localhost:3021/friends`);
  if (loading) return <h1> Loading...</h1>;
  if (error) return <h1> Unbale to fetch data</h1>;
  
  const datas = {
    // labels: ["Red", "Blue", "Yellow"],
    labels: ["School", "College", "Office"],
    datasets: [
      {
        label: "My Firends",
        data: data.map((it: any) => it.fc),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div>      
      <Pie data={datas} />;
    </div>
  )
}

export default TestDetails