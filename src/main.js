let config = {
	type: Phaser.CANVAS,
	width: 640,
	height: 480,
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 }, // will affect our player sprite
        }
    },
	scene: [Menu]
}

let game = new Phaser.Game(config);


// reserve keyboard vars
let keyLEFT, keyRIGHT, keyUP, keyDOWN, keySPACE; 
