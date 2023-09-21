export class Vector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    Clone() {
        return new Vector(this.x, this.y)
    }

    Add(otherVector: Vector) {
        var cloneVector: Vector = this.Clone()
        cloneVector.x += otherVector.x
        cloneVector.y += otherVector.y
        return cloneVector
    }

    Sub(otherVector: Vector) {
        var cloneVector: Vector = this.Clone()
        cloneVector.x -= otherVector.x
        cloneVector.y -= otherVector.y
        return cloneVector
    }

    Mul(mul: number) {
        return new Vector(this.x * mul, this.y * mul)
    }

    DistanceSquared(otherVector: Vector): number {
        return Math.pow(this.x - otherVector.x, 2) + Math.pow(this.y - otherVector.y, 2)
    }

    Degrees(vector2: Vector) {
        //https://stackoverflow.com/questions/9457988/bearing-from-one-coordinate-to-another/29471137#29471137
        //https://stackoverflow.com/questions/9705123/how-can-i-get-sin-cos-and-tan-to-use-degrees-instead-of-radians
        var vectorDiff = this.Sub(vector2)
        return ((Math.atan2(vectorDiff.y, vectorDiff.x)) * (180 / Math.PI) + 270 ) % 360;
    }

    Rotated(deg: number) { //https://stackoverflow.com/questions/28112315/how-do-i-rotate-a-vector
        deg = -deg * (Math.PI/180);
        var cos = Math.cos(deg);
        var sin = Math.sin(deg);
        return new Vector(Math.round(this.x * cos - this.y * sin), Math.round(this.x * sin + this.y * cos))
    }
}