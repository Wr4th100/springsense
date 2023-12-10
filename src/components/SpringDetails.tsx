"use client";

import useSpring from "@/hooks/use-spring";
import React from "react";

const SpringDetails = () => {
  const springStore = useSpring();
  return (
    <div className="rounded border p-4">
      {springStore.springName ? (
        <div>
          <p className="text-2xl font-bold capitalize">
            {springStore.springName}{" "}
          </p>
          <p className=""> Latitude: {springStore.x}</p>
          <p className=""> Longitude: {springStore.y}</p>
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center">
          <p className="text-lg font-light">
            Click on a spring to view details
          </p>
        </div>
      )}
    </div>
  );
};

export default SpringDetails;
