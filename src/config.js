const params = new URL(document.location).searchParams

export const SOCKET_URI =
  process.env.REACT_APP_SOCKET_URI_MODE === "local"
    ? process.env.REACT_APP_SOCKET_URI_LOCAL || "http://localhost:8080"
    : process.env.REACT_APP_SOCKET_URI

export const STREAM_URL =
  process.env.REACT_APP_STREAM_URL ||
  "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8"

export const TICK_INTERVAL = 50
export const MAX_MESSAGES = 100
export const CLUB_ENTRANCE = [0, 0, 450]
export const INTRO_POSITION = [0, 0, 600]
export const LOGO_INTRO_POSITION = [0.5, 5.5, 599]
export const LOGO_CLUB_POSITION = [30, 0, 200]
export const SHOW_ADMIN = params.get("admin") === "1"
export const SHOW_DEBUG = params.get("debug") === "1"
export const CAM_CHANGE_RATE =
  parseInt(process.env.REACT_APP_CAM_CHANGE_RATE) || 5000
