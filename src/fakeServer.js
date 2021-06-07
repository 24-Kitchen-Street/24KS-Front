// A front end faked server to get players randomly moving and rotating around the map

import { Clock } from "three"
import noise from "simplenoise"

let players = []
let numPlayers = 50

// Initialise a bunch of players
for (let i = 0; i < numPlayers; i++) {
  players.push({
    id: Math.random() * 1000,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  })
}

const clock = new Clock()

const update = () => {
  players.forEach((p) => {
    noise.seed(p.id)

    const t = clock.getElapsedTime() * 0.05

    p.position = [
      noise.simplex2(p.id, t) * 30,
      noise.simplex2(p.id + 1, t) * 30,
      noise.simplex2(p.id + 2, t) * 30,
    ]

    p.rotation = [0, noise.simplex2(p.id, t) * Math.PI, 0]
  })
}

// To truly emulate a server, data should come as a string
export const getData = () => JSON.stringify(players)

setInterval(update, 10)
