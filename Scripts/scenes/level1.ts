

// PLAY SCENE
module scenes {
    export class Level1 extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _level1Ocean: objects.Level1Ocean;
        private _money: objects.Money[];
        private _enemy: objects.Enemy[];
        private _enemyCount: number;
        private _moneyCount: number;

        //game objects
        private _bullet: objects.Bullet;
        private _player: objects.Player;
        private _cannon: objects.Cannon;
        private _collision: managers.Collision;
        private _parrot: objects.Parrot;

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
        private _skipButton: objects.Button;
        private _suicideButton: objects.Button;


        //static counter
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
            Level1._counter = 0;
            Level1._labelDisplayCounter = 0;

            //adding scrolling background
            this._level1Ocean = new objects.Level1Ocean();
            this.addChild(this._level1Ocean);

            this._setupBackground('blank');

            //health count
            this._money = new Array<objects.Money>();
            this._moneyCount = 1;
            for (var h = 0; h < this._moneyCount; h++) {
                this._money[h] = new objects.Money("goldChest");
                this.addChild(this._money[h]);
            }

            //player object
            this._player = new objects.Player();
            this._bullet = new objects.Bullet(this._player, "bullet1");
            this.addChild(this._bullet);
            this.addChild(this._player);

            this._cannon = new objects.Cannon(this._player, "cannon");
            this.addChild(this._cannon);

            //adding captain shields
            this._enemyCount = 2;//number of shields
            this._enemy = new Array<objects.Enemy>();


            for (var e = 0; e < this._enemyCount; e++) {
                this._enemy[e] = new objects.Enemy();
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
            this._levelLabel = new objects.Label("Level One", "Bold 45px Merienda One",
                "#ff1a1a",
                config.Screen.CENTER_X, 20, true);
            this.addChild(this._levelLabel);



            //parrot
            this._parrot = new objects.Parrot();
            this.addChild(this._parrot);

            //reload button 
            this._reloadButton = new objects.Button("reload",
                50, 130, true);
            this.addChild(this._reloadButton);
            this._reloadButton.on("click", this._reloadButtonClick, this);

            //skip button
            this._skipButton = new objects.Button("SkipButton",
                config.Screen.WIDTH - 130, 100, true);
            this.addChild(this._skipButton);
            this._skipButton.on("click", this._skipButtonClick, this);


            //suicide button
            this._suicideButton = new objects.Button("suicideButton",
                config.Screen.WIDTH - 130, 220, true);
            this.addChild(this._suicideButton);
            this._suicideButton.on("click", this._suicideButtonClick, this);


            //reload label
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
            //update scrolling background  heref
            this._level1Ocean.update();

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

            //update enemy locations and check collision
            for (var i = 0; i < this._enemyCount; i++) {
                this._enemy[i].update();

                if (i > 0) {
                    this._collision.objectHorizontalCollision(this._enemy[i], this._enemy[i - 1]);
                } else {
                    this._collision.objectHorizontalCollision(this._enemy[this._enemyCount - 1], this._enemy[0]);
                }
                this._collision.checkEnemyCollision(this._enemy[i]);
                this._collision.bulletCollision(this._bullet, this._enemy[i]);
            };

            //update health locations and check collision
            this._money.forEach(h => {
                h.update();
                this._collision.checkMoneyCollision(h);
            });



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


                if (Level1._counter === 500) {
                    this._fadeOut(500, () => {
                        // Switch to the lose Scene
                        scene = config.Scene.END;
                        changeScene();
                    });

                    Level1._counter = 0;
                }
                Level1._counter++;

            }

            //desired score to win
            if (scoreValue >= 300) {

                window.onmousedown = function() {
                    console.log("Mouse disabled");
                };

                if (Level1._counter === 300) {
                    this._fadeOut(500, () => {
                        // Switch to the lvl 2 Scene                
                        scene = config.Scene.INSTRUCTION2;
                        changeScene();
                    });
                    Level1._counter = 0;
                }

                //disabled all enemies and money
                for (var i = 0; i < this._enemyCount; i++) {
                    this._enemy[i].reset(config.Screen.WIDTH + this._enemy[i].width)
                }
                for (var i = 0; i < this._moneyCount; i++) {
                    this._money[i].reset(config.Screen.WIDTH + this._money[i].width)
                }
                this._parrot.reset(config.Screen.WIDTH + this._parrot.width);

                //blink label
                if (Level1._labelDisplayCounter < 30) {
                    this._messageLabel.text = "Level Completed";
                    this._messageLabel.visible = false;
                } else if (Level1._labelDisplayCounter >= 30 && Level1._labelDisplayCounter < 60) {
                    this._messageLabel.visible = true;
                }
                else {
                    Level1._labelDisplayCounter = 0;
                }

                Level1._counter++;
                Level1._labelDisplayCounter++;
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

        // relaod Button click event handler
        private _reloadButtonClick(event: createjs.MouseEvent) {
            createjs.Sound.play("reloadSound");
            this._reloadButton.visible = false;
            this._reloadButton.mouseEnabled = false;
            this._reloadLabel.visible = false;
            objects.Cannon.isloaded = true;
            objects.Player.bulletCounter = 8;
        }

        private _skipButtonClick(event: createjs.MouseEvent) {
            //disable sound effect
            window.onmousedown = function() {
                console.log("Mouse disabled");
            };
            scoreValue = 300;


            this._fadeOut(500, () => {
                // Switch to the lvl 2 Scene                
                scene = config.Scene.INSTRUCTION2;
                changeScene();
            });
            Level1._counter = 0;
        }

        private _suicideButtonClick(event: createjs.MouseEvent) {
            //disable sound effect
            window.onmousedown = function() {
                console.log("Mouse disabled");
            };

            livesValue = 0;
            Level1._counter = 0;
        }

    }
}