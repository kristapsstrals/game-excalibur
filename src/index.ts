import * as ex from 'excalibur';
import { PointerMoveEvent } from 'excalibur/dist/Input';

let game = new ex.Engine({
  width: 800,
  height: 600
})

let paddle = new ex.Actor(150, game.drawHeight - 40, 200, 20);
paddle.color = ex.Color.Chartreuse;
paddle.collisionType = ex.CollisionType.Fixed;

game.add(paddle);

let pointer = game.input.pointers.primary;

pointer.on(ex.EventTypes.Move, (event: PointerMoveEvent) => {
  paddle.pos.x = event.worldPos.x;
})

// Build Bricks

// Padding between bricks
var padding = 20 // px
var xoffset = 65 // x-offset
var yoffset = 20 // y-offset
var columns = 5
var rows = 3

var brickColor = [ex.Color.Violet, ex.Color.Orange, ex.Color.Yellow]

// Individual brick width with padding factored in
var brickWidth = game.drawWidth / columns - padding - padding / columns // px
var brickHeight = 30 // px
var bricks: ex.Actor[] = []
for (var j = 0; j < rows; j++) {
  for (var i = 0; i < columns; i++) {
    bricks.push(
      new ex.Actor(
        xoffset + i * (brickWidth + padding) + padding,
        yoffset + j * (brickHeight + padding) + padding,
        brickWidth,
        brickHeight,
        brickColor[j % brickColor.length]
      )
    )
  }
}

bricks.forEach(function(brick) {
  // Make sure that bricks can participate in collisions
  brick.collisionType = ex.CollisionType.Active

  // Add the brick to the current scene to be drawn
  game.add(brick)
})

//Ball
let ball = new ex.Actor(100, 300, 20, 20);
ball.color = ex.Color.Red;
ball.vel.setTo(100, 100);

ball.collisionType = ex.CollisionType.Passive;

ball.on(ex.EventTypes.PreCollision, (event) => {
  console.log(event.other);
  if (bricks.find(x => x.id === event.other.id)) {
    // kill removes an actor from the current scene
    // therefore it will no longer be drawn or updated
    event.other.kill()
  }

  let intersection = event.intersection.normalize();

  if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
    ball.vel.x *= - 1;
  }
  else {
    ball.vel.y *= -1;
  }
})

ball.on(ex.EventTypes.PostUpdate, (event) => {
  if (ball.pos.x < ball.getWidth() / 2) {
    ball.vel.x *= -1
  }

  // If the ball collides with the right side
  // of the screen reverse the x velocity
  if (ball.pos.x + ball.getWidth() / 2 > game.drawWidth) {
    ball.vel.x *= -1
  }

  // If the ball collides with the top
  // of the screen reverse the y velocity
  if (ball.pos.y < ball.getHeight() / 2) {
    ball.vel.y *= -1
  }
})

ball.draw = (ctx, delta) => {
  // Optionally call original 'base' method
  // ex.Actor.prototype.draw.call(this, ctx, delta)

  // Custom draw code
  ctx.fillStyle = ball.color.toString()
  ctx.beginPath()
  ctx.arc(ball.pos.x, ball.pos.y, 10, 0, Math.PI * 2)
  ctx.closePath()
  ctx.fill()
}

game.add(ball);





game.start();
