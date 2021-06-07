import create from "zustand"

import { getData } from "./fakeServer"

export const useStore = create((set) => ({
  players: [],
  updatePlayers: () => set((state) => ({ players: JSON.parse(getData()) })),
}))
