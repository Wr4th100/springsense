"use client";
import React, { lazy } from "react";

const LazySpline = lazy(() => import("@splinetool/react-spline"));

const Globe = () => {
  return (
    <div>
      <div className="w-[500px] h-[500px]">
        <LazySpline scene="https://prod.spline.design/zKWHXgAeefS7PDX5/scene.splinecode" />
      </div>
    </div>
  );
};

export default Globe;
