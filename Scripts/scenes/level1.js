var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// PLAY SCENE
var scenes;
(function (scenes) {
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function Level1() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        Level1.prototype.start = function () {
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
            this._cannon = new objects.Cannon(this._player, "cannon");
            this.addChild(this._cannon);
            //adding captain shields
            this._enemyCount = 2; //number of shields
            this._enemy = new Array();
            for (var e = 0; e < this._enemyCount; e++) {
                this._enemy[e] = new objects.Enemy();
                this.addChild(this._enemy[e]);
            }
            //init collision manager
            this._collision = new managers.Collision(this._player);
            //score label
            this._score = new objects.Label("Score: ", "30px Merienda One", "#adffff", 10, 0, false);
            this.addChild(this._score);
            //health label
            this._healthLabel = new objects.Label("%", "35px Merienda One", "#adffff", config.Screen.WIDTH - 230, 0, false);
            this.addChild(this._healthLabel);
            //level label
            this._levelLabel = new objects.Label("Level One", "Bold 45px Merienda One", "#ff1a1a", config.Screen.CENTER_X, 20, true);
            this.addChild(this._levelLabel);
            //parrot
            this._parrot = new objects.Parrot();
            this.addChild(this._parrot);
            //reload button 
            this._reloadButton = new objects.Button("reload", 50, 130, true);
            this.addChild(this._reloadButton);
            this._reloadButton.on("click", this._reloadButtonClick, this);
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
        Level1.prototype.update = function () {
            var _this = this;
            //update scrolling background  heref
            this._level1Ocean.update();
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
            //update shields locations and check collision
            this._enemy.forEach(function (shield) {
                shield.update();
                _this._collision.checkEnemyCollision(shield);
                _this._collision.bulletCollision(_this._bullet, shield);
            });
            //update health locations and check collision
            this._money.forEach(function (h) {
                h.update();
                _this._collision.checkMoneyCollision(h);
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
                    this._fadeOut(500, function () {
                        // Switch to the lose Scene
                        scene = config.Scene.END;
                        changeScene();
                    });
                    Level1._counter = 0;
                }
                Level1._counter++;
            }
            //desired score to win
            if (scoreValue > 10) {
                window.onmousedown = function () {
                    console.log("Mouse disabled");
                };
                if (Level1._counter === 300) {
                    this._fadeOut(500, function () {
                        // Switch to the lvl 2 Scene                
                        scene = config.Scene.INSTRUCTION2;
                        changeScene();
                    });
                    Level1._counter = 0;
                }
                //disabled all enemies and money
                for (var i = 0; i < this._enemyCount; i++) {
                    this._enemy[i].reset(config.Screen.WIDTH + this._enemy[i].width);
                }
                for (var i = 0; i < this._moneyCount; i++) {
                    this._money[i].reset(config.Screen.WIDTH + this._money[i].width);
                }
                this._parrot.reset(config.Screen.WIDTH + this._parrot.width);
                //blink label
                if (Level1._labelDisplayCounter < 30) {
                    this._messageLabel.text = "Level Completed";
                    this._messageLabel.visible = false;
                }
                else if (Level1._labelDisplayCounter >= 30 && Level1._labelDisplayCounter < 60) {
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
        };
        //EVENT HANDLERS ++++++++++++++++++++
        // LEFT_CAVE Button click event handler
        Level1.prototype._reloadButtonClick = function (event) {
            createjs.Sound.play("reloadSound");
            this._reloadButton.visible = false;
            this._reloadButton.mouseEnabled = false;
            this._reloadLabel.visible = false;
            objects.Cannon.isloaded = true;
            objects.Player.bulletCounter = 8;
        };
        return Level1;
    })(objects.Scene);
    scenes.Level1 = Level1;
})(scenes || (scenes = {}));
//# sourceMappingURL=level1.js.map