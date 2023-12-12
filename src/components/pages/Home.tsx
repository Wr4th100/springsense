"use client";
import React from "react";
import HomeChart from "@/components/charts/HomeChart";
import { Button } from "@/components/ui/button";
import Main from "@/app/main/page";
import { Nav } from "@/components/header/Menu";
import ParticleBackground from "@/components/ParticleBackground";
import Globe from "../spline/Globe";
import { motion } from "framer-motion";
import Link from "next/link";
import DashboardPage from "../home/Dashboard";

const HomePage = () => {
  return (
    <div>
      <motion.div
        animate={{ x: 100 }}
        transition={{ ease: "easeOut", duration: 2 }}
      />

      <div className="flex justify-center">
        <h1 className="inline-block  bg-gradient-to-r from-cyan-500 via-blue-300 to-blue-500 bg-clip-text pt-9 text-5xl font-extrabold text-transparent">
          Welcome to Springshed Management Dashboard
        </h1>
      </div>
      <div className="mx-72 mb-5 mt-5 flex justify-center text-base ">
        <p className="flex items-center text-center leading-8 subpixel-antialiased">
          Explore and monitor the health of springsheds with our comprehensive
          management dashboard. Gain insights into current water levels, weather
          conditions, and historical trends to make informed decisions for
          sustainable water resource management. Stay informed about alerts,
          engage with the community, and utilize powerful analytics tools for
          effective springshed conservation. Together, let's ensure the vitality
          and resilience of our precious water ecosystems.
        </p>
      </div>

      <DashboardPage />

    <div className="flex flex-row justify-between ml-52  text-lg">
      <div className="flex items-center justify-center mr-32">
        <Globe />
      </div>

      <div className="mx-20 my-10 flex flex-col items-center justify-center">
        <p className="flex items-center text-center leading-8 subpixel-antialiased">
          "Discover the heart of our springshed management initiative by
          exploring the interactive map on the next page. Visualize the
          geographical distribution of springs, assess water quality, and access
          essential details for effective management. From flow rates to
          environmental impact, this map provides a comprehensive overview of
          our springshed ecosystem. Click the button below to navigate to the
          map and gain valuable insights that will empower your decision-making
          in sustainable water resource management."
        </p>
        <div className="m-3">
        <Link href={"/main"}>
          <Button variant="outline">View Map</Button>
        </Link>
        </div>
      </div>
      </div>

    </div>
  );
};

export default HomePage;
