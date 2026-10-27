import { player } from "../../routes/data.js"
import { User } from "../../routes/auth.js";

player.forEach(player => {
    const DefinedLevels = Math.floor(Math.random() * 100) + 1

        const level = {
            worldClass: [8,9,10],
            Elite: [7,6,5,4],
            UnderWhelming: [3,2,1]
        }

const levelDefiner = DefinedLevels >= 85 ? level.worldClass
    : DefinedLevels >= 30 ? level.Elite
        : level.UnderWhelming

const indexLevelSelect = levelDefiner.length - 1

    const indexLevel = Math.floor(Math.random() * indexLevelSelect) + 1
    const theLevel = levelDefiner[indexLevel]
    player.rating = theLevel
})

console.log(player)