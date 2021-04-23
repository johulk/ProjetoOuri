function EstadoSimulado(stateTabuleiro, deposito1, deposito2) {
        this.estado = stateTabuleiro;
        this.dep1 = deposito1;
        this.dep2 = deposito2;
}

function TreeNode() {
        this.root = 0;
        this.descendants = [];
        this.estadoSimulado = new EstadoSimulado([], 0, 0);
        this.node = 0;

}

let textP;
let textC;



class Pvc extends Phaser.Scene {
        constructor() {
                super("pvc");
        }

        create() {

                var h = config.height;
                var w = config.width
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
                this.playerScore = this.add.sprite(915*2,72*2,"jogador1Score")
                this.playerScore.setScale(0.75)
                this.computadorScore = this.add.sprite(915*2,160*2,"computadorScore")
                this.computadorScore.setScale(0.75)
                // Inicializar
                player = 1;
                dep1 =0;
                dep2 = 0;
                check = 0;
                state = [4,4, 4,4, 4, 4, 4, 4, 4, 4, 4, 4];
                
                
                textP = localStorage.getItem('jogador');
        
                textC = localStorage.getItem('computador');

                if(textC  != null || textP != null){
                scorePlayerInt = parseInt(scorePlayer);
                scoreComputadorInt = parseInt(scoreComputador)
                textP1 = this.add.text(915*2,52*2, scorePlayer1,{ fontFamily: 'Arial', fontSize: 70, color: '#000000' });
                        textC = this.add.text(915*2,140*2,scoreComputador,{ fontFamily: 'Arial', fontSize: 70, color: '#000000'});
                }
                else{
                        scoreComputadorInt = 0;
                        scorePlayerInt = 0;
                        textP1 = this.add.text(915*2,52*2, scorePlayer1,{ fontFamily: 'Arial', fontSize: 70, color: '#000000' });
                        textC = this.add.text(915*2,140*2,scoreComputador,{ fontFamily: 'Arial', fontSize: 70, color: '#000000'});
                }

                
                this.atualizaSetas();
                this.atualizaTabuleiro(w, h);


                this.input.on('gameobjectdown', this.jogada, this);

        }

        atualizaSetas(){

                this.setaP1 = this.add.sprite(1024,936,'setaP1').setScale(0.7)
		this.setaP1.visible = false
		this.setaP2 = this.add.sprite(1024,100,'setaP2').setScale(0.7)
		this.setaP2.visible = false
                this.setaCounterP1 = this.add.sprite(810*2,72*2,'setaCounter').setScale(0.7)
		this.setaCounterP1.visible = false
		this.setaCounterP2 = this.add.sprite(810*2,160*2,'setaCounter').setScale(0.7)
		this.setaCounterP2.visible = false
                
		if(player == 1){
			this.setaP2.visible = false;
			this.setaCounterP2.visible = false;
			this.setaP1.visible = true;
			this.setaCounterP1.visible = true;
		}
		else if(player == 2){
			this.setaP1.visible = false;
			this.setaCounterP1.visible = false;
			this.setaP2.visible = true;
			this.setaCounterP2.visible = true;
			
		}
	}

        jogada(pointer, gameObject) {
                // Impedir jogada quando se clica no home
                if ((gameObject.key == -1) || (gameObject.key > 5)){ return; }

                var pos = gameObject.key;

                // Impedir que um jogador jogue no campo errado
                if ((player == 1 && pos > 5) || (player == 2 && pos < 6)) { return; }

                // Verifica as regras do jogo
                if (this.one(state,pos) == false) { return; }

                // Verifica se é necessario popular o oponente
                if (this.popularOponente(state,pos,1) == -1) { return; } 

                console.log('update')

                // A jogada e valida e pode começar
                this.atualizarState(pos);

                // Atualiza o tabuleiro de acordo com o state
                this.atualizaTabuleiro(config.width, config.height);

                //Ve qual o proximo player a jogar
                this.nextPlayer();
                this.atualizaSetas();

                //verifica se o jogo terminou
                this.afterplay();

                console.log(dif)
                setTimeout(() => {
                        if (player == 2) {

                                pos = this.dificuldade();
                                this.atualizarState(pos);
                                this.atualizaTabuleiro(config.width, config.height);
                                this.nextPlayer();
                                this.atualizaSetas();
                                this.afterplay();
                        }
                }, 1000)


        }

        dificuldade() {
                switch(dif){
                        case 0: return this.facil()
                        case 1: return this.medio()
                        case 2: return this.dificil()
                }
        }


