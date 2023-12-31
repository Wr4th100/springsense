"use client"

import { api } from "@/trpc/react";
import React, { useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";

// type Props = {}

type Props = {
  quality:
    | "pH"
    | "Turbidity"
    | "WaterLevel"
    | "Temperature"
    | "DissolvedOxygen";
};

interface GraphResult {
  date: string;
  value: number;
}
const SpringLineChart = ({ quality }: Props) => {
  const [graphData, setGraphData] = useState<GraphResult[]>();

  const phQuery = api.spring.findAllPh.useQuery();
  const turbidityQuery = api.spring.findAllTurbidity.useQuery();

  return (
    <LineChart
      width={330}
      height={250}
      data={phQuery.data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Legend />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
      {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
    </LineChart>
  );
};

export default SpringLineChart;
