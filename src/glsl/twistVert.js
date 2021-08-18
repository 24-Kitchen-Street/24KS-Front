import glsl from "babel-plugin-glsl/macro"

export const twistVert = glsl`
uniform float time;
uniform float height;
uniform float angle_deg_max;
varying vec3 normal, lightDir[3], eyeVec;


vec4 DoTwist( vec4 pos, float t )
{
	float st = sin(t);
	float ct = cos(t);
	vec4 new_pos;
	
	new_pos.x = pos.x*ct - pos.z*st;
	new_pos.z = pos.x*st + pos.z*ct;
	
	new_pos.y = pos.y;
	new_pos.w = pos.w;

	return( new_pos );
}


void main(void)
{
	float angle_deg = angle_deg_max*sin(time);
	float angle_rad = angle_deg * 3.14159 / 180.0;
	
	float ang = (height*0.5 + gl_Vertex.y)/height * angle_rad;
	
	vec4 twistedPosition = DoTwist(gl_Vertex, ang);
	vec4 twistedNormal = DoTwist(vec4(gl_Normal, ang), 

	gl_Position = gl_ModelViewProjectionMatrix * twistedPosition;
	
	vec3 vVertex = vec3(gl_ModelViewMatrix * twistedPosition);
	lightDir[0] = vec3(gl_LightSource[0].position.xyz - vVertex);
	lightDir[1] = vec3(gl_LightSource[1].position.xyz - vVertex);
	lightDir[2] = vec3(gl_LightSource[2].position.xyz - vVertex);
	eyeVec = -vVertex;

	normal = gl_NormalMatrix * twistedNormal.xyz;
	
	gl_TexCoord[0] = gl_MultiTexCoord0;
}
  `
