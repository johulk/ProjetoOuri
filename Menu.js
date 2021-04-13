class Menu extends Phaser.Scene{
	constructor(){
		super("menu");
	}
	
	create() {
        var w = config.width 
        var h = config.height

        this.background = this.add.sprite(w/2, h/2, "background");
        //this.background.setOrigin(0,0);
       

        this.ouri = this.add.sprite(w/2, h/6, 'ouri');

        // Buttons
        this.players = this.add.sprite(w/2, h/2 + h/6 + h/64 , 'players').setInteractive();
        this.players.on('pointerdown', () => this.clickPlayers());

        this.computer = this.add.sprite(w/2, h/2, 'computer').setInteractive();
        this.computer.on('pointerdown', () => this.clickComputer());

        this.info = this.add.sprite(w - w/18, h/2, 'info').setInteractive();
        this.info.on('pointerdown', () => this.clickInfo());

        this.creditos = this.add.sprite(w - w/18, h/2 + h/6, 'creditos').setInteractive();
        this.creditos.on('pointerdown', () => this.clickCreditos());

        this.trofeu = this.add.sprite(w - w/18, h/2 + h/3 , 'trofeu').setInteractive();
        this.trofeu.on('pointerdown', () => this.clickTrofeu());
    }

    clickPlayers(){
        console.log('2 Jogadores');
        this.scene.start("pvp");
    }
    
    clickComputer(){
        console.log('Computador')
        this.scene.start("dificuldade");
    }

    clickInfo(){
        console.log('Informações');
    }
    clickCreditos(){
        console.log('Créditos');
    }
    clickTrofeu(){
        console.log('Troféu');
    }
}