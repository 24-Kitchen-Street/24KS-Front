import glsl from "babel-plugin-glsl/macro"

const verttop = glsl`
#pragma glslify: snoise = require(glsl-noise-simplex/3d.glsl)

vec3 orthogonal(vec3 v) {
  return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0)
  : vec3(0.0, -v.z, v.y));
}
`

export default verttop
