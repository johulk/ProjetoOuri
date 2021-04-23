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



        this.ouri = this.add.sprite(150 * 2, 55 * 2, 'ouri');
        this.ouri.depth = 2

        //Pintainho 3

        this.pinto3 = this.add.sprite((350) * 2, (470) * 2, 'pinto_3')

        this.pinto3.depth = 2

        //Pintainho 2
        this.pinto2 = this.add.sprite(1150, (520) * 2, 'pinto_2')
        //this.pinto2.setScale(0.5)
        this.pinto2.flipX = true
        this.pinto2.depth = 1

        //Pintainho 1
        this.pinto1 = this.add.sprite((950) * 2, (487) * 2, 'pinto_1')
        //this.pinto1.setScale(0.5)
        this.pinto1.depth = 1

        //Ovos
        this.ovo1 = this.add.sprite(739 * 2, 540 * 2, 'ovo')
        //his.ovo1.setScale(0.5)
        this.ovo1.depth = 3
        this.ovo1.angle = 4.0


        this.ovo2 = this.add.sprite(730 * 2, 555 * 2, 'ovo')
        //this.ovo2.setScale(0.5)
        this.ovo2.depth = 1

        this.ovo3 = this.add.sprite(748 * 2, 555 * 2, 'ovo')
        //this.ovo3.setScale(0.5)
        this.ovo3.depth = 2

        this.ovo4 = this.add.sprite(782 * 2, 557 * 2, 'ovo')
        //this.ovo4.setScale(0.5)
        this.ovo4.depth = 2
        this.ovo4.angle = 85

        // Buttons


        this.easy = this.add.sprite(w, 250, 'easy').setInteractive();
        this.easy.on('pointerdown', () => this.clickEasy());
        this.easy.setScale(1.5)

        this.medium = this.add.sprite(w, 250 + 120, 'medium').setInteractive();
        this.medium.on('pointerdown', () => this.clickMedium());
        this.medium.setScale(1.5)

        this.hard = this.add.sprite(w, 250 + 240, 'hard').setInteractive();
        this.hard.on('pointerdown', () => this.clickHard());
        this.hard.setScale(1.5)

        this.home = this.add.sprite((w / 18) * 2, (h - w / 18) * 2, 'home').setInteractive();
        this.home.key = -1;
        this.home.on('pointerdown', () => this.clickMenu());
        this.home.setScale(2)

        

    }

    clickEasy() {
        console.log('Easy');
        dif = 0;
        this.scene.start("pvc");
    }

    clickMedium() {
        console.log('Medium')
        dif = 1;
        this.scene.start("pvc");
    }

    clickHard() {
        console.log('Hard')
        dif = 2;
        this.scene.start("pvc");
    }

    clickMenu() {
        console.log('Menu');
        this.scene.start('menu');
    }

}