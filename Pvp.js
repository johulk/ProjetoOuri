let textP1;
let textP2;


class Pvp extends Phaser.Scene{
	constructor(){
		super("pvp");
	}
	

	create() {
		var w = config.width;
                var h = config.height;
                this.scale.lockOrientation('landscape')
                // User Interface
                this.background = this.add.sprite(w, h, "background_2");
                this.background.displayWidth = 1024*2;
                this.background.displayHeight = 600*2;

                this.home = this.add.sprite(41*2, 561*2 , 'home').setInteractive();
                this.home.key = -1;
                this.home.on('pointerdown', () => this.clickMenu());
		        this.home.setScale(1.3)

                this.ouri = this.add.sprite(150*2, 55*2, 'ouri');
               // this.ouri.displayHeight = 
                //this.ouri.displayWidth = 
                this.ouri.depth = 2

                //Pintainho 1
                this.pinto1 = this.add.sprite(910*2, 290*2,'pinto_1')
                //this.pinto1.setScale(0.5)
                this.pinto1.depth = 1


                //Pintainho 4
                this.pinto4 = this.add.sprite(110*2,290*2,'pinto_4')
                //this.pinto4.setScale(0.5)
                this.pinto4.flipX = true
                this.pinto4.depth = 1

                //Scores
                this.player1Score = this.add.sprite(915*2,72*2,"jogador1Score")
                   this.player1Score.setScale(0.75)
                this.player2Score = this.add.sprite(915*2,160*2,"jogador2Score")
                   this.player2Score.setScale(0.75)

        textP1 = this.add.text(915*2,52*2, scorePlayer1,{ fontFamily: 'Arial', fontSize: 70, color: '#000000' });
		textP2 = this.add.text(915*2,140*2,scorePlayer2,{ fontFamily: 'Arial', fontSize: 70, color: '#000000'});

        // Inicializar
        player = 1;
        dep1 = 0;
        dep2 = 0;
        check = 0;       
		state = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
		
	    this.atualizaTabuleiro(w,h);
		this.atualizaSetas();

	    
	    this.input.on('gameobjectdown', this.jogada,this);

	}

	jogada(pointer,gameObject){
		// Impedir jogada quando se clica no home
		if (gameObject.key === -1){return;}

		var pos = gameObject.key;

		// Impedir que um jogador jogue no campo errado
		if ((player === 1 && pos > 5) || (player === 2 && pos < 6)){return;}

		
		// Verifica as regras do jogo
		if(this.one(pos) === -1){return;}

		if(this.popularOponente(pos) === -1){return;}
		
		console.log('update')

		// A jogada e valida e pode começar
		this.atualizarState(pos);
		this.atualizaTabuleiro(config.width,config.height);

		this.nextPlayer();
		this.atualizaSetas();

		this.afterplay();
	}
	
	atualizaSetas(){

		
		this.setaP1 = this.setaP1 || this.add.sprite(1024,936,'setaP1').setScale(0.7).setVisible(false)
        this.setaP2 = this.setaP2 || this.add.sprite(1024,100,'setaP2').setScale(0.7).setVisible(false)
        this.setaCounterP1 = this.setaCounterP1 || this.add.sprite(810*2,72*2,'setaCounter').setScale(0.7).setVisible(false)
        this.setaCounterP2 = this.setaCounterP2 || this.add.sprite(810*2,160*2,'setaCounter').setScale(0.7).setVisible(false)

		switch(player){
			
			case 1 :
			this.setaP2.setVisible(false)
			this.setaCounterP2.setVisible(false)
			this.setaP1.setVisible(true)
			this.setaCounterP1.setVisible(true)
			break;

			case 2:
				
			this.setaP1.setVisible(false)
			this.setaCounterP1.setVisible(false)
			this.setaP2.setVisible(true)
			this.setaCounterP2.setVisible(true)
			break
		}
	}

