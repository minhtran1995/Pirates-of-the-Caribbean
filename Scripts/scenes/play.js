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
            this._bullet = new objects.Bullet(this._player);
            this.addChild(this._bullet);
            this.addChild(this._player);
            //adding captain shields
            this._captainShieldCount = 1; //number of shields
            this._captainShields = new Array();
            for (var shield = 0; shield < this._captainShieldCount; shield++) {
                this._captainShields[shield] = new objects.CaptainShield();
                this.addChild(this._captainShields[shield]);
            }
            //init collision manager
            this._collision = new managers.Collision(this._player, this);
            //score label
            this.point = 0;
            this._score = new objects.Label("Score: ", "30px Merienda One", "#adffff", 10, 0, false);
            this.addChild(this._score);
            //health label
            this.health = 100;
            this._healthLabel = new objects.Label("%", "35px Merienda One", "#adffff", config.Screen.WIDTH - 230, 0, false);
            this.addChild(this._healthLabel);
            //dead message
            this._deadLabel = new objects.Label("You are Dead !", "Bold 50px Merienda One", "#ff1a1a", config.Screen.CENTER_X, config.Screen.CENTER_Y, true);
            this._deadLabel.visible = false;
            this.addChild(this._deadLabel);
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
                this._bullet.reset(config.Screen.WIDTH + (this._bullet.width) * 5);
            }
            //update player location
            this._player.update();
            //update shields locations and check collision
            this._captainShields.forEach(function (shield) {
                shield.update();
                _this._collision.check(shield);
                _this._collision.bulletCollision(_this._bullet, shield);
            });
            //update health locations and check collision
            this._health.forEach(function (h) {
                h.update();
                _this._collision.check(h);
            });
            //update lables here
            this._score.text = "Score: " + this.point.toFixed(2);
            if (!this._player.isDead) {
                this.point = this.point + 0.01;
            }
            this._healthLabel.text = this.health.toFixed(2) + " %";
            if (this.point < 0) {
                this.point = 0;
            }
            //when player is dead, change to lose scene
            if (this.health <= 0) {
                this.health = 0;
                this._player.isDead = true;
                this._bullet.reset(-this._bullet.width);
                this._deadLabel.visible = true;
                if (Play._counter === 240) {
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
            if (this.point > 5000) {
                window.onmousedown = function () {
                    console.log("Mouse disabled");
                };
                if (Play._counter === 180) {
                    this._fadeOut(500, function () {
                        // Switch to the win Scene                
                        scene = config.Scene.WIN;
                        changeScene();
                    });
                    Play._counter = 0;
                }
                Play._counter++;
            }
        };
        return Play;
    })(objects.Scene);
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map