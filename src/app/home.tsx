"use client";
import React, { useState, useEffect } from "react";
import HomeChart from "@/components/charts/HomeChart";
import { Button } from "@/components/ui/button";
import Main from "./main";
import { Nav } from "@/components/header/Menu";


const HomePage = () => {
  return (
    <div>
      <Nav/>
      <div className="flex justify-center">
        <h1 className="inline-block  bg-gradient-to-r from-cyan-500 via-blue-300 to-blue-500 bg-clip-text pt-9 text-5xl font-extrabold text-transparent">
          Welcome to Springshed Management Dashboard
        </h1>
      </div>
      <div className="mx-64 mb-5 mt-5 flex justify-center text-base ">
        <p className="flex items-center text-center subpixel-antialiased ">
          Explore and monitor the health of springsheds with our comprehensive
          management dashboard. Gain insights into current water levels, weather
          conditions, and historical trends to make informed decisions for
          sustainable water resource management. Stay informed about alerts,
          engage with the community, and utilize powerful analytics tools for
          effective springshed conservation. Together, let's ensure the vitality
          and resilience of our precious water ecosystems.
        </p>
      </div>
      <div>
        <HomeChart />
      </div>
      <div className="">
        <Button variant="outline" onClick={Main}>View Map</Button>
      </div>
    </div>
  );
};

export default HomePage;