	afterplay(){
		if (dep1 > 24) { check = 1 }
		if (dep2 > 24) { check = 1 }
		var y = 0;
		var i = 0;

		if (player === 1) {
				for (i = 0; i < 6; i++) {
						y = y + this.popularOponente(i)
				}
		}

		if (player === 2) {
				for (i = 5; i < 12; i++) {
						y = y + this.popularOponente(i)
				}
		}

		if (y === -6) {
			check = 1
		}

		if (check === 1) {
				var vencedor = this.terminar()
				if (vencedor === 1){
					scorePlayer1 = scorePlayer1 + 1;
			}
			if (vencedor === 2){
					scorePlayer2 = scorePlayer2 + 1;
					
					
			}
		textP1.text =scorePlayer1;
		textP2.text = scorePlayer2;

		//Apresentar desforra
                        
                        
		//this.desforraQuadro = this.add.sprite((config.width/2)*2,(config.height/2+config.height/12)*2,"infoVazio");
		//this.desforraQuadro.setScale(1.4)
		switch(vencedor){
			case 1:
				this.quadroP1W = this.add.sprite((config.width/2)*2,(config.height/2+config.height/12)*2,"ganhouP1").setScale(1.4);
				//this.texto1 =  this.add.text(370*2,250*2,"O jogador 1 ganhou.",{ fontFamily: 'Arial', fontSize: 60, color: '#000000' });
				//this.texto2 = this.add.text(370*2,300*2,"Deseja a desforra?",{ fontFamily: 'Arial', fontSize: 60, color: '#000000' })
				break;

			case 2:
				this.quadroP2W = this.add.sprite((config.width/2)*2,(config.height/2+config.height/12)*2,"ganhouP2").setScale(1.4);
				//this.texto3 =  this.add.text(370*2,250*2,"O jogador 2 ganhou.",{ fontFamily: 'Arial', fontSize: 60, color: '#000000' });
				//this.texto4 = this.add.text(370*2,300*2,"Deseja a desforra?",{ fontFamily: 'Arial', fontSize: 60, color: '#000000' })
				break;
			}

		//Fechar
		this.close = this.add.sprite(2*(config.width/4 + config.width/24 +config.width/150), 2*(config.height/2 + config.height/6+config.height/6+config.height/24-config.height/98),'close').setInteractive();
		this.close.on('pointerdown', ()=>{scorePlayer1 = 0; scorePlayer2 = 0;this.scene.start("menu")});
		this.close.setScale(0.62*2)
		this.close.key = -1
		this.close.depth = 4
		
		//Forwards
		this.forward = this.add.sprite((config.width-config.width/4 - config.width/24 - config.width/150)*2, (config.height/2 + config.height/6+config.height/6+config.height/24-config.height/98)*2, 'forward').setInteractive();
		this.forward.on('pointerdown', () => this.scene.start("pvp"));
		this.forward.setScale(0.62*2)
        this.forward.key = -1
		this.forward.depth = 4  
		}
		//Atualiza indicadores de score
		
		
		
	}

	popularOponente(pos){
		var soma = 0;
		var finalpos = 0;
		var i = 0;
		var y = 0;

		if (player === 1){
	        for(i = 5; i < 12; i++){
	            soma = soma + state[i]
	        }
	    }
	    else {
	        for(i = 0; i < 6; i++){
	            soma = soma + state[i]
	        }
	    }
	    
	    if(soma === 0){
	    	y = -1;
            for(i = 0; i <= state[pos]; i++){
	            finalpos = (pos + i) % 12
	            if(player === 1){
	            // verifico que alguma pedra cai em territorio adversario
	                if (finalpos > 5 && finalpos< 12){
	                    y = 0;
	                }
	            }
	            else{
	                if(finalpos >= 0 && finalpos<6){
	                    y = 0;
	                }
	            }   	
	    	}
	    }	
		return y
	} 




