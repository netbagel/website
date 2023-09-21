import { Game } from "./class/game"

var canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("main")

var game = new Game(canvas)

setInterval(function() {
    game.Update()
}, 30)

setInterval(function() {
    game.Render(canvas)
}, 30)

export const _game = game
import "./buttons"