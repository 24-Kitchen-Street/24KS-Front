// A front end faked server to get players randomly moving and rotating around the map

import { Clock } from "three"
import noise from "simplenoise"

let players = []
let numPlayers = 100

const chanceOfChange = 0.01
const clock = new Clock()
const range = 100

const createPlayer = () => ({
  id: Math.random() * 1000,
  position: [0, 0, 0],
  rotation: [0, 0, 0],
})

// Initialise a bunch of players
for (let i = 0; i < numPlayers; i++) {
  players.push(createPlayer())
}

const update = () => {
  // Maybe add a player
  if (Math.random() < chanceOfChange) {
    players.push(createPlayer())
  }

  // Maybe remove a player
  if (Math.random() < chanceOfChange) {
    const index = Math.floor(Math.random() * players.length)
    players.splice(index, 1)
  }

  players.forEach((p) => {
    noise.seed(p.id)

    const t = clock.getElapsedTime() * 0.02

    p.position = [
      noise.simplex2(p.id, t) * range,
      noise.simplex2(p.id + 1, t) * range,
      noise.simplex2(p.id + 2, t) * range,
    ]

    p.rotation = [0, noise.simplex2(p.id, t) * Math.PI, 0]
  })
}

// To truly emulate a server, data should come as a string
export const getData = () => JSON.stringify(players)

setInterval(update, 10)
