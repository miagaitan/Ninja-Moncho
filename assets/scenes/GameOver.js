export default class GameOver extends Phaser.Scene {
    constructor() {
      super("GameOver");
    }

preload() {
    this.load.image("KeyR", "./assets/images/keyR.png")
}
create() {
    this.add.image(400,300, "KeyR")
    .setScale(0.5)
    .setInteractive()
    .on("pointerdown", () => this.scene.start("Game"));
    }
}
