import {Actor, EventTypes, CollisionType, PreCollisionEvent, PostUpdateEvent, Color, PostCollisionEvent, CollisionEndEvent} from 'excalibur';
import Brick from './Brick';
import * as ActorTypes from './ActorTypes';

class Ball extends Actor {
  public type = ActorTypes.Ball;

  private killed = false;

  constructor(private gameDrawWidth: number, x?: number, y?: number, width?: number, height?: number, color?: ex.Color) {
    super(x, y, width, height, color);

    this.color = Color.Red;
    this.vel.setTo(100, 100);
    this.collisionType = CollisionType.Passive;

    this.on(EventTypes.PreCollision, (event) => this.preCollision(event));

    this.on(EventTypes.CollisionEnd, (event) => this.collisionEnd(event));

    this.on(EventTypes.PostUpdate, (event) => this.postUpdate(event));

    this.draw = (ctx, delta) => this.drawBall(ctx, delta);
  }

  drawBall (ctx: CanvasRenderingContext2D, delta: number) {  
    // Custom draw code
    ctx.fillStyle = this.color.toString()
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
  }

  collisionEnd(event?: CollisionEndEvent) {
    if (!event)
      return;

    const brick = event.other as Brick;

    if (brick && brick.type === ActorTypes.Brick) {
      brick.kill();
      this.killed = true;
    } 
  }

  preCollision (event?: PreCollisionEvent) {
    if (!event)
      return;
  
    let intersection = event.intersection.normalize();
  
    if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
      this.vel.x *= - 1;
    }
    else {
      this.vel.y *= -1;
    }
  }

  postUpdate(event?: PostUpdateEvent) {
    if (this.pos.x < this.getWidth() / 2) {
      this.vel.x *= -1
    }
  
    // If the ball collides with the right side
    // of the screen reverse the x velocity
    if (this.pos.x + this.getWidth() / 2 > this.gameDrawWidth) {
      this.vel.x *= -1
    }
  
    // If the ball collides with the top
    // of the screen reverse the y velocity
    if (this.pos.y < this.getHeight() / 2) {
      this.vel.y *= -1
    }

    if (this.killed) {
      let x = this.vel.x * (1 + (10/Math.abs(this.vel.x))); //increase speed by 10%
      let y = this.vel.y * (1 + (10/Math.abs(this.vel.y))); //increase speed by 10%

      this.vel.setTo(x, y);
      this.killed = false;
    }    
  }
}

export default Ball;
