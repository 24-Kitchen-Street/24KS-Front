import { io } from "socket.io-client"
import { SOCKET_URI } from "./config"
import { useStore } from "./store"

console.log(`Connecting to ${SOCKET_URI}`)
const socket = io(SOCKET_URI)

// get ID of our player from server (happens once)
socket.on("hello", (data) => {
  console.log(`Connected!`, data)
  useStore.getState().updateMe(data)
})

// get data of all players and update state
socket.on("data", (data) => {
  useStore.getState().updatePlayers(data.players)
})

// send data of our player to server
export const sendPlayerData = (data) => {
  socket.emit("player-data", data)
}
