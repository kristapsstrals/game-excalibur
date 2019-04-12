import { Actor, CollisionType, Color, EventTypes, PostCollisionEvent } from "excalibur";
import * as ActorTypes from './ActorTypes';
import { LevelOne } from "../Scenes";

class Brick extends Actor {
  public type = ActorTypes.Brick;

  constructor(x?: number, y?: number, width?: number, height?: number, color?: ex.Color) {
    super(x, y, width, height, color);

    this.collisionType = CollisionType.Active

    if (color)
      this.color = color;
    else
      this.color = Color.Chartreuse;    
  }

  public kill() {
    super.kill();
    LevelOne.removeBrick(this);
  }
}

export default Brick;
