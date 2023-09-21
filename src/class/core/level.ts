import { Game } from "../game";
import { Button } from "../ui/button";
import { Entity } from "./entity";
import { Grid } from "./grid";
import { Vector } from "./vector";

export class Level {
    Get(game: Game): [Array<Grid>, Array<Entity>, Array<Button>, Vector] {
        return [[], [], [], new Vector(0,0)]
    }

    Update(game: Game): boolean {
        return true
    }

    Render(context: CanvasRenderingContext2D) {}
}