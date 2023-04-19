export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  init() {}

  preload() {
    this.load.image("sky", "./assets/images/sky.png");
    this.load.image("ground", "./assets/images/platform.png")
    this.load.image("ninja", "./assets/images/ninja.png")
    this.load.image("square", "./assets/images/square.png")
    this.load.image("triangle", "./assets/images/triangle.png")
    this.load.image("diamond", "assets/images/diamond.png")
  }

  create() {
    this.add.image(400, 300, "sky").setScale(0.555);

    let platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, "ground").setScale(2).refreshBody();

    this.shapesGroup = this.physics.add.group()
    this.shapesGroup.create(100, 0, "diamond");
    this.shapesGroup.create(200, 0, "triangle");
    this.shapesGroup.create(300, 0, "square");

    this.player = this.physics.add.sprite(100, 450, "ninja");
    this.player.setCollideWorldBounds(true);
  }

  update() {}
}
