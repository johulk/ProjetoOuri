class Pvp extends Phaser.Scene{
	constructor(){
		super("pvp");
	}
	

	create() {
		var w = config.width;
                var h = config.height;
                this.scale.lockOrientation('landscape')
                // User Interface
                this.background = this.add.sprite(w / 2, h / 2, "background_2");
                this.background.displayWidth = 1024;
                this.background.displayHeight = 600;

                this.home = this.add.sprite(35, 566 , 'home').setInteractive();
                this.home.key = -1;
                this.home.on('pointerdown', () => this.clickMenu());
		this.home.setScale(0.75)

                this.ouri = this.add.sprite(150, 55, 'ouri');
                this.ouri.displayHeight = 88
                this.ouri.displayWidth = 257
                this.ouri.depth = 2

                //Pintainho 1
                this.pinto1 = this.add.sprite(910, 290,'pinto_1')
                this.pinto1.setScale(0.5)
                this.pinto1.depth = 1


                //Pintainho 4
                this.pinto4 = this.add.sprite(110,290,'pinto_4')
                this.pinto4.setScale(0.5)
                this.pinto4.flipX = true
                this.pinto4.depth = 1

                //Scores
                this.playerScore = this.add.sprite(950,20,"jogador1Score")
                this.playerScore.setScale(0.3)
                this.computadorScore = this.add.sprite(950,80,"computadorScore")
                this.computadorScore.setScale(0.3)

        // Inicializar
        player = 1;
        dep1 = 0;
        dep2 = 0;
        check = 0;       
		state = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
	    this.atualizaTabuleiro(w,h);
	    
	    this.input.on('gameobjectdown', this.jogada,this);

	}

	jogada(pointer,gameObject){
		// Impedir jogada quando se clica no home
		if (gameObject.key == -1){return;}

		var pos = gameObject.key;

		// Impedir que um jogador jogue no campo errado
		if ((player == 1 && pos > 5) || (player == 2 && pos < 6)){return;}

		
		// Verifica as regras do jogo
		if(this.one(pos) == -1){return;}

		if(this.popularOponente(pos) == -1){return;}
		
		console.log('update')

		// A jogada e valida e pode começar
		this.atualizarState(pos);
		this.atualizaTabuleiro(config.width,config.height);

		this.nextPlayer();

		this.afterplay();
	}
	
	afterplay(){
		if (dep1 > 24) { check = 1 }
		if (dep2 > 24) { check = 1 }
		var y = 0;
		var i = 0;

		if (player == 1) {
				for (i = 0; i < 6; i++) {
						y = y + this.popularOponente(i)
				}
		}

		if (player == 2) {
				for (i = 5; i < 12; i++) {
						y = y + this.popularOponente(i)
				}
		}

		if (y == -6) {
			check = 1
		}

		if (check == 1) {
				var vencedor = this.terminar()
				console.log("player " + vencedor + " wins")
		}
	}

	popularOponente(pos){
		var soma = 0;
		var finalpos = 0;
		var i = 0;
		var y = 0;

		if (player == 1){
	        for(i = 5; i < 12; i++){
	            soma = soma + state[i]
	        }
	    }
	    else {
	        for(i = 0; i < 6; i++){
	            soma = soma + state[i]
	        }
	    }
	    
	    if(soma == 0){
	    	y = -1;
            for(i = 0; i <= state[pos]; i++){
	            finalpos = (pos + i) % 12
	            if(player == 1){
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
        if (totalP1 == 0){
            player = 2
        }

        // Se o player 2 tiver o tabuleiro vazio, joga o player 1
        else if ( totalP2 == 0){
            player = 1
        }

        // Se nenhum tiver o tabuleiro vazio alterna-se as jogadas
        else {
            if (player == 1){player = 2} else {player = 1}
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

        if (player == 1){
	        while((state[posfinal] == 2 || state[posfinal] == 3) && posfinal>5 && posfinal<12){
	            dep1 = dep1 + state[posfinal]
	            state[posfinal] = 0;
	            posfinal = posfinal - 1;
	        }       
	    }

	    //Recolher as pedras para o player 2
	    if (player == 2){
	        while((state[posfinal] == 2 || state[posfinal] == 3) && posfinal>=0 && posfinal<6){
	            dep2 = dep2 + state[posfinal]
	            state[posfinal] = 0;
	            posfinal = posfinal - 1;
	            
	        }       
	    }
	}

	one(pos){
		if(state[pos] == 0){
			return -1;
		}

		var i;
		if(state[pos] == 1){
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
		this.tabuleiro = this.add.sprite(w / 2, h / 2, 'tabuleiro');
		this.tabuleiro.setScale(1.03)

		// Coordenadas das imagens dos ovos
		let coords = [331, 356, 401, 388, 475, 400,548, 400,623,386,693, 356, 
						693, 245, 623,213, 548,200, 475, 200, 401, 211, 331, 244];

		// Adiciona as imagens dos ovos
		for (var i = 0; i < 12; i++) {
				this.numero = this.add.sprite(coords[2 * i], coords[2 * i + 1], 'i' + state[i]).setScale(0.25).setInteractive();
				this.numero.key = i;
		}
}

	clickMenu(){
        console.log('Menu');
        this.scene.start('menu');
    }
    
}