        // Da um numero random e verifica se e uma possivel jogada
        facil() {
                var res = Math.floor(Math.random() * 6 + 6);
                var jogPosFacil = this.verificaJogadas(state,player);

                while(!(jogPosFacil.includes(res))){
                        res = Math.floor(Math.random() * 6 + 6);
                }

                return res;
                
        };

       
        afterplay() { //Verifica se o jogo acabou
                
                var anyJog = [];
                anyJog.push(this.verificaJogadas(state,player),this.verificaJogadas(state,(player%2)+1)); 

                if(anyJog.length == 0){check == 1}; //verifica se ha jogadas possiveis para os dois jogadores
                if (dep1 > 24 || dep2 > 24 || dep1 ==24 && dep2 == 24) { check = 1 } //Verifica pelos depositos
                
                if (check == 1) {
                        var vencedor = this.terminar()
                        //console.log("player " + vencedor + " wins")
                        if (vencedor == 1){
                                scorePlayerInt += 1;
                                scorePlayer = (""+scorePlayerInt)
                                localStorage.setItem('jogador',scorePlayer)
                        }
                        if (vencedor == 2){
                                scoreComputadorInt += 1;
                                scoreComputador = (""+scoreComputadorInt)
                                localStorage.setItem('computador',scoreComputador)
                        }
                        
                        //Atualiza indicadores de score
                        textP.text(scorePlayer)
                        textC.text(scoreComputador)

                        //Apresentar desforra
                        
                        
                        this.desforraQuadro = this.add.sprite((config.width/2)*2,(config.height/2+config.height/12)*2,"infoVazio");
                        this.desforraQuadro.setScale(1.4)
                        switch(vencedor){
                                case 1:
				        this.texto1 =  this.add.text(370*2,250*2,"O jogador 1 ganhou.",{ fontFamily: 'Arial', fontSize: 60, color: '#000000' });
                                        this.texto2 = this.add.text(370*2,300*2,"Deseja a desforra?",{ fontFamily: 'Arial', fontSize: 60, color: '#000000' })
                                        break;

				case 2:
				        this.texto3 =  this.add.text(370*2,250*2,"O computador ganhou.",{ fontFamily: 'Arial', fontSize: 60, color: '#000000' });
                                        this.texto4 = this.add.text(370*2,300*2,"Deseja a desforra?",{ fontFamily: 'Arial', fontSize: 60, color: '#000000' })
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
                        this.forward.on('pointerdown', () => this.scene.start("pvc"));
                        this.forward.setScale(0.62*2)
                        this.forward.depth = 4  
                        
                }

        }

        popularOponente(estado,pos,jogador) {
                var soma = 0;
                var finalpos = 0;
                var i;
                var y = true;

                if (jogador == 1) {
                        for (i = 5; i < 12; i++) {
                                soma = soma + estado[i]
                        }
                }
                else {
                        for (i = 0; i < 6; i++) {
                                soma = soma + estado[i]
                        }
                }

                if (soma == 0) {
                        y = false;
                        for (i = 0; i <= estado[pos]; i++) {
                                finalpos = (pos + i) % 12
                                if (jogador == 1) {
                                        // verifico que alguma pedra cai em territorio adversario
                                        if (finalpos > 5 && finalpos < 12) {
                                                y = true;
                                        }
                                }
                                else {
                                        if (finalpos >= 0 && finalpos < 6) {
                                                y = true;
                                        }
                                }
                        }
                }
                return y
        }



        terminar() {
                var res;
                var i;
                var j;

                for (i = 0, j = 5; i < 6, j < 12; i++, j++) {
                        dep1 = dep1 + state[i]
                        dep2 = dep2 + state[j]
                }

                if (dep1 > dep2) { res = 1 }
                else { res = 2 }

                return res
        }

        // Funcao que decide qual é o proximo jogador a jogar
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
                if (totalP1 == 0) {
                        player = 2
                }

                // Se o player 2 tiver o tabuleiro vazio, joga o player 1
                else if (totalP2 == 0) {
                        player = 1
                }

                // Se nenhum tiver o tabuleiro vazio alterna-se as jogadas
                else {
                        if (player == 1) { player = 2 } else { player = 1 }
                }

        }


