import glsl from "babel-plugin-glsl/macro"

export const waveVert = glsl`
    precision mediump float;
    
    uniform float time;
    uniform vec2 resolution;
    void main()	{
        gl_Position = vec4( position, 1.0 );
    }
  `