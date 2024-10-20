import React from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { useGlobalContext } from "../../context/globalContext";
import { dateFormat } from "../../utils/dateFormat";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Chart() {
  const { incomes, expenses } = useGlobalContext();

  const data = {
    labels: incomes.map((inc) => {
      const { date } = inc;
      return dateFormat(date);
    }),
    datasets: [
      {
        label: "Income",
        data: [
          ...incomes.map((income) => {
            const { amount } = income;
            return amount;
          }),
        ],
        backgroundColor: "green", // Light green background fill
        borderColor: "white", // Line color
        tension: 0.2,
        borderWidth: 1, // Line thickness
      },
      {
        label: "Expenses",
        data: [
          ...expenses.map((expense) => {
            const { amount } = expense;
            return amount;
          }),
        ],
        backgroundColor: "red", // Light red background fill
        borderColor: "white", // Line color
        tension: 0.2,
        borderWidth: 1, // Line thickness
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "rgba(255, 255, 255, 0.7)", // Light color for legend text
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "rgba(255, 255, 255, 0.7)", // Light color for x-axis labels
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Light color for x-axis grid lines
        },
      },
      y: {
        ticks: {
          color: "rgba(255, 255, 255, 0.7)", // Light color for y-axis labels
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Light color for y-axis grid lines
        },
      },
    },
  };

  return (
    <div className="bg-[#212c3b] border-white border-[1px] rounded-xl mb-10 p-5">
      <Line data={data} options={options} />
    </div>
  );
}

export default Chart;
