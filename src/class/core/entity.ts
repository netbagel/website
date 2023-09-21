import { Game } from "../game"
import { Vector } from "./vector"

export class Entity {
    position: Vector
    velocity: Vector = new Vector(0, 0)
    renderPriority: number = 0

    constructor(x: number, y: number) {
        this.position = new Vector(x, y)
    }

    Update(game: Game) {
        this.position = this.position.Add(this.velocity)
        this.velocity = this.velocity.Mul(0.9)
    }

    Render(context: CanvasRenderingContext2D) {

    }
}