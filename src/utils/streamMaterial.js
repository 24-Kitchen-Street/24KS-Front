import { MeshBasicMaterial, VideoTexture } from "three"
import { sRGBEncoding } from "three"

const video = document.createElement("video")
video.muted = true
video.loop = true
video.src = "testvid.mp4"
video.play()

const videoTex = new VideoTexture(video)
export const streamMaterial = new MeshBasicMaterial({ map: videoTex })
videoTex.encoding = sRGBEncoding
videoTex.flipY = false // For some reason the video texture is upside down, needs flipping
streamMaterial.toneMapped = false