        atualizarState(pos) {

                var valor = state[pos];

                // retirar as pedras da casa onde clicamos
                state[pos] = 0;

                // distribuir as pedras pelas casas seguintes
                for (var i = 1; valor > 0; i++) {
                        //Quando atingir 12 pedras tem de saltar a casa onde clicamos
                        if ((pos + i % 12) != pos) {
                                state[(pos + i) % 12] = state[(pos + i) % 12] + 1;
                                valor--;
                        }
                }

                // Recolher as pedras
                var posfinal = (pos + i - 1) % 12

                if (player == 1) {
                        while ((state[posfinal] == 2 || state[posfinal] == 3) && posfinal > 5 && posfinal < 12) {
                                dep1 = dep1 + state[posfinal]
                                state[posfinal] = 0;
                                posfinal = posfinal - 1;
                        }
                }

                //Recolher as pedras para o player 2
                if (player == 2) {
                        while ((state[posfinal] == 2 || state[posfinal] == 3) && posfinal >= 0 && posfinal < 6) {
                                dep2 = dep2 + state[posfinal]
                                state[posfinal] = 0;
                                posfinal = posfinal - 1;

                        }
                }
        }

        // funcao que procura se existem numeros >1 na fila do jogador/pc

                
        one(estado,pos) {

                if (estado[pos] == 0) {
                        return false;
                }

                var i;
                if (estado[pos] == 1) {
                        if (pos < 6) {
                                for (i = 0; i < 6; i++) {
                                        if (estado[i] > 1) {
                                                return false;
                                        }
                                }
                        }
                        if (pos > 5) {
                                for (i = 6; i < 12; i++) {
                                        if (estado[i] > 1) {
                                                return false;
                                        }
                                }
                        }
                }
                return true
        }



        medio() {  
                var copiaestado = [...state];
                //

                let arvore = this.construirArvore(copiaestado,4);


                var melhorValorFinal = this.minimax(arvore, 4, -Infinity, +Infinity, true)

                

                var procuraJogada;
                var melhoresJogadas;
                for (procuraJogada = 0; procuraJogada < arvore.descendants.length; procuraJogada++) {
                        if (arvore.descendants[procuraJogada].valor == melhorValorFinal) {
                                melhoresJogadas.push(arvore.descendants[procuraJogada].root)
                        }
                }
                var jogadaFinal = melhoresJogadas[Math.floor(Math.random() * melhoresJogadas.length)];

                return jogadaFinal
        }
        

        // Cria um array com as jogadas possiveis 
        verificaJogadas(estadoRecebido, jogador) {
                //console.log(dif + " xDDDDDD")
                //casasPC = [6,7,8,9,10,11]
                //casasJogador = [0,1,2,3,4,5]
                switch(jogador){
                        
                        case 1:
                                var jogPos = casasJogador.filter((casa) =>  this.one(estadoRecebido,casa) && this.popularOponente(estadoRecebido,casa,jogador));
                                break

                        case 2:
                                var jogPos = casasPC.filter((casa) =>  this.one(estadoRecebido,casa) && this.popularOponente(estadoRecebido,casa,jogador));
                               
                      
                }       
                return jogPos;
        };


        //Controi o resto dos nodos de acordo com os states simulados ao longo do jogo
        construirDescendentes(staterecebido, jogador, jogada, depth,auxDep1,auxDep2) {

                //receber um estado + 1 jogada -- Fazer a jogada -- Procurar novas jogadas -- passar aos descedentes
                var nodo = new TreeNode();
                nodo.root = jogada;
                // Fazer copia das variaveis globais
                var copiaestado = [...staterecebido];

                var dep1copy = auxDep1
                var dep2copy = auxDep2

                //console.log("DEPTH " + depth)
                nodo.estadoSimulado = this.simulaJogada(copiaestado, jogada, jogador, dep1copy, dep2copy);

                if (depth == 0) {
                        return nodo;
                }
                //EstadoSimulado já tem a jogada feita e os deps calculados, e o jogador ANTIGO


                var jogPosNew = this.verificaJogadas(nodo.estadoSimulado.estado, (jogador % 2) + 1);
                for (var i = 0; i < jogPosNew.length; i++) {
                        nodo.descendants.push(this.construirDescendentes(nodo.estadoSimulado.estado, (jogador % 2) + 1, jogPosNew[i], depth - 1, nodo.estadoSimulado.dep1, nodo.estadoSimulado.dep2));
                }
                return nodo;
        }


