import glsl from "babel-plugin-glsl/macro"

export const acid = glsl`
#pragma glslify: snoise = require(glsl-noise-simplex/3d.glsl)

uniform float time;
uniform vec3 color;
varying vec2 vUv;
void main() {

  float p = fract(snoise(vec3(vUv.xy * 0.5, time * 0.5)) * 5.);
  gl_FragColor.rgba = vec4(0.5 * sin(vUv.yxx + time) + color, p);
}
`
