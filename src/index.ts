import { Engine, DisplayMode, Loader } from 'excalibur';
import { LevelOne, LevelTwo } from './Scenes';

class Game extends Engine {
  constructor() {
    super({
      width: 800,
      height: 600,
      displayMode: DisplayMode.Fixed
    })
  }

  public start(loader?: Loader) {
    return super.start(loader);
  }
}

const game = new Game();
const levelOne = new LevelOne(game);
const levelTwo = new LevelTwo(game);

game.add('levelOne', levelOne);
game.add('levelTwo', levelTwo);

game.start()
  .then(() => {
    game.goToScene('levelOne');
  });
