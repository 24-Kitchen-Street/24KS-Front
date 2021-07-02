import glsl from "babel-plugin-glsl/macro"

export const acid = glsl`
uniform float time;
uniform vec3 color;
varying vec2 vUv;
void main() {
  gl_FragColor.rgba = vec4(0.5 + 0.3 * sin(vUv.yxx + time) + color, 1.0);
}
`
