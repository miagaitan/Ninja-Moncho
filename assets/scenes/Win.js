export default class Win extends Phaser.Scene {
    constructor() {
      super("Win");
    }

preload() {
    this.load.image("Win", "./assets/images/win.png")
}
create() {
    this.add.image(400,300, "Win")
    .setScale(0.5)
    .setInteractive()
    .on("pointerdown",()=> this.scene.start("Game"));;
}

}

