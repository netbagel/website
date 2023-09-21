import { Grid } from "../core/grid"

export class InvisibleBlock extends Grid {
    constructor(x: number, y: number) {
        super(x, y, false, true)
    }
}