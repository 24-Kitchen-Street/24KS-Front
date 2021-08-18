import { MeshBasicMaterial, VideoTexture } from "three"
import { sRGBEncoding } from "three"
import Hls from "hls.js"
// import { useScript } from "./useScript"


const video = document.createElement("video")
video.muted = true
video.loop = true
video.preload = "auto"
video.type="application/x-mpegURL"
var hls = new Hls();
hls.loadSource("https://cdn3.wowza.com/1/aFN1TjA1UmxTY2dz/TGd0S2x2/hls/live/playlist.m3u8");
hls.attachMedia(video);
hls.on(Hls.Events.MANIFEST_PARSED,function() {
    video.play();   
    });

const videoTex = new VideoTexture(video) 
export const streamMaterial = new MeshBasicMaterial({ map: videoTex })
videoTex.encoding = sRGBEncoding
videoTex.flipY = false // For some reason the video texture is upside down, needs flipping
streamMaterial.toneMapped = false

