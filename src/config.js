const params = new URL(document.location).searchParams

export const SOCKET_URI =
  process.env.REACT_APP_SOCKET_URI_MODE === "local"
    ? "http://localhost:8080"
    : "https://back-24ks.herokuapp.com/"

export const TICK_INTERVAL = 50
export const MAX_MESSAGES = 100
export const CLUB_ENTRANCE = [0, 0, 450]
export const INTRO_POSITION = [0, 0, 600]
export const SHOW_ADMIN = params.get("admin") === "1"
export const SHOW_DEBUG = params.get("debug") === "1"
export const CAM_CHANGE_RATE = 1000
