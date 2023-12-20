"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { api } from "@/trpc/react";

const ForecastData = () => {
  const outflowQuery = api.flow.predictRainfall.useQuery();

  console.log(outflowQuery.data);

  return (
    <div className="my-2 rounded border p-4">
      <p className="text-2xl font-bold text-primary ">Forecast Data</p>
      <div className="flex flex-col md:flex-row gap-2">
        <Card className="w-full md:w-1/2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Predicted Rainfall
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {outflowQuery.data?.predictedRainfall}
              <span className="text-sm"> mm</span>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full md:w-1/2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Predicted Outflow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {outflowQuery.data?.predictedOutflow[0]} -{" "}
              {outflowQuery.data?.predictedOutflow[1]}
              <span className="text-sm"> litres / min </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForecastData;
