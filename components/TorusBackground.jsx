import React, { useMemo, useRef } from "react";
import { OrbitControls, useFBO, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";

// Import shaders as strings
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

  // Divide by the number of layers to normalize colors (rgb values can be worth up to the value of LOOP)
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

const TorusGeometries = () => {
  const mesh = useRef();
  const backgroundGroup = useRef();

  const mainRenderTarget = useFBO();
  const backRenderTarget = useFBO();

  // Hardcoded parameter values from the original useControls
  const hardcodedParams = {
    light: new THREE.Vector3(-1.0, 1.0, 1.0),
    diffuseness: 0.05,
    shininess: 5.0,
    fresnelPower: 2.0,
    opacity: 0.7,
    iorR: 1.15,
    iorY: 1.16,
    iorG: 1.18,
    iorC: 1.22,
    iorB: 1.22,
    iorP: 1.22,
    saturation: 1.14,
    chromaticAberration: 0.5,
    refraction: 0.25
  };

  const uniforms = useMemo(() => ({
    uTexture: {
      value: null,
    },
    uIorR: { value: hardcodedParams.iorR },
    uIorY: { value: hardcodedParams.iorY },
    uIorG: { value: hardcodedParams.iorG },
    uIorC: { value: hardcodedParams.iorC },
    uIorB: { value: hardcodedParams.iorB },
    uIorP: { value: hardcodedParams.iorP },
    uRefractPower: {
      value: hardcodedParams.refraction,
    },
    uChromaticAberration: {
      value: 0.1
    },
    uOpacity: { value: 0.15 },
    uBendAmount: { value: 0.0 },
    uSaturation: { value: 2.0 },
    uShininess: { value: hardcodedParams.shininess },
    uDiffuseness: { value: hardcodedParams.diffuseness },
    uFresnelPower: { value: hardcodedParams.fresnelPower },
    uLight: {
      value: hardcodedParams.light,
    },
    winResolution: {
      value: new THREE.Vector2(
        window.innerWidth,
        window.innerHeight
      ).multiplyScalar(Math.min(window.devicePixelRatio, 2)),
    },
  }), []);

  useFrame((state) => {
    const { gl, scene, camera } = state;
    mesh.current.visible = false;
    if (backgroundGroup.current) backgroundGroup.current.visible = true;

    // Apply hardcoded values to uniforms
    mesh.current.material.uniforms.uDiffuseness.value = hardcodedParams.diffuseness;
    mesh.current.material.uniforms.uShininess.value = hardcodedParams.shininess;
    mesh.current.material.uniforms.uLight.value = hardcodedParams.light;
    mesh.current.material.uniforms.uFresnelPower.value = hardcodedParams.fresnelPower;
    mesh.current.material.uniforms.uOpacity.value = hardcodedParams.opacity;

    // Slow automatic bend animation between -0.2 and 0.2
    const time = state.clock.getElapsedTime();
    const animatedBend = Math.sin(time * 0.5) * 0.2;
    mesh.current.material.uniforms.uBendAmount.value = animatedBend;

    mesh.current.material.uniforms.uIorR.value = hardcodedParams.iorR;
    mesh.current.material.uniforms.uIorY.value = hardcodedParams.iorY;
    mesh.current.material.uniforms.uIorG.value = hardcodedParams.iorG;
    mesh.current.material.uniforms.uIorC.value = hardcodedParams.iorC;
    mesh.current.material.uniforms.uIorB.value = hardcodedParams.iorB;
    mesh.current.material.uniforms.uIorP.value = hardcodedParams.iorP;

    mesh.current.material.uniforms.uSaturation.value = hardcodedParams.saturation;
    mesh.current.material.uniforms.uChromaticAberration.value = hardcodedParams.chromaticAberration;
    mesh.current.material.uniforms.uRefractPower.value = hardcodedParams.refraction;

    gl.setRenderTarget(backRenderTarget);
    gl.render(scene, camera);

    mesh.current.material.uniforms.uTexture.value = backRenderTarget.texture;
    mesh.current.material.side = THREE.BackSide;

    mesh.current.visible = true;

    if (backgroundGroup.current) backgroundGroup.current.visible = false;

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
          <meshBasicMaterial color="#0066FF" />
        </mesh>
        <mesh position={[4, -3, -4]}>
          <icosahedronGeometry args={[2, 16]} />
          <meshBasicMaterial color="#FF3366" />
        </mesh>
        <mesh position={[-5, 3, -4]}>
          <icosahedronGeometry args={[2, 16]} />
          <meshBasicMaterial color="#3366FF" />
        </mesh>
        <mesh position={[5, 3, -4]}>
          <icosahedronGeometry args={[2, 16]} />
          <meshBasicMaterial color="#FF6633" />
        </mesh>
        <Text
          position={[0, -1.5, -3.5]}
          fontSize={0.8}
          color={"white"}
          anchorX="center"
          anchorY="middle"
          characters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ "
        >
          actually private voice calls
        </Text>
      </group>
      <mesh ref={mesh}>
        <torusGeometry args={[12, 4, 32, 100]} />
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

export default TorusGeometries;