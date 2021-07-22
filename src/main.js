let config = {
	type: Phaser.CANVAS,
	width: 1000,
	height: 600,
	physics: { //arcade physics
        default: 'arcade',
        arcade: {
            gravity: { y: 500 }, // will affect our player sprite
			//debug: true //debug only
        }
    },
	scene: [Menu, Level1, Level2, Level3, GameOver]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

var health = 3;
var p1Score = 0;


var music1, music2, music3;
var count;
var map;
var map2;
var map3;
var player;
var wallb;
var mecha;
var cursors;
var groundLayer;
var conveyorBelt;
var lava;
var blueDoor;
var greenDoor;
var blueButton;
var greenButton;
var key;
var key1;
var key2;
var keyIcon;
var keyIcon1;
var keyIcon2;
var keyCount;
var text;
var door;
var bdIsActive;
var gdIsActive;
var restart;

let textConfig = {
	fontFamily: 'Impact',
	fontSize: '40px',
	color: '#FFFFFF',
	align: 'right',
}
// reserve keyboard vars
let keyLEFT, keyRIGHT, keySPACE, keyR, keyQ, keyW, keyE, keyT, keyTwo;
