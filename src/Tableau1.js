class Tableau1 extends Phaser.Scene{


    preload(){
        this.load.image('square','assets/hollowKnightAsset.png');
        this.load.image('raquette','assets/hollowKnightraquette.png');
        this.load.image('circle','assets/cercle.png');
        this.load.image('white','assets/otherAnim/white1.png');
        this.load.audio('music', ['assets/hollowKnightMusic.mp3']);


        for(let i=1;i<=3;i++){
            this.load.image('bee'+i, 'assets/beeAnim/Bee'+i+'.png');
        }

        for(let e=1;e<=2;e++){
            this.load.image('balle'+e, 'assets/balleTete/balle'+e+'.png');
        }

    }

    create(){


        this.hauteur = 500
        this.largeur = 1000
        this.speedX = 0
        while(this.speedX===0){
            this.speedX = 500*Phaser.Math.Between(-1,1)
        }
        this.speedY = Phaser.Math.Between(-500, 500)
        this.maxspeed = 500
        //------------------ANIM BEE------------------

        this.abeille = this.physics.add.sprite(680,85, 'bee1')
        this.abeille1 = this.physics.add.sprite(280,410, 'bee1')
        this.anims.create({
            key: 'fly',
            frames: [
                {key:'bee1'},
                {key:'bee2'},
                {key:'bee3'},
            ],
            frameRate: 16,
            repeat: -1,
        });
        this.abeille.play('fly');
        this.abeille1.play('fly');
        this.abeille.setSize(100, 100);
        this.abeille1.setSize(100, 100);


        //------------------ANIM HEAD------------------

        this.balle = this.physics.add.sprite(this.largeur/2, this.hauteur/2, 'balle1')
        this.anims.create({
            key: 'wink',
            frames: [
                {key:'balle1'},
                {key:'balle2'},
            ],
            frameRate: 1,
            repeat: 1,
        });
            this.balle.setDisplaySize(20, 20)
            this.balle.body.setSize(20, 20);
            this.balle.body.setBounce(1, 1);
            this.balle.body.setAllowGravity(false)


        this.haut = this.physics.add.sprite(0, 0, 'square').setOrigin(0, 0)
        this.haut.setDisplaySize(this.largeur, 20)
        this.haut.body.setAllowGravity(false)
        this.haut.setImmovable(true);
        this.haut.flipY=true;
        this.haut.flipX=true;


        this.bas = this.physics.add.sprite(0, 480, 'square').setOrigin(0, 0)
        this.bas.setDisplaySize(this.largeur, 20)
        this.bas.body.setAllowGravity(false)
        this.bas.setImmovable(true);


        this.player1 = this.physics.add.sprite(50, 360, 'raquette').setOrigin(0, 0)
        this.player1.setDisplaySize(20, 100)
        this.player1.body.setAllowGravity(false)


        this.player2 = this.physics.add.sprite(920, 360, 'raquette').setOrigin(0, 0)
        this.player2.setDisplaySize(20, 100)
        this.player2.body.setAllowGravity(false)
        this.player2.flipX=true;

        this.player1.setImmovable(true)
        this.player2.setImmovable(true)
        this.abeille.setImmovable(true)
        this.abeille1.setImmovable(true)

        let me = this;
        this.physics.add.collider(this.player1, this.balle,function(){
            console.log('touche player 1')
            me.rebond(me.player1)
        })
        this.physics.add.collider(this.player2, this.balle,function(){
            console.log('touche player 2')
            me.rebond(me.player2)
        })
        this.physics.add.collider(this.abeille, this.balle,function(){
            me.rebond(me.abeille)
        })
        this.physics.add.collider(this.abeille1, this.balle,function(){
            me.rebond(me.abeille1)
        })

        this.physics.add.collider(this.balle, this.bas)
        this.physics.add.collider(this.balle, this.haut)

        this.balle.setMaxVelocity(this.maxspeed,this.maxspeed)

        this.physics.add.collider(this.haut, this.player1)
        this.physics.add.collider(this.bas, this.player1)

        this.physics.add.collider(this.haut, this.player2)
        this.physics.add.collider(this.bas, this.player2)

        this.physics.add.collider(this.balle, this.abeille)
        this.physics.add.collider(this.balle, this.abeille1)


        this.player1Speed = 0
        this.player2Speed = 0

        if(this.balle<0)
        {
            this.scoreplayer2 +=1;
            this.textplayer1.setText('Player 1 = ' + this.scoreplayer1);

        }

        if(this.balle>this.largeur)
        {
            this.scoreplayer1  +=1;
            this.textplayer2.setText('Player 2 = ' + this.scoreplayer2);
        }


        this.joueurGauche = new Joueur('Hollow Knight','joueurGauche')
        this.joueurDroite = new Joueur('Silk Song','joueurDroite')
        window.toto=this.joueurGauche;
        console.log(this.joueurGauche)

        let particles2 = this.add.particles('white');
        let particle=particles2.createEmitter({
            alpha: { start: 0.1, end: 0 },
            scale: { start: 0.4, end: 0.1},
            //tint: { start: 0xff945e, end: 0xff945e },
            blendMode: 'ADD',
            frequency: 2,
            x: me.balle.x,
            y: this.balle.y
        });
        particle.startFollow(this.balle)




            this.balleAucentre();
        this.initKeyboard()

        this.tweens.add({
            targets:[this.balle],
            rotation: 6,
            ease :'Repeat',
            repeat:-1,
            duration:1000,
        })

        //--------------Tweens des abeilles---------------

        this.tweens.add({
            targets: this.abeille,
            y: 400,
            duration: 1300,
            ease: 'Power2',
            loop: -1,
            yoyo: true,
        });
        this.tweens.add({
            targets: this.abeille1,
            y: 85,
            duration: 1300,
            ease: 'Power2',
            loop: -1,
            yoyo: true,
        });

        this.musicBg=this.sound.add('music')

        this.musicBg.play()
        this.musicBg.volume=0.3


    }

    rebond(players){
        let me = this ;
        console.log(this.player1.y);
        console.log(me.balle.y);
        let hauteurPlayers = players.displayHeight;

        let positionRelativePlayers = (this.balle.y - players.y);

        positionRelativePlayers= (positionRelativePlayers / hauteurPlayers)
        positionRelativePlayers = positionRelativePlayers*2-1;

        this.balle.setVelocityY(this.balle.body.velocity.y + positionRelativePlayers * 50);
        this.balle.play('wink');

    }

    balleAucentre(){
        this.balle.x = this.largeur/2
        this.balle.y = this.hauteur/2
        this.speedX = 0

        this.balle.setVelocityX(Math.random()>0.5?-300:300)
        this.balle.setVelocityY(0)

        this.player1.y=this.hauteur/2-50
        this.player2.y=this.hauteur/2-50
    }

    /**
     *
     * @param {Joueur} joueur
     */
    win(joueur){
        //alert('Joueur '+joueur.name+' gagne')
        joueur.score ++;
        //alert('Le score est de '+this.joueurGauche.score+' a '+this.joueurDroite.score)
        this.balleAucentre();
    }

    update(){
        if(this.balle.x>this.largeur){
            this.win(this.joueurGauche);
        }
        if(this.balle.x<0){
            this.win(this.joueurDroite);
        }

        this.player1.y += this.player1Speed
        this.player2.y += this.player2Speed
    }

    initKeyboard(){
        let me = this
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.player1Speed = -5
                    break;
                case Phaser.Input.Keyboard.KeyCodes.X:
                    me.player1Speed = 5
                    break;
                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.player2Speed = -5
                    break;
                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.player2Speed = 5
                    break;
            }
        });
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.player1Speed = 0
                    break;
                case Phaser.Input.Keyboard.KeyCodes.X:
                    me.player1Speed = 0
                    break;
                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.player2Speed = 0
                    break;
                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.player2Speed = 0
                    break;
            }
        });
    }
}




