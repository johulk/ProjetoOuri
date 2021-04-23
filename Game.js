let DEFAULT_WIDTH = 1024
let DEFAULT_HEIGHT = 600

var config = {
    type: Phaser.CANVAS,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    backgroundColor: 0xffffff,
    pixelArt: false,
    antialias: true,
    scene: [Load, Menu, Pvp, Pvc, Dificuldade],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH*2,
        height: DEFAULT_HEIGHT*2
    }
    
}

var game = new Phaser.Game(config);

// Variaveis Globais Pvp
// Mudar isto para dentro da classe se der
var state = []
var player = 1;
var dep1 = 0;
var dep2 = 0;
var check = 0;
casasPC = [6,7,8,9,10,11]
casasJogador = [0,1,2,3,4,5]

//PVP
let scorePlayer1 = 0;
let scorePlayer2 = 0;



//PVC
let scorePInt = 0;
let scoreCInt = 0;
let scorePlayer;
let scoreComputador;




//Variaveis Globais Pvc
var dif ; 
