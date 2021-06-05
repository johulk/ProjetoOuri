var textP1;
var textP2;
var textodepJogador2;
var textodepJogador1;
var state = []
var sprites = [];
var player = 1;
var depJogador1 = 0;
var depJogador2 = 0;
var check = 0;
var possoJogar = true;

var coords = [{x: 337,y: 355}, {x:405,y: 385}, {x:476, y:398}, {x:548, y:398},{x: 620,y: 386}, {x:689, y: 356},
	{x:689, y: 246}, {x:620, y: 215}, {x:548, y: 205},{x: 476, y: 205}, {x:405,y:  215}, {x:337,y:  246}];


class Pvp extends Phaser.Scene {
	constructor() {
		super("pvp");
	}


	create() {
		var w = config.width;
		var h = config.height;
		this.scale.lockOrientation('landscape')
		
		// User Interface
		this.background = this.add.sprite(w, h, "background_2");
		this.background.displayWidth = 1024 * 2;
		this.background.displayHeight = 600 * 2;

		this.home = this.add.sprite(41 * 2, 561 * 2, 'home').setInteractive();
		this.home.key = -1;
		this.home.on('pointerdown', () => this.clickMenu());
		this.home.setScale(1.3)

		this.ouri = this.add.sprite(150 * 2, 55 * 2, 'ouri');
		this.ouri.depth = 2

		//Pintainho 1
		this.pinto1 = this.add.sprite(910 * 2, 290 * 2, 'pinto_1')
		this.pinto1.depth = 1


		//Pintainho 4
		this.pinto4 = this.add.sprite(110 * 2, 290 * 2, 'pinto_4')
		this.pinto4.flipX = true
		this.pinto4.depth = 1

		//Scores
		this.player1Score = this.add.sprite(915 * 2, 72 * 2, "jogador1Score")
		this.player1Score.setScale(0.75)
		this.player2Score = this.add.sprite(915 * 2, 160 * 2, "jogador2Score")
		this.player2Score.setScale(0.75)

		textP1 = this.add.text(915 * 2, 52 * 2, scorePlayer1, { fontFamily: 'Arial', fontSize: 70, color: '#000000' });
		textP2 = this.add.text(915 * 2, 140 * 2, scorePlayer2, { fontFamily: 'Arial', fontSize: 70, color: '#000000' });
		textodepJogador2 = this.add.text(1438, 585, depJogador1 , { fontFamily: 'Arial', fontSize: 30, color: '#FFFFFF' }).setFontStyle('bold italic');
        textodepJogador1 = this.add.text(580, 585, depJogador2 , { fontFamily: 'Arial', fontSize: 30, color: '#FFFFFF' }).setFontStyle('bold italic');
        textodepJogador2.setDepth(8888)
        textodepJogador1.setDepth(8888) 

		this.setaP1 = this.add.sprite(1024, 936, 'setaP1').setScale(0.7).setVisible(false)
		this.setaP2 = this.add.sprite(1024, 250, 'setaP2').setScale(0.7).setVisible(false)
		this.setaCounterP1 = this.add.sprite(810 * 2, 72 * 2, 'setaCounter').setScale(0.7).setVisible(false)
		this.setaCounterP2 = this.add.sprite(810 * 2, 160 * 2, 'setaCounter').setScale(0.7).setVisible(false)
		this.setaJog1 = this.add.sprite(910 * 2, 736, 'setaP1').setScale(0.4).setVisible(false)
		this.setaJog2 = this.add.sprite(225, 736, 'setaP1').setScale(0.4).setVisible(false)

		// Inicializar
		player = 1;
		depJogador1 = 0;
		depJogador2 = 0;
		check = 0;
		state = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
		possoJogar = true;



		this.setTabuleiro(w, h);
		this.setSetas();


		this.input.on('gameobjectdown', this.jogada, this);

	}

