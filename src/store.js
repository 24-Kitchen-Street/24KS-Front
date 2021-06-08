import { io } from "socket.io-client"
import create from "zustand"

export const useStore = create((set) => ({
  players: [],
  updatePlayers: (players) => set((state) => ({ players })),
}))

const socket = io("https://back-24ks.herokuapp.com/")

socket.on("data", (data) => {
  useStore.getState().updatePlayers(data.players)
})
