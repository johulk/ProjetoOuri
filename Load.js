class Load extends Phaser.Scene{
	constructor(){
		super("load");
	}

    preload (){
        
        //Backgrounds
        this.load.image('background', 'img_menu/background_1.png');
        this.load.image('background_2', 'img_menu/background_2.png');

        //Buttons
        this.load.image('players', 'img_menu/button_2players.png');
        this.load.image('computer', 'img_menu/button_computador.png');

        this.load.image('trofeu', 'img_menu/bt_trofeus.png');
        this.load.image('info', 'img_menu/bt_info.png');
        this.load.image('creditos', 'img_menu/bt_creditos.png');
        this.load.image('home', 'img_menu/bt_home.png')

        this.load.image('easy', 'img_menu/button_easy.png');
        this.load.image('medium', 'img_menu/button_medium.png');
        this.load.image('hard', 'img_menu/button_hard.png');

        //Elements
        this.load.image('ouri', 'img_menu/titulo.png');
        this.load.image('p1', 'img_menu/pinto01.png');
        this.load.image('p2', 'img_menu/pinto02.png');
        this.load.image('p3', 'img_menu/pinto03.png');
        this.load.image('p4', 'img_menu/pinto04.png');
    

        for(var i = 0; i<31; i++){
        this.load.image('i'+i, 'img/'+i+'.png')
        }

        //Board Elements
        this.load.image('cesto', 'img_menu/cesto.png');
        this.load.image('tabuleiro','img_menu/tabuleiro_verde.png' )
    }
    
    create(){
        this.add.text(20,20, "Loading game...")
        this.scene.start("menu");
    }


}