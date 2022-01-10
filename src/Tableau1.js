class Tableau1 extends Phaser.Scene {
    /**
     * Précharge les assets
     */
    preload() {
        //Les différentes lumières
        this.load.image('blue-light', 'assets/light/simplelight/bluelight.png');
        this.load.image('green-light', 'assets/light/simplelight/greenlight.png');
        this.load.image('pink-light', 'assets/light/simplelight/pinklight.png');
        this.load.image('white-light', 'assets/light/simplelight/whitelight.png');
        this.load.image('orange-light', 'assets/light/simplelight/orangelight.png');
        this.load.image('red-light', 'assets/light/simplelight/redlight.png');
        this.load.image('dark-blue-light', 'assets/light/simplelight/darkbluelight.png');
        this.load.image('turquoise-light', 'assets/light/simplelight/turquoiselight.png');
        this.load.image('purple-light', 'assets/light/simplelight/purplelight.png');
        this.load.image('yellow-light', 'assets/light/simplelight/yellowlight.png');

        //Les différentes lumières pour l'immeuble en dégradé
        this.load.image('blue-gradient', 'assets/light/colorgradient/bluegradient.png');
        this.load.image('green-gradient', 'assets/light/colorgradient/greengradient.png');
        this.load.image('orange-gradient', 'assets/light/colorgradient/orangegradient.png');
        this.load.image('pink-gradient', 'assets/light/colorgradient/pinkgradient.png');
        this.load.image('flashy-green-gradient', 'assets/light/colorgradient/flashygreengradient.png');
        this.load.image('purple-gradient', 'assets/light/colorgradient/purplegradient.png');
        this.load.image('red-gradient', 'assets/light/colorgradient/redgradient.png');
        this.load.image('yellow-gradient', 'assets/light/colorgradient/yellowgradient.png');
        this.load.image('dark-blue-gradient', 'assets/light/colorgradient/darkbluegradient.png');

        //Le paysage
        this.load.image('building', 'assets/level/building.png');

        //Les différents éléments (avions, oiseaux et autre)

        this.load.image('balloon', 'assets/décors/balloon.png');
        this.load.image('balloon1', 'assets/décors/balloon1.png');
        this.load.image('balloon2', 'assets/décors/balloon2.png');
        this.load.image('balloon3', 'assets/décors/balloon3.png');
        this.load.image('balloon4', 'assets/décors/balloon4.png');
        for (let e = 1; e <= 9; e++) {
            this.load.image('bird' + e, 'assets/décors/bird/flyingbird' + e + '.png');
        }

    }

    /**
     * Créer la scène
     */
    create() {

        //met en place les éléments
        this.creerFormes();

        /**
         * Liste des lettres
         * @type {string[]}
         */
        this.lettres = "azertyuiopqsdfghjklmwxcvbn ".split("")
        console.log("liste des touches prises en charge...");
        console.log(this.lettres);

        // pour chaque lettre on va créer un élément graphique
        this.creerClavier();


        //initialise les écoutes de touches pressées et relâchées
        this.initKeyboard();

        /**
         * influera sur la vitesse de rotation
         * modifié par les touches J K L M
         * @type {number}
         */
        this.vitesse = 1;
    }

    creerClavier() {
        //espacement entre les lettres = largeur de la scène / nombre de lettres
        let espacement = (this.game.config.width - 2) / this.lettres.length; // -2 c'est pour avoir une petite marge d'un pixel
        let x = 1;
        for (let lettre of this.lettres) {
            let objetGraphique = this.add.text(x, 1, lettre, {
                color: "#FFFFFF", //blanc
                align: "center",
                backgroundColor: "#000000", //noir
                fixedWidth: espacement - 1  // -1 c'est pour avoir une petite marge d'un pixel entre les lettres
            });
            //position X de la rouche suivante
            x += espacement;
            //donne un nom à l'élément graphique
            objetGraphique.name = lettre;
        }
    }

    /**
     * Crée le décor
     */

    creerFormes() {

        //Fond

        this.fond = this.add.image(480, 270, "building");
        this.fond.scale = 0.78


        // lumières de A à P

        this.blue = this.add.image(115, 305, "blue-light");
        this.blue.scale = 1.5
        this.blue.setVisible(false)


        this.pink = this.add.image(314, 200, "pink-light");
        this.pink.scale = 2.2
        this.pink.setVisible(false)

        this.white = this.add.image(385, 305, "white-light");
        this.white.scale = 3.8
        this.white.setVisible(false)

        this.orange = this.add.image(725, 223, "orange-light");
        this.orange.setVisible(false)


        this.darkBlue = this.add.image(590, 460, "dark-blue-light");
        this.darkBlue.scale = 2.2
        this.darkBlue.setVisible(false)

        this.turquoise = this.add.image(395, 70, "turquoise-light");
        this.turquoise.scale = 1.7
        this.turquoise.setVisible(false)

        this.yellow = this.add.image(650, 120, "yellow-light");
        this.yellow.scale = 2.5
        this.yellow.setVisible(false)

        this.red = this.add.image(850, 290, "red-light");
        this.red.scale = 0.5
        this.red.setVisible(false)

        this.green = this.add.image(70, 376, "green-light");
        this.green.scale = 2.5
        this.green.setVisible(false)

        this.purple = this.add.image(507, 70, "purple-light");
        this.purple.scale = 1.5
        this.purple.setVisible(false)

        // scan de lumière de Q à M (dégradé arc en ciel de haut en bas de l'immeuble)

        this.redGradient = this.add.image(885, 240, "red-gradient");
        this.redGradient.scale = 0.38
        this.redGradient.setVisible(false)

        this.pinkGradient = this.add.image(885, 269, "pink-gradient");
        this.pinkGradient.scale = 0.38
        this.pinkGradient.setVisible(false)

        this.purpleGradient = this.add.image(885, 295, "purple-gradient");
        this.purpleGradient.scale = 0.38
        this.purpleGradient.setVisible(false)

        this.darkBlueGradient = this.add.image(885, 323, "dark-blue-gradient");
        this.darkBlueGradient.scale = 0.38
        this.darkBlueGradient.setVisible(false)

        this.blueGradient = this.add.image(885, 347, "blue-gradient");
        this.blueGradient.scale = 0.38
        this.blueGradient.setVisible(false)

        this.flashygreenGradient = this.add.image(885, 405, "flashy-green-gradient");
        this.flashygreenGradient.scale = 0.38
        this.flashygreenGradient.setVisible(false)

        this.greenGradient = this.add.image(885, 375, "green-gradient");
        this.greenGradient.scale = 0.38
        this.greenGradient.setVisible(false)

        this.yellowGradient = this.add.image(885, 430, "yellow-gradient");
        this.yellowGradient.scale = 0.38
        this.yellowGradient.setVisible(false)

        this.orangeGradient = this.add.image(885, 460, "orange-gradient");
        this.orangeGradient.scale = 0.38
        this.orangeGradient.setVisible(false)

        this.redGradient1 = this.add.image(905, 483, "red-gradient");
        this.redGradient1.scale = 0.38
        this.redGradient1.setVisible(false)



        //Animations de W à N

        this.bird = this.add.sprite(-50, 50, 'animation').setOrigin(0, 0);
        this.anims.create({
            key: 'flyingbird',
            frames: [
                {key: 'bird1'},
                {key: 'bird2'},
                {key: 'bird3'},
                {key: 'bird4'},
                {key: 'bird5'},
                {key: 'bird6'},
                {key: 'bird7'},
                {key: 'bird8'},
                {key: 'bird9'},

            ],
            frameRate: 50,
            repeat: -1,


        });
        this.bird.play('flyingbird');
        this.bird.scale = 0.1


        this.ballon = this.add.image(885, 570, "balloon");
        this.ballon.scale=0.06

        this.ballon1 = this.add.image(285, 570, "balloon1");
        this.ballon1.scale=0.06

        this.ballon2 = this.add.image(485, 570, "balloon2");
        this.ballon2.scale=0.06

        this.ballon3 = this.add.image(85, 570, "balloon3");
        this.ballon3.scale=0.06

        this.ballon4 = this.add.image(760, 570, "balloon4");
        this.ballon4.scale=0.06




        //Tweens

        this.tweens.add({
            targets: [ this.redGradient, this.redGradient1, this.blueGradient, this.darkBlueGradient, this.greenGradient, this.flashygreenGradient, this.pinkGradient,this.purpleGradient, this.orangeGradient, this.yellowGradient ],
            x: 950,
            duration: 800,
            ease: 'Power2',
            loop:1000000,
            yoyo: true,
            delay: 10
        });





    }

    initKeyboard() {


        let me = this;
        this.input.keyboard.on('keydown', function (kevent) {
            console.log("keydown", kevent.key, kevent)
            for (let lettre of me.lettres) {
                if (kevent.key === lettre) {

                    let objetGraphique = me.children.getByName(lettre);
                    objetGraphique.toucheEnfoncee = true;

                }
            }

        });
        this.input.keyboard.on('keyup', function (kevent) {
            console.log("keyup", kevent.key, kevent)
            for (let lettre of me.lettres) {
                if (kevent.key === lettre) {

                    let touche = me.children.getByName(lettre);
                    touche.toucheEnfoncee = false;
                    touche.actif = !touche.actif; //alterne un fois ce sera actif, une fois ça le sera plus.
                    //appelle une fonction
                    me.quandToucheRelachee(kevent.key, touche)
                }
            }

        });
    }

    /**
     * Faire une action quand une touche est relachée
     */
    quandToucheRelachee(lettre,objetGraphique) {

        // de A à P --------------couleurs simples-----------------
        if (lettre === "a") {
            this.blue.setVisible(true)
        }


        if (lettre === "z") {
            this.red.setVisible(true)

        }
        if (lettre === "e") {
            this.purple.setVisible(true)

        }
        if (lettre === "r") {
            this.green.setVisible(true)

        }
        if (lettre === "t") {
            this.pink.setVisible(true)

        }
        if (lettre === "y") {
            this.orange.setVisible(true)

        }
        if (lettre === "u") {
            this.yellow.setVisible(true)

        }
        if (lettre === "i") {
            this.turquoise.setVisible(true)

        }
        if (lettre === "o") {
            this.white.setVisible(true)

        }
        if (lettre === "p") {
            this.darkBlue.setVisible(true)

        }


        // de Q à M --------------couleurs simples-----------------
        if (lettre === "q") {
            this.redGradient.setVisible(true)

        }
        if (lettre === "s") {
            this.pinkGradient.setVisible(true)

        }
        if (lettre === "d") {
            this.purpleGradient.setVisible(true)

        }
        if (lettre === "f") {
            this.darkBlueGradient.setVisible(true)

        }
        if (lettre === "g") {
            this.blueGradient.setVisible(true)

        }
        if (lettre === "h") {
            this.greenGradient.setVisible(true)

        }
        if (lettre === "j") {
            this.flashygreenGradient.setVisible(true)

        }
        if (lettre === "k") {
            this.yellowGradient.setVisible(true)

        }
        if (lettre === "l") {
            this.orangeGradient.setVisible(true)

        }
        if (lettre === "m") {
            this.redGradient1.setVisible(true)

        }

        //Touche de W à N

        if (lettre === "w") {
            this.tweens.add({
                targets: this.bird,
                x: 1000,
                duration: 5000,
                ease: 'Power2',
            });

        }
        if (lettre === "x") {
            this.tweens.add({
                targets: this.ballon4,
                y: -50,
                loop:1000000,
                duration: 5000,
                ease: 'Power2',
            });

        }
        if (lettre === "c") {
            this.tweens.add({
                targets: this.ballon,
                y: -50,
                loop:1000000,
                duration: 5000,
                ease: 'Power2',
            });

        }
        if (lettre === "v") {
            this.tweens.add({
                targets: this.ballon1,
                y: -50,
                loop:1000000,
                duration: 5000,
                ease: 'Power2',
            });

        }
        if (lettre === "b") {
            this.tweens.add({
                targets: this.ballon2,
                y: -50,
                loop:1000000,
                duration: 5000,
                ease: 'Power2',
            });
        }
        if (lettre === "n") {
            this.tweens.add({
                targets: this.ballon3,
                y: -50,
                loop:1000000,
                duration: 5000,
                ease: 'Power2',
            });
        }



        //La touche qui éteint toutes les lumière : espace
        if (lettre === " ") {
            this.darkBlue.setVisible(false)
            this.white.setVisible(false)
            this.turquoise.setVisible(false)
            this.yellow.setVisible(false)
            this.pink.setVisible(false)
            this.orange.setVisible(false)
            this.green.setVisible(false)
            this.purple.setVisible(false)
            this.red.setVisible(false)
            this.blue.setVisible(false)
            this.redGradient1.setVisible(false)
            this.redGradient.setVisible(false)
            this.greenGradient.setVisible(false)
            this.flashygreenGradient.setVisible(false)
            this.pinkGradient.setVisible(false)
            this.yellowGradient.setVisible(false)
            this.blueGradient.setVisible(false)
            this.darkBlueGradient.setVisible(false)
            this.purpleGradient.setVisible(false)
            this.orangeGradient.setVisible(false)
            this.redGradient1.setVisible(false)

        }

    }










    /**
     * Cette fonction s'exécute en boucle (à peu près 60 fois par secondes)
     */
    update() {

        //pour chacune des lettres on va tester si il faut faire des choses ou non
        for (let lettre of this.lettres) {

            //--- interaction sur le clavier ---

            /**
             * La touche qui correspond à la lettre
             * @type {Phaser.GameObjects.Text}
             */
            let touche = this.children.getByName(lettre);
            //si enfoncée le fond de touche est gris
            if (touche.toucheEnfoncee) {
                touche.setBackgroundColor("#888888")
            } else {
                touche.setBackgroundColor("#000000")
            }
            //si actif le texte est vert sinon blanc
            if (touche.actif) {
                touche.setColor("#00FF00")
            } else {
                touche.setColor("#FFFFFF")
            }
        }

    }
}
