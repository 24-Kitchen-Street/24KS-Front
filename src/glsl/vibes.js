import glsl from "babel-plugin-glsl/macro"

export const vibes = glsl`
#ifdef GL_ES
precision mediump float;
#endif
#pragma glslify: snoise = require(glsl-noise-simplex/3d.glsl)
uniform vec2 u_resolution;
uniform float time;
varying vec2 vUv;
const int AMOUNT = 12;
void main(){
    vec2 u_resolution = gl_FragCoord.xy ;
	vec2 coord = 20.0 * (gl_FragCoord.xy - u_resolution / 2.0) / min(u_resolution.y, u_resolution.x);
    
	float len;
    float p = fract(snoise(vec3(vUv.xy * 0.5, time * 0.5)) * 5.);
	for (int i = 0; i < AMOUNT; i++){
		len = length(vec2(coord.x, coord.y));
		coord.x = coord.x - cos(coord.y + sin(p)) + cos(time / 9.0);
		coord.y = coord.y + sin(coord.x + cos(p)) + sin(time / 12.0);
	}
	// gl_FragColor = vec4(cos(len * 2.0), cos(len * 3.0), cos(len * 1.0), 1.0);
	// we can have a seperate color, obviously. so comment out the gl_FragColor above & uncomment the lines below
	vec3 color = vec3(cos(len * 3.0), cos(len * 4.0), cos(len * 2.0));
	// gl_FragColor = vec4(color, p);
    gl_FragColor = vec4(0.8 * sin(color + vUv.yxx), 1.0);
}
`