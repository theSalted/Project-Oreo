class Menu extends Phaser.Scene {
	constructor() {
		super("menuScene");
	}
	preload() {
        // Will add songs later
        this.load.audio('bgm_level1', './assets/sound_level1.wav');
	}
	create() {		
        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 
			'Final Game', textConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 
			'SPACE = JUMP, Arrows - Movement', textConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 
			'Press SPACE to Start', textConfig).setOrigin(0.5);

		// key mapping
		keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
		keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);	
	}
	update() {
                if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                    this.scene.start("level3Scene");
        	}
		if (Phaser.Input.Keyboard.JustDown(keyQ)) {
		    this.scene.start("level4Scene");
		}
		if (Phaser.Input.Keyboard.JustDown(keyW)) {
			this.scene.start("level2Scene");
		}
        }
}