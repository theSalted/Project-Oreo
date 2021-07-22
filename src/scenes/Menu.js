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
		this.load.audio('jet', './assets/jet_sound.wav');
		this.load.audio('collect', './assets/collecting.wav');
		
	}
	create() {
		// show menu text
		this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding,
			'WAll-B', textConfig).setOrigin(0.5);
		this.add.text(game.config.width / 2, game.config.height / 2,
			'SPACE = JUMP, Arrows - Movement', textConfig).setOrigin(0.5);
		this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding,
			'Press Space to Start', textConfig).setOrigin(0.5);

		this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding +
			borderUISize + borderPadding + borderUISize + borderPadding 
			+ borderUISize + borderPadding, 'Press T to skip the Level (cheat)', textConfig).setOrigin(0.5);

		// key mapping
		keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
		keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
	}
	update() {
		if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
			this.scene.start("level1Scene");
		}
	}
}