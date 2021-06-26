function EstadoSimulado(stateTabuleiro, deposito2, deposito1, isOver) {
        this.estado = stateTabuleiro;
        this.depJogador = deposito2;
        this.depComputador = deposito1;
        this.over = isOver;
}

function TreeNode() {
        this.root = 0;
        this.descendants = [];
        this.estadoSimulado = new EstadoSimulado([], 0, 0);
}

var textP;
var textC;
var textdepComputador;
var textdepJogador;
var sprites = [];
var state = []
var player = 1;
var depJogador = 0;
var depComputador = 0;
var check = 0;
var casasPC = [6, 7, 8, 9, 10, 11]
var casasJogador = [0, 1, 2, 3, 4, 5]
var possoJogar = true;
var delay = 400;
var depjimg;
var depcimg;
var vencedor;
var permObject;

var coords = [{ x: 337, y: 355 }, { x: 405, y: 385 }, { x: 476, y: 398 }, { x: 548, y: 398 }, { x: 620, y: 386 }, { x: 689, y: 356 },
{ x: 689, y: 246 }, { x: 620, y: 215 }, { x: 548, y: 205 }, { x: 476, y: 205 }, { x: 405, y: 215 }, { x: 337, y: 246 }];



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
                this.background.displayWidth = 1024 * 2;
                this.background.displayHeight = 600 * 2;

                this.home = this.add.sprite(41 * 2, 561 * 2, 'home').setInteractive();
                this.home.key = -1;
                this.home.on('pointerdown', () => this.clickMenu());
                this.home.setScale(1.3)

                this.ouri = this.add.sprite(150 * 2, 55 * 2, 'ouri');
                // this.ouri.displayHeight = 
                //this.ouri.displayWidth = 
                this.ouri.depth = 2

                //Pintainho 1
                this.pinto1 = this.add.sprite(910 * 2, 290 * 2, 'pinto_1')
                //this.pinto1.setScale(0.5)
                this.pinto1.depth = 1


                //Pintainho 4
                this.pinto4 = this.add.sprite(110 * 2, 290 * 2, 'pinto_4')
                //this.pinto4.setScale(0.5)
                this.pinto4.flipX = true
                this.pinto4.depth = 1

                //Scores
                this.playerScore = this.add.sprite(915 * 2, 72 * 2, "jogador1Score")
                this.playerScore.setScale(0.75)
                this.computadorScore = this.add.sprite(915 * 2, 160 * 2, "computadorScore")
                this.computadorScore.setScale(0.75)
                // Inicializar
                player = 1;
                depJogador = 0;
                depComputador = 0;
                check = 0;
                state = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
                possoJogar = true;

                scorePlayer = stats.totalWon.slice();

                scoreComputador = [stats.totalGames[0] - stats.totalWon[0], stats.totalGames[1] - stats.totalWon[1], stats.totalGames[2] - stats.totalWon[2]];

                //scorePInt = 0;
                //scoreCInt = 0;

                if (scorePlayer.length === 0 || scoreComputador.length === 0) {
                        scorePInt = 0
                        scoreCInt = 0;
                }
                else {
                        scoreCInt = scoreComputador[dif]
                        scorePInt = scorePlayer[dif]

                }

                textP = this.add.text(915 * 2, 52 * 2, scorePInt, { fontFamily: 'Arial', fontSize: 70, color: '#000000' });
                textC = this.add.text(915 * 2, 140 * 2, scoreCInt, { fontFamily: 'Arial', fontSize: 70, color: '#000000' });
                textdepComputador = this.add.text(580, 585, depComputador, { fontFamily: 'Arial', fontSize: 30, color: '#FFFFFF' }).setFontStyle('bold italic');
                textdepJogador = this.add.text(1438, 585, depJogador, { fontFamily: 'Arial', fontSize: 30, color: '#FFFFFF' }).setFontStyle('bold italic');
                textdepComputador.setDepth(8888)
                textdepJogador.setDepth(8888)

                this.setaP1 = this.add.sprite(1024, 936, 'setaP1').setScale(0.7).setVisible(false)
                this.setaP2 = this.add.sprite(1024, 250, 'setaP2').setScale(0.7).setVisible(false)
                this.setaCounterP1 = this.add.sprite(810 * 2, 72 * 2, 'setaCounter').setScale(0.7).setVisible(false)
                this.setaCounterP2 = this.add.sprite(810 * 2, 160 * 2, 'setaCounter').setScale(0.7).setVisible(false)
                this.setaJog1 = this.add.sprite(910 * 2, 736, 'setaP1').setScale(0.4).setVisible(false)
                this.setaJog2 = this.add.sprite(225, 736, 'setaP1').setScale(0.4).setVisible(false)

                this.setTabuleiro(w, h);
                this.atualizaSetas();

                this.input.on('gameobjectdown', this.jogada, this);



        }

        atualizaSetas() {
                this.setaP1 = this.setaP1 || this.add.sprite(1024, 936, 'setaP1').setScale(0.7).setVisible(false)
                this.setaP2 = this.setaP2 || this.add.sprite(1024, 100, 'setaP2').setScale(0.7).setVisible(false)
                this.setaCounterP1 = this.setaCounterP1 || this.add.sprite(810 * 2, 72 * 2, 'setaCounter').setScale(0.7).setVisible(false)
                this.setaCounterP2 = this.setaCounterP2 || this.add.sprite(810 * 2, 160 * 2, 'setaCounter').setScale(0.7).setVisible(false)
                this.setaJog1 = this.setaJog1 || this.add.sprite(910 * 2, 736, 'setaP1').setScale(0.4).setVisible(false)
                this.setaJog2 = this.setaJog2 || this.add.sprite(225, 736, 'setaP1').setScale(0.4).setVisible(false)
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

        jogada(pointer, gameObject) {
                // Impedir jogada quando se clica no home
                if ((gameObject.key === -1) || (gameObject.key > 5) || possoJogar == false) { return; }

                var pos = gameObject.key;

                // Impedir que um jogador jogue no campo errado
                if ((player === 1 && pos > 5) || (player === 2 && pos < 6)) { return; }

                // Verifica as regras do jogo
                if (this.one(state, pos) === false) { return; }

                // Verifica se é necessario popular o oponente
                if (this.popularOponente(state, pos, 1) === -1) { return; }


                // A jogada e valida e pode começar
                this.atualizarState(pos);

                if (check === 1) { return; }



        }

        setTabuleiro(w, h) {
                // Adiciona o Tabuleiro
                this.tabuleiro = this.add.sprite(w, h, 'tabuleiro');
                this.tabuleiro.setScale(2)
                var i = 0;
                coords.forEach(c => {

                        sprites.push({
                                sprite: this.add.sprite(c.x * 2, c.y * 2, "i" + state[i]).setScale(0.45).setInteractive(),
                                dirty: false,
                                dirtyRec: false,
                                casa: i
                        })
                        i++;
                })

                sprites.forEach(spr => { spr.sprite.key = spr.casa })

                depjimg = this.add.sprite(790 * 2, 300 * 2, 'i' + depJogador).setScale(0.6)
                depcimg = this.add.sprite(240 * 2, 300 * 2, 'i' + depComputador).setScale(0.6)


        }


        setSetas() {


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


        atualizaTabuleiro(pos, i) {

                let count = 0;
                for (let b = 0; b < 12; b++) {
                        if (sprites[(pos + b) % 12].dirty) {
                                count++
                        }
                }


                let delayCount = 0;
                for (let k = 0; k < 12; k++) {
                        if (sprites[(pos + k) % 12].dirty) {
                                this.time.delayedCall(delay * delayCount, () => {
                                        sprites[(pos + k) % 12].sprite.setTexture('i' + state[sprites[(pos + k) % 12].casa])
                                })
                                delayCount++
                        }
                        sprites[(pos + k) % 12].dirty = false
                }

                this.time.delayedCall(delay * (count + 1), () => {
                        this.recolhePecas(pos, i);
                })

        }

        recolhePecas(pos, i) {


                // Recolher as pedras
                var posfinal = (pos + i - 1) % 12

                if (player === 1) {
                        while ((state[posfinal] === 2 || state[posfinal] === 3) && posfinal > 5 && posfinal < 12) {
                                depJogador = depJogador + state[posfinal]
                                state[posfinal] = 0;
                                sprites[posfinal].dirty = false;
                                sprites[posfinal].dirtyRec = true;
                                posfinal = posfinal - 1;
                        }
                }

                //Recolher as pedras para o player 2
                if (player === 2) {
                        while ((state[posfinal] === 2 || state[posfinal] === 3) && posfinal >= 0 && posfinal < 6) {
                                depComputador = depComputador + state[posfinal]
                                state[posfinal] = 0;
                                sprites[posfinal].dirty = false;
                                sprites[posfinal].dirtyRec = true;
                                posfinal = posfinal - 1;

                        }
                }

                this.atualizaRecolha();
        }


        atualizaRecolha() {
                // Coordenadas das imagens dos ovos
                let backwards = 5;
                let count = 0;


                for (let b = 0; b < 12; b++) {
                        if (sprites[(backwards - b + 12) % 12].dirtyRec) {
                                count++
                        }
                }

                let delayCountRec = 0
                for (let b = 0; b < 12; b++) {
                        if (sprites[(backwards - b + 12) % 12].dirtyRec) {
                                this.time.delayedCall(delay * delayCountRec, () => {
                                        sprites[(backwards - b + 12) % 12].sprite.setTexture('i' + state[sprites[(backwards - b + 12) % 12].casa])
                                })
                                delayCountRec++

                        }
                        sprites[(backwards - b + 12) % 12].dirtyRec = false
                }



                this.time.delayedCall(delay * (count + 1), () => {
                        this.atualizaDepositos()
                })
        }


        atualizaDepositos() {

                //Adiciona os ovos aos depositos

                if (depComputador >= 25) {
                        depcimg.setTexture('i' + 25)
                }
                else if (depJogador >= 25) {
                        depjimg.setTexture('i' + 25)
                }
                else {
                        depcimg.setTexture('i' + depComputador)
                        depjimg.setTexture('i' + depJogador)
                }
                textdepComputador.text = depComputador
                textdepJogador.text = depJogador
                possoJogar = true;


                this.nextPlayer();

                this.atualizaSetas();
                this.afterplay();


        }

        atualizarState(pos) {

                var valor = state[pos];

                possoJogar = false;

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
                this.atualizaTabuleiro(pos, i);

        }

        //------------------------------------------------------------------


        dificuldade() {
                switch (dif) {
                        case 0: return this.facil()
                        case 1: return this.medio()
                        case 2: return this.dificil()
                }
        }


        // Da um numero random e verifica se e uma possivel jogada
        facil() {
                var res = Math.floor(Math.random() * 6 + 6);
                var jogPosFacil = this.verificaJogadas(state, player);

                while (!(jogPosFacil.includes(res))) {
                        res = Math.floor(Math.random() * 6 + 6);
                }

                return res;

        };

        medio() {
                var copiaestado = [...state];
                //

                let arvore = this.construirArvore(copiaestado, 4);


                var melhorValorFinal = this.minimax(arvore, 4, -Infinity, +Infinity, true)



                var procuraJogada;
                var melhoresJogadas = [];
                for (procuraJogada = 0; procuraJogada < arvore.descendants.length; procuraJogada++) {
                        if (arvore.descendants[procuraJogada].valor === melhorValorFinal) {
                                melhoresJogadas.push(arvore.descendants[procuraJogada].root)
                        }
                }
                var jogadaFinal = melhoresJogadas[Math.floor(Math.random() * melhoresJogadas.length)];

                return jogadaFinal
        }

        dificil() {
                let copiaestado = [...state];

                var arvore = this.construirArvore(copiaestado, 8);


                var melhorValorFinal = this.minimax(arvore, 8, -Infinity, +Infinity, true)

                //30

                var procuraJogada;
                var melhoresJogadas = [];
                if ((melhorValorFinal === (+Infinity || -Infinity)) && arvore.descendants.length > 1) {
                        for (procuraJogada = 0; procuraJogada < arvore.descendants.length; procuraJogada++) {
                                if (arvore.descendants[procuraJogada].valor != melhorValorFinal)
                                        melhoresJogadas.push(arvore.descendants[procuraJogada].root)
                        }

                }
                else {
                        for (procuraJogada = 0; procuraJogada < arvore.descendants.length; procuraJogada++) {
                                if (arvore.descendants[procuraJogada].valor === melhorValorFinal) {
                                        melhoresJogadas.push(arvore.descendants[procuraJogada].root)
                                }
                        }
                }
                var jogadaFinal = melhoresJogadas[Math.floor(Math.random() * melhoresJogadas.length)];
                delete arvore.descendants

                return jogadaFinal
        };

        //-------------------------------



        checkFinal(estado, jogador, depositoJogador, depositoComputador) {

                var anyJog = [];
                anyJog.push(this.verificaJogadas(estado, jogador), this.verificaJogadas(estado, (jogador % 2) + 1));

                var isFinal = 0;

                if ((anyJog[0].length === 0) && (anyJog[1].length === 0)) { isFinal = 1 }; //verifica se ha jogadas possiveis para os dois jogadores
                if ((depositoJogador > 24) || (depositoComputador > 24) || (depositoJogador === 24 && depComputador === 24)) { isFinal = 1 } //Verifica pelos depositos
                if ((depJogador + depositoComputador) === 46) {
                        for (var i = 0; i < 6; i++) {
                                if (estado[i] === 1) {
                                        if (estado[i + 6] === 1) {
                                                isFinal = 1
                                        }
                                }
                        }

                } return isFinal;
        }


        afterplay() { //Verifica se o jogo acabou

                check = this.checkFinal(state, player, depJogador, depComputador);

                if (check === 1) {
                        permObject.destroy();
                        this.terminar()

                        this.time.delayedCall(delay * 7, () => {

                                switch (vencedor) {
                                        case 1:
                                                scorePInt += 1;
                                                scorePlayer[dif] = scorePInt;
                                                scoreComputador[dif] = scoreCInt;
                                                stats.totalGames[dif] += 1
                                                stats.totalWon[dif] += 1

                                                this.quadroP1W = this.add.sprite((config.width / 2) * 2, (config.height / 2 + config.height / 12) * 2, "ganhouP1").setScale(1.4).setDepth(8889);
                                                break;

                                        case 2:
                                                scoreCInt += 1;
                                                scorePlayer[dif] = scorePInt;
                                                scoreComputador[dif] = scoreCInt;
                                                stats.totalGames[dif] += 1
                                                this.quadroCW = this.add.sprite((config.width / 2) * 2, (config.height / 2 + config.height / 12) * 2, "ganhouC").setScale(1.4).setDepth(8889);;
                                                break;
                                        case 3:
                                                this.quadroEmpate = this.add.sprite((config.width / 2) * 2, (config.height / 2 + config.height / 12) * 2, "empate").setScale(1.4).setDepth(8889);;
                                                break;
                                }


                                textP.text = scorePlayer[dif];
                                textC.text = scoreComputador[dif];

                                //Fechar
                                this.close = this.add.sprite(2 * (config.width / 4 + config.width / 24 + config.width / 150), 2 * (config.height / 2 + config.height / 6 + config.height / 6 + config.height / 24 - config.height / 98), 'close').setInteractive();
                                this.close.on('pointerdown', () => { this.clickMenu() });
                                this.close.setScale(0.62 * 2)
                                this.close.key = -1
                                this.close.depth = 8890


                                //Forwards
                                this.forward = this.add.sprite((config.width - config.width / 4 - config.width / 24 - config.width / 150) * 2, (config.height / 2 + config.height / 6 + config.height / 6 + config.height / 24 - config.height / 98) * 2, 'forward').setInteractive();
                                this.forward.on('pointerdown', () => {
                                        this.scene.start("pvc")
                                        sprites = [];
                                        textdepJogador.text = "0"
                                        textdepComputador.text = "0"

                                });
                                this.forward.setScale(0.62 * 2)
                                this.forward.key = -1
                                this.forward.depth = 8890

                        })


                }

        }

        popularOponente(estado, pos, jogador) {
                var soma = 0;
                var finalpos = 0;
                var i;
                var y = true;

                if (jogador === 1) {
                        for (i = 6; i < 12; i++) {
                                soma = soma + estado[i]
                        }
                }
                else {
                        for (i = 0; i < 6; i++) {
                                soma = soma + estado[i]
                        }
                }

                if (soma === 0) {
                        y = false;
                        for (i = 0; i <= estado[pos]; i++) {
                                finalpos = (pos + i) % 12
                                if (jogador === 1) {
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




        terminarSimulado(estado, depTerminadoJogador, depTerminadoComputador) {
                var res = 1
                var i;

                for (i = 0; i < 6; i++) {
                        depTerminadoJogador = depTerminadoJogador + estado[i]
                }

                for (i = 6; i < 12; i++) {
                        depTerminadoComputador = depTerminadoComputador + estado[i]
                }

                if (depTerminadoJogador > depTerminadoComputador) { res = 1 }
                else { res = 2 }

                if (depTerminadoJogador === depTerminadoComputador) { res = 3 }

                return res
        }

        terminar() {
                var res = 1
                var i;
                //Esperar 2 segundos para ver o estado do tabuleiro
                //Atualizar o state; state[n] = 0
                //Recolher as casas opostas, 0/6,1/7,2/8,3/9,4/10,5/11 sprites[n] = wtv
                //Ovos nos depósitos / atualizar numero de ovos no tabuleiro (cena escrita a branco)
                //1 segundo
                //End screen


                let delayRecJ = 0;
                let delayRecPC = 0;


                for (i = 0; i < 6; i++) {
                        depJogador = depJogador + state[i]
                        state[i] = 0;
                        sprites[i].dirty = true;
                }

                for (i = 6; i < 12; i++) {
                        depComputador = depComputador + state[i]
                        state[i] = 0;
                        sprites[i].dirty = true;
                }


                for (let j = 0; j < 6; j++) {//Atualiza Jogador 1
                        this.time.delayedCall(delay * delayRecJ, () => {
                                sprites[j].sprite.setTexture('i' + state[sprites[j].casa])
                        })
                        delayRecJ++;
                }

                for (let k = 6; k < 12; k++) {//Atualiza PC
                        this.time.delayedCall(delay * delayRecPC, () => {
                                sprites[k].sprite.setTexture('i' + state[sprites[k].casa])
                        })
                        delayRecPC++;
                }

                this.time.delayedCall(delay * (6.5), () => {
                        if (depJogador > depComputador) { res = 1 }
                        else if (depJogador < depComputador) { res = 2 }
                        else { res = 3 }
                        if (depComputador >= 25) {
                                depcimg.setTexture('i' + 25)
                        }
                        else if (depJogador >= 25) {
                                depjimg.setTexture('i' + 25)
                        }
                        else {
                                depcimg.setTexture('i' + depComputador)
                                depjimg.setTexture('i' + depJogador)
                        }


                        textdepComputador.text = depComputador
                        textdepJogador.text = depJogador
                        vencedor = res
                })
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
                if (totalP1 === 0) {
                        player = 2
                        permObject = this.add.sprite(1024, 600, 'perms').setInteractive();
                        permObject.key = -1;
                        permObject.depth = 10;
                        permObject.on('pointerdown', () => this.clickPerms());
                        permObject.setScale(1.3)
                }

                // Se o player 2 tiver o tabuleiro vazio, joga o player 1
                else if (totalP2 === 0) {
                        player = 1
                }

                // Se nenhum tiver o tabuleiro vazio alterna-se as jogadas
                else {
                        if (player === 1) {
                                player = 2
                                permObject = this.add.sprite(1024, 600, 'perms').setInteractive();
                                permObject.key = -1;
                                permObject.depth = 10;
                                permObject.on('pointerdown', () => this.clickPerms());
                                permObject.setScale(1.3)

                        }

                        else { player = 1 }
                }

        }




        // funcao que procura se existem numeros >1 na fila do jogador/pc


        one(estado, pos) {
                if (estado[pos] === 0) {

                        return false;
                }

                var i;
                if (estado[pos] === 1) {
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



        // Cria um array com as jogadas possiveis 
        verificaJogadas(estadoRecebido, jogador) {

                //casasPC = [6,7,8,9,10,11]
                //casasJogador = [0,1,2,3,4,5]
                switch (jogador) {

                        case 1:
                                var jogPos = casasJogador.filter((casa) => this.one(estadoRecebido, casa) && this.popularOponente(estadoRecebido, casa, jogador));
                                break

                        case 2:
                                var jogPos = casasPC.filter((casa) => this.one(estadoRecebido, casa) && this.popularOponente(estadoRecebido, casa, jogador));
                                break


                }
                return jogPos;
        };


        //Controi o resto dos nodos de acordo com os states simulados ao longo do jogo
        construirDescendentes(staterecebido, jogador, jogada, depth, auxdepJogador, auxdepComputador) {

                //receber um estado + 1 jogada -- Fazer a jogada -- Procurar novas jogadas -- passar aos descedentes
                var nodo = new TreeNode();
                nodo.root = jogada;
                // Fazer copia das variaveis globais
                var copiaestado = [...staterecebido];

                var depJogadorcopy = auxdepJogador
                var depComputadorcopy = auxdepComputador
                nodo.estadoSimulado = this.simulaJogada(copiaestado, jogada, jogador, depJogadorcopy, depComputadorcopy);

                if (depth === 0 || nodo.estadoSimulado.over === 1) {
                        return nodo;
                }

                //EstadoSimulado já tem a jogada feita e os deps calculados, e o jogador ANTIGO


                var jogPosNew = this.verificaJogadas(nodo.estadoSimulado.estado, (jogador % 2) + 1);

                for (var i = 0; i < jogPosNew.length; i++) {
                        nodo.descendants.push(this.construirDescendentes(nodo.estadoSimulado.estado, (jogador % 2) + 1, jogPosNew[i], depth - 1, nodo.estadoSimulado.depJogador, nodo.estadoSimulado.depComputador));

                }
                return nodo;
        }


        //Cria uma arvore de jogadas simuladas
        construirArvore(estadoRaiz, profundidade) {
                var newProf = profundidade;
                var jogPos = this.verificaJogadas(estadoRaiz, 2);

                var arvore = new TreeNode();

                // raiz
                var estadoSim = new EstadoSimulado(estadoRaiz, depJogador, depComputador);


                //tudobem
                arvore.estadoSimulado = estadoSim;


                // constroi para o jogador seguinte
                for (var jogposlen = 0; jogposlen < jogPos.length; jogposlen++) {
                        arvore.descendants.push(this.construirDescendentes(estadoRaiz, 2, jogPos[jogposlen], newProf - 1, depJogador, depComputador));

                }
                return arvore;
        }



        simulaJogada(copiaEstado, jogada, jogador, depJogadorcopy, depComputadorcopy) {

                //Faz a jogada
                var estadoArraySimulado = [...copiaEstado];
                var sementesAEspalhar = estadoArraySimulado[jogada];
                var ultimacasa = (jogada + sementesAEspalhar) % 12;
                estadoArraySimulado[jogada] = 0;
                var depJogadorSim = depJogadorcopy
                var depComputadorSim = depComputadorcopy

                var isOver = 0;

                var casasPercorridas = 1
                for (casasPercorridas = 1; casasPercorridas <= sementesAEspalhar; casasPercorridas++) {
                        estadoArraySimulado[(jogada + casasPercorridas) % 12] = estadoArraySimulado[(jogada + casasPercorridas) % 12] + 1; //espalha as sementes todas
                }
                ///////  RECEBE O JOGADOR NESTE MOMENTO
                if (estadoArraySimulado[ultimacasa] === (2 || 3)) {
                        if (jogador === 1) { //Em caso de ser o jogador a jogar
                                while (estadoArraySimulado[ultimacasa] === (2 || 3) && (ultimacasa >= 6 && ultimacasa < 12)) {
                                        depJogadorSim += estadoArraySimulado[ultimacasa];
                                        estadoArraySimulado[ultimacasa] = 0;
                                        ultimacasa--;

                                }
                        }
                        else { //Em caso de ser o computador a jogar
                                while (estadoArraySimulado[ultimacasa] === (2 || 3) && (ultimacasa >= 0 && ultimacasa < 6)) {
                                        depComputadorSim += estadoArraySimulado[ultimacasa];
                                        estadoArraySimulado[ultimacasa] = 0;
                                        ultimacasa--;

                                }

                        }
                }

                isOver = this.checkFinal(estadoArraySimulado, jogador, depJogadorSim, depComputadorSim)

                var estado = new EstadoSimulado(estadoArraySimulado, depJogadorSim, depComputadorSim, isOver)


                return estado;
        }



        nudgeEval(nodo) {

                var nudgeDepJ = nodo.estadoSimulado.depJogador
                var nudgeDepC = nodo.estadoSimulado.depComputador
                var nudgeValue = nudgeDepC - nudgeDepJ;
                //var nudgeValue = 0;

                var nudgeSimState = [...nodo.estadoSimulado.estado]

                //Avalia Depositos
                if (nudgeDepJ >= 25) { nudgeValue -= 80; return nudgeValue } // nerf
                if (nudgeDepC >= 25) { nudgeValue += 80; return nudgeValue } // buff
                if (nudgeDepC === 24 && nudgeDepJ === 24) { nudgeValue += 25; return nudgeValue } // Decisao entre perder e empatar, PC prefere empatar

                //Para O Computador
                // Escolher uma jogada
                // 1 - distribuir
                // Verificar se começa recolha
                //Recolher até parar
                //Verificar check e terminar
                //case win +1000, case lose -1000, case empate, +500
                //repeat para player

                var anyJogJ = [];
                var anyJogC = [];
                anyJogJ = this.verificaJogadas(nudgeSimState, 1)
                anyJogC = this.verificaJogadas(nudgeSimState, 2);
                //[ [jogadas player] , [jogadas computador]]
                anyJogC.forEach(jogada => {
                        var valor = nudgeSimState[jogada]
                        var casaFinal = (jogada + valor) % 12
                        if ((casasJogador.includes(casaFinal)) && (nudgeSimState[casaFinal] + 1 === (2 || 3))) {
                                var nudgeAuxState = [...nudgeSimState]
                                var casasPercorridas = 1
                                nudgeAuxState[jogada] = 0
                                var nudgeAuxDepJ = nudgeDepJ
                                var nudgeAuxDepC = nudgeDepC
                                //espalha as sementes todas
                                for (casasPercorridas = 1; casasPercorridas <= valor; casasPercorridas++) {
                                        nudgeAuxState[(jogada + casasPercorridas) % 12] = nudgeAuxState[(jogada + casasPercorridas) % 12] + 1;
                                }

                                while (nudgeAuxState[casaFinal] === (2 || 3) && (casaFinal >= 0 && casaFinal < 6)) {
                                        nudgeAuxDepC += nudgeAuxState[casaFinal];
                                        nudgeAuxState[casaFinal] = 0;
                                        casaFinal--;
                                }
                                if (this.checkFinal(nudgeAuxState, 2, nudgeAuxDepJ, nudgeAuxDepC) === 1) {
                                        var simVencedor = this.terminarSimulado(nudgeAuxState, nudgeAuxDepJ, nudgeAuxDepC)
                                        switch (simVencedor) {
                                                case 1:
                                                        return nudgeValue -= 1000
                                                case 2:
                                                        return nudgeValue += 1000
                                                case 3:
                                                        return nudgeValue += 500
                                        }
                                }
                        }


                })


                anyJogJ.forEach(jogada => {
                        var valor = nudgeSimState[jogada]
                        var casaFinal = (jogada + valor) % 12

                        if ((casasPC.includes(casaFinal)) && (nudgeSimState[casaFinal] + 1 === (2 || 3))) {
                                var nudgeAuxState = [...nudgeSimState]
                                var casasPercorridas = 1
                                nudgeAuxState[jogada] = 0
                                var nudgeAuxDepJ = nudgeDepJ
                                var nudgeAuxDepC = nudgeDepC
                                //espalha as sementes todas
                                for (casasPercorridas = 1; casasPercorridas <= valor; casasPercorridas++) {
                                        nudgeAuxState[(jogada + casasPercorridas) % 12] = nudgeAuxState[(jogada + casasPercorridas) % 12] + 1;
                                }

                                while (nudgeAuxState[casaFinal] === (2 || 3) && (casaFinal >= 0 && casaFinal < 6)) {
                                        nudgeAuxDepJ += nudgeAuxState[casaFinal];
                                        nudgeAuxState[casaFinal] = 0;
                                        casaFinal--;
                                }
                                if (this.checkFinal(nudgeAuxState, 1, nudgeAuxDepJ, nudgeAuxDepC) === 1) {
                                        var simVencedor = this.terminarSimulado(nudgeAuxState, nudgeAuxDepJ, nudgeAuxDepC)
                                        switch (simVencedor) {
                                                case 1:
                                                        return nudgeValue += 1000
                                                case 2:
                                                        return nudgeValue -= 1000
                                                case 3:
                                                        return nudgeValue += 500
                                        }
                                }
                        }
                })


                //Avalia buracos tabuleiro
                for (var i = 0; i < nudgeSimState.length; i++) {
                        var numOvos = nudgeSimState[i];
                        if (casasJogador.indexOf(i) != -1) {
                                if (numOvos === 0) { nudgeValue += 4 }
                                if (numOvos === (1 || 2)) { nudgeValue += 3 }
                                if (numOvos >= 12) { nudgeValue -= 2 }
                        }
                }
                if (casasPC.indexOf(i) != -1) {
                        if (numOvos === 0) { nudgeValue -= 4 }
                        if (numOvos === (1 || 2)) { nudgeValue -= 3 }
                        if (numOvos >= 12) { nudgeValue += 2 }
                }

                return (nudgeValue)

        }




        minimax(node, depth, alpha, beta, maximizingPlayer) {
                if (depth == 0 || (node.estadoSimulado.isOver === 1)) {
                        return this.nudgeEval(node);
                }

                if (maximizingPlayer === true) {

                        let maxEval = -Infinity;
                        for (var i = 0; i < node.descendants.length; i++) {
                                var evalu = this.minimax(node.descendants[i], depth - 1, alpha, beta, false);
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
                                var evalu = this.minimax(node.descendants[i], depth - 1, alpha, beta, true);
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


        saveStats() {

                if (typeof (Storage) === "undefined") {
                        return;
                }
                let statsstring = JSON.stringify(stats);
                localStorage.setItem("OuriStats", statsstring);
        }
        clickMenu() {
                this.saveStats();
                depComputador = 0;
                depJogador = 0;
                sprites = [];
                this.scene.start('menu');
        }
        clickPerms() {
                var pos = this.dificuldade();
                this.atualizarState(pos);
                permObject.setVisible(false);
        }


}