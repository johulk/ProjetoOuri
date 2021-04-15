class Dificuldade extends Phaser.Scene{
	constructor(){
		super("dificuldade");
	}
	
	create() {
        var w = config.width 
        var h = config.height
        this.scale.lockOrientation('landscape')
        this.background = this.add.sprite(w/2, h/2, "background");
        //this.background.setOrigin(0,0);
       

        //this.ouri = this.add.sprite(w/2, h/6, 'ouri');

        // Buttons
        
        
        this.computer = this.add.sprite(w/2, h/2 -200, 'easy').setInteractive();
        this.computer.on('pointerdown', () => this.clickEasy());


        this.players = this.add.sprite(w/2, h/2+h/6 - 200 , 'medium').setInteractive();
        this.players.on('pointerdown', () => this.clickMedium());


        this.info = this.add.sprite(w/2, h-100 -200, 'hard').setInteractive();
        this.info.on('pointerdown', () => this.clickHard());


        this.home = this.add.sprite(w / 18, h - w / 18, 'home').setInteractive();
                this.home.key = -1;
                this.home.on('pointerdown', () => this.clickMenu());
        
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