	jogada(pointer,gameObject) {
		// Impedir jogada quando se clica no home
		console.log(possoJogar)
		if (gameObject.key == -1 || possoJogar == false){return}
    
        console.log(gameObject.key);
        var pos = gameObject.key;
        			

		// Impedir que um jogador jogue no campo errado
		if ((player === 1 && pos > 5) || (player === 2 && pos < 6)) { return; }


		// Verifica as regras do jogo
		if (this.one(pos) === -1) { return; }

		if (this.popularOponente(pos) === -1) { return; }

		console.log(pos)

		// A jogada e valida e pode começar
		this.atualizarState(pos);
		this.atualizaTabuleiro(pos);

		this.nextPlayer();

		this.afterplay();
		
	}

	setSetas(){

		this.setaP1 = this.setaP1 || this.add.sprite(1024, 936, 'setaP1').setScale(0.7).setVisible(false)
		this.setaP2 = this.setaP2 || this.add.sprite(1024, 100, 'setaP2').setScale(0.7).setVisible(false)
		this.setaCounterP1 = this.setaCounterP1 || this.add.sprite(810 * 2, 72 * 2, 'setaCounter').setScale(0.7).setVisible(false)
		this.setaCounterP2 = this.setaCounterP2 || this.add.sprite(810 * 2, 160 * 2, 'setaCounter').setScale(0.7).setVisible(false)
		this.setaJog1 = this.setaJog1 || this.add.sprite(910 * 2, 736, 'setaP1').setScale(0.4).setVisible(false)
		this.setaJog2 = this.setaJog2 || this.add.sprite(225, 736, 'setaP1').setScale(0.4).setVisible(false)

		this.setaP2.setVisible(false)
		this.setaCounterP2.setVisible(false)
		this.setaP1.setVisible(true)
		this.setaCounterP1.setVisible(true)
		this.setaJog1.setVisible(true)
		this.setaJog2.setVisible(false)
	}

	atualizaSetas() {

		switch (player) {

			case 1:
				this.setaP2.setVisible(false)
				this.setaCounterP2.setVisible(false)
				this.setaP1.setVisible(true)
				this.setaCounterP1.setVisible(true)
				this.setaJog1.setVisible(true)
				this.setaJog2.setVisible(false)
				break;

			case 2:

				this.setaP1.setVisible(false)
				this.setaCounterP1.setVisible(false)
				this.setaP2.setVisible(true)
				this.setaCounterP2.setVisible(true)
				this.setaJog1.setVisible(false)
				this.setaJog2.setVisible(true)
				break
		}
	}

