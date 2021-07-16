import { MeshBasicMaterial, VideoTexture } from "three"
import { sRGBEncoding } from "three"
import Hls from "hls.js"

let canPlay = false
const video = document.createElement("video")
video.muted = false
video.preload = "auto"
video.type = "application/x-mpegURL"
const hls = new Hls()
hls.loadSource(
  "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8"
)
hls.attachMedia(video)

hls.on(Hls.Events.MANIFEST_PARSED, function () {
  canPlay = true
})

export const playVideo = () => {
  if (canPlay) {
    video.play()
  } else {
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      video.play()
    })
  }
}

const videoTex = new VideoTexture(video)
export const streamMaterial = new MeshBasicMaterial({ map: videoTex })
videoTex.encoding = sRGBEncoding
videoTex.flipY = false // For some reason the video texture is upside down, needs flipping
streamMaterial.toneMapped = false
