"use client"

import Image from "next/image";
import useMapType from "@/hooks/use-map-type";
import React, { Suspense } from "react";
import MapComponent from "@/components/MapComponent";
import ImageMapComp from "@/components/ImageMapComp";
import { Common, View } from "@/components/canvas/View";
import { Contour } from "@/components/canvas/Examples";
import MapDisplay from "@/components/MapDisplay";
import SelectMapType from "@/components/SelectMapType";
import SpringDetails from "@/components/SpringDetails";


const page = () => {
  const mapType = useMapType();
  return (
    <div>
    <div className="inline-block w-full bg-gradient-to-r from-cyan-500 via-blue-300 to-blue-500 bg-clip-text pt-9 text-center text-4xl font-extrabold text-transparent">
      Alagar Hills
    </div>
          <div className="mx-11 my-8">
          <p>
            Alagarkoil is comprised of three temples, one of which is up a steep
            flight of steps on the side of a hill, and the others some distance
            away from the base of the hill. The temples are about 20 km outside of
            Madurai and are dedicated to Murugan, the second son of Shiva and a
            prominent god in southern India. Goddess Rakkayi temple is up a long
            flight of steps with many monkeys hanging around. When you take off
            your shoes to enter the temple make sure to leave your socks with your
            shoes. It's a place of washing in the natural spring water for the
            purpose of purification and it's wet inside.
          </p>
        </div>
        <div className="flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0 m-10">
          <div className="w-full md:w-1/2">
            <MapDisplay />
          </div>
          <div className="w-full space-y-2 md:w-1/2">
            <SelectMapType />
            <SpringDetails />
          </div>
        </div>
        <div>
       </div>
      </div>
  );
};

export default page;
