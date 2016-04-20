var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Level3 = (function (_super) {
        __extends(Level3, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function Level3() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        Level3.prototype.start = function () {
            createjs.Sound.stop();
            createjs.Sound.play("level3BGM", 0, 0, 0, -1, 0.7);
            createjs.Sound.play("level3Rain", 0, 0, 0, -1);
            //init static variable
            Level3._counter = 0;
            Level3._labelDisplayCounter = 0;
            //adding scrolling background 
            this.Level3Ocean = new objects.Level3Ocean();
            this.addChild(this.Level3Ocean);
            this._setupBackground('blank');
            //money count
            this._money = new Array();
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
            //mount cannon
            this._cannon = new objects.Cannon(this._player, "cannon");
            this.addChild(this._cannon);
            //boss
            this._boss = new objects.Boss();
            this.addChild(this._boss);
            //boss tracker
            this._tracker = new objects.Tracker(this._boss);
            this.addChild(this._tracker);
            //tracker label
            this._trackerLabel = new objects.Label("m", "30px Merienda One", "#adffff", this._tracker.x, this._tracker.y - this._tracker.getBounds().height, true);
            this.addChild(this._trackerLabel);
            //boss health label
            this._bossHealthLabel = new objects.Label("Boss Health: " + objects.Boss.health, "Bold 35px Merienda One", "#ff9900", config.Screen.CENTER_X, 70, true);
            this.addChild(this._bossHealthLabel);
            //init collision manager
            this._collision = new managers.Collision(this._player);
            //score label
            this._score = new objects.Label("Score: ", "30px Merienda One", "#adffff", 10, 0, false);
            this.addChild(this._score);
            //health label            
            this._healthLabel = new objects.Label("%", "35px Merienda One", "#adffff", config.Screen.WIDTH - 230, 0, false);
            this.addChild(this._healthLabel);
            //level label
            this._levelLabel = new objects.Label("Level Three", "Bold 45px Merienda One", "#ff1a1a", config.Screen.CENTER_X, 20, true);
            this.addChild(this._levelLabel);
            //parrot
            this._parrot = new objects.Parrot();
            this.addChild(this._parrot);
            //reload button 
            this._reloadButton = new objects.Button("reload", 50, 130, true);
            this.addChild(this._reloadButton);
            this._reloadButton.on("click", this._reloadButtonClick, this);
            //skip button
            this._skipButton = new objects.Button("SkipButton", config.Screen.WIDTH - 100, 100, true);
            this.addChild(this._skipButton);
            this._skipButton.on("click", this._skipButtonClick, this);
            //suicide button
            this._suicideButton = new objects.Button("suicideButton", config.Screen.WIDTH - 100, 200, true);
            this.addChild(this._suicideButton);
            this._suicideButton.on("click", this._suicideButtonClick, this);
            //reload label
            this._reloadLabel = new objects.Label("Bullet: ", "Bold 25px Merienda One", "#FF0000", 50, 60, true);
            this.addChild(this._reloadLabel);
            //dead message
            this._messageLabel = new objects.Label("You are Dead !", "Bold 50px Merienda One", "#ff1a1a", config.Screen.CENTER_X, config.Screen.CENTER_Y, true);
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
        };
        // PLAY Scene updates here
        Level3.prototype.update = function () {
            var _this = this;
            //update scrolling background here 
            this.Level3Ocean.update();
            //check collision here
            if (this._player.isShooting) {
                this._bullet.update();
            }
            else {
                this._bullet.reset(-config.Screen.WIDTH);
            }
            //update player location
            this._player.update();
            //update cannon angel
            this._cannon.update();
            //update parrot
            this._parrot.update();
            this._collision.bulletCollision(this._bullet, this._parrot);
            //update money locations and check collision
            this._money.forEach(function (h) {
                h.update();
                _this._collision.checkMoneyCollision(h);
            });
            //check collision with boss
            this._collision.checkBossCollision(this._boss);
            //check collision of bullet with boss
            this._collision.bulletCollision(this._bullet, this._boss);
            //update boss movement
            this._boss.update();
            //update tracker location
            this._tracker.update();
            //update tracker label
            this._trackerLabel.x = this._tracker.x - 50;
            this._trackerLabel.y = this._tracker.y - this._tracker.getBounds().height;
            this._trackerLabel.text = "" + (this._boss.y - config.Screen.HEIGHT) + " m";
            //update boss health
            this._bossHealthLabel.text = "Boss Health: " + Math.round(objects.Boss.health);
            //
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
                if (Level3._counter === 240) {
                    this._fadeOut(500, function () {
                        // Switch to the lose Scene
                        scene = config.Scene.END;
                        changeScene();
                    });
                    Level3._counter = 0;
                }
                Level3._counter++;
            }
            //desired condition to win
            if (objects.Boss.health <= 0) {
                window.onmousedown = function () {
                    console.log("Mouse disabled");
                };
                this.removeChild(this._tracker);
                this.removeChild(this._trackerLabel);
                for (var i = 0; i < this._moneyCount; i++) {
                    this._money[i].reset(config.Screen.WIDTH + this._money[i].width);
                }
                if (Level3._counter === 240) {
                    this._fadeOut(500, function () {
                        // Switch to the lvl 3 Scene                
                        scene = config.Scene.WIN;
                        changeScene();
                    });
                    Level3._counter = 0;
                }
                this._parrot.reset(config.Screen.WIDTH + this._parrot.width);
                //blink label
                if (Level3._labelDisplayCounter < 30) {
                    this._messageLabel.text = "Level Completed";
                    this._messageLabel.visible = false;
                }
                else if (Level3._labelDisplayCounter >= 30 && Level3._labelDisplayCounter < 60) {
                    this._messageLabel.visible = true;
                }
                else {
                    Level3._labelDisplayCounter = 0;
                }
                Level3._counter++;
                Level3._labelDisplayCounter++;
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
        };
        //EVENT HANDLERS ++++++++++++++++++++
        // reload Button click event handler
        Level3.prototype._reloadButtonClick = function (event) {
            createjs.Sound.play("reloadSound");
            this._reloadButton.visible = false;
            this._reloadButton.mouseEnabled = false;
            this._reloadLabel.visible = false;
            objects.Cannon.isloaded = true;
            objects.Player.bulletCounter = 8;
        };
        Level3.prototype._skipButtonClick = function (event) {
            //disable sound effect
            window.onmousedown = function () {
                console.log("Mouse disabled");
            };
            objects.Boss.health = 0;
            objects.Boss.isDead = true;
            /*
                        this._fadeOut(500, () => {
                            // Switch to the lvl 2 Scene
                            scene = config.Scene.INSTRUCTION3;
                            changeScene();
                        });
                        */
            Level3._counter = 0;
        };
        Level3.prototype._suicideButtonClick = function (event) {
            //disable sound effect
            window.onmousedown = function () {
                console.log("Mouse disabled");
            };
            livesValue = 0;
            Level3._counter = 0;
        };
        return Level3;
    })(objects.Scene);
    scenes.Level3 = Level3;
})(scenes || (scenes = {}));
//# sourceMappingURL=level3.js.map