"use client";

import { useGLTF } from "@react-three/drei";

export function Contour(props: JSX.IntrinsicElements["group"]) {
  const { scene } = useGLTF("/3dContour.glb");
  return <primitive object={scene} {...props} />;
}
