import { Entity } from "../core/entity"
import { Game } from "../game"

const frame_mul = Math.PI/60
const sin_mul = 2
const y_position = 750

export class WaterBackground extends Entity {
    y_offset: number = 0
    sea_frame: number = 0
    renderPriority: number = 1001
    
    constructor() {
        super(0, 0)
    }

    Update(game: Game) {
        this.y_offset = sin_mul * Math.sin(game.frame * frame_mul)
    }

    Render(context: CanvasRenderingContext2D) {
        context.save()

        context.fillStyle = "#009fed"
        context.globalAlpha = 0.5

        var width = context.canvas.width

        context.fillRect(0, y_position + this.y_offset, width, context.canvas.height)

        this.sea_frame = (this.sea_frame + 0.2) % 36

        /*
        for (var x = -36; x <= width + 36; x += 36) {
            context.beginPath()

            context.moveTo(x + this.sea_frame, y_position + this.y_offset)
            context.lineTo(x + this.sea_frame + 18, y_position - 16 + this.y_offset)
            context.lineTo(x + this.sea_frame + 36, y_position + this.y_offset)

            context.closePath()
            context.fill()
        }*/

        context.restore()
    }
}