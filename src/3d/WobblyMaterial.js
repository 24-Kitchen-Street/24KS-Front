/* eslint-disable react/jsx-pascal-case */

import React from "react"
import { ShaderChunk } from "three"
import ComponentMaterial from "component-material"
import verttop from "../glsl/verttop.glsl.js"
import displacebody from "../glsl/displacebody.glsl.js"

export const WobblyMaterial = React.forwardRef((props, ref) => (
  <ComponentMaterial
    ref={ref}
    from={props.from}
    uniforms={{
      speed: { value: 3, type: "float" },
      time: { value: 0, type: "float" },
      frequency: { value: 0.5, type: "float" },
      amplitude: { value: 0.5, type: "float" },
    }}
  >
    <ComponentMaterial.Vert.Head>{
      /* glsl */ `
    ${verttop}
  
    vec3 displace(vec3 point) {
      float amp = amplitude * (point.y * .5) * 1.;
      float t = time + point.x * 0.1 + point.y * 0.1;
      float sp = speed * 1.;
      float fq = frequency * 3.;
      point.x += sin(point.y * fq + t * sp) * amp;
      point.z += cos(point.y * fq + t * sp) * amp;
      return point;
    }
      `
    }</ComponentMaterial.Vert.Head>
    <ComponentMaterial.Vert.uv_vertex children={displacebody} />
    <ComponentMaterial.Vert.defaultnormal_vertex
      replaceChunk
      children={ShaderChunk.defaultnormal_vertex.replace(
        "vec3 transformedNormal = objectNormal;",
        `vec3 transformedNormal = displacedNormal;`
      )}
    />
    <ComponentMaterial.Vert.displacementmap_vertex
      replaceChunk
      children="transformed = displacedPosition;"
    />
  </ComponentMaterial>
))
