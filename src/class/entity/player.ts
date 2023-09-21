import { Vector } from "../core/vector"
import { Game } from "../game"
import { Grid } from "../core/grid";
import { Entity } from "../core/entity";

const coyote_time: number = 4
const disable_input_frames: number = 40

const y_grid_offsets = Array(
    new Vector(0, 0),
    new Vector(-8, 0),
    new Vector(8, 0),
) // Fixes bug where player jitters at the corner of a block

export class Player extends Entity {
    sprite: HTMLImageElement = document.createElement("img")
    jumped: number = 0
    mouseDeg: number = 0
    spawnPosition: Vector = new Vector(0, 0)
    disableInputFrame: number
    renderPriority: number = 100

    constructor() {
        super(0, 0)
        this.disableInputFrame = disable_input_frames
        this.sprite.setAttribute("src", "./image/thing.png")
    }

    Update(game: Game) {
        this.updateVelocity(game)
        this.updateCollision(game)

        if (this.disableInputFrame > 0) { 
            this.disableInputFrame -= 1
            return 
        }

        this.updateInput(game)
    }

    Spawn(spawnPosition: Vector) {
        this.spawnPosition = spawnPosition.Clone()
        this.Respawn()
    }

    Respawn() {
        this.position = this.spawnPosition.Clone()
        this.velocity = new Vector(0, 0)
        this.jumped = 0
        this.disableInputFrame = disable_input_frames
    }

    updateVelocity(game: Game) {
        this.position = this.position.Add(this.velocity)
        if (this.velocity.x < 0) {
            this.velocity.x += 2
        } else if (this.velocity.x > 0) {
            this.velocity.x -= 2
        }
    
        if (this.position.y >= 915) {
            if (!game.GetGridAtPosition(new Vector(this.position.x, 0))) {
                this.position.y = -16
            } else {
                this.Respawn()
            }
        }

        if (this.position.y <= -18) {
            this.position.y = 900
        }

        if (this.position.x < -16) {
            this.position.x = 816
        } else if (this.position.x > 816) {
            this.position.x = -16
        }

        this.velocity.y = Math.min(15, this.velocity.y + 1)
    }

    updateInput(game: Game) {
        if (game.IsButtonPressed("a") || game.IsButtonPressed("arrowleft")) {
            this.velocity.x = -4
        } else if (game.IsButtonPressed("d") || game.IsButtonPressed("arrowright")) {
            this.velocity.x = 4
        }

        if ((game.IsButtonPressed("w") || game.IsButtonPressed("arrowup")) && this.jumped > 0 && !game.GetGridAtPosition(this.position.Sub(new Vector(0, 8)))) {
            this.velocity.y = Math.min(0, this.velocity.y) - 8
            this.jumped = 0
        }

        this.mouseDeg = game.mousePosition.Degrees(this.position) 
    }

    updateCollision(game: Game) { 
        var xGrid = game.GetGridAtPosition(this.position.Add(new Vector(this.velocity.x, 0)))
        if (xGrid != null && !xGrid.platform && Math.abs(xGrid.position.y - this.position.y) < 15) {
            xGrid.OnCollision(game)
            if (xGrid.solid) {
                this.velocity.x = 0

                if (this.position.x > xGrid.position.x) {
                    this.position.x = xGrid.position.x + 16
                } else {
                    this.position.x = xGrid.position.x - 16
                }
            }
        }

        this.jumped -= 1

        var yGrid: Grid | null = null

        for (var index = 0; index < y_grid_offsets.length; index++) {
            var grid = game.GetGridAtPosition(this.position.Add(new Vector(0, this.velocity.y).Add(y_grid_offsets[index])))
            if (grid == null) { continue }

            yGrid = grid
            break
        }

        if (yGrid != null && Math.abs(yGrid.position.x - this.position.x) < 16) {
            yGrid.OnCollision(game)
            if (yGrid.solid) {
                if (yGrid.position.y > this.position.y && (!yGrid.platform || this.velocity.y > 0)) {
                    this.position.y = yGrid.position.y - 16
                    this.velocity.y = 0
                    this.jumped = coyote_time
                } else if (!yGrid.platform) {
                    this.position.y = yGrid.position.y + 16
                    this.velocity.y = Math.max(this.velocity.y, 0)
                }
            }
        }
    }

    Render(context: CanvasRenderingContext2D) {
        context.drawImage(this.sprite, this.position.x, this.position.y)
        
        /*
        context.save()
        
        context.translate(this.position.x + 8, this.position.y + 4)
        context.rotate((this.mouseDeg + 90) * Math.PI/180)

        context.drawImage(gunSprite, 0, 0)

        context.restore()*/
    }
}