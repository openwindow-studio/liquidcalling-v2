'use client'

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useFBO, Text } from "@react-three/drei";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";

// Working shaders from torus_landingpage
const vertexShader = `
uniform float uBendAmount;

varying vec3 worldNormal;
varying vec3 eyeVector;

void main() {
  vec3 pos = position;
  vec3 nrm = normal;

  // Bend deformation around X-axis (rotating Y/Z by angle proportional to X)
  float angle = pos.x * uBendAmount;
  float s = sin(angle);
  float c = cos(angle);

  // Apply rotation to position
  float yP = pos.y * c - pos.z * s;
  float zP = pos.y * s + pos.z * c;
  pos.y = yP;
  pos.z = zP;

  // Apply same rotation to normal
  float yN = nrm.y * c - nrm.z * s;
  float zN = nrm.y * s + nrm.z * c;
  nrm.y = yN;
  nrm.z = zN;

  vec4 worldPos = modelMatrix * vec4(pos, 1.0);
  vec4 mvPosition = viewMatrix * worldPos;

  gl_Position = projectionMatrix * mvPosition;

  worldNormal = normalize(modelMatrix * vec4(nrm, 0.0)).xyz;
  eyeVector = normalize(worldPos.xyz - cameraPosition);
}
`;

const fragmentShader = `
uniform float uIorR;
uniform float uIorY;
uniform float uIorG;
uniform float uIorC;
uniform float uIorB;
uniform float uIorP;

uniform float uSaturation;
uniform float uChromaticAberration;
uniform float uRefractPower;
uniform float uFresnelPower;
uniform float uShininess;
uniform float uDiffuseness;
uniform float uOpacity;
uniform vec3 uLight;

uniform vec2 winResolution;
uniform sampler2D uTexture;

varying vec3 worldNormal;
varying vec3 eyeVector;

vec3 sat(vec3 rgb, float adjustment) {
  const vec3 W = vec3(0.2125, 0.7154, 0.0721);
  vec3 intensity = vec3(dot(rgb, W));
  return mix(intensity, rgb, adjustment);
}

float fresnel(vec3 eyeVector, vec3 worldNormal, float power) {
  float fresnelFactor = abs(dot(eyeVector, worldNormal));
  float inversefresnelFactor = 1.0 - fresnelFactor;

  return pow(inversefresnelFactor, power);
}

float specular(vec3 light, float shininess, float diffuseness) {
  vec3 normal = worldNormal;
  vec3 lightVector = normalize(-light);
  vec3 halfVector = normalize(eyeVector + lightVector);

  float NdotL = dot(normal, lightVector);
  float NdotH =  dot(normal, halfVector);
  float kDiffuse = max(0.0, NdotL);
  float NdotH2 = NdotH * NdotH;

  float kSpecular = pow(NdotH2, shininess);
  return  kSpecular + kDiffuse * diffuseness;
}

const int LOOP = 16;

void main() {
  float iorRatioRed = 1.0/uIorR;
  float iorRatioGreen = 1.0/uIorG;
  float iorRatioBlue = 1.0/uIorB;

  vec2 uv = gl_FragCoord.xy / winResolution.xy;
  vec3 normal = worldNormal;
  vec3 color = vec3(0.0);

  for ( int i = 0; i < LOOP; i ++ ) {
    float slide = float(i) / float(LOOP) * 0.1;

    vec3 refractVecR = refract(eyeVector, normal,(1.0/uIorR));
    vec3 refractVecY = refract(eyeVector, normal, (1.0/uIorY));
    vec3 refractVecG = refract(eyeVector, normal, (1.0/uIorG));
    vec3 refractVecC = refract(eyeVector, normal, (1.0/uIorC));
    vec3 refractVecB = refract(eyeVector, normal, (1.0/uIorB));
    vec3 refractVecP = refract(eyeVector, normal, (1.0/uIorP));

    float r = texture2D(uTexture, uv + refractVecR.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).x * 0.5;

    float y = (texture2D(uTexture, uv + refractVecY.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).x * 2.0 +
                texture2D(uTexture, uv + refractVecY.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).y * 2.0 -
                texture2D(uTexture, uv + refractVecY.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).z) / 6.0;

    float g = texture2D(uTexture, uv + refractVecG.xy * (uRefractPower + slide * 2.0) * uChromaticAberration).y * 0.5;

    float c = (texture2D(uTexture, uv + refractVecC.xy * (uRefractPower + slide * 2.5) * uChromaticAberration).y * 2.0 +
                texture2D(uTexture, uv + refractVecC.xy * (uRefractPower + slide * 2.5) * uChromaticAberration).z * 2.0 -
                texture2D(uTexture, uv + refractVecC.xy * (uRefractPower + slide * 2.5) * uChromaticAberration).x) / 6.0;

    float b = texture2D(uTexture, uv + refractVecB.xy * (uRefractPower + slide * 3.0) * uChromaticAberration).z * 0.5;

    float p = (texture2D(uTexture, uv + refractVecP.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).z * 2.0 +
                texture2D(uTexture, uv + refractVecP.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).x * 2.0 -
                texture2D(uTexture, uv + refractVecP.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).y) / 6.0;

    float R = r + (2.0*p + 2.0*y - c)/3.0;
    float G = g + (2.0*y + 2.0*c - p)/3.0;
    float B = b + (2.0*c + 2.0*p - y)/3.0;

    color.r += R;
    color.g += G;
    color.b += B;

    color = sat(color, uSaturation);
  }

  // Divide by the number of layers to normalize colors
  color /= float( LOOP );

  // Specular
  float specularLight = specular(uLight, uShininess, uDiffuseness);
  color += specularLight;

  // Fresnel
  float f = fresnel(eyeVector, normal, uFresnelPower);
  color.rgb += f * vec3(1.0);

  gl_FragColor = vec4(color, uOpacity);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

const Geometries = () => {
  const mesh = useRef();
  const backgroundGroup = useRef();

  const mainRenderTarget = useFBO();
  const backRenderTarget = useFBO();

  // Hardcoded values from working example
  const uniforms = useMemo(() => ({
    uTexture: { value: null },
    uIorR: { value: 1.15 },
    uIorY: { value: 1.16 },
    uIorG: { value: 1.18 },
    uIorC: { value: 1.22 },
    uIorB: { value: 1.22 },
    uIorP: { value: 1.22 },
    uRefractPower: { value: 0.25 },
    uChromaticAberration: { value: 0.5 },
    uOpacity: { value: 0.7 },
    uBendAmount: { value: 0.0 },
    uSaturation: { value: 1.14 },
    uShininess: { value: 15.0 },
    uDiffuseness: { value: 0.2 },
    uFresnelPower: { value: 8.0 },
    uLight: { value: new THREE.Vector3(-1.0, 1.0, 1.0) },
    winResolution: {
      value: new THREE.Vector2(
        typeof window !== 'undefined' ? window.innerWidth : 1920,
        typeof window !== 'undefined' ? window.innerHeight : 1080
      ).multiplyScalar(typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1)
    }
  }), []);

  useFrame((state) => {
    if (!mesh.current || !backgroundGroup.current) return;

    const { gl, scene, camera } = state;
    mesh.current.visible = false;
    backgroundGroup.current.visible = true;

    // Animated bend
    const time = state.clock.getElapsedTime();
    const animatedBend = Math.sin(time * 0.5) * 0.2;
    mesh.current.material.uniforms.uBendAmount.value = animatedBend;

    // Render background pass
    gl.setRenderTarget(backRenderTarget);
    gl.render(scene, camera);

    mesh.current.material.uniforms.uTexture.value = backRenderTarget.texture;
    mesh.current.material.side = THREE.BackSide;
    mesh.current.visible = true;
    backgroundGroup.current.visible = false;

    // Render main pass
    gl.setRenderTarget(mainRenderTarget);
    gl.render(scene, camera);

    mesh.current.material.uniforms.uTexture.value = mainRenderTarget.texture;
    mesh.current.material.side = THREE.FrontSide;

    gl.setRenderTarget(null);
  });

  return (
    <>
      <group ref={backgroundGroup} visible={false}>
        <mesh position={[-4, -3, -4]}>
          <icosahedronGeometry args={[2, 16]} />
          <meshBasicMaterial color="white" />
        </mesh>
        <mesh position={[4, -3, -4]}>
          <icosahedronGeometry args={[2, 16]} />
          <meshBasicMaterial color="white" />
        </mesh>
        <mesh position={[-5, 3, -4]}>
          <icosahedronGeometry args={[2, 16]} />
          <meshBasicMaterial color="white" />
        </mesh>
        <mesh position={[5, 3, -4]}>
          <icosahedronGeometry args={[2, 16]} />
          <meshBasicMaterial color="white" />
        </mesh>
        <Text
          position={[0, -1.5, -3.5]}
          fontSize={0.8}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          actually private voice calls
        </Text>
      </group>
      <mesh ref={mesh}>
        <torusGeometry args={[3.3, 1.1, 32, 100]} />
        <shaderMaterial
          key={uuidv4()}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
        />
      </mesh>
    </>
  );
};

const TorusCanvas = () => {
  console.log('🚀 TorusCanvas is rendering!');

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 9999,
      background: 'rgba(255, 0, 0, 0.5)',
      pointerEvents: 'none',
      border: '10px solid lime'
    }}>
      <h1 style={{ color: 'white', fontSize: '30px', margin: '20px' }}>TORUS CONTAINER IS HERE!</h1>
      <Canvas
        camera={{ position: [4, -2, 7] }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ width: '100%', height: '100%', background: 'blue' }}
        onCreated={() => console.log('🎨 Three.js Canvas created!')}
      >
        <ambientLight intensity={1.0} />
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshBasicMaterial color="yellow" />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default TorusCanvas;