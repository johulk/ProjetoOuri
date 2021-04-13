var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 600,
    backgroundColor: 0x000000,
    scene: [Load, Menu, Pvp, Pvc, Dificuldade]

};


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
