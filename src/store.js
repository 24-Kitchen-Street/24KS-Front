import create from "zustand"
import { MAX_MESSAGES, INTRO_POSITION } from "./config"

export const useStore = create((set) => ({
  players: [],
  skinPlayer: {
    position: INTRO_POSITION,
    rotation: [0, 0, 0],
    color: [1, 0, 1],
    wobbleSpeed: 0.5,
    wobbleAmplitude: 0.5,
    wobbleFrequency: 0.5,
  },
  me: {
    isValid: false,
  },
  registerError: null,
  generalError: null,
  banResponse: null,
  unbanResponse: null,
  latency: 0,
  feed: [],
  currentPopup: "register",
  isShowingAdminControls: false,
  addFeedMessages: (messages) =>
    set((state) => ({
      feed: [...messages, ...state.feed].slice(0, MAX_MESSAGES),
    })),
  updatePlayers: (players) => set(() => ({ players })),
  updateMe: (me) => set(() => ({ me })),
  updateLatency: (latency) => set(() => ({ latency })),
  updateRegisterError: (registerError) => set(() => ({ registerError })),
  updateGeneralError: (generalError) => set(() => ({ generalError })),
  updateBanResponse: (banResponse) => set(() => ({ banResponse })),
  updateUnbanResponse: (unbanResponse) => set(() => ({ unbanResponse })),
  updateChatMessageResponse: (chatMessageResponse) =>
    set(() => ({ chatMessageResponse })),
  setCurrentPopup: (currentPopup) => set(() => ({ currentPopup })),
  setIsShowingAdminControls: (isShowingAdminControls) =>
    set(() => ({ isShowingAdminControls })),
}))
