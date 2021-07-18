class Level2 extends Phaser.Scene {
    constructor() {
        super("level2Scene");
    }
    preload() {
        console.log('level 2')
        // map made with Tiled in JSON format
        this.load.tilemapTiledJSON('level', './assets/level1.json');
        // tiles in spritesheet 
        this.load.image('tiles', './assets/tiles.png');
        this.load.image('key', './assets/key.png');
        this.load.image('flag', './assets/flag.png');
        // player animations
        this.load.atlas('player', 'assets/player.png', 'assets/player.json');
        // load mecha sprite
        this.load.spritesheet('mecha', './assets/wall-b-mecha.png', {frameWidth: 57, frameHeight: 81, startFrame: 0, endFrame: 3})
        this.load.spritesheet('wall-b', './assets/wall-b.png', {frameWidth: 56, frameHeight: 68, startFrame: 0, endFrame: 3})
    }

    create() {
        this.backgroundMusic =  this.sound.add('bgm_level1', {
            volume: 1,
            loop: true
        })
        this.backgroundMusic.play()
        
        // load the map 
        map = this.make.tilemap({ key: 'level' });
        
        // tiles for the ground layer
        var groundTiles = map.addTilesetImage('tileset', 'tiles', 16, 16);
        // create the ground layer
        groundLayer = map.createLayer('Background', groundTiles, 0, 0);
        //player collision
        //groundLayer.setCollisionByProperty({ collides: true });
        groundLayer.setCollisionByExclusion(-1, true);
        
        // create the conveyorBelt layer 
        conveyorBelt = map.createLayer('ConveyorBelt', groundTiles, 0, 0);
        conveyorBelt.setCollisionByExclusion(-1, true);
        
        //create blue door layer
        blueDoor = map.createLayer('DoorBlue', groundTiles, 0, 0);
        blueDoor.setCollisionByExclusion(-1, true);
        
        //create green wall layer
        greenDoor = map.createLayer('DoorGreen', groundTiles, 0, 0);
        greenDoor.setCollisionByExclusion(-1, true);
        
        //create ButtonBlue layer
        blueButton = map.createLayer('ButtonBlue', groundTiles, 0, 0);
        blueButton.setCollisionByExclusion(-1, true);
        
        //create ButtonGreen layer
        greenButton = map.createLayer('ButtonGreen', groundTiles, 0, 0);
        greenButton.setCollisionByExclusion(-1, true);
        

        // set the boundaries of our game world
        this.physics.world.bounds.width = groundLayer.width;
        this.physics.world.bounds.height = groundLayer.height;

        // create the player sprite    
        wallb = this.physics.add.sprite(16, 500, 'wall-b');
        wallb.setScale(0.4, 0.4);
        //wallb.setBounceY(0.3); // our player will bounce from ground
        wallb.setCollideWorldBounds(true); // don't go out of the map    
        
        
        // create the Mecha sprite
        mecha = this.physics.add.sprite(16, 400, 'mecha');
        mecha.setScale(0.8, 0.8);
        //mecha.setBounceY(0.3);
        mecha.setCollideWorldBounds(true);
        mecha.setDragX(400);
        
        // initialize mecha collectable flag
        mecha.collectable = true;
        // modify mecha hitbox while collapse
        mecha.body.setSize(20, 20)
        mecha.body.setOffset(18.5, 61)
        
        // create key sprite
        key = this.physics.add.sprite(700, 320, 'key');
        key.setDragX(100);
        
        key1 = this.physics.add.sprite(1470, 200, 'key');
        key1.setDragX(100);
        
        key2 = this.physics.add.sprite(1920, 550, 'key');
        key2.setDragX(100);
        
        keyIcon = this.add.image(0, 0, 'key');
        keyIcon1 = this.add.image(0, 0, 'key');
        keyIcon2 = this.add.image(0, 0, 'key');
        keyIcon.alpha = 0
        keyIcon1.alpha = 0
        keyIcon2.alpha = 0
        
        door = this.physics.add.sprite(2180, 430, 'flag')
        
        // define colliders
        this.physics.add.collider(wallb, groundLayer);
        this.physics.add.collider(wallb, conveyorBelt, this.onConveyorBelt);
        this.physics.add.overlap(wallb, mecha, this.collectMecha, null, this);
        // make player wallb in the beginning of the game
        player = wallb
        wallb.setDragX(400);
        
        this.physics.add.collider(mecha, groundLayer);
        this.physics.add.collider(mecha, conveyorBelt, this.onConveyorBelt);
        
        this.physics.add.collider(key, groundLayer);
        this.physics.add.collider(key, conveyorBelt, this.onConveyorBelt);
        this.physics.add.collider(key, wallb, this.collectKey);
        this.physics.add.collider(key, mecha, this.collectKey);
        
        this.physics.add.collider(key1, groundLayer);
        this.physics.add.collider(key1, conveyorBelt, this.onConveyorBelt);
        this.physics.add.collider(key1, wallb, this.collectKey);
        this.physics.add.collider(key1, mecha, this.collectKey);
        
        this.physics.add.collider(key2, groundLayer);
        this.physics.add.collider(key2, conveyorBelt, this.onConveyorBelt);
        this.physics.add.collider(key2, wallb, this.collectKey);
        this.physics.add.collider(key2, mecha, this.collectKey)
        
        this.physics.add.collider(door, groundLayer);
        this.physics.add.collider(door, conveyorBelt);
        this.physics.add.overlap(door, mecha, this.reachFlag, null, this);
        this.physics.add.overlap(door, wallb, this.reachFlag, null, this);
        
        // collider for buttons
        this.physics.add.collider(blueButton, mecha, this.onBB);
        this.physics.add.collider(blueButton, wallb, this.onBB);
        
        this.physics.add.collider(greenButton, mecha, this.onGB);
        this.physics.add.collider(greenButton, wallb, this.onGB);
        
        // collider for doors
        this.BDWallBC = this.physics.add.collider(blueDoor, wallb);
        this.BDMechaC =  this.physics.add.collider(blueDoor, mecha);
        this.BDKeyC =  this.physics.add.collider(blueDoor, key);
        this.BDKey1C =  this.physics.add.collider(blueDoor, key1);
        this.BDKey2C =  this.physics.add.collider(blueDoor, key2);
        
        this.GDMechaC = this.physics.add.collider(greenDoor, mecha);
        this.GDKeyC =  this.physics.add.collider(greenDoor, key);
        this.GDKey1C =  this.physics.add.collider(greenDoor, key1);
        this.GDKey2C =  this.physics.add.collider(greenDoor, key2);
        
    
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
            frames: this.anims.generateFrameNumbers('mecha', { start:0, end: 3, first: 0}),
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
        
        // initialize keyCount
        keyCount = 0;
        
        // display keyCount
        //text = this.add.text(100, 100, keyCount, textConfig);
        
        // key mapping
        cursors = this.input.keyboard.createCursorKeys();
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // make the camera follow the player
        this.cameras.main.startFollow(player);

        // set background color, so the sky is not black    
        this.cameras.main.setBackgroundColor('#ccccff');
        
        // initialize mid air jump flag
        this.canMidAirJump = false;
        
        // initialize BB and GB flag
        bdIsActive = false;
        gdIsActive = false;
        
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyQ)) { 
            console.log('x: ' + player.x)
            console.log('y: ' + player.y)
        }
        
        if (cursors.left.isDown) {
            if(player == wallb){
                player.body.setVelocityX(-200); // move left
                wallb.anims.play('walk', true); // play walk animation
            } else if(player == mecha) {
                player.body.setVelocityX(-150); // move left
            }
            player.flipX = true; // flip the sprite to the left
            this.midAirJump() 
        }
        else if (cursors.right.isDown) { // if the right arrow key is down
            if(player == wallb){
                player.body.setVelocityX(200); // move right
                wallb.anims.play('walk', true); // play walk animation
            }else if(player == mecha) {
                player.body.setVelocityX(150); // move left
            }
            player.flipX = false; // use the original sprite looking to the right
            this.midAirJump() 
        } else {
            //player.body.setVelocityX(0);
            if(player == wallb){
                player.anims.play('idle', true);
            }
        }
        
        this.midAirJump() 
        
        // reset mid air jump upon hit the ground
        if(player.body.onFloor()) {
             this.canMidAirJump = true;
        }
        
        // mech can only be collect after touching the ground
        if(player == wallb && mecha.body.onFloor()) {
            mecha.collectable = true;
        }
        
        if(keyCount == 1){
            keyIcon.alpha = 1;
            keyIcon.x = player.x;
            keyIcon.y = player.y - 50;
        }
        if(keyCount == 2){
            keyIcon.alpha = 1;
            keyIcon1.alpha = 1;
            keyIcon.x = player.x - 10
            keyIcon.y = player.y - 50
            keyIcon1.x = player.x + 10
            keyIcon1.y = player.y - 50
        }
        if(keyCount == 3){
            keyIcon.alpha = 1;
            keyIcon1.alpha = 1;
            keyIcon2.alpha = 1;
            keyIcon.x = player.x - 20
            keyIcon.y = player.y - 50
            keyIcon1.x = player.x + 20
            keyIcon1.y = player.y - 50
            keyIcon2.x = player.x + 0
            keyIcon2.y = player.y - 50
        }
        
        if (player == mecha) {
            this.BDMechaC.active = true;
        } else {
            this.BDMechaC.active = false;
        }
        
        if (bdIsActive) {
            this.BDWallBC.active = false;
            this.BDMechaC.active = false;
            this.BDKeyC.active = false;
            this.BDKey1C.active = false;
            this.BDKey2C.active = false;
        } else {
            this.BDWallBC.active = true;
            this.BDKeyC.active = true;
            this.BDKey1C.active = true;
            this.BDKey2C.active = true;
        }
        
        if (gdIsActive) {
            this.GDMechaC.active = false;
            this.GDKeyC.active = false;
            this.GDKey1C.active = false;
            this.GDKey2C.active = false;
        } else {
            this.GDMechaC.active = true;
            this.GDKeyC.active = true;
            this.GDKey1C.active = true;
            this.GDKey2C.active = true;
        }
        bdIsActive = false;
        gdIsActive = false;
    }
    collectMecha() {
        // combine mech and wallb
        if(mecha.collectable) {
            mecha.body.setSize(57, 81)
            // make player the mecha
            player = mecha
            // update the camera 
            this.cameras.main.startFollow(player);
            // disable wallb physics
            wallb.body.enable = false;
            // hide wallb
            wallb.alpha = 0;
            // make mech un-collectable once combine
            mecha.collectable = false;
            // play expand animation
            mecha.anims.stop();
            mecha.anims.play('expand', true);
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
                // update wallb position
                wallb.x = mecha.x;
                wallb.y = mecha.y - 30;
                // re-enable wallb physics
                wallb.body.enable = true;
                // make wallb reaper
                wallb.alpha = 1;
                // make the player wallb
                player = wallb
                // update the camera 
                this.cameras.main.startFollow(player);
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
    onConveyorBelt(obj){
        //console.log('touch')
        //console.log(obj.body.velocity.x)
        obj.body.setVelocityX(200);
    }
    collectKey(key) {
        key.disableBody(true, true);
        keyCount += 1;
        //text.text = keyCount;
    }
    reachFlag() {
        // restart the scene once condition is met
        //console.log('reach')
        if (keyCount == 3 && player == mecha) {
            this.scene.start("level2Scene");
            this.backgroundMusic.stop();
        }
    }

    onBB() {
        bdIsActive = true;
    }
    onGB() {
        gdIsActive = true;
    }
}