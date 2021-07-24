class CutScene2 extends Phaser.Scene {
	constructor() {
		super("CutScene2");
	}
	preload() {
		// map made with Tiled in JSON format
		this.load.tilemapTiledJSON('level5', './assets/cutscene2.json');
		// tiles in spritesheet 
		this.load.image('tiles', './assets/tiles.png');
		this.load.image('flag', './assets/flag.png');
		// load mecha sprite
		this.load.spritesheet('mecha', './assets/wall-b-mecha.png', {frameWidth: 57, frameHeight: 81, startFrame: 0, endFrame: 6});
		this.load.spritesheet('wall-b', './assets/wall-b.png', {frameWidth: 56, frameHeight: 68, startFrame: 0, endFrame: 3});
		this.load.spritesheet('scientist', './assets/scientist.png', {frameWidth: 57, frameHeight: 81, startFrame: 0, endFrame: 13});
		
		this.load.image('10-you-made-it', './assets/speech/10-you-made-it.png');
		this.load.image('11-damn-it', './assets/speech/11-damn-it.png');
		this.load.image('12-this-is-it', './assets/speech/12-this-is-it.png');
		this.load.image('13-speechless', './assets/speech/13-speechless.png');
		this.load.image('14-dont-think-about-it', './assets/speech/14-dont-think-about-it.png');
		this.load.image('15-I-will-be-fine', './assets/speech/15-I-will-be-fine.png');
		this.load.image('16-take-care-youself', './assets/speech/16-take-care-youself.png');
		this.load.image('17-nooo', './assets/speech/17-nooo.png');
	}

	create() {
		console.log("cutscene 2")
		
		// load the map 
		map5 = this.make.tilemap({ key: 'level5' });
		
		// tiles for the ground layer
		var groundTiles = map5.addTilesetImage('tileset', 'tiles', 16, 16);
		// create the scene layer
		sceneLayer = map5.createLayer('Scene', groundTiles, 0, 0);
		// create the prop layer
		propLayer = map5.createLayer('Prop', groundTiles, 0, 0);
		// create the guide layer
		guideLayer = map5.createLayer('Guide', groundTiles, 0, 0);
		// create the ground layer
		groundLayer = map5.createLayer('Background', groundTiles, 0, 0);
		//player collision
		//groundLayer.setCollisionByProperty({ collides: true });
		groundLayer.setCollisionByExclusion(-1, true);
		
		// create the conveyorBelt layer 
		conveyorBelt = map5.createLayer('ConveyorBelt', groundTiles, 0, 0);
		conveyorBelt.setCollisionByExclusion(-1, true);
		
		//create blue door layer
		blueDoor = map5.createLayer('DoorBlue', groundTiles, 0, 0);
		blueDoor.setCollisionByExclusion(-1, true);
		
		//create ButtonBlue layer
		blueButton = map5.createLayer('ButtonBlue', groundTiles, 0, 0);
		blueButton.setCollisionByExclusion(-1, true);
		
		//create ButtonGreen layer
		greenButton = map5.createLayer('ButtonGreen', groundTiles, 0, 0);
		greenButton.setCollisionByExclusion(-1, true);
		
		//create lava layer
		lava = map5.createLayer('Lava', groundTiles, 0, 200);
		lava.setCollisionByExclusion(-1, true);
		
		this.invisibleWall = map5.createLayer('invisibleWall', groundTiles, 0, 0);
		this.invisibleWall.setCollisionByExclusion(-1, true);
		this.invisibleWall.setAlpha(0);
		
		this.trigger1_2 = map5.createLayer('Trigger1', groundTiles, 0, 0);
		this.trigger1_2.setCollisionByExclusion(-1, true);
		this.trigger1_2.setAlpha(0);
		
		this.trigger2_2 = map5.createLayer('Trigger2', groundTiles, 0, 0);
		this.trigger2_2.setCollisionByExclusion(-1, true);
		this.trigger2_2.setAlpha(0);
		
		dialogue = this.add.image(0, 0, '10-you-made-it');
		dialogue.setScale(.3);
		

		// set the boundaries of our game world
		this.physics.world.bounds.width = groundLayer.width;
		this.physics.world.bounds.height = groundLayer.height;

		// create the player sprite    
		wallb = this.physics.add.sprite(50, 410, 'wall-b');
		wallb.setScale(0.4, 0.4);
		//wallb.setBounceY(0.3); // our player will bounce from ground
		wallb.setCollideWorldBounds(true); // don't go out of the map 
		wallb.flipX = true;
		
		
		// create the Mecha sprite
		mecha = this.physics.add.sprite(100, 410, 'mecha');
		mecha.setScale(0.8, 0.8);
		//mecha.setBounceY(0.3);
		mecha.setCollideWorldBounds(true);
		mecha.setDragX(1000);
		
		// initialize mecha collectable flag
		mecha.collectable = true;
		// modify mecha hitbox while collapse
		mecha.body.setSize(57, 20)
		mecha.body.setOffset(0, 61)
		
		// create scientist
		scientist = this.physics.add.sprite(900, 410, 'scientist');
		scientist.setScale(0.8, 0.8);
		//mecha.setBounceY(0.3);
		scientist.setCollideWorldBounds(true);
		scientist.setDragX(1000);
		scientist.setPushable(false);
		
		door = this.physics.add.sprite(2180, 400, 'flag')
		
		// define colliders
		this.physics.add.collider(wallb, groundLayer);
		this.physics.add.collider(wallb, scientist);
		this.physics.add.collider(wallb, conveyorBelt, this.onConveyorBelt);
		this.physics.add.overlap(wallb, mecha, this.collectMecha, null, this);
		this.physics.add.collider(wallb, this.trigger5, this.reachFlag);
		this.physics.add.collider(wallb, this.trigger1_2, this.action1);
		this.physics.add.collider(wallb, this.trigger2_2, this.action2);
		
		// make player wallb in the beginning of the game
		player = wallb
		wallb.setDragX(1000);
		
		this.physics.add.collider(mecha, groundLayer);
		this.physics.add.collider(mecha, conveyorBelt, this.onConveyorBelt);
		this.physics.add.collider(mecha, groundLayer);
		this.physics.add.collider(mecha, this.trigger1_2, this.action1);
		this.physics.add.collider(mecha, this.trigger2_2, this.action2);
		
		this.physics.add.collider(scientist, groundLayer);
		this.physics.add.collider(scientist, conveyorBelt);
		this.physics.add.collider(scientist, blueDoor);
		this.physics.add.collider(scientist, this.invisibleWall, this.action1);
		this.physics.add.collider(scientist, mecha, this.end2);
		//this.physics.add.collider(scientist, lava, this.touchLava);
		
		this.physics.add.collider(door, groundLayer);
		this.physics.add.collider(door, conveyorBelt);
		this.physics.add.overlap(door, mecha, this.reachFlag, null, this);
		this.physics.add.overlap(door, wallb, this.reachFlag, null, this);
		
		// collider for buttons
		this.physics.add.collider(blueButton, mecha);
		this.physics.add.collider(blueButton, wallb);
		this.physics.add.collider(blueButton, scientist, this.onBB);
		
		this.physics.add.collider(greenButton, mecha, this.onGB);
		this.physics.add.collider(greenButton, wallb, this.onGB);
		
		// collider for doors
		this.physics.add.collider(blueDoor, wallb);
		this.BDMechaC =  this.physics.add.collider(blueDoor, mecha);
		
	
		// wallb walk animation
		this.anims.create({
			key: 'walk',
			frames: this.anims.generateFrameNumbers('wall-b', { start:2, end: 3, first: 2}),
			frameRate: 10,
			repeat: -1
		});
		// wallb idle animation
		this.anims.create({
			key: 'idle',
			frames: this.anims.generateFrameNumbers('wall-b', { start:0, end: 1, first: 0}),
			frameRate: 2,
			repeat: -1
		});
		
		//mecha expand animation
		this.anims.create({
			key: 'expand',
			frames: this.anims.generateFrameNumbers('mecha', { start:0, end: 4, first: 0}),
			frameRate: 6,
			repeat: 0
		});
		//mecha expand animation
		this.anims.create({
			key: 'collapse',
			frames: this.anims.generateFrameNumbers('mecha', { start:0, end: 2, first: 0}),
			frameRate: 6,
			repeat: 0
		});
		
		this.anims.create({
			key: 'mecha-walk',
			frames: this.anims.generateFrameNumbers('mecha', { start:5, end: 6, first: 5}),
			frameRate: 8,
			repeat: -1
		});
		this.anims.create({
			key: 'mecha-idle',
			frames: this.anims.generateFrameNumbers('mecha', { start:4, end: 4, first: 4}),
			frameRate: 1,
			repeat: -1
		});
		
		this.anims.create({
			key: 'scientist_walk',
			frames: this.anims.generateFrameNumbers('scientist', { start:7, end: 13, first: 7}),
			frameRate: 12,
			repeat: -1
		});
		this.anims.create({
			key: 'scientist_idle',
			frames: this.anims.generateFrameNumbers('scientist', { start:6, end: 6, first: 6}),
			frameRate: 1,
			repeat: -1
		});
		
		this.anims.create({
			key: 'scienticha_walk',
			frames: this.anims.generateFrameNumbers('scientist', { start:4, end: 5, first: 4}),
			frameRate: 8,
			repeat: -1
		});
		this.anims.create({
			key: 'scienticha_idle',
			frames: this.anims.generateFrameNumbers('scientist', { start:3, end: 3, first: 3}),
			frameRate: 1,
			repeat: -1
		});
		
		// key mapping
		cursors = this.input.keyboard.createCursorKeys();
		keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
		keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
		keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
		keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
		keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
		keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
		
		this.JisDown = keyJ.isDown
		this.KisDown = keyK.isDown

		// set bounds so the camera won't go outside the game world
		this.cameras.main.setBounds(0, 0, map5.widthInPixels, map5.heightInPixels);
		// make the camera follow the player
		this.cameras.main.startFollow(scientist);

		// set background color, so the sky is not black    
		this.cameras.main.setBackgroundColor('#110e21');
		
		// initialize mid air jump flag
		this.canMidAirJump = false;
		
		// initialize BB and GB flag
		bdIsActive = true;
		//blueDoor.alpha = 0.2;
		
		// initialize restart flag
		restart = false;
		// initialize lava rise flag
		this.lavaRise = true;
		this.lavaHeight = 595;
		this.isExpand = false;
		this.isDevMode = true;
		this.isScienticha =  false;
		this.dialogueOffSetX = -60;
		this.dialogueOffSetY = -60;
		this.track = "level1";
		nextLevel = false;
		moveLeft = false;
		moveRight = false;
		this.interrupt = false;
		scientist.flipX = true;
		end = "end1";
		this.time.delayedCall(25000, () => {
			this.scene.start("gameOverscene");
		}, null, this);
		stage = "";
	}

	update() {
		if (Phaser.Input.Keyboard.JustDown(keyT)) {
			this.scene.start("gameOverscene");
		}
		if (Phaser.Input.Keyboard.JustDown(keyR)) {
			this.scene.start("CutScene2");
		}
		if (Phaser.Input.Keyboard.JustDown(keyQ)) {
			console.log('x: ' + player.x + ", y: " + player.y)
		}
		if (cursors.left.isDown) {
			if(player == wallb){
				player.body.setVelocityX(-200); // move left
				wallb.anims.play('walk', true); // play walk animation
			} else if(player == mecha) {
				player.body.setVelocityX(-150); // move left
				mecha.anims.play('mecha-walk', true);
			}
			player.flipX = true; // flip the sprite to the left
			this.midAirJump() 
			this.isExpand = false;
		}
		else if (cursors.right.isDown) { // if the right arrow key is down
			if(player == wallb){
				player.body.setVelocityX(200); // move right
				wallb.anims.play('walk', true); // play walk animation
			}else if(player == mecha) {
				mecha.anims.play('mecha-walk', true);
				player.body.setVelocityX(150); // move left
				this.isExpand = false;
			}
			player.flipX = false; // use the original sprite looking to the right
			this.midAirJump() 
		} else {
			//player.body.setVelocityX(0);
			if(player == wallb){
				player.anims.play('idle', true);
			} else if(player == mecha && !this.isExpand){
				mecha.anims.play('mecha-idle', true);
			}
		}
		this.scientistControl()

		
		this.midAirJump() 
		
		// reset mid air jump upon hit the ground
		if(player.body.onFloor()) {
			 this.canMidAirJump = true;
		}
		
		// mech can only be collect after touching the ground
		if(player == wallb && mecha.body.onFloor()) {
			mecha.collectable = true;
		}
		
		if (player == mecha) {
			this.BDMechaC.active = true;
		} else {
			this.BDMechaC.active = false;
			if(mecha.y >= this.lavaHeight) {
				mecha.body.setVelocityY(-70)
				mecha.body.setSize(57, 40)
				mecha.body.setOffset(0, 41)
			} else {
				mecha.body.setSize(57, 20)
				mecha.body.setOffset(0, 61)
			}
		}
		
		if (bdIsActive) {
			blueDoor.alpha = 0.2;
		} else {
			blueDoor.alpha = 1;
		}
		
		
		if (this.lavaRise) {
			lava.y -= 0.12;
			this.lavaHeight -= 0.12
		}
		if (lava.y <= 0) {
			this.lavaRise = false;
		}
		
		dialogue.x = scientist.x + this.dialogueOffSetX;
		dialogue.y = scientist.y + this.dialogueOffSetY;
		
		if(restart) {
			this.time.delayedCall(2000, () => {
				this.scene.start("gameOverscene");
			}, null, this);
		}
		
		if(nextLevel) {
			this.backgroundMusic.stop();
			this.scene.start("gameOverscene");
		}
		
		if(end == "end2") {
			this.dialogueOffSetX = - 100
			dialogue.setScale(0.7);
			dialogue.setTexture('17-nooo');
			mecha.body.enable = false;
			// make wallb reaper
			mecha.alpha = 0;
			this.isScienticha = true;
			this.time.delayedCall(2000, () => {
				this.scene.start("gameOverscene");
			}, null, this);
		}
		if(stage == "doorup") {
			stage = "finished";
			dialogue.setTexture('11-damn-it');
			this.time.delayedCall(2000, () => {
				dialogue.setTexture('12-this-is-it');
				this.time.delayedCall(2000, () => {
					dialogue.setTexture('13-speechless');
					this.time.delayedCall(2000, () => {
						dialogue.setTexture('14-dont-think-about-it');
						this.time.delayedCall(4000, () => {
							this.dialogueOffSetX = - 100
							dialogue.setTexture('15-I-will-be-fine');
							this.time.delayedCall(4000, () => {
								dialogue.setScale(0.5);
								dialogue.setTexture('16-take-care-youself');
							}, null, this);
						}, null, this);
					}, null, this);
				}, null, this);
			}, null, this);
		}
	}
	collectMecha() {
		// combine mech and wallb
		if(mecha.collectable) {
			this.sound.play("transformation");
			mecha.body.setSize(57, 81)
			// make player the mecha
			player = mecha
			// update the camera 
			this.cameras.main.startFollow(scientist);
			// disable wallb physics
			wallb.body.enable = false;
			// hide wallb
			wallb.alpha = 0;
			// make mech un-collectable once combine
			mecha.collectable = false;
			// play expand animation
			mecha.anims.stop();
			mecha.anims.play('expand', true);
			this.isExpand = true;
		}
	}
	midAirJump() {
		if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
			if(player.body.onFloor()) {
				if(player == wallb) {
					// wallb jump height
					player.body.setVelocityY(-200);// jump up
				} else if(player == mecha) {
					// mecha jump height
					player.body.setVelocityY(-300);// jump up
				}
				 
			} else if(this.canMidAirJump && player == mecha) {
				this.sound.play("jet");
				// update wallb position
				wallb.x = mecha.x;
				wallb.y = mecha.y - 30;
				// re-enable wallb physics
				wallb.body.enable = true;
				// make wallb reaper
				wallb.alpha = 1;
				// make the player wallb
				player = wallb
				// mid air jump
				player.body.setVelocityY(-200);
				// disable mid air jump once performed
				this.canMidAirJump = false;
				// reverse animation
				mecha.anims.stop();
				mecha.anims.playReverse('collapse', true);
				mecha.body.setSize(57, 20)
				mecha.body.setOffset(0, 61)
				mecha.body.setVelocityY(0);
			}
			
		}
	}
	scientistControl() {
		if (keyJ.isDown || moveLeft) {
			scientist.body.setVelocityX(-100); // move left
			if(this.isScienticha) {
			   scientist.anims.play('scienticha_walk', true); // play walk animation 
			} else {
			   scientist.anims.play('scientist_walk', true); // play walk animation 
			}
			scientist.flipX = true; // flip the sprite to the left
			this.scientistJump() 
		}
		else if (keyK.isDown || moveRight) { // if the right arrow key is down
			scientist.body.setVelocityX(100); // move right
			if(this.isScienticha) {
				scientist.anims.play('scienticha_walk', true);
			} else {
				scientist.anims.play('scientist_walk', true);
			}
			scientist.flipX = false; // use the original sprite looking to the right
			this.scientistJump()
		} else {
			//player.body.setVelocityX(0);
			if(this.isScienticha) {
				scientist.anims.play('scienticha_idle', true);
			} else {
				scientist.anims.play('scientist_idle', true);
			}
		}
		this.scientistJump()
	}
	scientistJump() {
		if (Phaser.Input.Keyboard.JustDown(keyX)) {
			if(scientist.body.onFloor()) {
					// wallb jump height
				scientist.body.setVelocityY(-300);// jump up
			} 
		}
	}
	onConveyorBelt(obj){
		obj.body.setVelocityX(200);
	}
	reachFlag() {
		console.log('touched')
		if(stage == "finished") {
			nextLevel = true;
		}
	}
	touchLava() {
		restart = true;
	}
	reset() {
		this.scene.start("CutScene2");
		this.backgroundMusic.stop();
	}
	onBB() {
		bdIsActive = true;
	}
	action1() {  
		//action 1
		bdIsActive = false;
		if(stage != "finished") {
			stage = "doorup";
		}
	}
	action2() {
		//action 2
	}
	end2() {
		end = "end2";
	}

}