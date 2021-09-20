import create from "zustand"
import { MAX_MESSAGES, INTRO_POSITION } from "./config"

export const useStore = create((set) => ({
  players: [],
  skinPlayer: {
    position: INTRO_POSITION,
    rotation: [0, 0, 0],
    color: [Math.random(), Math.random(), Math.random()],
    wobbleSpeed: Math.random(),
    wobbleAmplitude: Math.random(),
    wobbleFrequency: Math.random(),
  },
  clubMode: {
    isEnabled: false,
    followingIndex: -1,
    lastChange: Date.now(),
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
  updateSkinPlayer: (properties) => {
    return set((state) => ({
      ...state,
      skinPlayer: {
        ...state.skinPlayer,
        ...properties,
      },
    }))
  },
  updatePlayers: (players) => set(() => ({ players })),
  updateMe: (me) => set((state) => ({ me: { ...state.me, ...me } })),
  updateClubMode: (settings) =>
    set((state) => ({ clubMode: { ...state.clubMode, ...settings } })),
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
  leftjoyX: 0,
  leftjoyY: 0,
  leftJoyMovement: null,
  // movementLeftJoy: (state) => {
  //   return set((state) => ({
  //     ...state,
  //     joystickLeft: {
  //         ...state.x,
  //         ...state.y,
  //     }
  //   }))
  // },
  updateLeftJoy: (event) => set(state => ({
    leftjoyX: event.x,  
    leftjoyY: event.y,
    leftJoyMovement: event.type,
  })),
  stopLeftJoy: (state) => {
    return set((state) => ({
      ...state,
      joystickLeft: {
        x : state, ...state.x,
        y: state, ...state.y 
      }
    }))
  },
  // updateRightJoy: (position) => {
  //   return set((state) => ({
  //     ...state,
  //     joystickPositions: {
  //       ...position.x,
  //       ...position.y,
  //       ...position
  //     }
  //   }))
  // },
}))

