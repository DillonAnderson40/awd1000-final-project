import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

export default function Sparkline({ dataPoints, trend }) {
  const data = {
    labels: dataPoints.map((_, i) => i),
    datasets: [
      {
        data: dataPoints,
        borderColor:
          trend === "up"
            ? "#00c46b"
            : trend === "down"
            ? "#ff4d4d"
            : "#888",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.35,
      },
    ],
  };

  const options = {
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: {
      x: { display: false },
      y: { display: false },
    },
    maintainAspectRatio: false,
  };

  return <div style={{ height: "45px" }}><Line data={data} options={options} /></div>;
}
