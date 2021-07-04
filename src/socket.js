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

// Show message to admin after ban
socket.on("ban-response", (data) => {
  useStore.getState().updateBanResponse(data.message)
})

// Show message to admin after unban
socket.on("unban-response", (data) => {
  useStore.getState().updateUnbanResponse(data.message)
})

// get data of all players and update state
socket.on("data", ({ players, messages }) => {
  useStore.getState().updatePlayers(players)
  useStore.getState().addFeedMessages(messages)
})

// handle general server error
socket.on("server-error", ({ message }) => {
  useStore.getState().updateGeneralError(`Server error: ${message}`)
  useStore.getState().setCurrentPopup("error")
})

export const registerPlayer = (data) => {
  socket.emit("register", data)
}

export const banPlayer = (data) => {
  socket.emit("ban-player", data)
}

export const unbanIP = (data) => {
  socket.emit("unban-ip", data)
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
