let gameConfig = {
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    backgroundColor: '#0000',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: new Tableau1()
};
let game = new Phaser.Game(gameConfig);
