import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Line } from "react-chartjs-2";
  
  interface MyComponentProps {
    slug: string;
  }
  
  // Register required components
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
  
  const MyComponent: React.FC<MyComponentProps> = () => {
    const data = {
      labels: ["January", "February", "March", "April", "May", "June", ""],
      datasets: [
        {
          label: "Sales",
          data: [1200, 1900, 3000, 5000, 2400, 3400, 0],
          borderColor: "#4F46E5",
          backgroundColor: "rgba(79, 70, 229, 0.2)",
        },
      ],
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top" as const,
        },
      },
    };
  
    return (
      <div className="flex">
        <Line data={data} options={options} />
      </div>
    );
  };
  
  export default MyComponent;
  