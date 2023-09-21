import { Color } from "../core/color"
import { Game } from "../game"

const tween_mul = 0.4

const frame_appear = 8

export class Button {
    opacity: number
    x: number
    y: number
    width: number
    height: number
    textOffsetX: number
    textOffsetY: number
    text: string
    colorHover: Color
    colorDefault: Color
    colorSelect: Color
    color: Color
    font: string
    textStyle: string
    style: string
    inside: boolean
    onClick: Function

    constructor(x: number, y: number, width: number, height: number, textOffsetX: number, textOffsetY: number, text: string, textStyle: string, font: string, colorDefault: Color, colorHover: Color, colorSelect: Color, onClick: Function) {
        this.opacity = 0
        this.style = colorDefault.String()
        this.x = x
        this.y = y
        this.inside = false
        this.width = width
        this.height = height
        this.textOffsetX = textOffsetX
        this.textOffsetY = textOffsetY
        this.text = text
        this.font = font
        this.textStyle = textStyle
        this.colorDefault = colorDefault
        this.colorHover = colorHover
        this.colorSelect = colorSelect
        this.color = this.colorDefault
        this.onClick = onClick
    }

    Update(game: Game) {
        if (this.opacity < frame_appear) {
            this.opacity += 1
        }

        this.inside = this.isInsideButton(game)

        if (!this.inside) {
            this.color = this.color.Tween(this.colorDefault, tween_mul)
        } else {
            if (game.clickHold) {
                this.color = this.colorSelect.Clone()
            } else {
                this.color = this.color.Tween(this.colorHover, tween_mul)
            }
            game.cursor = "pointer"
        }

        if (game.clickTap && this.inside) {
            this.onClick()
        }
    }

    isInsideButton(game: Game): boolean {
        return (game.mousePosition.x >= this.x &&
            game.mousePosition.x <= this.x + this.width &&
            game.mousePosition.y >= this.y &&
            game.mousePosition.y <= this.y + this.height)
    }

    Render(context: CanvasRenderingContext2D) {
        var alpha = context.globalAlpha
        context.globalAlpha = this.opacity/frame_appear

        context.fillStyle = this.color.String()
        context.fillRect(this.x, this.y, this.width, this.height)        

        context.fillStyle = this.textStyle
        context.font = this.font

        context.fillText(this.text, this.x + this.textOffsetX, this.y + this.height - this.textOffsetY)

        context.globalAlpha = alpha
    }
}