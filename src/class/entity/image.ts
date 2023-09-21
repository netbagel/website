import { Entity } from "../core/entity";

export class Image extends Entity {
    sprite: HTMLImageElement = document.createElement("img")
    renderPriority: number = -100

    constructor(x: number, y: number, path: string) {
        super(x, y)
        this.sprite.setAttribute("src", path)
    }

    Render(context: CanvasRenderingContext2D) {
        context.drawImage(this.sprite, this.position.x, this.position.y)
    }
}