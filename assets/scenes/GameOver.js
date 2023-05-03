export default class GameOver extends Phaser.Scene {
    constructor() {
      super("GameOver");
    }

preload() {
    this.load.image("vegeta", "./assets/images/vegeta.jpg")
}
create() {
    this.add.image(400,300, "vegeta")
    .setScale(1)
    .setInteractive()
    .on("pointerdown", () => this.scene.start("Game"));
    }
}
