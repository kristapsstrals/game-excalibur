import { Scene, Engine, EventTypes, Color, GameEvent } from "excalibur";
import { Paddle, Brick, Ball } from "../Actors";
import { PointerMoveEvent, Pointer } from "excalibur/dist/Input";

export default class LevelTwo extends Scene {
  static bricks: Brick[] = [];
  paddle: Paddle | null = null;
  pointer: Pointer | null = null;
  ball: Ball | null = null;

  public onInitialize(game: Engine) {

    this.paddle = new Paddle(150, game.drawHeight - 40, 200, 20);
    game.add(this.paddle);
    this.pointer = game.input.pointers.primary;

    this.pointer.on(EventTypes.Move, (event?: GameEvent<any>) => {
      if (!event)
        return;

      const pointerEvent = event as PointerMoveEvent;
      if (!pointerEvent)
        return;

      if (!this.paddle)
        return;

      this.paddle.pos.x = pointerEvent.worldPos.x;
    })

    // Build Bricks

    // Padding between bricks
    var padding = 20 // px
    var xoffset = 65 // x-offset
    var yoffset = 20 // y-offset
    var columns = 5
    var rows = 3

    var brickColor = [Color.Gray, Color.Red, Color.Magenta]

    // Individual brick width with padding factored in
    var brickWidth = game.drawWidth / columns - padding - padding / columns // px
    var brickHeight = 30 // px

    for (var j = 0; j < rows; j++) {
      for (var i = 0; i < columns; i++) {
        LevelTwo.bricks.push(
          new Brick(
            xoffset + i * (brickWidth + padding) + padding,
            yoffset + j * (brickHeight + padding) + padding,
            brickWidth,
            brickHeight,
            brickColor[j % brickColor.length]
          )
        )
      }
    }

    LevelTwo.bricks.forEach(function(brick) {
      game.add(brick)
    })

    //Ball
    this.ball = new Ball(game.drawWidth, game.drawHeight, 100, 300, 20, 20);
    this.ball.speedModifier = 20;

    game.add(this.ball);

    this.onPostUpdate = (game, delta) => this.postUpdate(game,delta);
  }
  public onActivate() {}
  public onDeactivate() {}

  postUpdate(game: Engine, delta: number) {
    if (LevelTwo.bricks.length === 0) {
      game.goToScene('levelTwo');
    }
  }

  public static removeBrick(brick: Brick) {
    console.log('removing brick: ', brick);
    this.bricks = this.bricks.filter(b => b.id !== brick.id);
  }
}