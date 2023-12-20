"use client"
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const DashboardPage = () => {
  return (
    <div className="flex md:flex-row flex-col w-full">
      <div className="hidden lg:w-1/2">
        <Skeleton className="h-screen" />
      </div>
      <div className="lg:w-1/2 p-4">
        <div className="lg:w-full rounded border p-4">
          <p>
            <span className="lg:text-4xl font-bold text-primary">All Springs</span>
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
          <div className="lg:mt-8 mt-6">  
            <div className="lg:flex items-center justify-between rounded border p-2">
              <p>Azhagar Hill SpringShed</p>
              <Link href={"/spring/azhagar-hill-springshed"}>
                <div className="mt-5 flex items-center justify-center">
                <Button>View</Button>
                </div>
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