        //Cria uma arvore de jogadas simuladas
        construirArvore(estadoRaiz,profundidade) {
                var newProf = profundidade;
                var jogPos = this.verificaJogadas(estadoRaiz,2);

                var arvore = new TreeNode();
                
                // raiz
                var estadoSim = new EstadoSimulado(estadoRaiz, dep1, dep2);

                
                //tudobem
                arvore.estadoSimulado = estadoSim;


                // constroi para o jogador seguinte
                for (var jogposlen = 0; jogposlen < jogPos.length; jogposlen++) {
                        arvore.descendants.push(this.construirDescendentes(estadoRaiz, 2, jogPos[jogposlen], newProf,dep1, dep2));
                }
                return arvore;
        }



        simulaJogada(copiaEstado, jogada, jogador, dep1copy, dep2copy) {

                //Faz a jogada
                var estadoArraySimulado = [...copiaEstado];
                var sementesAEspalhar = estadoArraySimulado[jogada];
                var ultimacasa = (jogada + sementesAEspalhar) % 12;
                estadoArraySimulado[jogada] = 0;
                var dep1Sim = dep1copy
                var dep2Sim = dep2copy

                var casasPercorridas = 1
                for (casasPercorridas = 1; casasPercorridas <= sementesAEspalhar; casasPercorridas++) {
                        estadoArraySimulado[(jogada + casasPercorridas) % 12] = estadoArraySimulado[(jogada + casasPercorridas) % 12] + 1; //espalha as sementes todas
                }
                ///////  RECEBE O JOGADOR NESTE MOMENTO
                if (estadoArraySimulado[ultimacasa] == (2 | 3)) {
                        if (jogador == 1) { //Em caso de ser o jogador a jogar
                                while (estadoArraySimulado[ultimacasa] == (2 | 3) && (ultimacasa >= 6 && ultimacasa < 12)) {
                                        dep1Sim += estadoArraySimulado[ultimacasa];
                                        estadoArraySimulado[ultimacasa] = 0;
                                        ultimacasa--;

                                }
                        }
                        else { //Em caso de ser o computador a jogar
                                while (estadoArraySimulado[ultimacasa] == (2 | 3) && (ultimacasa >= 0 && ultimacasa < 6)) {
                                        dep2Sim += estadoArraySimulado[ultimacasa];
                                        estadoArraySimulado[ultimacasa] = 0;
                                        ultimacasa--;

                                }

                        }
                }
                var estado = new EstadoSimulado(estadoArraySimulado, dep1Sim, dep2Sim)
                //console.log(estado);

                return estado;
        }


        dificil() {
                let copiaestado = [...state];

                let arvore = this.construirArvore(copiaestado,8);
 

                var melhorValorFinal = this.minimax(arvore, 8, -Infinity, +Infinity, true)
                console.log(melhorValorFinal)
                

                var procuraJogada;
                var melhoresJogadas = [];
                for (procuraJogada = 0; procuraJogada < arvore.descendants.length; procuraJogada++) {
                        if (arvore.descendants[procuraJogada].valor == melhorValorFinal) {
                                melhoresJogadas.push(arvore.descendants[procuraJogada].root)
                        }
                }
                var jogadaFinal = melhoresJogadas[Math.floor(Math.random() * melhoresJogadas.length)];

                return jogadaFinal
        };




        minimax(node, depth, alpha, beta, maximizingPlayer) {
                if ((depth == 0) || (node.estadoSimulado.dep1 == 25) || (node.estadoSimulado.dep2 == 25) || (node.estadoSimulado.dep1 == 24 && node.estadoSimulado.dep2 == 24)) {
                        return node.estadoSimulado.dep2 - node.estadoSimulado.dep1;
                }

                if (maximizingPlayer == true) {

                        let maxEval = -Infinity;
                        for (var i = 0; i < node.descendants.length; i++) {
                                let evalu = this.minimax(node.descendants[i], depth - 1, alpha, beta, false);
                                maxEval = Math.max(maxEval, evalu);
                                alpha = Math.max(alpha, evalu);
                                node.valor = alpha;
                                // prune
                                if (beta <= alpha) {
                                        break;
                                }
                        }

                        return maxEval;
                }
                else {

                        let minEval = +Infinity;
                        for (var i = 0; i < node.descendants.length; i++) {
                                let evalu = this.minimax(node.descendants[i], depth - 1, alpha, beta, true);
                                minEval = Math.min(minEval, evalu);
                                beta = Math.min(beta, evalu);
                                node.valor = beta;
                                // prune
                                if (beta <= alpha) {
                                        break;
                                }
                        }
                        return minEval;
                }
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

        clickMenu() {
                console.log('Menu');
                this.scene.start('menu');
        }

}