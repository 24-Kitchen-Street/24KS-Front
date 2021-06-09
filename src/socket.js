import { io } from "socket.io-client"
import { SOCKET_URI } from "./config"
import { useStore } from "./store"

console.log(`Connecting to ${SOCKET_URI}`)
const socket = io(SOCKET_URI)

// get ID of our player from server (happens once)
socket.on("register-complete", (data) => {
  useStore.getState().updateMe(data)
})

// show error if something bad happens on register
socket.on("register-error", (data) => {
  useStore.getState().updateRegisterError(data.message)
})

// get data of all players and update state
socket.on("data", (data) => {
  useStore.getState().updatePlayers(data.players)
})

// add feed messages
socket.on("feed-message", (message) => {
  useStore.getState().addFeedMessage(message)
})

export const registerPlayer = (data) => {
  socket.emit("register", data)
}

// send data of our player to server
export const sendPlayerData = (data) => {
  socket.emit("player-data", data)
}

export const sendChatMessage = (data) => {
  socket.emit("chat-message", data)
}

// Check ping every so often
setInterval(() => {
  const start = Date.now()

  socket.emit("ping", () => {
    const latency = Date.now() - start
    useStore.getState().updateLatency(latency)
  })
}, 5000)
