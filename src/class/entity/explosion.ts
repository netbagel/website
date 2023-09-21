import { Entity } from "../core/entity";
import { Game } from "../game";

var sprites: Array<HTMLImageElement> = []

for (var index = 0; index < 15; index++) {
    var element: HTMLImageElement = document.createElement("img")
    element.setAttribute("src", "./image/explosion/" + index + ".png")
    sprites[index] = element
}

export class Explosion extends Entity {
    frame: number = 0

    Update(game: Game) {
        this.frame += 1
        game.entities.splice(game.entities.indexOf(this), 0)
    }

    Render(context: CanvasRenderingContext2D) {
        if (!sprites[this.frame]) { return }
        context.drawImage(sprites[this.frame], this.position.x, this.position.y)
    }
}