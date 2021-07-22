class Menu extends Phaser.Scene {
	constructor() {
		super("menuScene");
	}
	preload() {
		// Will add songs later
		this.load.audio('bgm_level1', './assets/sound_level1.wav');
		this.load.audio('bgm_level2', './assets/sound_level2.wav');
		this.load.audio('bgm_level3', './assets/sound_level3.wav');
		this.load.audio('transformation', './assets/transform.wav');
		this.load.audio('congratss', './assets/congrats.mp3');
		
	}
	create() {
		// show menu text
		this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding,
			'WAll-B', textConfig).setOrigin(0.5);
		this.add.text(game.config.width / 2, game.config.height / 2,
			'SPACE = JUMP, Arrows - Movement', textConfig).setOrigin(0.5);
		this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding,
			'Press Q to Start Level 1', textConfig).setOrigin(0.5);

		this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding +
			borderUISize + borderPadding + borderUISize + borderPadding 
			+ borderUISize + borderPadding, 'Press T to skip the Level (cheat)', textConfig).setOrigin(0.5);

		if (level2_bool) {
			this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding +
				borderUISize + borderPadding, 'Press W to Start Level 2', textConfig).setOrigin(0.5);
		}
		if (level3_bool) {
			this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding +
				borderUISize + borderPadding + borderUISize + borderPadding, 'Press E to Start Level 3', textConfig).setOrigin(0.5);
		}

		// key mapping
		keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
		keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
		keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
	}
	update() {
		if (Phaser.Input.Keyboard.JustDown(keyQ)) {
			this.scene.start("level1Scene");
		}
		if (Phaser.Input.Keyboard.JustDown(keyW) && level2_bool) {
			this.scene.start("level2Scene");
		}
		if (Phaser.Input.Keyboard.JustDown(keyE) && level3_bool) {
			this.scene.start("level3Scene");
		}
	}
}