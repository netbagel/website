import { Color } from "../core/color";
import { Entity } from "../core/entity";
import { Grid } from "../core/grid";
import { Block } from "../grid/block";
import { InvisibleBlock } from "../grid/invisibleBlock";
import { Level } from "../core/level";
import { Vector } from "../core/vector";
import { Text } from "../entity/text";
import { WaterBackground } from "../entity/waterbackground";
import { Zucchini } from "../entity/zucchini";
import { Game } from "../game";
import { Button } from "../ui/button";

function createText(_: Text, game: Game) {
    game.entities.push(new Text(32, 148, "I also enjoy composing music in my free time", 2/3, 24,  null, "16px sans-serif", "#2b70b0", createText2))
}

function createText2(_: Text, game: Game) {
    game.entities.push(new Text(32, 178, "Zucchini is probably my favorite food, ever", 2/3, 24,  null, "16px sans-serif", "#5e5e5e", createText3))
}

function createText3(_: Text, game: Game) {
    game.entities.push(new Text(32, 198, "Do you want zucchini?", 2/3, 24,  null, "16px sans-serif", "#5e5e5e", createButton))
}

function createButton(_: Text, game: Game) {
    game.buttons.push(new Button(32, 220, 195, 38, 12, 8, "Make it rain!", "#b6b6b6", "32px sans-serif", new Color(14, 14, 14), new Color(4, 94, 177), new Color(2, 60, 110), function() {
        for (var index = 0; index < 4; index++) {
            game.entities.push(new Zucchini(400, -90))
        }
    }))
    game.entities.push(new Text(0, 0, "", 0, 24, null, "", "", createText4))
}

function createText4(_: Text, game: Game) {
    game.entities.push(new Text(32, 268, "..if not, here are my socials", 2/3, 24,  null, "16px sans-serif", "#5e5e5e", createButton2))

}

function createButton2(_: Text, game: Game) {
    game.buttons.push(new Button(400, 336, 128, 32, 26, 8, "GitHub", "#b6b6b6", "24px sans-serif", new Color(14, 14, 14), new Color(4, 94, 177), new Color(2, 60, 110), function() {
        window.open("https://github.com/netbagel")
        game.mousePosition = new Vector(0, 0)
    }))

    for (var x = 25; x < 25 + 8; x++) {
        for (var y = 21; y < 21 + 2; y++) {
            game.grids.push(new InvisibleBlock(x, y))
        }
    }

    game.entities.push(new Text(0, 0, "", 2/3, 1,  null, "", "", createButton3))
}

function createButton3(_: Text, game: Game) {
    game.buttons.push(new Button(560, 336, 128, 32, 30, 8, "Twitter", "#b6b6b6", "24px sans-serif", new Color(14, 14, 14), new Color(4, 94, 177), new Color(2, 60, 110), function() {
        window.open("https://twitter.com/netbagel")
        game.mousePosition = new Vector(0, 0)
    }))

    for (var x = 35; x < 35 + 8; x++) {
        for (var y = 21; y < 21 + 2; y++) {
            game.grids.push(new InvisibleBlock(x, y))
        }
    }

    game.entities.push(new Text(0, 0, "", 2/3, 1,  null, "", "", createButton4))
}

function createButton4(_: Text, game: Game) {
    game.buttons.push(new Button(400, 400, 128, 32, 32, 8, "Twitch", "#b6b6b6", "24px sans-serif", new Color(14, 14, 14), new Color(4, 94, 177), new Color(2, 60, 110), function() {
        window.open("https://twitch.tv/net_bagel")
        game.mousePosition = new Vector(0, 0)
    }))

    for (var x = 25; x < 25 + 8; x++) {
        for (var y = 25; y < 25 + 2; y++) {
            game.grids.push(new InvisibleBlock(x, y))
        }
    }

    game.entities.push(new Text(0, 0, "", 2/3, 1,  null, "", "", createButton5))
}

function createButton5(_: Text, game: Game) {
    game.buttons.push(new Button(560, 400, 128, 32, 20, 8, "YouTube", "#b6b6b6", "24px sans-serif", new Color(14, 14, 14), new Color(4, 94, 177), new Color(2, 60, 110), function() {
        window.open("https://youtube.com/@netbagel")
        game.mousePosition = new Vector(0, 0)
    }))

    for (var x = 35; x < 35 + 8; x++) {
        for (var y = 25; y < 25 + 2; y++) {
            game.grids.push(new InvisibleBlock(x, y))
        }
    }

    game.entities.push(new Text(0, 0, "", 2/3, 12,  null, "", "", createText5))
}

function createText5(_: Text, game: Game) {
    game.entities.push(new Text(400, 450, "if you want to get in contact, email me:", 2/3, 24,  null, "16px sans-serif", "#5e5e5e", createText6))
}

function createText6(_: Text, game: Game) {
    game.entities.push(new Text(400, 470, "netbagel@proton.me", 2/3, 24,  null, "16px sans-serif", "#5e5e5e", createText7))
}

function createText7(_: Text, game: Game) {
    game.entities.push(new Text(400, 500, "I check it regularly, so I'll see any mail sent", 2/3, 24,  null, "16px sans-serif", "#2b70b0", null))
}

export class AboutMe extends Level {
    Get(game: Game): [Array<Grid>, Array<Entity>, Array<Button>, Vector] {
        var grids: Array<Grid> = []

        for (var x = 0; x <= 22; x ++) {
            for (var y = 20; y <= 60; y ++) {
                grids.push(new Block(x + 1, y))
            }
        }

        var entities: Array<Entity> = [
            new WaterBackground(),
            new Text(32, 128, "I am a student that enjoys programming", 2/3, 24,  null, "16px sans-serif", "#2b70b0", createText)
        ]

        return [grids, entities, [], new Vector(64, 240)]
    }
}
