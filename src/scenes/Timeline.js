import Phaser from "phaser";

export class Timeline extends Phaser.Scene {
  preload() {
    this.load.image("box", "assets/sprites/box.png");
  }

  create() {
    const box = this.add.image(125, 100, "box").setScale(3);
    this.add.image(125, 100, "box").setScale(3).setAlpha(0.3);

    const timeline = [{
      x: 600,
      offset: 0
    },
    {
      y: 500,
      offset: 4000
    },
    {
      x: 125,
      offset: 8000
    },
    {
      y: 100,
      offset: 12000
    }];

    this.tweens.timeline({

      targets: box,
      ease: "Linear",
      duration: 4000,

      tweens: timeline

    });
  }
}
