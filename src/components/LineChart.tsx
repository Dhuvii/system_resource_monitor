import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ScriptableContext,
    Filler,
  } from "chart.js";
  import { Line } from "react-chartjs-2";
  
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler
  );
  
  type LineChartProps = {
    color?: string;
    dataY?: number[];
    dataX?: number[];
    multipleData?: { color?: string; dataY: number[] }[] | null;
    displayYAxis?: boolean;
    displayXAxis?: boolean;
    tension?: number;
  };
  
  const LineChart = ({
    color = "247, 37, 133",
    dataY,
    dataX,
    multipleData = null,
    displayYAxis = true,
    displayXAxis = false,
    tension = 0.4,
  }: LineChartProps) => {
    return (
      <Line
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              display: displayYAxis,
              beginAtZero: true,
              title: {
                display: false,
                text: "%",
              },
              grid: {
                display: true,
              },
            },
            x: {
              display: displayXAxis,
              title: {
                display: false,
                text: "Time (seconds)",
              },
              grid: {
                display: false,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
        data={{
          labels: dataX,
          datasets: !multipleData
            ? [
                {
                  tension: tension,
                  fill: "start",
                  backgroundColor: (context: ScriptableContext<"line">) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, `rgba(${color},0.2)`);
                    gradient.addColorStop(1, `rgba(${color},0.01)`);
                    return gradient;
                  },
                  borderColor: `rgba(${color},1)`,
                  borderCapStyle: "round",
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: "bevel",
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 0,
                  pointHoverRadius: 5,
                  pointHoverBorderWidth: 0,
                  pointRadius: 0,
                  pointHitRadius: 0,
                  data: dataY,
                },
              ]
            : multipleData.map(({ dataY, color }) => ({
                tension: 0.4,
                fill: "start",
                backgroundColor: (context: ScriptableContext<"line">) => {
                  const ctx = context.chart.ctx;
                  const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                  gradient.addColorStop(0, `rgba(${color},0.2)`);
                  gradient.addColorStop(1, `rgba(${color},0.01)`);
                  return gradient;
                },
                borderColor: `rgba(${color},1)`,
                borderCapStyle: "round",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "bevel",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 0,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 0,
                pointRadius: 0,
                pointHitRadius: 0,
                data: dataY,
              })),
        }}
      />
    );
  };
  
  export default LineChart;