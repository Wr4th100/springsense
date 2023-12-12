import MapDisplay from "@/components/MapDisplay";
import SelectMapType from "@/components/SelectMapType";
import SpringDetails from "@/components/SpringDetails";
import React from "react";

const DashboardPage = () => {
  return (
    <div>
      <div className="p-8">
        <div className="mb-4">
          <p className="text-4xl font-bold text-primary">
            Azhagar Hill SpringShed
          </p>
        </div>
        <div className="flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="w-full md:w-1/2">
            <MapDisplay />
          </div>
          <div className="w-full space-y-2 md:w-1/2">
            <SelectMapType />
            <SpringDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
