import { Game } from "../game";
import { Vector } from "./vector";


export class Grid {
    x: number;
    y: number;
    position: Vector;
    platform: boolean;
    solid: boolean

    constructor(x: number, y: number, platform: boolean, solid: boolean) {
        this.x = x
        this.y = y
        this.solid = solid
        this.platform = platform
        this.position = new Vector(x * 16, y * 16)
    }

    Render(context: CanvasRenderingContext2D) {

    }

    OnCollision(game: Game) {

    }
}