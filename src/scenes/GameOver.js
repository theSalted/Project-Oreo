class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverscene");
    }
    preload() {
        this.load.image('16-take-care-youself', './assets/speech/16-take-care-youself.png');
        this.load.image('17-nooo', './assets/speech/17-nooo.png');
        this.load.image('endscreen', './assets/endscreen.png')
    }
    create() {
        console.log("Game Over: " + end)
        if(end == "end1") {
            dialogue = this.add.image(500, 300, '16-take-care-youself');
            dialogue.setScale(0.7);
        } else if(end == "end2") {
            dialogue = this.add.image(500, 300, '17-nooo');
        } else {
            dialogue = this.add.image(500, 300, '16-take-care-youself');
            console.warn("illegale end parameter: " + end);
            dialogue.setScale(0.7);
        }
        this.endScreen = this.add.image(500, 1100, 'endscreen')
        
        /*
        let menuConfig = {
            fontFamily: 'Courier',
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
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding,
            'The End', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding, 
            'Credits:  Yuhao Chen (programmer/art)\nYanyao Hu (programmer/art)\nIzat Temiraliev (programmer/sound)', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding
             + borderUISize + borderPadding + borderUISize, 'Press R to Restart or Q to Quit', menuConfig).setOrigin(0.5);
        */
        // key mapping
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.alphaValue = 1;
        this.disapear = false;
        this.time.delayedCall(1000, () => {
            this.disapear = true;
        }, null, this);

    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyQ)) {
            this.scene.start("menuScene");
        }
        if(this.disapear) {
            this.alphaValue -= 0.005;
        }
        dialogue.setAlpha(this.alphaValue);
        if(this.endScreen.y >= 300) {
            this.endScreen.y -= 1
        } else {
            this.time.delayedCall(2000, () => {
                this.scene.start("menuScene");
            }, null, this);
        }
    }
}