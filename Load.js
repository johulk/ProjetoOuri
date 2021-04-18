class Load extends Phaser.Scene{
	constructor(){
		super("load");
	}

    preload (){

        //this.load.plugin('PhaserDebugGameScalePlugin', 'https://cdn.jsdelivr.net/npm/phaser-plugin-debug-game-scale@1.0.2', true)

        //Backgrounds
        this.load.image('background', 'img_menu/background_1.png');
        this.load.image('background_2', 'img_menu/background_2.png');

        this.load.image('pinto_1','img_menu/pinto01.png');
        this.load.image('pinto_2','img_menu/pinto02.png');
        this.load.image('pinto_3','img_menu/pinto03.png');
        this.load.image('pinto_4','img_menu/pinto04.png');
        this.load.image('ovo','img_menu/ovo.png');
        


        //Infos

        for(var j = 1; j <= 10; j++){
            this.load.image('info'+j, 'img_menu/info'+j+'.png')
        }

        this.load.image('infoVazio','img_menu/quadro.png')
        
        //Score
        this.load.image('jogador1Score','img_menu/player1.png')
        this.load.image('jogador2Score','img_menu/player2.png')
        this.load.image('computadorScore','img_menu/computerpl.png')

        //Buttons
        this.load.image('players', 'img_menu/button_2players.png');
        this.load.image('computer', 'img_menu/button_computador.png');

        this.load.image('forward', 'img_menu/forward.png');
        this.load.image('back', 'img_menu/backward.png');
        this.load.image('close', 'img_menu/closeBT.png')

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
        
        //Setas
        this.load.image('setaP1','img_menu/assinalaPlayer1.png')
        this.load.image('setaP2','img_menu/assinalaPlayer2.png')
        this.load.image('setaCounter','img_menu/assinalaPlayer3.png')


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