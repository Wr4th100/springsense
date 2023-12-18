"use client";

import useSpring from "@/hooks/use-spring";
import { api } from "@/trpc/react";
import React, { useEffect, useRef, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";

type Props = {
  tempValues: {
    date: string;
    temperature: number;
  }[];
};

const TempLineChart = () => {
  // const timeoutRef = useRef(null);
  const springStore = useSpring();
  // const [arr, setArr] = useState<{ date: string; temperature: number }[]>([]);
  // const TempQuery = api.spring.findAllTemperature.useQuery();
  // console.log("Temperature: ", tempValues)

  const temperature = api.aq.getTemperature.useQuery(undefined, {
    enabled: !!springStore.springName,
    refetchInterval: 1000,
  });
  // console.log(data);

  // useEffect(() => {
  //   if (timeoutRef.current !== null) {
  //     clearTimeout(timeoutRef.current);
  //   }
  //   const interval = 6000;
  //   const speed = 100;
  //   // for (let i = 0; i < interval; i++) {
  //   //   timeoutRef.current = setTimeout(() => {
  //   //     timeoutRef.current = null;
  //   //     temperature.refetch(); // eslint-disable-line
  //   //   }, i * speed);
  //   // }
  // }, []);

  return (
    <LineChart
      width={630}
      height={550}
      data={temperature.data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis domain={[0, 60]} />
      <Legend />
      <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
      {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
    </LineChart>
  );
};

export default TempLineChart;
