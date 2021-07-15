class Menu extends Phaser.Scene {
	constructor() {
		super("menuScene");
	}
	preload() {
        // Will add songs later
	}
	create() {		
        let menuConfig = {
            fontFamily: 'Impact',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 
			'Final Game', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 
			'SPACE = JUMP, Arrows - Movement', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 
			'Press SPACE to Start', menuConfig).setOrigin(0.5);

		// key mapping
		keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
		keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
		keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);		
	}
	update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("level1Scene");
		}
	}
}