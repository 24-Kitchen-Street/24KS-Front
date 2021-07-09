export const SOCKET_URI =
  process.env.REACT_APP_SOCKET_URI_MODE === "local"
    ? "http://localhost:8080"
    : "https://back-24ks.herokuapp.com/"

export const TICK_INTERVAL = 50
export const MAX_MESSAGES = 100
export const CLUB_ENTRANCE = [0, 0, 500]
export const INTRO_POSITION = [300, 300, 300]
