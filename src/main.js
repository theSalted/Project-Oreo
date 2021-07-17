let config = {
	type: Phaser.CANVAS,
	width: 1000,
	height: 600,
	physics: { //arcade physics
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
			//debug: true // will affect our player sprite
        }
    },
	scene: [Menu, Level1, Level2, GameOver]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

var health = 3;
var p1Score = 0;

var map;
var player;
var wallb;
var mecha;
var cursors;
var groundLayer;
var text;
var door;

// reserve keyboard vars
let keyLEFT, keyRIGHT, keySPACE, keyR, keyQ;
