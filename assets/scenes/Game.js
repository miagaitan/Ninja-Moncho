import {SHAPES} from '../../utils.js';

const{TRIANGLE, SQUARE, DIAMOND, CIRCLE} = SHAPES;

export default class Game extends Phaser.Scene{
    score;
    constructor(){
        super('game');

    }

    init(){
        this.shapesRecolected = {
            [TRIANGLE]: {count: 0, score: 10},
            [SQUARE]: {count: 0, score: 20},
            [DIAMOND]: {count: 0, score: 30},
            [CIRCLE]: {count:0, score: -10},

        };
        console.log(this.shapesRecolected)
    }

    preload(){
        this.load.image("sky", "./assets/images/Sky.png");
        this.load.image("ground", "./assets/images/platform.png");
        this.load.image("ninja", "./assets/images/Ninja.png");
        this.load.image(SQUARE, "./assets/images/Square.png");
        this.load.image(DIAMOND, "./assets/images/Diamond.png");
        this.load.image(TRIANGLE, "./assets/images/Triangle.png");
        this.load.image("moon", "./assets/images/moon4.png");
        this.load.image(CIRCLE, "./assets/images/circle.png");
        this.load.image("win", "./assets/images/win.png");
        this.load.image("Retry", "./assets/images/keyR");


    }

    create(){
        //add background
        this.add.image(400, 300, "sky").setScale(0.555);

        this.add.image(750,50, "moon").setScale(.2)

        //add static platforms group
        let platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, "ground").setScale(2).refreshBody();

        //
        this.shapesGroup = this.physics.add.group();
        // this.shapesGroup.create(100, 0, 'diamond');
        // this.shapesGroup.create(200, 0, 'triangle');
        // this.shapesGroup.create(300, 0, 'square');

        //create event to add shapes
        this.time.addEvent({
            delay: 3000,
            callback: this.addShape,
            callbackScope: this,
            loop: true,
        })

        //
        //
        this.player = this.physics.add.sprite(100, 450, "ninja");
        this.player.setCollideWorldBounds(true);

        //create cursors
        this.cursors = this.input.keyboard.createCursorKeys();

        //colliders
        this.physics.add.collider(this.player, platforms);
        this.physics.add.collider(this.player, this.shapesGroup);
        this.physics.add.collider(platforms, this.shapesGroup);

        //add overlap between player and shapes
        this.physics.add.overlap(
            this.player,
            this.shapesGroup,
            this.collectShape,
            null,
            this
        );

        //add score on scene
            this.score = 0;
            this.scoreText = this.add.text(20, 20, "Score:" + this.score, {
                fontSize: "32px",
                fontStyle: "bold",
                fill: "#ffffff",
            });

    }

    update(){

        //movement player
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-250);
        } else 
        if (this.cursors.right.isDown) {
            this.player.setVelocityX(250);
        } else {
            this.player.setVelocityX(0);
        }

        //player jump
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }

    }

    addShape() {
    //get random shape
    const randomShape = Phaser.Math.RND.pick([DIAMOND, SQUARE, TRIANGLE, CIRCLE]);

    //get random position x
    const randomX = Phaser.Math.RND.between(0, 800);

    //add shape to screen
    this.shapesGroup.create(randomX, 0, randomShape).setCircle(25, 7, 7);;
    console.log("shape is added", randomX, randomShape);

    }

    collectShape(player, shape){
        shape.destroy()

        const shapeName = shape.texture.key;
        this.shapesRecolected[shapeName].count++;

        this.score += this.shapesRecolected[shapeName].score;
        console.log(this.shapesRecolected[shapeName].score)
        this.scoreText.setText(`Score: ${this.score.toString()}`);

        console.log(this.shapesRecolected);

    }

}



