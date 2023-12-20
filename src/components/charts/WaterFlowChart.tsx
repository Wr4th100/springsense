"use client"

import { api } from "@/trpc/react";
import React, { useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";

// type Props = {}
type Props = {
  width: number;
  height: number;
  className?: string;
};


const WaterFlowLineChart = (props:Props) => {  

  const WaterFlowQuery = api.spring.findAllWaterFlow.useQuery();
  
  return (
    <LineChart
      width={props.width}
      height={props.height}
      data={WaterFlowQuery.data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      className={props.className}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Legend />
      <Line type="monotone" dataKey="water_flow" stroke="#8884d8" />
      {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
    </LineChart>
  );
};

export default WaterFlowLineChart;
