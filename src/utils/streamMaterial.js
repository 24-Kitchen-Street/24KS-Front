import { MeshBasicMaterial, VideoTexture } from "three"
import { sRGBEncoding } from "three"
import Hls from "hls.js"
import { STREAM_URL } from "../config"

const video = document.createElement("video")
video.muted = false
video.preload = "auto"
// video.type = "application/x-mpegURL"
video.playsInline = true
const hls = new Hls()

export const playVideo = () => {
  if (Hls.isSupported()) {
    hls.loadSource(STREAM_URL)
    hls.attachMedia(video)
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      video.play()
    })
  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = STREAM_URL

    video.addEventListener("loadedmetadata", function () {
      video.play()
    })
  } else {
    alert("Your browser does not support video streaming. :(")
  }
}
const videoTex = new VideoTexture(video)
export const streamMaterial = new MeshBasicMaterial({ map: videoTex })
videoTex.encoding = sRGBEncoding
videoTex.flipY = false // For some reason the video texture is upside down, needs flipping
streamMaterial.toneMapped = false
