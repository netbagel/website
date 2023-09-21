import { Entity } from "../core/entity";
import { Grid } from "../core/grid";
import { InvisibleBlock } from "../grid/invisibleBlock";
import { Level } from "../core/level";
import { Vector } from "../core/vector";
import { Image } from "../entity/image";
import { Text } from "../entity/text";
import { Game } from "../game";
import { Button } from "../ui/button";

function createText(_: Text, game: Game) {
    game.entities.push(new Text(50, 68, "whatever,", 2/3, 24, null, "16px sans-serif", "#5e5e5e", createText2))
}

function createText2(_: Text, game: Game) {
    game.entities.push(new Text(50, 98, "I'm well versed in lua & python3", 2/3, 24, null, "16px sans-serif", "#e0e0e0", createText3))
}

function createText3(_: Text, game: Game) {
    game.entities.push(new Text(50, 118, "I've also recently been using typescript & go", 2/3, 24, null, "16px sans-serif", "#e0e0e0", createText4))
}

function createText4(_: Text, game: Game) {
    game.entities.push(new Text(50, 148, "(this site is a platforming engine written in typescript)", 2/3, 24, null, "16px sans-serif", "#e0e0e0", createText5))
}

function createText5(_: Text, game: Game) {
    game.entities.push(new Text(50, 168, "I've also been modding games since I was a wee lad", 2/3, 24, null, "16px sans-serif", "#e0e0e0", createText6))
}

function createText6(_: Text, game: Game) {
    game.entities.push(new Text(50, 188, "..and I have nothing to show for it", 2/3, 24, null, "16px sans-serif", "#e0e0e0", createText7))
}

function createText7(_: Text, game: Game) {
    game.entities.push(new Text(50, 208, "🥹", 2/3, 24, null, "16px sans-serif", "#e0e0e0", null))
}

export class MySkills extends Level {
    Get(game: Game): [Grid[], Entity[], Button[], Vector] {
        return [[], [
            new Text(50, 48, "this page is supsiciously empty...", 2/3, 24, null, "16px sans serif", "#5e5e5e", createText)
        ], [], new Vector(128, 64)]
    }
}