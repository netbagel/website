function tweenNum(num1: number, num2: number, mul: number ) {
    return num1 + (num2 - num1) * mul
}

export class Color {
    r: number
    g: number
    b: number

    constructor(r: number, g: number, b: number) {
        this.r = r
        this.g = g
        this.b = b
    }

    String(): string {
        return "rgb(" + this.r + "," + this.g + "," + this.b + ")"
    }

    Tween(color: Color, mul: number): Color {
        return new Color(
            tweenNum(this.r, color.r, mul),
            tweenNum(this.g, color.g, mul),
            tweenNum(this.b, color.b, mul),
        )
    }

    Clone() {
        return new Color(this.r, this.g, this.b)
    }
}