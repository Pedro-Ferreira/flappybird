// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game_height = 400;
var game_width = 790;
var game = new Phaser.Game(game_width, game_height, Phaser.AUTO, 'game', stateActions);
var score =0;
var label_score;
//alert(score);
var player;
var pipes;

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg", "assets/flappy-cropped.png")//preloads the image so you can use it
    game.load.image("playerImg1", "assets/flappy_batman.png")//preloads the image so you can use it
    game.load.audio("score", "assets/point.ogg") //preloads the sound so you can use it
    game.load.image("pipe", "assets/pipe_green.png")//preloads the pipe box
}

function spaceHandler() {
    //game.sound.play("score")// play the music
    player.body.velocity.y = -200;
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.physics.startSystem(Phaser.Physics.ARCADE); //enables physics to be used in the game
    game.stage.setBackgroundColor("#75D1FF");//setting the background colour

    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);// when press on the keyboard

    game.input.onDown.add(clickHandler);// uses keyboard arrows to move sprite
    var right_key = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    right_key.onDown.add(moveRight);
    var left_key = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    left_key.onDown.add(moveLeft);
    var up_key = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    up_key.onDown.add(moveUp);
    var down_key = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    down_key.onDown.add(moveDown);

    var pipe_interval = 1.75
    game.time.events.loop(pipe_interval * Phaser.Timer.SECOND, generate_pipe);
    pipes = game.add.group();

    player = game.add.sprite(50, game_height/2, "playerImg")// loads an image
    game.add.audio("score")// loads sounds

    player.anchor.setTo(0.5, 0.5)
    game.physics.arcade.enable(player); // applies physics to object-player
    player.checkWorldBounds = true;
    player.body.gravity.y = 300;
    player.body.velocity.y = -150;

    label_score = game.add.text (20, 20, "0", {font: "30px Comic Sans MS", fill: "#ffffff"})

    game.add.text(300,180, //cordinates
     "work in progress...", //text
        {font: "30px Comic Sans MS", // font size and typeface
        fill: "#ff0000" } ); // text colour
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    game.physics.arcade.overlap(player,pipes, game_over)
}

function game_over(){
    //game.time.events.removeAll();
    //alert("Game Over, better luck next time");
    location.reload();
}

function add_pipe_part(x, y, pipe_part) {
    var pipe = pipes.create(x, y, pipe_part);
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -200 // enable pipes to move to left
}

function generate_pipe(){//creates a pipe with 2 holes
    var hole = Math.floor(Math.random() * 5) +1;//randomises where the hole is
    for (var count = 0; count < hole; count = count + 1) {
        add_pipe_part(900, 50 * count, "pipe");
    }
    for (var count = hole+2; count < 8; count = count + 1) {//makes the 2 holes
        add_pipe_part(900, 50 * count, "pipe");
    }

    score = score + 1 // add one point when the player passes a pipe
    label_score.setText(score)
}

function player_jump() {
    player.body.velocity.y = -200;
}

function clickHandler(mouse) {
    player.x = mouse.x;
    player.y = mouse.y;
}
function moveRight(){
    player.x = player.x + 100; //moves the cursor right
}
function moveLeft(){
    player.x = player.x - 100; //moves the cursor left
}
function moveUp(){
    player.y = player.y - 100;  //moves the cursor up
}
function moveDown(){
    player.y = player.y + 100;  //moves the cursor down
}