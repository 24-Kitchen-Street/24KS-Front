export const SOCKET_URI =
  process.env.REACT_APP_SOCKET_URI_MODE === "local"
    ? "http://localhost:80"
    : "https://back-24ks.herokuapp.com/"
