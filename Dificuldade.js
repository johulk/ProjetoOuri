class Dificuldade extends Phaser.Scene {
    constructor() {
        super("dificuldade");
    }

    create() {
        var w = config.width
        var h = config.height
        this.scale.lockOrientation('landscape')
        this.background = this.add.sprite(w, h, "background");
        this.background.displayWidth = w * 2
        this.background.displayHeight = h * 2



        this.ouri = this.add.sprite(150 * 2, 65 * 2, 'ouri');
        this.ouri.setScale(1.05)
        this.ouri.depth = 2

        //Pintainho 3

        this.pinto3 = this.add.sprite((364) * 2, (490) * 2, 'pinto_3')
        this.pinto3.setScale(1)
        this.pinto3.depth = 2

        //Pintainho 2
        this.pinto2 = this.add.sprite(1300, (520) * 2, 'pinto_2')
        this.pinto2.setScale(0.999999999)
        this.pinto2.flipX = true
        this.pinto2.depth = 1

        //Pintainho 1
        this.pinto1 = this.add.sprite((950) * 2, (487) * 2, 'pinto_1')
        //this.pinto1.setScale(0.5)
        this.pinto1.depth = 1

        //Ovos
        this.ovo1 = this.add.sprite(739 * 2, 546 * 2, 'ovo')
        //his.ovo1.setScale(0.5)
        this.ovo1.depth = 3
        this.ovo1.angle = 4.0


        this.ovo2 = this.add.sprite(730 * 2, 561 * 2, 'ovo')
        //this.ovo2.setScale(0.5)
        this.ovo2.depth = 1

        this.ovo3 = this.add.sprite(748 * 2, 561 * 2, 'ovo')
        //this.ovo3.setScale(0.5)
        this.ovo3.depth = 2

        this.ovo4 = this.add.sprite(782 * 2, 563 * 2, 'ovo')
        //this.ovo4.setScale(0.5)
        this.ovo4.depth = 2
        this.ovo4.angle = 85

        // Buttons


        this.easy = this.add.sprite(w, 220, 'easy').setInteractive();
        this.easy.on('pointerdown', () => this.clickEasy());
        this.easy.setScale(1.7)

        this.medium = this.add.sprite(w, 450, 'medium').setInteractive();
        this.medium.on('pointerdown', () => this.clickMedium());
        this.medium.setScale(1.7)

        this.hard = this.add.sprite(w, 680, 'hard').setInteractive();
        this.hard.on('pointerdown', () => this.clickHard());
        this.hard.setScale(1.7)

        this.home = this.add.sprite(95, 1115, 'home').setInteractive();
        this.home.key = -1;
        this.home.on('pointerdown', () => this.clickMenu());
        this.home.setScale(1.7)



    }

    clickEasy() {
        dif = 0;
        this.scene.start("pvc");
    }

    clickMedium() {
        dif = 1;
        this.scene.start("pvc");
    }

    clickHard() {
        dif = 2;
        this.scene.start("pvc");
    }

    clickMenu() {
        this.scene.start('menu');
    }

}