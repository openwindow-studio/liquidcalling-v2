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