"use client";

import SpringDetails from "@/components/SpringDetails";
// import Link from "next/link";
import SampleChart from "@/components/charts/BarChart";
import AdminSpringTable from "@/components/table/AdminSpringTable";
import Header from "@/components/header/Header";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import SpringLineChart from "@/components/charts/SpringAreaChart";
import HomePage from "./home";
import { Suspense } from 'react'



const MapComp = dynamic(() => import("@/components/MapComponent"), {
  loading: () => (
    <Skeleton className="flex h-[800px] w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </Skeleton>
  ),
  ssr: false,
});

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })
const Contour = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Contour), { ssr: false })

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
        <div className='w-full text-center md:w-3/5'>
          <View className='flex h-screen w-full flex-col items-center justify-center' orbit>
            <Suspense fallback={null}>
              <Contour scale={0.1} position={[10, -200, 10]} />
              <Common color="#00ff"/>
            </Suspense>
          </View>
        </div>

      </div>
    </div>
    // <div>
    //   <HomePage/>
    // </div>
  );
}
