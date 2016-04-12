module scenes {
    export class Level2 extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private level2Ocean: objects.Level2Ocean;
        private _money: objects.Money[];
        private _enemy: objects.Enemy[];
        private _enemyCount: number;
        private _moneyCount: number;
        private _squidCount: number;
        private _gunTreasure: objects.Money;

        //game objects
        private _bullet: objects.Bullet;
        private _player: objects.Player;
        private _cannon: objects.Cannon;
        private _collision: managers.Collision;
        private _parrot: objects.Parrot;
        private _squid: objects.Squid[];

        //score and health
        private _score: objects.Label;



        public healthIMG: createjs.Bitmap;

        //game labels
        private _healthLabel: objects.Label;
        private _messageLabel: objects.Label;
        private _reloadLabel: objects.Label;
        private _levelLabel: objects.Label;


        //Game buttons
        private _reloadButton: objects.Button;

        private static _counter;
        private static _labelDisplayCounter;

        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();

        }

        // PUBLIC METHODS +++++++++++++++++++++

        // Start Method
        public start(): void {
            createjs.Sound.stop();
            createjs.Sound.play("bgm", 0, 0, 0, -1);

            //init static variable
            Level2._counter = 0;
            Level2._labelDisplayCounter = 0;

            //adding scrolling background 
            this.level2Ocean = new objects.Level2Ocean();
            this.addChild(this.level2Ocean);

            this._setupBackground('blank');

            //money count
            this._money = new Array<objects.Money>();
            this._moneyCount = 1;
            for (var h = 0; h < this._moneyCount; h++) {
                this._money[h] = new objects.Money("goldChest");
                this.addChild(this._money[h]);
            }

            //gun treasure
            this._gunTreasure = new objects.Money("biggerCannon");
            this._gunTreasure.name = "gunTreasure";
            this.addChild(this._gunTreasure);

            //player object
            this._player = new objects.Player();
            this._bullet = new objects.Bullet(this._player, "bullet1");
            this.addChild(this._bullet);
            this.addChild(this._player);

            this._cannon = new objects.Cannon(this._player, "cannon");
            this.addChild(this._cannon);

            //adding captain enemies
            this._enemyCount = 3;//number of enemies
            this._enemy = new Array<objects.Enemy>();


            for (var e = 0; e < this._enemyCount; e++) {
                this._enemy[e] = new objects.Enemy();
                this._enemy[e].name = "enemyLevel2";

                this.addChild(this._enemy[e]);
            }

            //init collision manager
            this._collision = new managers.Collision(this._player);

            //score label
            this._score = new objects.Label("Score: ", "30px Merienda One",
                "#adffff",
                10, 0, false);
            this.addChild(this._score);

            //health label            
            this._healthLabel = new objects.Label("%", "35px Merienda One",
                "#adffff",
                config.Screen.WIDTH - 230, 0, false);
            this.addChild(this._healthLabel);


            //level label
            this._levelLabel = new objects.Label("Level Two", "Bold 45px Merienda One",
                "#ff1a1a",
                config.Screen.CENTER_X, 20, true);
            this.addChild(this._levelLabel);

            //parrot
            this._parrot = new objects.Parrot();
            this.addChild(this._parrot);

            //squid
            this._squid = new Array<objects.Squid>();
            this._squidCount = 3;
            for (var i = 0; i < this._squidCount; i++) {
                this._squid[i] = new objects.Squid();
                this.addChild(this._squid[i]);
            }



            //reload button 
            this._reloadButton = new objects.Button("reload",
                50, 130, true);
            this.addChild(this._reloadButton);
            this._reloadButton.on("click", this._reloadButtonClick, this);



            this._reloadLabel = new objects.Label("Bullet: ", "Bold 25px Merienda One",
                "#FF0000",
                50, 60, true);
            this.addChild(this._reloadLabel);

            //dead message
            this._messageLabel = new objects.Label("You are Dead !", "Bold 50px Merienda One",
                "#ff1a1a",
                config.Screen.CENTER_X, config.Screen.CENTER_Y, true);
            this._messageLabel.visible = false;
            this.addChild(this._messageLabel);

            //adding health symbol
            this.healthIMG = new createjs.Bitmap(assets.getResult("health"));
            this.healthIMG.x = config.Screen.WIDTH - this.healthIMG.getBounds().width * 0.5;
            this.healthIMG.y = this.healthIMG.getBounds().height * 0.5;
            this.healthIMG.regX = this.healthIMG.getBounds().width * 0.5;
            this.healthIMG.regY = this.healthIMG.getBounds().height * 0.5;
            this.addChild(this.healthIMG);

            // add this scene to the global stage container
            stage.addChild(this);
        }

        // PLAY Scene updates here
        public update(): void {
            //update scrolling background here 
            this.level2Ocean.update();

            //check collision here
            if (this._player.isShooting) {
                this._bullet.update();
            } else {
                this._bullet.reset(-config.Screen.WIDTH);
            }

            //update player location
            this._player.update();

            //update cannon angel
            this._cannon.update();

            //update parrot
            this._parrot.update();
            this._collision.bulletCollision(this._bullet, this._parrot);


            //update squid movements
            for (var i = 0; i < this._squidCount; i++) {
                this._squid[i].update();
                if (i > 0) {
                    this._collision.objectVerticalCollision(this._squid[i], this._squid[i - 1]);
                } else {
                    this._collision.objectVerticalCollision(this._squid[this._squidCount - 1], this._squid[0]);
                }
                this._collision.checkEnemyCollision(this._squid[i]);
                this._collision.bulletCollision(this._bullet, this._squid[i]);
            }
            //update shields locations and check collision
            this._enemy.forEach(shield => {
                shield.update();
                this._collision.checkEnemyCollision(shield);
                this._collision.bulletCollision(this._bullet, shield);
            });

            //update health locations and check collision
            this._money.forEach(h => {
                h.update();
                this._collision.checkMoneyCollision(h);
            });

            //check if player pick up the cannon
            this._collision.checkGunTreasureCollision(this._gunTreasure);



            this._score.text = "Score: " + scoreValue.toFixed(2);
            this._healthLabel.text = livesValue.toFixed(2) + " %";

            if (scoreValue < 0) {
                scoreValue = 0;
            }

            //when player is dead, change to lose scene
            if (livesValue <= 0) {
                livesValue = 0;
                this._player.isDead = true;
                this._bullet.reset(-this._bullet.width);
                this._messageLabel.visible = true;


                if (Level2._counter === 240) {
                    this._fadeOut(500, () => {
                        // Switch to the lose Scene
                        scene = config.Scene.END;
                        changeScene();
                    });

                    Level2._counter = 0;
                }

                Level2._counter++;
                //console.log(Play._counter);
            }

            //desired score to win
            if (scoreValue > 1000) {

                this._gunTreasure.update();

                window.onmousedown = function() {
                    console.log("Mouse disabled");
                };

                if (this._player.hitGunTreasure) {
                    if (Level2._counter === 180) {
                        this._fadeOut(500, () => {
                            // Switch to the lvl 3 Scene                
                            scene = config.Scene.MENU;
                            changeScene();
                        });
                        Level2._counter = 0;
                    }
                    Level2._counter++;
                }


                //disabled all enemies and money
                for (var i = 0; i < this._enemyCount; i++) {
                    this._enemy[i].reset(config.Screen.WIDTH + this._enemy[i].width)
                }
                for (var i = 0; i < this._moneyCount; i++) {
                    this._money[i].reset(config.Screen.WIDTH + this._money[i].width)
                }
                for (var i = 0; i < this._squidCount; i++) {
                    this._squid[i].reset(config.Screen.WIDTH + this._squid[i].width)
                }


                this._parrot.reset(config.Screen.WIDTH + this._parrot.width);

                //blink label
                if (Level2._labelDisplayCounter < 30) {
                    this._messageLabel.text = "Level Completed";
                    this._messageLabel.visible = false;
                } else if (Level2._labelDisplayCounter >= 30 && Level2._labelDisplayCounter < 60) {
                    this._messageLabel.visible = true;
                }
                else {
                    Level2._labelDisplayCounter = 0;
                }



                Level2._labelDisplayCounter++;
            }


            if (!objects.Cannon.isloaded) {
                this._reloadLabel.text = "Reload Pls";
                this._reloadButton.visible = true;
                this._reloadButton.mouseEnabled = true;

            }
            else {
                this._reloadLabel.text = "Bullet :" + objects.Player.bulletCounter;
                this._reloadButton.visible = false;
                this._reloadButton.mouseEnabled = false;

            }
            this._reloadLabel.visible = true;

        }


        //EVENT HANDLERS ++++++++++++++++++++

        // LEFT_CAVE Button click event handler
        private _reloadButtonClick(event: createjs.MouseEvent) {
            createjs.Sound.play("reloadSound");
            this._reloadButton.visible = false;
            this._reloadButton.mouseEnabled = false;
            this._reloadLabel.visible = false;
            objects.Cannon.isloaded = true;
            objects.Player.bulletCounter = 8;
        }

    }
}