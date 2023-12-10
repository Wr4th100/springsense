"use client";

import useSpring from "@/hooks/use-spring";
import { capitalizeAllCaseWords } from "@/lib/utils";
import React from "react";
import SpringLineChart from "./charts/SpringLineChart";
import { api } from "@/trpc/react";
import AdminSpringTable from "./table/AdminSpringTable";
import { Loader2 } from "lucide-react";
import SpringAreaChart from "./charts/SpringAreaChart";

const SpringDetails = () => {
  const springStore = useSpring();
  const { data: springData, isLoading } = api.spring.findAllAdminPanel.useQuery(
    undefined,
    {},
  );

  return (
    <div className="rounded border p-4">
      {springStore.springName ? (
        <div>
          <div>
            <p className="mb-2 text-2xl font-bold">
              {capitalizeAllCaseWords(springStore.springName)}{" "}
            </p>
            <p className=""> Latitude: {springStore.x}</p>
            <p className=""> Longitude: {springStore.y}</p>
          </div>
          <div className="mt-4">
            <p className="text-lg font-bold">Water Quality</p>
          </div>
          <div className="my-8 flex w-full">
            <div className="w-1/2">
              <SpringLineChart />
            </div>
            <div className="w-1/2">
              <SpringAreaChart />
            </div>
          </div>
          <div className="mt-4">
            <AdminSpringTable data={springData!} />
          </div>
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center">
          <p className="text-lg font-light">
            Click on a spring to view details
          </p>
        </div>
      )}
      {isLoading && (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-lg font-light">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default SpringDetails;
