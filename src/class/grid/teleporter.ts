import { Game } from "../game";
import { Grid } from "../core/grid"
import { Level } from "../core/level";

export class Teleporter extends Grid {
    level: Level

    constructor(x: number, y: number, level: Level) {
        super(x, y, false, false)
        this.level = level
    }

    OnCollision(game: Game): void {
        game.Teleport(this.level)
    }
}