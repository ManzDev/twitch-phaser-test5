import Phaser from "phaser";
import { Example } from "./scenes/Example.js";
import { Timeline } from "./scenes/Timeline.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  scene: [Example]
};

// eslint-disable-next-line
const game = new Phaser.Game(config);
