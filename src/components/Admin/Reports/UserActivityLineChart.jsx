// src/components/UserActivityLineChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

// Sample data for the line chart
const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], // Replace with your actual time periods
  datasets: [
    {
      label: "User Activity",
      data: [30, 45, 50, 40, 60, 70, 85], // Replace with your actual data
      fill: false,
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 2,
      tension: 0.1, // Optional: Makes the line smooth
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const label = context.dataset.label || "";
          const value = context.raw || 0;
          return `${label}: ${value} users`;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Month",
      },
    },
    y: {
      title: {
        display: true,
        text: "Number of Users",
      },
    },
  },
};

function UserActivityLineChart() {
  return (
    <>
      <div title="title2" style={{width:"600px"}}>
        <h2 className="tm-block-title">User Activity Over Time</h2>
        <Line data={data} options={options} title="title"/>
      </div>
    </>
  );
}

export default UserActivityLineChart;
