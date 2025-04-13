import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

// Import chartjs-plugin-zoom
import zoomPlugin from 'chartjs-plugin-zoom';

// Register chart components
ChartJS.register(
  Title, 
  Tooltip, 
  Legend, 
  LineElement, 
  CategoryScale, 
  LinearScale, 
  PointElement,
  zoomPlugin // Register the zoom plugin here
);

function ProgressTracker() {
  const chartRef = useRef(null);
  
  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"], // Example weeks
    datasets: [
      {
        label: "Weight Lifted (kg)",
        data: [50, 55, 60, 65, 70], // Example data (replace with actual progress data)
        borderColor: "rgb(34, 197, 94)", // Tailwind Teal color
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Workout Progress (Weight Lifted)",
      },
    },
    // Enable zoom functionality
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        zoom: {
          enabled: true, // Enable zooming on x-axis
        },
      },
      y: {
        zoom: {
          enabled: true, // Enable zooming on y-axis
        },
      },
    },
  };

  useEffect(() => {
    // Cleanup on unmount to prevent memory leaks
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold text-teal-600 mb-4">Your Progress</h2>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
}

export default ProgressTracker;
