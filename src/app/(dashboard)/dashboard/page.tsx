"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import MapComponent from "@/components/MapComponent";
import MainMap from "@/components/MainMap";

const DashboardPage = () => {
  return (
    <div className="flex w-full">
      <div className="w-1/2">
        {/* <Skeleton className="h-screen" /> */}
        <MainMap kmlFile="https://uploadthing.com/f/755eaa25-0b78-408d-904c-61db31ec543a-ugaupf.kml" zoom={6} />
      </div>
      <div className="w-1/2 p-4">
        <div className="w-full rounded border p-4">
          <p>
            <span className="text-4xl font-bold text-primary">All Springs</span>
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <div className="mt-8">
              <div className="flex items-center justify-between rounded border p-2">
                <p>Azhagar Hill SpringShed</p>
                <Link href={"/spring/azhagar-hill-springshed"}>
                  <Button>View</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
