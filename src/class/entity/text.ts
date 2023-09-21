import { Entity } from "../core/entity";
import { Game } from "../game";
import { Vector } from "../core/vector";

const frame_end: number = -1
const frame_start: number = -2
const frame_complete: number = -3

export class Text extends Entity {
    frame: number = frame_start
    orgin: Vector
    fall: number
    appearFrames: number
    distance: number | null
    font: string
    style: string
    text: string
    end: Function | null
    renderPriority: number = -100

    constructor(x: number, y: number, text: string, fallMul: number, appearFrames: number, distanceRequired: number | null, font: string, fillStyle: string, endFunc: Function | null) {
        super(x, y)
        this.orgin = this.position.Clone()
        this.text = text
        this.fall = fallMul
        this.appearFrames = appearFrames

        if (distanceRequired != null) {
            this.distance = distanceRequired ** 2
        } else {
            this.distance = null
        }

        this.font = font
        this.style = fillStyle

        if (endFunc != null) {
            this.end = endFunc
        } else {
            this.end = null
        }
    }

    Update(game: Game) {
        if (this.frame == frame_start) {
            if (!this.isPlayerInRadius(game)) { return }
            this.frame = this.appearFrames
    
            return
        }
        
        if (this.frame >= 0) {
            this.frame -= 1
            this.position.y = this.position.y + Math.cos((this.appearFrames - this.frame)/this.appearFrames * Math.PI/2) * this.fall
    
            return
        }
        
        if (this.frame == frame_end) {
            this.frame = frame_complete

            if (this.end == null) { return }
            this.end(this, game)
        }
    }

    isPlayerInRadius(game: Game): boolean {
        return this.distance == null || game.player.position.DistanceSquared(this.position) <= this.distance
    }

    Render(context: CanvasRenderingContext2D) {
        if (this.frame == frame_start) { return }

        var globalAlpha: number = context.globalAlpha
        if (this.appearFrames != 0) {
            context.globalAlpha = (this.appearFrames - this.frame)/this.appearFrames
        }
        context.fillStyle = this.style

        context.font = this.font
        context.fillText(this.text, this.position.x, this.position.y)

        context.globalAlpha = globalAlpha
    }
}