 	terminar(){
		var res = 1
		var i;

		for(i = 0; i < 6; i++){
		    dep1 = dep1 + state[i]
		}

		for(i = 5; i < 12; i++){
		    dep2 = dep2 + state[i]
		}

		if(dep1 > dep2){ player = 1 }
		else { res = 2 }

		return res
	}

	nextPlayer(){
	    var totalP1 = 0
        var totalP2 = 0
        var i;

        // Verifica se algum dos tabuleiros estão vazios
        for(i = 0; i < 6; i++){
            totalP1 = totalP1 + state[i]
        }

        for(i = 6; i< 12; i++){
            totalP2 = totalP2 + state[i]
        }

        // Se o player 1 tiver o tabuleiro vazio, joga o player 2
        if (totalP1 === 0){
            player = 2
        }

        // Se o player 2 tiver o tabuleiro vazio, joga o player 1
        else if ( totalP2 === 0){
            player = 1
        }

        // Se nenhum tiver o tabuleiro vazio alterna-se as jogadas
        else {
            if (player === 1){player = 2} else {player = 1}
        }
	
	}

	atualizarState(pos){
        
        var valor = state[pos];

        // retirar as pedras da casa onde clicamos
        state[pos] = 0;
        
        // distribuir as pedras pelas casas seguintes
        for(var i = 1; valor > 0; i++){
            //Quando atingir 12 pedras tem de saltar a casa onde clicamos
            if ((pos + i % 12) != pos){
                state[(pos + i) % 12] = state[(pos + i) % 12] +1; 
                valor--;
            }
        }
        
        // Recolher as pedras
        var posfinal = (pos + i - 1) % 12

        if (player === 1){
	        while((state[posfinal] === 2 || state[posfinal] === 3) && posfinal>5 && posfinal<12){
	            dep1 = dep1 + state[posfinal]
	            state[posfinal] = 0;
	            posfinal = posfinal - 1;
	        }       
	    }

	    //Recolher as pedras para o player 2
	    if (player === 2){
	        while((state[posfinal] === 2 || state[posfinal] === 3) && posfinal>=0 && posfinal<6){
	            dep2 = dep2 + state[posfinal]
	            state[posfinal] = 0;
	            posfinal = posfinal - 1;
	            
	        }       
	    }
	}

	one(pos){
		if(state[pos] === 0){
			return -1;
		}

		var i;
		if(state[pos] === 1){
			if (pos < 6){
				for(i = 0; i < 6; i++){
					if (state[i] > 1){
						return -1;
					}
				}
			}
			if (pos > 5){
				for(i = 6; i < 12; i++){
					if (state[i] > 1){
						return -1;
					}
				}
			}
		}

		//popular oponente
		return state[pos];
	}
	
		
	//Atualiza as imagens dos tabuleiros
	atualizaTabuleiro(w, h) {
		// Adiciona o Tabuleiro
		this.tabuleiro = this.add.sprite(w, h, 'tabuleiro');
		this.tabuleiro.setScale(2)

		// Coordenadas das imagens dos ovos
		let coords = [337, 355, 405, 385, 476, 398,548, 398,620,386,689, 356, 
			689, 246, 620,215, 548,205, 476, 205, 405, 215, 337, 246];

		// Adiciona as imagens dos ovos
		for (var i = 0; i < 12; i++) {
				this.numero = this.add.sprite(coords[2 * i]*2, coords[2 * i + 1]*2, 'i' + state[i]).setScale(0.45).setInteractive();
				this.numero.key = i;
		}
		
            //Adiciona os ovos aos depositos
            this.numeroDep1 = this.add.sprite(240*2,300*2,'i'+dep1).setScale(0.6)
            this.numeroDep2 = this.add.sprite(790*2,300*2,'i'+dep2).setScale(0.6)

}	

	clickMenu(){
        console.log('Menu');
        this.scene.start('menu');
    }
    
}