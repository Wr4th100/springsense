import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { api } from "@/trpc/react";

const WeatherStation = () => {
  //   const currentAcetone = api.aq.getCurrentAcetone.useQuery();
  //   const currentCO = api.aq.getCurrentCO.useQuery();
  //   const currentCO2 = api.aq.getCurrentCO2.useQuery();
  //   const currentEthanol = api.aq.getCurrentEthanol.useQuery();
  //   const currentNH4 = api.aq.getCurrentNH4.useQuery();
  //   const currentToluene = api.aq.getCurrentToluene.useQuery();
  //   const currentTemperature = api.aq.getCurrentTemperature.useQuery();
  //   const currentHumidity = api.aq.getCurrentHumidity.useQuery();
  //   const currentHeatIndex = api.aq.getCurrentHeatIndex.useQuery();

  const currentAirQuality = api.aq.getCurrentAirQuality.useQuery(undefined, {
    refetchInterval: 2000
  });


  return (
    <div className="m-4 space-y-4 rounded border p-8 w-full">
      <div>
        <p className="text-2xl font-bold text-primary">Weather Station</p>
        <p>
          Last Updated: { currentAirQuality.data?.date ? currentAirQuality.data.date.toLocaleString() : "N/A"}
        </p>
      </div>
      <div className="grid grid-cols-3 space-x-4 ">
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Acetone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentAirQuality.data?.Acetone ?? 0}{" "}
                <span className="text-sm">ppm</span>
              </div>
              {/* <p className="text-xs text-muted-foreground">
                +1.1% from last month
              </p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CO</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentAirQuality.data?.CO ?? 0}{" "}
                <span className="text-sm">ppm</span>
              </div>
              {/* <p className="text-xs text-muted-foreground">
                +1.1% from last month
              </p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                CO<sub>2</sub>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentAirQuality.data?.CO2 ?? 0}{" "}
                <span className="text-sm">ppm</span>
              </div>
              {/* <p className="text-xs text-muted-foreground">
                +1.1% from last month
              </p> */}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ethanol</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentAirQuality.data?.Ethanol ?? 0}{" "}
                <span className="text-sm">ppm</span>
              </div>
              {/* <p className="text-xs text-muted-foreground">
                +1.1% from last month
              </p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                NH<sub>4</sub>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentAirQuality.data?.NH4 ?? 0}{" "}
                <span className="text-sm">ppm</span>
              </div>
              {/* <p className="text-xs text-muted-foreground">
                +1.1% from last month
              </p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toluene</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentAirQuality.data?.Toluene ?? 0}{" "}
                <span className="text-sm">ppm</span>
              </div>
              {/* <p className="text-xs text-muted-foreground">
                +1.1% from last month
              </p> */}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentAirQuality.data?.Temperature ?? 0}{" "}
                <span className="text-sm">°C</span>
              </div>
              {/* <p className="text-xs text-muted-foreground">
                +1.1% from last month
              </p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Humidity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentAirQuality.data?.Humidity ?? 0}{" "}
                <span className="text-sm">%</span>
              </div>
              {/* <p className="text-xs text-muted-foreground">
                +1.1% from last month
              </p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Heat Index</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentAirQuality.data?.HeatIndex ?? 0}{" "}
                <span className="text-sm">°C</span>
              </div>
              {/* <p className="text-xs text-muted-foreground">
                +1.1% from last month
              </p> */}
            </CardContent>
          </Card>
        </div>
      </div>
      {/* <div className="space-y-4"></div>
      <div className="w-1/3 space-y-4"></div> */}
    </div>
  );
};

export default WeatherStation;
