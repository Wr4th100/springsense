import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import vertex from "./glsl/shader.vert";
import fragment from "./glsl/shader.frag";
import { forwardRef, useImperativeHandle, useRef } from "react";

const ShaderImpl = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.05, 0.0, 0.025),
  },
  vertex,
  fragment,
);

extend({ ShaderImpl });

const Shader = forwardRef(({ children, ...props } : { 
    children: React.ReactNode
    props: any // eslint-disable-line
}, ref) => {
  const localRef = useRef(null!);

  useImperativeHandle(ref, () => localRef.current);

  useFrame((_, delta) => (localRef.current.time += delta));
  return (
    <shaderImpl
      ref={localRef}
      glsl={THREE.GLSL3}
      {...props}
      attach="material"
    />
  );
});

export default Shader;