import create from "zustand"

export const useStore = create((set) => ({
  players: [],
  me: {
    isValid: false,
  },
  registerError: null,
  latency: 0,
  updatePlayers: (players) => set((state) => ({ players })),
  updateMe: (me) => set((state) => ({ me })),
  updateLatency: (latency) => set((state) => ({ latency })),
  updateRegisterError: (registerError) => set((state) => ({ registerError })),
}))
