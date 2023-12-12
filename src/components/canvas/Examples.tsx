"use client";

import { useGLTF } from "@react-three/drei";

export function Contour(props: JSX.IntrinsicElements["group"]) {
  const { scene } = useGLTF("https://uploadthing.com/f/bdf54f99-24b7-40bb-8ac9-6d4bc045cb74-jjwpo7.glb");
  return <primitive object={scene} {...props} />;
}
