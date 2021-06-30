import create from "zustand"
import { MAX_MESSAGES } from "./config"

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
  addFeedMessages: (messages) =>
    set((state) => ({
      feed: [...messages, ...state.feed].slice(0, MAX_MESSAGES),
    })),
  updatePlayers: (players) => set((state) => ({ players })),
  updateMe: (me) => set((state) => ({ me })),
  updateLatency: (latency) => set((state) => ({ latency })),
  updateRegisterError: (registerError) => set((state) => ({ registerError })),
  updateGeneralError: (generalError) => set((state) => ({ generalError })),
  setCurrentPopup: (currentPopup) => set((state) => ({ currentPopup })),
}))
