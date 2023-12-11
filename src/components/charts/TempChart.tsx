"use client"

import { api } from "@/trpc/react";
import React, { useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";

// type Props = {}

const TempLineChart = () => {  

  const TempQuery = api.spring.findAllTemperature.useQuery();
  
  return (
    <LineChart
      width={330}
      height={250}
      data={TempQuery.data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Legend />
      <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
      {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
    </LineChart>
  );
};

export default TempLineChart;
