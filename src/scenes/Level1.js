class Level1 extends Phaser.Scene {
    constructor() {
        super("level1Scene");
    }
    preload() {
        // map made with Tiled in JSON format
        this.load.tilemapTiledJSON('level1', 'assets/map.json');
        // tiles in spritesheet 
        this.load.image('tiles', 'assets/tiles.png');
        // player animations
        this.load.atlas('player', 'assets/player.png', 'assets/player.json');
        this.load.spritesheet('wall-b', './assets/wall-b.png', {frameWidth: 56, frameHeight: 68, startFrame: 0, endFrame: 3})
    }

    create() {
        // load the map 
        map = this.make.tilemap({ key: 'level1' });

        // tiles for the ground layer
        var groundTiles = map.addTilesetImage('tileset', 'tiles', 16, 16);
        // create the ground layer
        groundLayer = map.createLayer('Background', groundTiles, 0, 0);
        //player collision
        //groundLayer.setCollisionByProperty({ collides: true });
        groundLayer.setCollisionByExclusion(-1, true);

        // set the boundaries of our game world
        this.physics.world.bounds.width = groundLayer.width;
        this.physics.world.bounds.height = groundLayer.height;

        // create the player sprite    
        player = this.physics.add.sprite(16, 16, 'wall-b');
        player.setScale(0.4, 0.4);
        player.setBounce(0.2); // our player will bounce from items
        player.setCollideWorldBounds(true); // don't go out of the map    

        // player will collide with the level tiles 
        this.physics.add.collider(player, groundLayer);

        // player walk animation
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('wall-b', { start:2, end: 3, first: 2}),
            frameRate: 10,
            repeat: -1
        });
        // player idle animation
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('wall-b', { start:0, end: 1, first: 0}),
            frameRate: 2,
            repeat: -1
        });

        cursors = this.input.keyboard.createCursorKeys();
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // make the camera follow the player
        this.cameras.main.startFollow(player);

        // set background color, so the sky is not black    
        this.cameras.main.setBackgroundColor('#ccccff');
        
        this.canJump = false;
        this.canMidAirJump = false;
    }

    update() {
        if (cursors.left.isDown) // if the left arrow key is down
        {
            player.body.setVelocityX(-200); // move left
            player.body.setVelocityX(-200); // move left
            player.anims.play('walk', true); // play walk animation
            player.flipX = true; // flip the sprite to the left
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                if(this.canJump) {
                    player.body.setVelocityY(-270); // jump up
                    this.canJump = false;
                } else if(this.canMidAirJump) {
                    player.body.setVelocityY(-200);
                    this.canMidAirJump = false;
                }
            }
        }
        else if (cursors.right.isDown) // if the right arrow key is down
        {
            player.body.setVelocityX(200); // move right
            player.body.setVelocityX(200); // move right
            player.anims.play('walk', true); // play walk animatio
            player.flipX = false; // use the original sprite looking to the right
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                if(this.canJump) {
                    player.body.setVelocityY(-270); // jump up
                    this.canJump = false;
                } else if(this.canMidAirJump) {
                    player.body.setVelocityY(-200);
                    this.canMidAirJump = false;
                }
            }
        }
        else {
            player.body.setVelocityX(0);
            player.anims.play('idle', true);
        }
        
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            if(this.canJump) {
                player.body.setVelocityY(-270); // jump up
                this.canJump = false;
            } else if(this.canMidAirJump) {
                player.body.setVelocityY(-200);
                this.canMidAirJump = false;
            }
        }
        
        if(player.body.onFloor()) {
            this.canJump = true;
            this.canMidAirJump = true;
        }
    }
}