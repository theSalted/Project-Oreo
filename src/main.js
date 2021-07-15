let config = {
	type: Phaser.CANVAS,
	width: 640,
	height: 480,
	physics: {                   //arcade physics
        default: 'arcade',
        arcade: {
            gravity: { y: 500 }, // will affect our player sprite
        }
    },
	scene: [Menu, Level1, GameOver]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

var health = 3;
var p1Score = 0;

var map;
var player;
var cursors;
var groundLayer, coinLayer;
var text;

// reserve keyboard vars
let keyLEFT, keyRIGHT, keySPACE, keyR, keyQ;
