"use client";

import useSpring from "@/hooks/use-spring";
import { api } from "@/trpc/react";
import React, { useState } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PhLineChart = () => {
  const springStore = useSpring();

  const ph = api.wq.getPH.useQuery(undefined, {
    enabled: !!springStore.springName,
    refetchInterval: 5000,
  });

  return (
    <LineChart
      width={630}
      height={550}
      data={ph.data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date">
        <Label value={"Date"} offset={0} position="bottom" fontSize={20} />{" "}
      </XAxis>
      <YAxis unit={""}>
        <Label value={"pH"} offset={-20} position="left" fontSize={20} />{" "}
      </YAxis>
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="ph"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
    </LineChart>
  );
};

export default PhLineChart;
