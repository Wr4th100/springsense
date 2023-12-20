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

type Props = {
  width: number;
  height: number;
  className?: string;
};


const PhLineChart = (props:Props) => {
  const phQuery = api.spring.findAllPh.useQuery();
  // const ph = []
  // phValues.map((value) => {
  //   ph.push({date: v, pH: value.pH})
  // })


  return (
    <LineChart
      width={props.width}
      height={props.height}
      data={phQuery.data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      className={props.className}
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
