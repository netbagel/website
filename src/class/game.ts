import { Button } from "./ui/button"
import { Entity } from "./core/entity"
import { Grid } from "./core/grid"
import { Player } from "./entity/player"
import { Vector } from "./core/vector"
import { Level } from "./core/level"

const frame_mod: number = 64
const background_frame_mul: number = 1/2
const transition_frames = 7
const transition_frames_reverse = 15

export class Game {
    player: Player = new Player()
    grids: Array<Grid> = []
    entities: Array<Entity> = []
    keys: Map<String, Boolean> = new Map<String, Boolean>
    buttons: Array<Button> = []
    frame: number = 0
    canvas: HTMLCanvasElement
    skipRenderFrame: boolean = false
    clickTap: boolean = false
    clickHold: boolean = false
    mousePosition: Vector = new Vector(0, 0)
    currentLevel: Level = new Level()
    nextLevel: Level = new Level()
    transition: number = transition_frames
    reverseTransition: boolean = false
    cursor: string = "default"
    yOffset: number = 0

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.cursor = "default"

        this.grids = []
        this.buttons = []
        this.entities = []

        var game = this

        //I love weird hacks
        window.onkeyup = function(event: KeyboardEvent) {
            game.keys.set(event.key.toLowerCase(), false)
        }

        window.onkeydown = function(event: KeyboardEvent) {
            game.keys.set(event.key.toLowerCase(), true)
        }

        window.onmousemove = function(event: MouseEvent) {
            var r = canvas.getBoundingClientRect(),
            x = event.clientX - r.left, y = event.clientY - r.top + game.yOffset - 4;

            game.mousePosition = new Vector(x, y)
        }

        canvas.onmousedown = function(event: MouseEvent) {
            game.clickTap = true
            game.clickHold = true

            game.updateUi()
            game.clickTap = false
        }

        canvas.onmouseup = function(event: MouseEvent) {
            game.clickTap, game.clickHold = false, false
        }

        canvas.onresize = function(event: UIEvent) {
            game.skipRenderFrame = true
        }

        window.onmouseleave = function(event: MouseEvent) {
           game.clickHold, game.clickTap = false, false
        }
    }

    updateUi() {
        for (var index in this.buttons) {
            this.buttons[index].Update(this)
        }
    }

    IsButtonPressed(button: string): boolean {
        return this.keys.get(button) == true //Thank you TS
    }

    LoadLevel(level: Level) {
        var spawnPosition: Vector
        [this.grids, this.entities, this.buttons, spawnPosition] = level.Get(this)
        this.currentLevel = level
        this.player.Spawn(spawnPosition)
    }

    Update() {
        this.cursor = "default"
        this.frame += 1

        this.updateTransition()

        if (this.currentLevel.Update(this)) {
            this.updateEntities()
        }

        this.clickTap = false
        this.canvas.style.cursor = this.cursor
    }
    
    updateTransition() {
        if (this.transition > 0) {
            if (!this.reverseTransition) {
                this.transition += 1
            } else {
                this.transition -= 1
            }

            if (this.transition == transition_frames) {
                this.LoadLevel(this.nextLevel)
            } else if (this.transition >= transition_frames_reverse) {
                this.reverseTransition = true
            }

            if (this.reverseTransition && this.transition == 0) {
                this.transition = -1
                this.reverseTransition = false
            }
        }
    }

    updateEntities() {
        this.player.Update(this)

        for (var index in this.entities) {
            this.entities[index].Update(this)
        }
        this.updateUi()
    }

    GetGridAtPosition(position: Vector): Grid | null {
        for (var index in this.grids) {
            var grid = this.grids[index]

            if (grid.position.DistanceSquared(position) <= 256) {
                return grid
            }
        }

        return null
    }

    Render(canvas: HTMLCanvasElement) {
        if (this.skipRenderFrame) {
            this.skipRenderFrame = false
            return
        }

        var context: CanvasRenderingContext2D | null = canvas.getContext("2d")
        if (context == null) { return }
    
        context.save()

        this.clearCanvasAndUpdateSize(canvas, context)
        this.renderBackground(context)

        this.tryMoveCamera(context)
        this.renderUi(context)
        this.renderObjects(context)
        this.currentLevel.Render(context)

        context.restore()

        if (this.transition > 0) {
            this.renderTransition(context)
        }
        this.drawVignette(context)
    }


    clearCanvasAndUpdateSize(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        context.clearRect(0, 0, canvas.width, canvas.height)
        canvas.width = 800
        canvas.height = window.innerHeight * 0.9
    }

    renderBackground(context: CanvasRenderingContext2D) {
        var colorSwitch: boolean = false

        var offset = Math.floor(this.frame*background_frame_mul) % frame_mod

        for (var x: number = 0; x <= context.canvas.width + 64; x += 64) {
            for (var y: number = 0; y <= context.canvas.height + 64; y += 64) {
                colorSwitch = Math.floor((x + y)/64)%2 == 0

                context.fillStyle = colorSwitch && "#232323" || "#202020"
                context.fillRect(x - offset, y - offset, 64, 64)
            }
        }
    }

    tryMoveCamera(context: CanvasRenderingContext2D) {
        if (context.canvas.height >= 810) { 
            this.yOffset = 0
            return
        }

        if (this.player.position.y < context.canvas.height/2) { return }

        this.yOffset = Math.min(652 - 2/3 * context.canvas.height, this.player.position.y - context.canvas.height/2)

        context.transform(1, 0, 0, 1, 0, -this.yOffset)
    }

    renderObjects(context: CanvasRenderingContext2D) {
        for (var index in this.grids) {
            this.grids[index].Render(context)
        }

        var entitiesAll: Entity[] = []

        this.entities.forEach(entity => entitiesAll.push(entity))
        entitiesAll.push(this.player)

        var sortedEntities: Entity[] = <Entity[]> entitiesAll.sort((entity1: Entity, entity2: Entity) => entity1.renderPriority - entity2.renderPriority) 

        for (var index in sortedEntities) {
            sortedEntities[index].Render(context)
        }
    }

    renderUi(context: CanvasRenderingContext2D) {
        for (var index in this.buttons) {
            var button = this.buttons[index]
            button.Render(context)
        }
    }

    drawVignette(context: CanvasRenderingContext2D) {
        var width: number = context.canvas.width
        var height: number = context.canvas.height

        var outerRadius = width * .9;
		var innerRadius = height * .2;

        var gradient = context.createRadialGradient(width / 2, height / 2, innerRadius, width / 2, height / 2, outerRadius);
        gradient.addColorStop(0, "rgb(0,0,0,0");
        gradient.addColorStop(1, "rgb(0,0,0,0.6)");

        context.fillStyle = gradient
        context.fillRect(0, -context.getTransform().f, width, height)
    }

    renderTransition(context: CanvasRenderingContext2D) {
        context.globalAlpha = (this.transition)/transition_frames
        
        context.fillStyle = "#232323"
        context.fillRect(0, 0, window.innerWidth * 4, window.innerHeight * 4)
    
        context.globalAlpha = 1
    }
    
    Teleport(newLevel: Level) {
        this.transition = 1
        this.nextLevel = newLevel
    }
}
