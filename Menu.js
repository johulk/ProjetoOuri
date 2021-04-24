class Menu extends Phaser.Scene {
    constructor() {
        super("menu");
    }

    create() {
        let w = config.width
        let h = config.height
        //Background--
        this.scale.lockOrientation('landscape')
        //Background
        this.background = this.add.sprite(w, h, "background");
        //this.background.setOrigin(0,0);
        this.background.displayWidth = 1024 * 2;
        this.background.displayHeight = 600 * 2;
        this.background.depth = 0
        this.loadStats();
        //Titulo
        this.ouri = this.add.sprite((w / 2) * 2, (h / 12) * 2, 'ouri');
        //this.ouri.setScale(.)
        this.ouri.depth = 2

        //Pintainho 3

        this.pinto3 = this.add.sprite((165) * 2, (535) * 2, 'pinto_3')
        //this.pinto3.setScale(0.5)
        this.pinto3.depth = 2

        //Pintainho 2
        this.pinto2 = this.add.sprite((80) * 2, (520) * 2, 'pinto_2')
        //this.pinto2.setScale(0.5)
        this.pinto2.flipX = true
        this.pinto2.depth = 1

        //Pintainho 1
        this.pinto1 = this.add.sprite((950) * 2, (487) * 2, 'pinto_1')
        //this.pinto1.setScale(0.5)
        this.pinto1.depth = 1





        //Ovos
        this.ovo1 = this.add.sprite(739 * 2, 540 * 2, 'ovo')
        //his.ovo1.setScale(0.5)
        this.ovo1.depth = 3
        this.ovo1.angle = 4.0


        this.ovo2 = this.add.sprite(730 * 2, 555 * 2, 'ovo')
        //this.ovo2.setScale(0.5)
        this.ovo2.depth = 1

        this.ovo3 = this.add.sprite(748 * 2, 555 * 2, 'ovo')
        //this.ovo3.setScale(0.5)
        this.ovo3.depth = 2

        this.ovo4 = this.add.sprite(782 * 2, 557 * 2, 'ovo')
        //this.ovo4.setScale(0.5)
        this.ovo4.depth = 2
        this.ovo4.angle = 85


        //--
        // Buttons

        //2 Jogadores
        this.players = this.add.sprite((w / 2) * 2, (h / 2 - h / 12 - h / 24) * 2, 'players').setInteractive();
        this.players.on('pointerdown', () => this.clickPlayers());
        this.players.setScale(0.8 * 2)

        //Computador
        this.computer = this.add.sprite((w / 2) * 2, (h / 2 + h / 12) * 2, 'computer').setInteractive();
        this.computer.on('pointerdown', () => this.clickComputer());
        this.computer.setScale(0.8 * 2)

        //Informações
        this.info = this.add.sprite((w - w / 18 + w / 60) * 2, (h / 2 - h / 12 - h / 24) * 2, 'info').setInteractive();
        this.info.on('pointerdown', () => this.clickInfo());
        this.info.setScale(0.8 * 2)

        //Créditos
        this.creditos = this.add.sprite((w - w / 18 + w / 60) * 2, (h / 2) * 2, 'creditos').setInteractive();
        this.creditos.on('pointerdown', () => this.clickCreditos());
        this.creditos.setScale(0.8 * 2)

        //Stats
        this.stats = this.add.sprite((w - w / 18 + w / 60) * 2, (h / 2 + h / 12 + h / 24) * 2, 'stats').setInteractive();
        this.stats.on('pointerdown', () => this.clickStats());
        this.stats.setScale(0.8 * 2)
        

       
    }

    loadStats(){
        if(typeof(Storage) === "undefined") {
            return;
        }
        
        let dataAux = localStorage.getItem('OuriStats');
        if(dataAux != null){
            let data = JSON.parse(dataAux);
            this.parseData(data);
        }
    }

    parseData(data){
        if(Array.isArray(data['totalGames']) && data['totalGames'].length === 3 && this.checkArrayInteger(data['totalGames'])){
            stats.totalGames = data['totalGames'].slice();
        }
        if(Array.isArray(data['totalWon']) && data['totalWon'].length === 3 && this.checkArrayInteger(data['totalWon'])){
            stats.totalWon = data['totalWon'].slice();
        }

    }

    checkArrayInteger(array) {
       
        for (let i = 0; i < array.length;i++) {
            if(!Number.isInteger(array[i]) || array[i] < 0){
                return false;
            }
        }
        return true;
    }
    clickPlayers() {
        console.log('2 Jogadores');
        this.scene.start("pvp");
    }

    clickComputer() {
        console.log('Computador')
        this.scene.start("dificuldade");
    }

    clickInfo() {

        console.log('Informações');
        var counter = 1;
        //info1
        this.informacoes = this.add.sprite(config.width, config.height + config.height / 6, "info1");
        this.informacoes.setScale(.7 * 2);
        this.informacoes.depth = 1

        //Forwards
        this.forward = this.add.sprite((config.width - config.width / 4 - config.width / 24 - config.width / 150) * 2, (config.height / 2 + config.height / 6 + config.height / 6 + config.height / 24 - config.height / 98) * 2, 'forward').setInteractive();
        this.forward.on('pointerdown', () => this.counterInfo(counter + 1));
        this.forward.setScale(0.62 * 2)
        this.forward.depth = 4
        //Backwards
        this.back = this.add.sprite(2 * (config.width / 4 + config.width / 24 + config.width / 150), 2 * (config.height / 2 + config.height / 6 + config.height / 6 + config.height / 24 - config.height / 98), 'back').setInteractive();
        this.back.on('pointerdown', () => this.counterInfo(counter - 1));
        this.back.setScale(0.62 * 2)
        this.back.depth = 4
        //Fechar
        this.close = this.add.sprite((config.width - config.width / 4 - config.width / 30) * 2, 2 * (config.height / 2 - config.height / 12 - config.height / 24 - config.height / 48 - config.height / 64), 'close').setInteractive();
        this.close.on('pointerdown', () => this.scene.start("menu"));
        this.close.setScale(0.62 * 2)
        this.close.depth = 4


    }
    clickCreditos() {
        this.creditosQuadro = this.add.sprite((config.width / 2) * 2, (config.height / 2 + config.height / 12) * 2, "creditosQuadro").setScale(1.4);
        //Fechar
        this.close = this.add.sprite((config.width - config.width / 4 - config.width / 30) * 2, 2 * (config.height / 2 - config.height / 12 - config.height / 24 - config.height / 48 - config.height / 64), 'close').setInteractive();
        this.close.on('pointerdown', () => this.scene.start("menu"));
        this.close.setScale(0.62 * 2)
        this.close.depth = 4
        console.log('Créditos');
    }
    clickStats() {
        this.statsQuadro = this.add.sprite((config.width / 2) * 2, (config.height / 2 + config.height / 12) * 2, "statsQuadro").setScale(1.4);
        //Fechar
        this.close = this.add.sprite((config.width - config.width / 4 - config.width / 30) * 2, 2 * (config.height / 2 - config.height / 12 - config.height / 24 - config.height / 48 - config.height / 64), 'close').setInteractive();
        this.close.on('pointerdown', () => this.scene.start("menu"));
        this.close.setScale(0.62 * 2)
        this.close.depth = 4


        //Calculos de %

        var totalJogos = stats.totalGames.reduce((a,b) => a+b,0)
        var totalWins = ((stats.totalWon.reduce((a,b) => a+b,0)) / totalJogos )*100;
        var totalWinsEasy = (stats.totalWon[0] / stats.totalGames[0])*100
        var totalWinsMedium = (stats.totalWon[1] / stats.totalGames[1])*100
        var totalWinsHard = (stats.totalWon[2] / stats.totalGames[2])*100

        console.log(totalJogos)
        var textTotalGames = this.add.text(1224, 270 * 2, totalJogos , { fontFamily: 'Arial', fontSize: 50, color: '#FFFFFF' }).setFontStyle('bold italic');
        var textTotalWins  = this.add.text(1224 ,305 * 2, totalWins+"%", { fontFamily: 'Arial', fontSize: 50, color: '#FFFFFF' }).setFontStyle('bold italic');
        var textWinsEasy   = this.add.text(1224 , 386 * 2, totalWinsEasy+ "%", { fontFamily: 'Arial', fontSize: 50, color: '#FFFFFF' }).setFontStyle('bold italic');
        var textWinsMedium = this.add.text(1224 , 422 * 2, totalWinsMedium+ "%", { fontFamily: 'Arial', fontSize: 50, color: '#FFFFFF' }).setFontStyle('bold italic');
        var textWinsHard   = this.add.text(1224 , 457 * 2, totalWinsHard+ "%", { fontFamily: 'Arial', fontSize: 50, color: '#FFFFFF' }).setFontStyle('bold italic');

        //textTotalGames.text = 666666












        console.log('Stats');
    }
    counterInfo(contador) {
        if ((contador > 0) && (contador < 17)) {


            this.informacoes = this.add.sprite((config.width / 2) * 2, (config.height / 2 + config.height / 12) * 2, "info" + contador);
            this.informacoes.setScale(.7 * 2);
            this.informacoes.depth = 1
            //Forwards
            this.forward = this.add.sprite((config.width - config.width / 4 - config.width / 24 - config.width / 150) * 2, (config.height / 2 + config.height / 6 + config.height / 6 + config.height / 24 - config.height / 98) * 2, 'forward').setInteractive();
            this.forward.on('pointerdown', () => this.counterInfo(contador + 1));
            this.forward.setScale(0.62 * 2)
            this.forward.depth = 4
            //Backwards
            this.back = this.add.sprite(2 * (config.width / 4 + config.width / 24 + config.width / 150), 2 * (config.height / 2 + config.height / 6 + config.height / 6 + config.height / 24 - config.height / 98), 'back').setInteractive();
            this.back.on('pointerdown', () => this.counterInfo(contador - 1));
            this.back.setScale(0.62 * 2)
            this.back.depth = 4
            //Fechar
            this.close = this.add.sprite((config.width - config.width / 4 - config.width / 30) * 2, 2 * (config.height / 2 - config.height / 12 - config.height / 24 - config.height / 48 - config.height / 64), 'close').setInteractive();
            this.close.on('pointerdown', () => this.scene.start("menu"));
            this.close.setScale(0.62 * 2)
            this.close.depth = 4
        }
    }
}