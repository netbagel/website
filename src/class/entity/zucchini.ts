import { Entity } from "../core/entity";
import { Vector } from "../core/vector";
import { Game } from "../game";

const spawn_zucchini_frame_mod = 2

const max_velocity_add_x = 16
const max_velocity_add_y = 2

const frame_offset = 12
const chance_shoot = 0.66

var sprite = document.createElement("img")
sprite.setAttribute("src", "./image/zucchini.png")

class Particle {
    position: Vector
    velocity: Vector = new Vector(0, 0)
    xVelocityAdd: number
    yVelocityAdd: number

    constructor(x: number, y: number) {
        this.position = new Vector(x, y)    

        this.xVelocityAdd = Math.floor(Math.random() * max_velocity_add_x + 1)
        this.yVelocityAdd = Math.floor(Math.random() * max_velocity_add_y + 1)

        if (Math.random() > 0.5) {
            this.xVelocityAdd = -this.xVelocityAdd
        }

        this.velocity.x = this.xVelocityAdd
    }
}

export class Zucchini extends Entity {
    zucchinis: Array<Particle> = []
    frameOffset: number
    renderPriority: number = 1000

    constructor(x: number, y: number) {
        super(x, y)
        this.frameOffset = Math.floor(Math.random() * frame_offset)
    }

    Update(game: Game) {
        var level = this

        this.zucchinis.forEach(function(particle, index) {
            particle.position = particle.position.Add(particle.velocity)

            particle.velocity.x *= 999999/1000000
            particle.velocity.y += particle.yVelocityAdd

            if (particle.position.y < 1000) { return }
            level.zucchinis.splice(index, 0)
        })

        if ((game.frame + this.frameOffset) % spawn_zucchini_frame_mod != 0 || Math.random() > chance_shoot) { return }

        this.zucchinis[this.zucchinis.length] = new Particle(this.position.x, this.position.y)
    }

    Render(context: CanvasRenderingContext2D) {
        for (var index = 0; index < this.zucchinis.length; index++) {
            var particle = this.zucchinis[index]
            context.drawImage(sprite, particle.position.x, particle.position.y)
        }
    }
}