import { io } from "socket.io-client"
import create from "zustand"
import { SOCKET_URI } from "./config"

export const useStore = create((set) => ({
  players: [],
  updatePlayers: (players) => set((state) => ({ players })),
}))

console.log(`Connecting to ${SOCKET_URI}`)
const socket = io(SOCKET_URI)

socket.on("data", (data) => {
  useStore.getState().updatePlayers(data.players)
})
