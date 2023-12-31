"use client";

import { forwardRef, Suspense, useImperativeHandle, useRef } from "react";
import {
  OrbitControls,
  PerspectiveCamera,
  View as ViewImpl,
} from "@react-three/drei";
import { Three } from "@/helpers/Three";

export const Common = ({ color }: { color?: string }) => (
  <Suspense fallback={null}>
    {color && <color attach="background" args={[color]} />}
    <ambientLight intensity={0.5} />
    <pointLight position={[20, 30, 10]} intensity={1} />
    <pointLight position={[-10, -10, -10]} color="blue" />
    <PerspectiveCamera makeDefault fov={80} position={[0, 0, 10]} />
  </Suspense>
);

const View = forwardRef(
  (
    {
      children,
      className,
      orbit,
      ...props
    }: {
      children: React.ReactNode;
      orbit: boolean;
      className: string;
      props?: React.HTMLAttributes<HTMLDivElement>;
    },
    ref,
  ) => {
    const localRef = useRef(null!);
    useImperativeHandle(ref, () => localRef.current);

    return (
      <>
        <div ref={localRef} {...props} className={className} />
        <Three>
          <ViewImpl track={localRef}>
            {children}
            {orbit && <OrbitControls />}
          </ViewImpl>
        </Three>
      </>
    );
  },
);
View.displayName = "View";

export { View };
