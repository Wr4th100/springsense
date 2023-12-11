// "use client";
import SpringDetails from "@/components/SpringDetails";
// import Link from "next/link";
import SampleChart from "@/components/charts/BarChart";
import AdminSpringTable from "@/components/table/AdminSpringTable";
import Header from "@/components/header/Header";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import SpringLineChart from "@/components/charts/SpringAreaChart";

const MapComp = dynamic(() => import("@/components/MapComponent"), {
  loading: () => (
    <Skeleton className="flex h-[800px] w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </Skeleton>
  ),
  ssr: false,
});

export default function Home() {
  return (
    <div>
      
      <div className="p-8">
        <div className="mb-4">
          <p className="text-4xl font-bold text-primary">
            Azhagar Hill SpringShed
          </p>
        </div>
        <div className="flex md:space-x-4 space-y-4 space-x-0 md:space-y-0 flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <MapComp />
          </div>
          <div className="w-full md:w-1/2">
            <SpringDetails />
          </div>
        </div>
      </div>
    </div>
  );
}
