import create from "zustand"

export const useStore = create((set) => ({
  players: [],
  me: {
    isValid: false,
  },
  registerError: null,
  generalError: null,
  latency: 0,
  feed: [],
  currentPopup: "register",
  addFeedMessage: (message) =>
    set((state) => ({
      feed: [message, ...state.feed],
    })),
  updatePlayers: (players) => set((state) => ({ players })),
  updateMe: (me) => set((state) => ({ me })),
  updateLatency: (latency) => set((state) => ({ latency })),
  updateRegisterError: (registerError) => set((state) => ({ registerError })),
  updateGeneralError: (generalError) => set((state) => ({ generalError })),
  setCurrentPopup: (currentPopup) => set((state) => ({ currentPopup })),
}))
