import react, { useRef, useState, useEffect } from "react";
import { useAspect } from "@react-three/drei";
import * as THREE from "three";
import url from "../testvid.mp4";



export function Screen (props) {
//     // const size = useAspect(18, 10);
    const mesh = useRef()
    const [ video ] = useState(() => {
	    const vid = document.createElement("video");
        vid.src=url;
        vid.crossOrigin = "Anonymous";
        vid.loop = true;
        vid.muted = true;
        vid.play();
        return vid;
        // navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        // .then(function(stream) {
        // vid.srcObject = stream;
        // vid.play();
        // }
        // )
        // .catch(function(err) {
        //     console.log("An error occured! " + err);
        // });
    });
    
    useEffect(() => void video.play(), [video]);
  
     return (
       <>
       <mesh position={props.position} {...props}>
         <boxBufferGeometry args={[40, 20, 40]} />
         <meshStandardMaterial side={THREE.DoubleSide}>
           <videoTexture attach="map" args={[video]} />
           <videoTexture attach="map" args={[video]} />
           <videoTexture attach="map" args={[video]} />
           <videoTexture attach="map" args={[video]} />
           <videoTexture attach="map" args={[video]} />
           <videoTexture attach="map" args={[video]} />
        </meshStandardMaterial>
        {/* <meshPhysicalMaterial attach="material" map={texture} roughness={0} /> */}       
        </mesh>
       </>
     );
};

//   // const mediaSource = new MediaSource();
// // const url = URL.createObjectURL(mediaSource);
// // const video = 