import react, { useRef, useState, useEffect, Fragment, useMemo  } from "react";
import { useTexture, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LinearFilter, Texture, VideoTexture } from "three";
// import url from "../testvid.mp4";



export function Screen (props) {
    const [ video ] = useState(() => {
	    const vid = document.createElement("video");
        vid.src="https://iframe.dacast.com/live/82484ae1-49e7-a7fa-184e-2ec57d9a388e/934ebbee-b712-4e40-68ed-0778849dfe9d";
        vid.crossOrigin = "Anonymous";
        vid.play();
        return vid;
    });
  //   useEffect(() => void video.play(), [video]);
  // // const [streamURL, setVideo] = useState("https://iframe.dacast.com/live/82484ae1-49e7-a7fa-184e-2ec57d9a388e/934ebbee-b712-4e40-68ed-0778849dfe9d");
  // const htmlVid = document.getElementById( 'video' );

  return (
    <>
    {/* <div>
      <video src={video} />;
    </div> */}
    {/* <mesh position={[5, 5, 0]}>
      <meshStandardMaterial side={THREE.DoubleSide}>
        <videoTexture attach="map" args={[htmlVid]} />
      </meshStandardMaterial>
      <planeGeometry args={[240, 100, 4, 4]} />
    </mesh> */}
    <Html>
    <div >
      <video id="video" src={video} />;
    </div>
    </Html>
    </>
  )
}

// export function Screen (props) {
// //     // const size = useAspect(18, 10);
//     const mesh = useRef()
//     const [ video ] = useState(() => {
// 	    const vid = document.createElement("video");
//         vid.src="https://iframe.dacast.com/live/82484ae1-49e7-a7fa-184e-2ec57d9a388e/934ebbee-b712-4e40-68ed-0778849dfe9d";
//         vid.crossOrigin = "Anonymous";
//         vid.loop = true;
//         vid.muted = true;
//         vid.play();
//         return vid;
//     });
  
    
//     useEffect(() => void video.play(), [video]);

//     const texture = useTexture(video)
  
//      return (
//        <>
//        <mesh position={props.position} {...props}>
//          <boxBufferGeometry args={[40, 20, 40]} />
//          <meshStandardMaterial side={THREE.DoubleSide}>
//            <videoTexture attach="map" args={[texture]} />
//            {/* <videoTexture attach="map" args={[video]} />
//            <videoTexture attach="map" args={[video]} />
//            <videoTexture attach="map" args={[video]} />
//            <videoTexture attach="map" args={[video]} />
//            <videoTexture attach="map" args={[video]} /> */}
//         </meshStandardMaterial>
//         {/* <meshPhysicalMaterial attach="material" map={texture} roughness={0} /> */}       
//         </mesh>
//        </>
//      );
// };

//   // const mediaSource = new MediaSource();
// // const url = URL.createObjectURL(mediaSource);
// // const video = 