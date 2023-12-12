import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="flex w-full">
      <div className="w-1/2">
        <Skeleton className="h-screen" />
      </div>
      <div className="w-1/2 p-4">
        <div className="w-full rounded border p-4">
          <p>
            <span className="text-4xl font-bold text-primary">All Springs</span>
          </p>
          <div className="mt-8">
            <div className="flex items-center justify-between rounded border p-2">
              <p>Azhagar Hill SpringShed</p>
              <Link href={"/dashboard/azhagar-hill-springshed"}>
                <Button>View</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
