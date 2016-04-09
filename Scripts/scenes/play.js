/*
 ***************************************************************************************
 * Source file name : play.ts                                                          *
 * Author's name : Duc Minh Tran (300771859)                                           *
 * Last Modified by : Duc Minh Tran (300771859)                                        *
 * Last Modified date : March 29 2016                                                  *
 * Program description : This is a webgame that use  a Side Scroller background        *
 *                                                                                     *
 * Revision History : 1 - Update Internal Documentation                                *
 *                    2 - Change Winning Score                                         *
 *                    3 - Adding Comments                                              *
 *                                                                                     *
 ***************************************************************************************
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// PLAY SCENE
var scenes;
(function (scenes) {
    var Play = (function (_super) {
        __extends(Play, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function Play() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        Play.prototype.start = function () {
            //init static variable
            Play._counter = 0;
            Play._counter1 = 0;
            //adding scrolling background
            this._city = new objects.City();
            this.addChild(this._city);
            this._setupBackground('blank');
            //health count
            this._health = new Array();
            this._healthCount = 1;
            for (var h = 0; h < this._healthCount; h++) {
                this._health[h] = new objects.Health();
                this.addChild(this._health[h]);
            }
            //player object
            this._player = new objects.Player();
            this._bullet = new objects.Bullet(this._player, "bullet1");
            this.addChild(this._bullet);
            this.addChild(this._player);
            this._cannon = new objects.Cannon(this._player, "cannon");
            this.addChild(this._cannon);
            //adding captain shields
            this._captainShieldCount = 2; //number of shields
            this._captainShields = new Array();
            for (var shield = 0; shield < this._captainShieldCount; shield++) {
                this._captainShields[shield] = new objects.CaptainShield();
                this.addChild(this._captainShields[shield]);
            }
            //init collision manager
            this._collision = new managers.Collision(this._player);
            //score label
            scoreValue = 0;
            this._score = new objects.Label("Score: ", "30px Merienda One", "#adffff", 10, 0, false);
            this.addChild(this._score);
            //health label
            livesValue = 100;
            this._healthLabel = new objects.Label("%", "35px Merienda One", "#adffff", config.Screen.WIDTH - 230, 0, false);
            this.addChild(this._healthLabel);
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
        Play.prototype.update = function () {
            var _this = this;
            //update scrolling background  heref
            this._city.update();
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
            this._captainShields.forEach(function (shield) {
                shield.update();
                _this._collision.checkEnemyCollision(shield);
                _this._collision.bulletCollision(_this._bullet, shield);
            });
            //update health locations and check collision
            this._health.forEach(function (h) {
                h.update();
                _this._collision.checkHealthCollision(h);
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
                if (Play._counter === 500) {
                    this._fadeOut(500, function () {
                        // Switch to the lose Scene
                        scene = config.Scene.END;
                        changeScene();
                    });
                    Play._counter = 0;
                }
                Play._counter++;
            }
            //desired score to win
            if (scoreValue > 100) {
                window.onmousedown = function () {
                    console.log("Mouse disabled");
                };
                if (Play._counter === 300) {
                    this._fadeOut(500, function () {
                        // Switch to the lvl 2 Scene                
                        scene = config.Scene.INSTRUCTION2;
                        changeScene();
                    });
                    Play._counter = 0;
                }
                //disabled all enemies and money
                for (var i = 0; i < this._captainShieldCount; i++) {
                    this._captainShields[i].reset(config.Screen.WIDTH + this._captainShields[i].width);
                }
                for (var i = 0; i < this._healthCount; i++) {
                    this._health[i].reset(config.Screen.WIDTH + this._health[i].width);
                }
                //blink label
                if (Play._counter1 < 30) {
                    this._messageLabel.text = "Level Completed";
                    this._messageLabel.visible = false;
                }
                else if (Play._counter1 >= 30 && Play._counter1 < 60) {
                    this._messageLabel.visible = true;
                }
                else {
                    Play._counter1 = 0;
                }
                Play._counter++;
                Play._counter1++;
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
        Play.prototype._reloadButtonClick = function (event) {
            createjs.Sound.play("reloadSound");
            this._reloadButton.visible = false;
            this._reloadButton.mouseEnabled = false;
            this._reloadLabel.visible = false;
            objects.Cannon.isloaded = true;
            objects.Player.bulletCounter = 8;
        };
        return Play;
    })(objects.Scene);
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map