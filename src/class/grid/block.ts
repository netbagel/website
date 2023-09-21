import { Grid } from "../core/grid"

var sprite: HTMLImageElement = document.createElement("img")
sprite.setAttribute("src", "./image/grid.png")

export class Block extends Grid {
    constructor(x: number, y: number) {
        super(x, y, false, true)
    }

    Render(context: CanvasRenderingContext2D) {
        context.drawImage(sprite, this.position.x, this.position.y)
    }
}