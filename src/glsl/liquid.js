import glsl from "babel-plugin-glsl/macro"

export const liquid = glsl`
uniform vec2 resolution;
uniform float time;

const int AMOUNT = 12;

void main(){
	vec2 coord = 20.0 * (gl_FragCoord.xy - resolution / 2.0) / min(resolution.y, resolution.x);

	float len;

	for (int i = 0; i < AMOUNT; i++){
		len = length(vec2(coord.x, coord.y));

		coord.x = coord.x - sin(coord.y + sin(len)) + sin(time / 1.0);
		coord.y = coord.y + sin(coord.x + cos(len)) + sin(time / 12.0);
	}

	// gl_FragColor = vec4(cos(len * 1.0), cos(len * 2.0), cos(len * 4.0), 1.0);

	vec3 color = vec3(cos(len * 5.0), cos(len * 1.0), cos(len * 7.0));
	gl_FragColor = vec4(color, 1.0);
}
`