class Dificuldade extends Phaser.Scene{
	constructor(){
		super("dificuldade");
	}
	
	create() {
        var w = config.width 
        var h = config.height
        this.scale.lockOrientation('landscape')
        this.background = this.add.sprite(w, h, "background");
        this.background.displayWidth = w*2
        this.background.displayHeight = h*2
        //this.background.setOrigin(0,0);
       

        //this.ouri = this.add.sprite(w/2, h/6, 'ouri');

        // Buttons
        
        
        this.easy = this.add.sprite(w, h -400, 'easy').setInteractive();
        this.easy.on('pointerdown', () => this.clickEasy());
        this.easy.setScale(2)


        this.medium = this.add.sprite(w, h+h/3 - 400 , 'medium').setInteractive();
        this.medium.on('pointerdown', () => this.clickMedium());
        this.medium.setScale(2)

        this.hard = this.add.sprite(w, h*2-200 -400, 'hard').setInteractive();
        this.hard.on('pointerdown', () => this.clickHard());
        this.hard.setScale(2)

        this.home = this.add.sprite((w / 18)*2, (h - w / 18)*2, 'home').setInteractive();
                this.home.key = -1;
                this.home.on('pointerdown', () => this.clickMenu());
        this.home.setScale(2)
        
    }

    clickEasy(){
        console.log('Easy');
        dif = 0;
        this.scene.start("pvc");
    }
    
    clickMedium(){
        console.log('Medium')
        dif = 1;
        this.scene.start("pvc");
    }

    clickHard(){
        console.log('Hard')
        dif = 2;
        this.scene.start("pvc");
    }

    clickMenu() {
        console.log('Menu');
        this.scene.start('menu');
}
    
}