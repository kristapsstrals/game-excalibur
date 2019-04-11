import { Actor, CollisionType, Color } from "excalibur";
import * as ActorTypes from './ActorTypes';

export default class Paddle extends Actor {
  public type = ActorTypes.Paddle;

  constructor(x?: number, y?: number, width?: number, height?: number, color?: ex.Color) {
    super(x, y, width, height, color);

    this.color = Color.Chartreuse;
    this.collisionType = CollisionType.Fixed;
  }
}