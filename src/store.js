import { io } from "socket.io-client"
import create from "zustand"

export const useStore = create((set) => ({
  players: [],
  updatePlayers: (players) => set((state) => ({ players })),
}))

const socket = io("http://localhost:3030")

socket.on("data", (data) => {
  useStore.getState().updatePlayers(data.players)
})
