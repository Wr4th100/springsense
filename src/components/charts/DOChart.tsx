"use client"

import useSpring from "@/hooks/use-spring";
import { api } from "@/trpc/react";
import React, { useState } from "react";
import { CartesianGrid, Label, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

// type Props = {}

const DOLineChart = () => {  

  const springStore = useSpring();

  const DOQuery = api.wq.getDO.useQuery(undefined, {
    enabled: !!springStore.springName,
      refetchInterval: 5000,
  })
  
  return (
    <LineChart
      width={630}
      height={550}
      data={DOQuery.data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date">
        <Label value={"Date"} offset={0} position="bottom" fontSize={20} />{" "}
      </XAxis>
      <YAxis
        label={{ value: "Dissolved O2", angle: -90, position: "insideLeft", fontSize: 20 }}
        
      />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="do" stroke="#8884d8" />
      {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
    </LineChart>
  );
};

export default DOLineChart;
