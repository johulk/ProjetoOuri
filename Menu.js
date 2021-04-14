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
        //info1
        this.informacoes=this.add.sprite(config.width/2,config.height/2+config.height/12,"info1");
        this.informacoes.setScale(.7);   

        //Forwards
        this.forward = this.add.sprite(config.width-config.width/4 - config.width/24 - config.width/150, config.height/2 + config.height/6+config.height/6+config.height/24-config.height/98, 'forward').setInteractive();
        this.forward.on('pointerdown', () => this.counterInfo(counter+1));
        this.forward.setScale(0.67)
        //Backwards
        this.back = this.add.sprite(config.width/4 + config.width/24 +config.width/150, config.height/2 + config.height/6+config.height/6+config.height/24-config.height/98, 'back').setInteractive();
        this.back.on('pointerdown', () => this.counterInfo(counter-1));
        this.back.setScale(0.67)
        //Fechar
        this.close = this.add.sprite(config.width-config.width/4 - config.width/24 - config.width/240 + config.width/64,config.height/2 -config.height/12 - config.height/24 - config.height/48 - config.height/64,'close').setInteractive();
        this.close.on('pointerdown', ()=>this.scene.start("menu"));
        this.close.setScale(0.67)

    }
    clickCreditos(){
        console.log('Créditos');
    }
    clickTrofeu(){
        console.log('Troféu');
    }
    counterInfo(contador){
        if(contador > 0){
        this.informacoes=this.add.sprite(config.width/2,config.height/2+config.height/12,"info"+contador);
        this.informacoes.setScale(.7);  
        //Forwards
        this.forward = this.add.sprite(config.width-config.width/4 - config.width/24 - config.width/150, config.height/2 + config.height/6+config.height/6+config.height/24-config.height/98, 'forward').setInteractive();
        this.forward.on('pointerdown', () => this.counterInfo(contador+1));
        this.forward.setScale(0.67)
        //Backwards
        this.back = this.add.sprite(config.width/4 + config.width/24 +config.width/150, config.height/2 + config.height/6+config.height/6+config.height/24-config.height/98, 'back').setInteractive();
        this.back.on('pointerdown', () => this.counterInfo(contador-1));
        this.back.setScale(0.67)
        //Fechar
        this.close = this.add.sprite(config.width-config.width/4 - config.width/24 - config.width/240 + config.width/64,config.height/2 -config.height/12 - config.height/24 - config.height/48 - config.height/64,'close').setInteractive();
        this.close.on('pointerdown', ()=>this.scene.start("menu"));
        this.close.setScale(0.67)
        }
    }
}