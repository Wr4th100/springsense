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

// type Props = {}
type Props = {
  width: number;
  height: number;
  className?: string;
};


const TurbidityLineChart = (props:Props) => {
  const springStore = useSpring();

  const turbidityQuery = api.wq.getTurbidity.useQuery(undefined, {
    enabled: !!springStore.springName,
    refetchInterval: 5000,
  });
  return (
    <LineChart
      width={props.width}
      height={props.height}
      data={turbidityQuery.data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      className={props.className}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date">
        <Label value={"Date"} offset={0} position="bottom" fontSize={20} />{" "}
      </XAxis>
      <YAxis
        label={{ value: "Turbidity", angle: -90, position: "insideLeft", fontSize: 20 }}
      />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="turbidity" stroke="#8884d8" />
      {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
    </LineChart>
  );
};

export default TurbidityLineChart;
