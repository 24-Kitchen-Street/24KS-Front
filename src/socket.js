import { io } from "socket.io-client"
import { SOCKET_URI } from "./config"
import { useStore } from "./store"

console.log(`Connecting to ${SOCKET_URI}`)
const socket = io(SOCKET_URI)

// get ID of our player from server (happens once)
socket.on("register-complete", (data) => {
  console.log(data)
  useStore.getState().updateMe(data)
})

// get data of all players and update state
socket.on("data", (data) => {
  useStore.getState().updatePlayers(data.players)
})

export const registerPlayer = (data) => {
  socket.emit("register", data)
}

// send data of our player to server
export const sendPlayerData = (data) => {
  socket.emit("player-data", data)
}

// Check ping every so often
setInterval(() => {
  const start = Date.now()

  socket.emit("ping", () => {
    const latency = Date.now() - start
    useStore.getState().updateLatency(latency)
  })
}, 5000)
