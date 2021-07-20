export const SOCKET_URI =
  process.env.REACT_APP_SOCKET_URI_MODE === "local"
    ? "http://localhost:8080"
    : process.env.REACT_APP_SOCKET_URI

export const STREAM_URL =
  process.env.REACT_APP_STREAM_URL ||
  "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8"

export const TICK_INTERVAL = 50
export const MAX_MESSAGES = 100
export const CLUB_ENTRANCE = [0, 0, 450]
export const INTRO_POSITION = [0, 0, 600]
