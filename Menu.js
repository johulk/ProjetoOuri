class Menu extends Phaser.Scene{
	constructor(){
		super("menu");
	}
	
	create() {
        let w = config.width 
        let h = config.height

        this.background = this.add.sprite(w/2, h/2, "background");
        //this.background.setOrigin(0,0);
       

        this.ouri = this.add.sprite(w/2, h/12, 'ouri');
        this.ouri.setScale(.55)

        // Buttons
        
        //2 Jogadores
        this.players = this.add.sprite(w/2, h/2 - h/12 - h/24 , 'players').setInteractive();
        this.players.on('pointerdown', () => this.clickPlayers());
        this.players.setScale(0.8)

        //Computador
        this.computer = this.add.sprite(w/2, h/2 + h/12 , 'computer').setInteractive();
        this.computer.on('pointerdown', () => this.clickComputer());
        this.computer.setScale(0.8)

        //Informações
        this.info = this.add.sprite(w - w/18 + w/60, h/2 - h/12 - h/24, 'info').setInteractive();
        this.info.on('pointerdown', () => this.clickInfo());
        this.info.setScale(0.8)

        //Créditos
        this.creditos = this.add.sprite(w - w/18 + w/60, h/2 , 'creditos').setInteractive();
        this.creditos.on('pointerdown', () => this.clickCreditos());
        this.creditos.setScale(0.8)

        //Troféu
        this.trofeu = this.add.sprite(w - w/18 + w/60, h/2 + h/12 + h/24 , 'trofeu').setInteractive();
        this.trofeu.on('pointerdown', () => this.clickTrofeu());
        this.trofeu.setScale(0.8)

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
        var counter = 1;
        
        this.informacoes=this.add.sprite(config.width/2,config.height/2,"info1");
        this.informacoes.setScale(.8);     

        this.forward = this.add.sprite(config.width - config.width/18, config.height/2 + config.height/6, 'forward').setInteractive();
        this.forward.on('pointerdown', () => this.info(counter+1));
        
        this.back = this.add.sprite(config.width - config.width/18, config.height/2 + config.height/6, 'back').setInteractive();
        this.back.on('pointerdown', () => this.info(counter-1));
        
        this.close = this.add.sprite(config.width,config.height,'close').setInteractive();
        this.close.on('pointerdown', ()=>this.scene.start(Menu));

    }
    clickCreditos(){
        console.log('Créditos');
    }
    clickTrofeu(){
        console.log('Troféu');
    }
    info(contador){

        this.informacoes=this.add.sprite(config.width/2,config.height/2,"info"+contador);
        this.informacoes.setScale(.5);  
    }
}