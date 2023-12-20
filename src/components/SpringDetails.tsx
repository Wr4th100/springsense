"use client";

import useSpring from "@/hooks/use-spring";
import { capitalizeAllCaseWords } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import AdminSpringTable from "./table/AdminSpringTable";
import { Loader2 } from "lucide-react";
import PhLineChart from "./charts/PhChart";
import TurbidityLineChart from "./charts/Turbidity";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TempLineChart from "@/components/charts/TempChart";
import DOLineChart from "@/components/charts/DOChart";
import WaterFlowLineChart from "@/components/charts/WaterFlowChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { get, onValue, ref } from "firebase/database";
import database from "@/lib/firebaseConfig";
import { AirQuality } from "@prisma/client";

const SpringDetails = () => {
  const springStore = useSpring();
  const { data: springData, isLoading } = api.spring.findAllAdminPanel.useQuery(
    undefined,
    {},
  );
  const wqDetails = api.wq.getCurrentWaterQuality.useQuery(undefined, {
    enabled: !!springStore.springName,
    refetchInterval: 5000,
  });

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
          {/* <div className="mt-4">
            <p className="text-lg font-bold">Water Quality</p>
          </div> */}
          <div className="my-8 flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <Accordion type="single" collapsible className="w-full px-8">
              <AccordionItem value="item-1">
                <AccordionTrigger>pH Analysis</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col justify-around md:flex-row">
                    <PhLineChart />
                    <Card className="">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          pH Value
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{wqDetails.data?.PH}</div>
                        <p className="text-xs text-muted-foreground">
                          +1.1% from last month
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Turbidity Analysis</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col justify-around md:flex-row">
                    <TurbidityLineChart />
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Turbidity
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {wqDetails.data?.TURBIDITY} <span className="text-sm">NTU</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          -1% from last month
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Temperature Analysis</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col justify-around md:flex-row">
                    <TempLineChart />
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Temperature
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {wqDetails.data?.TEMPERATURE} <span className="text-sm">°C</span>
                        </div>
                        {/* <p className="text-xs text-muted-foreground">
                          +5.7% from last month
                        </p> */}
                      </CardContent>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Dissolved Oxygen Analysis</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col justify-around md:flex-row">
                    <DOLineChart />
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Dissolved Oxygen
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {wqDetails.data?.DO} <span className="text-sm">mg/L</span>
                        </div>
                        {/* <p className="text-xs text-muted-foreground">
                          -1.2% from last month
                        </p> */}
                      </CardContent>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Water Flow Analysis</AccordionTrigger>
                <AccordionContent>
                  <WaterFlowLineChart />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* <div className="w-full md:w-1/2">
              <PhLineChart/>
            </div>
            <div className="w-full md:w-1/2">
              <TurbidityLineChart/>
            </div> */}
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
      {isLoading && !springStore.springName && (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-lg font-light">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default SpringDetails;
