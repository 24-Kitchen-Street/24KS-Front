import create from "zustand"

export const useStore = create((set) => ({
  players: [],
  me: {},
  updatePlayers: (players) => set((state) => ({ players })),
  updateMe: (me) => set((state) => ({ me })),
}))
