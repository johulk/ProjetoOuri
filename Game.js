let DEFAULT_WIDTH = 1024
let DEFAULT_HEIGHT = 600

var config = {
    type: Phaser.CANVAS,
    width: 1024,
    height: 600,
    resolution: window.devicePixelRatio,
    backgroundColor: 0x000000,
    antialias: true,
    scene: [Load, Menu, Pvp, Pvc, Dificuldade],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1024,
        height: 600
    }
    
}
var canvas = document.getElementsByTagName('canvas')[0];
canvas.width  = 800;
canvas.height = 600;
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

//Variaveis Globais Pvc
var dif ; 