	afterplay() {
		if ((depJogador1 > 24) || (depJogador2 > 24) || (depJogador1 === 24 && depJogador2 === 24)) { check = 1 } //Verifica pelos depositos		
		if ((depJogador1 + depJogador2) === 46) {
			for (var i = 0; i < 6; i++) {
				if (state[i] === 1) {
					if (state[i + 6] === 1) {
						check = 1
					}
				}
			}
		}
		
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
			if (depJogador1 === depJogador2) {
				vencedor = 3

			}
			else {
				
				if (vencedor === 1) {
					scorePlayer1 = scorePlayer1 + 1;
				}
				if (vencedor === 2) {
					scorePlayer2 = scorePlayer2 + 1;


				}
			}
			textP1.text = scorePlayer1;
			textP2.text = scorePlayer2;

			//Apresentar desforra
			switch (vencedor) {
				case 1:
					this.quadroP1W = this.add.sprite((config.width / 2) * 2, (config.height / 2 + config.height / 12) * 2, "ganhouP1").setScale(1.4).setDepth(8889);;

					break;

				case 2:
					this.quadroP2W = this.add.sprite((config.width / 2) * 2, (config.height / 2 + config.height / 12) * 2, "ganhouP2").setScale(1.4).setDepth(8889);;

					break;
				case 3:
					this.quadroEmpate = this.add.sprite((config.width / 2) * 2, (config.height / 2 + config.height / 12) * 2, "empate").setScale(1.4).setDepth(8889);;
					break;

			}

			//Fechar
			this.close = this.add.sprite(2 * (config.width / 4 + config.width / 24 + config.width / 150), 2 * (config.height / 2 + config.height / 6 + config.height / 6 + config.height / 24 - config.height / 98), 'close').setInteractive();
			this.close.on('pointerdown', () => { this.clickMenu() });
			this.close.setScale(0.62 * 2)
			this.close.key = -1
			this.close.depth = 8890

			//Forwards
			this.forward = this.add.sprite((config.width - config.width / 4 - config.width / 24 - config.width / 150) * 2, (config.height / 2 + config.height / 6 + config.height / 6 + config.height / 24 - config.height / 98) * 2, 'forward').setInteractive();
			this.forward.on('pointerdown', () => {
				sprites = [];
				textodepJogador1.text = "0"
    			textodepJogador2.text = "0"
				this.scene.start("pvp");
				

		});
			this.forward.setScale(0.62 * 2)
			this.forward.key = -1
			this.forward.depth = 8890
		}
		//Atualiza indicadores de score



	}

	popularOponente(pos) {
		var soma = 0;
		var finalpos = 0;
		var i = 0;
		var y = 0;

		if (player === 1) {
			for (i = 5; i < 12; i++) {
				soma = soma + state[i]
			}
		}
		else {
			for (i = 0; i < 6; i++) {
				soma = soma + state[i]
			}
		}

		if (soma === 0) {
			y = -1;
			for (i = 0; i <= state[pos]; i++) {
				finalpos = (pos + i) % 12
				if (player === 1) {
					// verifico que alguma pedra cai em territorio adversario
					if (finalpos > 5 && finalpos < 12) {
						y = 0;
					}
				}
				else {
					if (finalpos >= 0 && finalpos < 6) {
						y = 0;
					}
				}
			}
		}
		return y
	}




	terminar() {
		var res = 1
		var i;

		for (i = 0; i < 6; i++) {
			depJogador1 = depJogador1 + state[i]
		}

		for (i = 5; i < 12; i++) {
			depJogador2 = depJogador2 + state[i]
		}

		if (depJogador1 > depJogador2) { res = 1 }
		else { res = 2 }
		this.numerodepJogador1 = this.add.sprite(240 * 2, 300 * 2, 'i' + depJogador1).setScale(0.6)
        this.numerodepJogador2 = this.add.sprite(790 * 2, 300 * 2, 'i' + depJogador2).setScale(0.6)
		return res
	}

	nextPlayer() {
		var totalP1 = 0
		var totalP2 = 0
		var i;

		// Verifica se algum dos tabuleiros estão vazios
		for (i = 0; i < 6; i++) {
			totalP1 = totalP1 + state[i]
		}

		for (i = 6; i < 12; i++) {
			totalP2 = totalP2 + state[i]
		}

		// Se o player 1 tiver o tabuleiro vazio, joga o player 2
		if (totalP1 === 0) {
			player = 2
		}

		// Se o player 2 tiver o tabuleiro vazio, joga o player 1
		else if (totalP2 === 0) {
			player = 1
		}

		// Se nenhum tiver o tabuleiro vazio alterna-se as jogadas
		else {
			if (player === 1) { player = 2 } else { player = 1 }
		}

	}

	atualizarState(pos) {
        console.log("state")
		var valor = state[pos];

		// retirar as pedras da casa onde clicamos
		state[pos] = 0;

		sprites[pos].dirty = true;
		// distribuir as pedras pelas casas seguintes
		for (var i = 1; valor > 0; i++) {
			//Quando atingir 12 pedras tem de saltar a casa onde clicamos
			if ((pos + i % 12) != pos) {
				state[(pos + i) % 12] = state[(pos + i) % 12] + 1;
				sprites[(pos + i) % 12].dirty = true;
				valor--;
			}
		}

		// Recolher as pedras
		var posfinal = (pos + i - 1) % 12

		if (player === 1) {
			while ((state[posfinal] === 2 || state[posfinal] === 3) && posfinal > 5 && posfinal < 12) {
				depJogador1 = depJogador1 + state[posfinal]
				state[posfinal] = 0;
				sprites[posfinal].dirty = false;
				sprites[posfinal].dirtyRec = true;
				posfinal = posfinal - 1;
			}
		}

		//Recolher as pedras para o player 2
		if (player === 2) {
			while ((state[posfinal] === 2 || state[posfinal] === 3) && posfinal >= 0 && posfinal < 6) {
				depJogador2 = depJogador2 + state[posfinal]
				state[posfinal] = 0;
				sprites[posfinal].dirty = false;
				sprites[posfinal].dirtyRec = true;
				posfinal = posfinal - 1;

			}
		}
	}

	one(pos) {
		if (state[pos] === 0) {
			return -1;
		}

		var i;
		if (state[pos] === 1) {
			if (pos < 6) {
				for (i = 0; i < 6; i++) {
					if (state[i] > 1) {
						return -1;
					}
				}
			}
			if (pos > 5) {
				for (i = 6; i < 12; i++) {
					if (state[i] > 1) {
						return -1;
					}
				}
			}
		}

		//popular oponente
		return state[pos];
	}

    
   

    setTabuleiro(w,h){
    	// Adiciona o Tabuleiro
		this.tabuleiro = this.add.sprite(w, h, 'tabuleiro');
		this.tabuleiro.setScale(2)
        var i = 0;
		coords.forEach(c => {
			
			sprites.push({
				sprite: this.add.sprite(c.x * 2, c.y * 2,"i"+4).setScale(0.45).setInteractive(),
				dirty: true,
				dirtyRec: false,
				casa : i
			})
            i++;
		})

		sprites.forEach(spr =>{spr.sprite.key = spr.casa})
	
		this.atualizaTabuleiro(-1)
		
		
     }
	
	
   
	//Atualiza as imagens dos tabuleiros
	atualizaTabuleiro(pos) {
		

		if(pos == -1){return};
		possoJogar = false;
		// Coordenadas das imagens dos ovos
		let delay = 400;
		let delayCount = 0;

			
		
		for(let k = 0;k < 12 ; k++){
			if(sprites[(pos+k)%12].dirty){
					this.time.delayedCall(delay * delayCount,() =>{
							console.log(sprites[(pos+k)%12].casa)
							sprites[(pos+k)%12].sprite.setTexture('i'+state[sprites[(pos+k)%12].casa])
					})
					delayCount++
			}
			sprites[(pos+k)%12].sprite.dirty= false
		}

		
		delayCount++
		let backwards = 5;
		for(let b = 0; b < 12 ; b++){
			if(sprites[(backwards-b+12)%12].dirtyRec){
					this.time.delayedCall(delay * delayCount,() =>{
							console.log(sprites[(backwards-b+12)%12].casa)
							sprites[(backwards-b+12)%12].sprite.setTexture('i'+state[sprites[(backwards-b+12)%12].casa])
					})
					delayCount++
			}
			sprites[(backwards-b+12)%12].sprite.dirtyRec= false
		}
		delayCount++ 

		setTimeout(()=>{
			//Adiciona os ovos aos depositos
		this.numerodepJogador2 = this.add.sprite(240 * 2, 300 * 2, 'i' + depJogador2).setScale(0.6)
		this.numerodepJogador1 = this.add.sprite(790 * 2, 300 * 2, 'i' + depJogador1).setScale(0.6)
		textodepJogador1.text = depJogador2
    	textodepJogador2.text = depJogador1
		possoJogar = true;
		this.atualizaSetas();
		},delay*delayCount);
		
		        
	}

	clickMenu() {
		console.log('Menu');
		scorePlayer1 = 0;
		scorePlayer2 = 0;
        sprites = [];
		this.scene.start('menu');
	}

}