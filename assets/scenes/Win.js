export default class Win extends Phaser.Scene {
    constructor() {
      super("Win");
    }

preload() {
    this.load.image("Goku", "./assets/images/goku.png")
}
create() {
    this.add.image(400,300, "Goku")
    .setScale(1)
    .setInteractive()
    .on("pointerdown",()=> this.scene.start("Game"));;
}

}

