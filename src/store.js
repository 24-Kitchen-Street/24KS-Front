import create from "zustand"

export const useStore = create((set) => ({
  players: [],
  me: {
    isValid: false,
  },
  latency: 0,
  updatePlayers: (players) => set((state) => ({ players })),
  updateMe: (me) => set((state) => ({ me })),
  updateLatency: (latency) => set((state) => ({ latency })),
}))
