// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score;
//alert(score);
var player;

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg", "assets/flappy_frog.png")//preloads the image so you can use it
    game.load.image("playerImg1", "assets/flappy_batman.png")//preloads the image so you can use it
    game.load.audio("score", "assets/point.ogg") //preloads the sound so you can use it
    game.load.image("pipe", "assets/pipe_green.png")//preloads the pipe box
}



function spaceHandler() {
    game.sound.play("score")// play the music
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene

    game.stage.setBackgroundColor("#75D1FF");//setting the background colour
    player = game.add.sprite(50, 50, "playerImg")// loads an image
    game.add.audio("score")// loads sounds

    game.input.onDown.add(clickHandler);// uses keyboard arrows to move sprite
    var right_key = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    right_key.onDown.add(moveRight);
    var left_key = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    left_key.onDown.add(moveLeft);
    var up_key = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    up_key.onDown.add(moveUp);
    var down_key = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    down_key.onDown.add(moveDown);



    for (var count1 = 0; count1 < 8; count1++){ //creates a pipe with 2 holes
    var hole = Math.floor(Math.random() * 5) +1;//randomises where the hole is
    for (var count = 0; count < hole; count = count + 1) {
        game.add.sprite(200 * count1, 50 * count, "pipe");
    }
    for (var count = hole+2; count < 8; count = count + 1) {//makes the 2 holes
        game.add.sprite(200 * count1, 50 * count, "pipe");
    }
    }
/*
    for (var count1 = 0; count1 <8; count1 = count1 + 1) {
        for (var count = 0; count < 8; count = count + 1) {
            game.add.sprite(count1 * 150, 50 * count, "pipe")
        }
        for (var count = 0; count < 8; count = count + 1) {
            game.add.sprite(count1 * 150, 50 * count, "pipe")
        }
    }
*/

    game.add.text(300,180, //cordinates
     "work in progress...", //text
        {font: "30px Comic Sans MS", // font size and typeface
        fill: "#ff0000" } ); // text colour
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);// when press on the keyboard
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    
}
function clickHandler(mouse) {
    player.x = mouse.x;
    player.y = mouse.y;
}
function moveRight(){
    player.x = player.x + 10; //moves the cursor right
}
function moveLeft(){
    player.x = player.x - 10; //moves the cursor left
}
function moveUp(){
    player.y = player.y - 10;  //moves the cursor up
}
function moveDown(){
    player.y = player.y + 10;  //moves the cursor down
}