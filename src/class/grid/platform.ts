import { Grid } from "../core/grid"

var sprite: HTMLImageElement = document.createElement("img")
sprite.setAttribute("src", "./image/platform.png")

export class Platform extends Grid {
    constructor(x: number, y: number) {
        super(x, y, true, true)
    }

    Render(context: CanvasRenderingContext2D) {
        context.drawImage(sprite, this.position.x, this.position.y)
    }
}