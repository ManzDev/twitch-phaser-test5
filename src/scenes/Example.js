import Phaser from "phaser";

export class Example extends Phaser.Scene {
  preload() {
    this.load.image("poo", "assets/sprites/poo.png");
    this.load.image("ball", "assets/sprites/ball.png");
    this.load.image("box", "assets/sprites/box.png");
    this.load.spritesheet("mummy", "assets/sprites/mummy37x45.png", { frameWidth: 37, frameHeight: 45 });
  }

  create() {
    const frames = this.anims.generateFrameNumbers("mummy");
    const mummyAnimation = this.anims.create({
      key: "walk",
      frames,
      frameRate: 16
    });

    const mummy = this.add.sprite(50, 300, "mummy").setScale(4);
    const box = this.add.sprite(650, 325, "box").setScale(3).setDepth(-2);
    const ball = this.add.sprite(650, 260, "ball").setScale(1).setDepth(-2);
    mummy.play({
      key: "walk",
      repeat: -1,
    });

    const bounceBall = () => {
      ball.setY(260);
      this.tweens.add({
        targets: ball,
        y: 550,
        duration: 2000,
        ease: "Bounce"
      });
    };

    const mummyTween = this.tweens.add({
      targets: mummy,
      props: {
        x: 600,
      },
      repeat: -1,
      yoyo: true,
      flipX: true,
      onComplete: () => {
        mummy.stop();
        mummy.setFrame(9);
      },
      onRepeat: () => {
        bounceBall();
      },
      duration: 4000,
      ease: "Linear",
    });

    this.input.on("pointerup", () => {
      console.log(mummyTween.countdown, mummyTween.loopCounter);
    });

    mummy.on("animationrepeat", () => {
      const x = mummy.x - 32;
      const poop = this.add.image(x, 300, "poo").setScale(0.5).setDepth(-1);

      this.tweens.add({
        targets: poop,
        props: {
          x: {
            value: "-=64",
            ease: "Power1"
          },
          y: {
            value: "+=50",
            ease: "Bounce.easeOut"
          }
        },
        duration: 750
      });

      this.time.addEvent({
        delay: 2000,
        callback: () => {
          poop.destroy();
        }
      });
    }, this);
  }
}
