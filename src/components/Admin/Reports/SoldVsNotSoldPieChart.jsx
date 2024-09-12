// src/components/SoldVsNotSoldPieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

// Data for the pie chart
const data = {
  labels: ["Sold", "Not Sold"],
  datasets: [
    {
      label: "Product Sales Status",
      data: [70, 30], // Replace with your actual data
      backgroundColor: [
        "rgba(75, 192, 192, 0.2)", // Color for 'Sold'
        "rgba(255, 99, 132, 0.2)", // Color for 'Not Sold'
      ],
      borderColor: [
        "rgba(75, 192, 192, 1)", // Border color for 'Sold'
        "rgba(255, 99, 132, 1)", // Border color for 'Not Sold'
      ],
      borderWidth: 1,
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
          const label = context.label || "";
          const value = context.raw || 0;
          return `${label}: ${value}%`;
        },
      },
    },
  },
};

function SoldVsNotSoldPieChart() {
  return (
    <>
      <div title="title" style={{width:"350px"}}>
        <h2 className="tm-block-title">Products Sales: </h2>
        <Pie data={data} options={options} />
      </div>
    </>
  );
}

export default SoldVsNotSoldPieChart;
