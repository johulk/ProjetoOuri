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
        width: DEFAULT_WIDTH * 2,
        height: DEFAULT_HEIGHT * 2
    }

}

var game = new Phaser.Game(config);


//PVP
let scorePlayer1 = 0;
let scorePlayer2 = 0;



//PVC
let scorePInt = 0;
let scoreCInt = 0;
let scorePlayer;
let scoreComputador;


//Stats
//Load stats.
let stats = {
    totalGames: [0,0,0],
    totalWon: [0,0,0]
};

//var stats = 

//Variaveis Globais Pvc
var dif;

