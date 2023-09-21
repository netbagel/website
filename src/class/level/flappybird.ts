import { Entity } from "../core/entity"
import { Grid } from "../core/grid"
import { Level } from "../core/level"
import { Vector } from "../core/vector"
import { Explosion } from "../entity/explosion"
import { Text } from "../entity/text"
import { Game } from "../game"
import { Block } from "../grid/block"
import { Button } from "../ui/button"

const jump_cooldown: number = 8
const jump_y_velocity: number = -12

const cluster_starting_x: number = 800
const cluster_pipe_offset_x: number = 1
const cluster_pipe_offset_y: number = -2

const grid_appear_position_offset: number = 32
const grid_disappear_position_offset: number = -128

const cluster_random_y: number = 400
const cluster_min_y: number = 100
const cluster_width: number = 4

const block_x_mul: number = 1/16

const cluster_spawn_framediv: number = 90

const block_speed: number = 3

const max_offset: number = 60

const length_min: number = 10
const length_max: number = 16

const point_player_pipe_distance: number = -12

class BlockCluster {
    positition: Vector
    blocks: Block[] = []
    pointGiven: boolean = false

    constructor() {
        this.positition = new Vector(cluster_starting_x, cluster_min_y + Math.floor(Math.random() * cluster_random_y))

        const x_offset: number = this.positition.x * block_x_mul 

        var length = Math.floor(Math.random() * (length_max - length_min) + length_min)
        var upEnding = Math.floor(this.positition.y * block_x_mul)

        for (var indexY = 0; indexY < upEnding; indexY++) {
            for (var indexX = 0; indexX < cluster_width; indexX++) {
                this.blocks.push(new Block(indexX + x_offset, indexY))
            }
        }

        for (var indexY = upEnding + cluster_pipe_offset_y; indexY < upEnding; indexY++) {
            for (var indexX = -cluster_pipe_offset_x; indexX < cluster_width + cluster_pipe_offset_x; indexX++) {
                this.blocks.push(new Block(indexX + x_offset, indexY))
            }
        }

        for (var indexY = upEnding + length; indexY < max_offset; indexY++) {
            for (var indexX = 0; indexX < cluster_width; indexX++) {
                this.blocks.push(new Block(indexX + x_offset, indexY))
            }
        }

        for (var indexY = upEnding + length + cluster_pipe_offset_y; indexY < upEnding + length; indexY++) {
            for (var indexX = -cluster_pipe_offset_x; indexX < cluster_width + cluster_pipe_offset_x; indexX++) {
                this.blocks.push(new Block(indexX + x_offset, indexY))
            }
        }

        for (var index = 0; index < this.blocks.length; index++) {
            var block = this.blocks[index]
            block.position.x += grid_appear_position_offset
        }
    }

    Update(game: Game, level: FlappyBird): boolean {
        this.positition.x -= block_speed
        
        this.blocks.forEach((block: Block) => {
            block.position.x -= block_speed
        })

        if (!this.pointGiven && (this.positition.x - game.player.position.x) <= point_player_pipe_distance) {
            level.score += 1
            this.pointGiven = true
        }

        return this.positition.x <= grid_disappear_position_offset
    }
}

export class FlappyBird extends Level {
    lost: boolean = false
    jump: number = 0
    score: number = 0
    clusters: Array<BlockCluster> = []
    
    Update(game: Game): boolean {
        if (this.lost) {
            game.entities[0].Update(game)
            game.player.position.x = -100000
            return false 
        }

        this.updatePlayer(game)
        this.updateBlockClusters(game)

        if (game.frame % cluster_spawn_framediv == 0) {
            this.clusters.push(new BlockCluster())
        }

        return false
    }

    updatePlayer(game: Game) {
        game.player.position.x = 400
        game.player.velocity.x = 0

        this.jump -= 1

        if (this.jump <= 0 && (game.IsButtonPressed("arrowup") || game.IsButtonPressed("w"))) {
            game.player.velocity.y = jump_y_velocity
            this.jump = jump_cooldown
        }

        if (!this.lost && game.GetGridAtPosition(game.player.position)) {
            this.lost = true

            game.entities.push(new Explosion(game.player.position.x + game.player.velocity.x - 28, game.player.position.y + game.player.velocity.y - 28))

            if (game.transition == -1) {
                game.Teleport(new FlappyBird())
            }
        }

        game.player.updateVelocity(game)
    }

    updateBlockClusters(game: Game) {
        game.grids = []

        var level = this

        this.clusters.forEach(function(cluster: BlockCluster, index: number) {
            if (cluster.Update(game, level)) { //Cluster should be removed
                level.clusters.splice(index, 0)
                return true
            }
            
            for (var index2 = 0; index2 < cluster.blocks.length; index2++) {
                game.grids.push(cluster.blocks[index2])
            }
        })
    }

    Render(context: CanvasRenderingContext2D) {
        context.fillStyle = "#aaaaaa"
        context.font = "32px sans-serif"
        context.fillText(this.score.toString(), 8, 32 - context.getTransform().f)
    }

    Get(game: Game): [Grid[], Entity[], Button[], Vector] {
        this.lost = false
        this.clusters = []
        this.score = 0
        return [[], [], [], new Vector(400, 400)]
    }
}