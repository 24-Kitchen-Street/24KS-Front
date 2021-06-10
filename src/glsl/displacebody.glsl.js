import glsl from "babel-plugin-glsl/macro"

const displaceBody = glsl`
vec3 displacedPosition = displace(position);
    float offset = 0.1;
    vec3 tangent = orthogonal(normal);
    vec3 bitangent = normalize(cross(normal, tangent));
    vec3 neighbour1 = position + tangent * offset;
    vec3 neighbour2 = position + bitangent * offset;
    vec3 displacedNeighbour1 = displace(neighbour1);
    vec3 displacedNeighbour2 = displace(neighbour2);

    // https://i.ya-webdesign.com/images/vector-normals-tangent-16.png
    vec3 displacedTangent = displacedNeighbour1 - displacedPosition;
    vec3 displacedBitangent = displacedNeighbour2 - displacedPosition;

    // https://upload.wikimedia.org/wikipedia/commons/d/d2/Right_hand_rule_cross_product.svg
    vec3 displacedNormal = normalize(cross(displacedTangent, displacedBitangent));
`

export default displaceBody
