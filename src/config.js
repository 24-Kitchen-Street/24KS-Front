export const SOCKET_URI =
  process.env.REACT_APP_SOCKET_URI_MODE === "local"
    ? "http://localhost:8080"
    : "https://back-24ks.herokuapp.com/"

export const TICK_INTERVAL = 32
