import React from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["Mon", "Tue", "Web", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Demo line plot",
      backgroundColor: "#008080",
      borderColor: "#7fffd4",
      pointBorderWidth: 10,
      data: [5, 6, 9, 15, 30, 40, 80],
    },
  ],
};

const LinePlot: React.FC = () => {
  return <Line data={data} />;
};

export default LinePlot;
