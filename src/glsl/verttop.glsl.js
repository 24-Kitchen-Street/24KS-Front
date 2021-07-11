import glsl from "babel-plugin-glsl/macro"

export const verttop = glsl`

attribute float speed;
attribute float amplitude;
attribute float frequency;

#pragma glslify: snoise = require(glsl-noise-simplex/3d.glsl)

vec3 orthogonal(vec3 v) {
  return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0)
  : vec3(0.0, -v.z, v.y));
}
`
