import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function BasicPie({ user }) {
  const palette = ["#FFDEAD", "#FFB347", "#FF7F50"];
  const data = [
    {
      value: user.seen.length - user.pokemons.length,
      fill: palette[0],
      label: "Seen",
    }, // seen but not caught
    { value: user.pokemons.length, fill: palette[1], label: "Caught" }, // seen and caught
    { value: 1000 - user.seen.length, fill: palette[2], label: "Not seen yet" }, // not seen yet
  ];

  return (
    <div className="piechart">
      <PieChart series={[{ data: data }]} width={400} height={200} />
    </div>
  );
}
