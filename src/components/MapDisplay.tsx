"use client";

import useMapType from "@/hooks/use-map-type";
import React, { Suspense } from "react";
import MapComponent from "./MapComponent";
import ImageMapComp from "./ImageMapComp";
import { Common, View } from "./canvas/View";
import { Contour } from "./canvas/Examples";

const MapDisplay = () => {
  const mapType = useMapType();

  return (
    <div>
      {mapType.mapType === "boundaryOfHill" && (
        <MapComponent
          kmlFile={
            "https://uploadthing.com/f/d1cddf44-880c-4b25-8bbc-89f1281b8457-17th2.kml"
          }
        />
      )}
      {mapType.mapType === "contourMap2D" && (
        <MapComponent
          kmlFile={
            "https://uploadthing.com/f/d3e2a0c0-4bff-4569-9ae2-e0f4d2bbf892-y89anw.kml"
          }
        />
      )}
      {mapType.mapType === "contourMap2DImage" && (
        <ImageMapComp image="https://uploadthing.com/f/c21205ec-e057-4a76-ba98-97c9d90462bf-ovuwti.png" />
      )}
      {mapType.mapType === "rechargeArea" && (
        <MapComponent
          kmlFile={
            "https://uploadthing.com/f/6400705c-1f9f-4955-a9a6-9708c4989762-oaf7i2.kml"
          }
        />
      )}
      {mapType.mapType === "waterShedMap" && (
        <MapComponent
          kmlFile={
            "https://uploadthing.com/f/b838ed4c-6e32-4f51-81fc-e043da0ba239-2zqd35.kml"
          }
        />
      )}
      {mapType.mapType === "waterShedMapImage" && (
        <ImageMapComp image="https://uploadthing.com/f/4379616b-f5ee-4a41-8d82-504817636c0d-hz4156.png" />
      )}
      {mapType.mapType === "contourMap3D" && (
        <View
          className="flex h-[400px] w-full flex-col items-center justify-center rounded-md border md:h-[700px]"
          orbit
        >
          <Suspense fallback={null}>
            <Contour
              scale={0.05}
              position={[350, -220, 110]}
              rotation={[0, 10, 0]}
            />
            <Common color="#00ff" />
          </Suspense>
        </View>
      )}
    </div>
  );
};

export default MapDisplay;
