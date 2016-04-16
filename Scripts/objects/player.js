/*
 ***************************************************************************************
 * Source file name : player.ts                                                        *
 * Author's name : Duc Minh Tran (300771859)                                           *
 * Last Modified by : Duc Minh Tran (300771859)                                        *
 * Last Modified date : March 27 2016                                                  *
 * Program description : This is a webgame that use  a Side Scroller background        *
 *                                                                                     *
 * Revision History : 1 - Update Internal Documentation                                *
 *                                                                                     *
 ***************************************************************************************
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player() {
            _super.call(this, assets.getResult("player"));
            this.y = 200;
            this.x = 0;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            this._topBounds = 350;
            this._bottomBounds = config.Screen.HEIGHT - this.height * 0.5;
            this._leftBounds = this.width * 0.5;
            this._rightBounds = config.Screen.WIDTH - this.width * 0.5;
            this.x = this.regX;
            Player.flag = false;
            Player.up = false;
            Player.down = false;
            Player.left = false;
            Player.right = false;
            Player.counter = 0;
            Player.moneyCounter = 2;
            Player.deadCounter = 19;
            Player.moneyAnimationDelay = 1;
            this.hitMoney = false;
            this.hitEnemy = false;
            this.hitGunTreasure = false;
            this.isShooting = false;
            this.isDead = false;
            Player.bulletCounter = 8;
            Player.didTheStuff = false;
            this._deadSoundPlayed = false;
        }
        //check if player is in the allowed range
        Player.prototype._checkBounds = function () {
            if (this.y < this._topBounds) {
                this.y = this._topBounds;
            }
            if (this.y > this._bottomBounds) {
                this.y = this._bottomBounds;
            }
            if (this.x < this._leftBounds) {
                this.x = this._leftBounds;
            }
            if (this.x > this._rightBounds) {
                this.x = this._rightBounds;
            }
        };
        //update game objects in my scene
        Player.prototype.update = function () {
            //control
            document.onkeyup = function (e) {
                if (e.which == 87) {
                    Player.up = false;
                }
                if (e.which == 83) {
                    Player.down = false;
                }
                if (e.which == 65) {
                    Player.left = false;
                }
                if (e.which == 68) {
                    Player.right = false;
                }
            };
            document.onkeydown = function (e) {
                if (e.which == 87) {
                    Player.up = true;
                }
                if (e.which == 83) {
                    Player.down = true;
                }
                if (e.which == 65) {
                    Player.left = true;
                }
                if (e.which == 68) {
                    Player.right = true;
                }
                if (e.which == 32) {
                    if (!Player.didTheStuff) {
                        createjs.Sound.play("reloadSound");
                        Player.didTheStuff = true;
                    }
                    objects.Cannon.isloaded = true;
                    objects.Player.bulletCounter = 8;
                }
                else {
                    Player.didTheStuff = false;
                }
            };
            //player can control this only when they are alive
            if (!this.isDead) {
                if (Player.up) {
                    this.y -= 1.5;
                }
                if (Player.down) {
                    this.y += 1.5;
                }
                if (Player.left) {
                    this.x -= 3;
                }
                if (Player.right) {
                    this.x += 3;
                }
            }
            //make sure bullet dont appear when player is idle
            window.onmouseup = function () {
                Player.flag = false;
                Player.counter = 0;
            };
            if (this.isDead) {
                this.y = this._bottomBounds - this.height * 0.5;
                if (Player.delay <= 120) {
                    if (Player.delay % 10 === 0) {
                        this.image = this.shuffleImages("dead");
                    }
                    Player.delay++;
                }
                if (!this._deadSoundPlayed) {
                    createjs.Sound.play("abandon_ship", 0, 0, 0, 2);
                    createjs.Sound.play("sink");
                    this._deadSoundPlayed = true;
                }
                ;
                window.onmousedown = function () {
                    console.log("Mouse disabled");
                };
            }
            else {
                Player.delay = 1;
                window.onmousedown = function () {
                    if (objects.Cannon.isloaded) {
                        console.log("Shoot");
                        Player.flag = true;
                        createjs.Sound.play("leftClick");
                        if (Player.bulletCounter < 2) {
                            objects.Cannon.isloaded = false;
                        }
                        Player.bulletCounter--;
                    }
                    else {
                        createjs.Sound.play("outOfBullets");
                        console.log("Reload");
                    }
                };
                if (this.hitEnemy) {
                    this.image = this.shuffleImages("hit");
                    //I Want to play only 1 animation at a time
                    //reset everything that associate with money animation    
                    this.hitMoney = false;
                    Player.moneyCounter = 2;
                    Player.moneyAnimationDelay = 1;
                    managers.Collision._moneyHit = 1;
                }
                if (this.hitMoney) {
                    if (Player.moneyAnimationDelay <= 120) {
                        if (Player.moneyAnimationDelay % 10 === 0) {
                            if (Player.moneyAnimationDelay === 120) {
                                this.image = this.shuffleImages("money");
                                Player.moneyAnimationDelay = 0;
                                Player.moneyCounter = 2;
                            }
                            else {
                                this.image = this.shuffleImages("money");
                            }
                        }
                        Player.moneyAnimationDelay++;
                    }
                }
                //////// DO NOT TOUCH THIS
                if (Player.flag) {
                    if (Player.counter <= 2) {
                        this.isShooting = true;
                        objects.Cannon.shootCannon = true;
                    }
                    else {
                        this.isShooting = false;
                    }
                    Player.counter++;
                }
                else {
                    this.isShooting = false;
                    objects.Cannon.shootCannon = false;
                }
            }
            this._checkBounds();
        };
        //change player images - Animation
        Player.prototype.shuffleImages = function (val) {
            var obj = new Array();
            //normal player
            obj[0] = assets.getResult("player");
            //player shoot
            obj[1] = assets.getResult("cannonShoot");
            //money animation
            obj[2] = assets.getResult("money1");
            obj[3] = assets.getResult("money2");
            obj[4] = assets.getResult("money3");
            obj[5] = assets.getResult("money4");
            obj[6] = assets.getResult("money5");
            obj[7] = assets.getResult("money6");
            obj[8] = assets.getResult("money7");
            obj[9] = assets.getResult("money8");
            obj[10] = assets.getResult("money9");
            obj[11] = assets.getResult("money10");
            obj[12] = assets.getResult("money11");
            obj[13] = assets.getResult("money12");
            //hitEnemy animation
            obj[14] = assets.getResult("hitEnemy");
            obj[15] = assets.getResult("hitEnemy1");
            obj[16] = assets.getResult("hitEnemy2");
            obj[17] = assets.getResult("hitEnemy3");
            obj[18] = assets.getResult("hitEnemy4");
            //die
            obj[19] = assets.getResult("sinking");
            obj[20] = assets.getResult("sinking1");
            obj[21] = assets.getResult("sinking2");
            obj[22] = assets.getResult("sinking3");
            obj[23] = assets.getResult("sinking4");
            obj[24] = assets.getResult("sinking5");
            obj[25] = assets.getResult("sinking6");
            obj[26] = assets.getResult("sinking7");
            obj[27] = assets.getResult("sinking8");
            obj[28] = assets.getResult("sinking9");
            obj[29] = assets.getResult("sinking10");
            obj[30] = assets.getResult("sinking11");
            obj[31] = assets.getResult("sinking12");
            var number;
            if (val === "") {
                number = 0;
                return obj[number];
            }
            else if (val === "shoot") {
                return obj[1];
            }
            else if (val === "money") {
                if (Player.moneyCounter > 13) {
                    Player.moneyCounter = 2;
                }
                else {
                    Player.moneyCounter++;
                }
                return obj[Player.moneyCounter];
            }
            else if (val === "hit") {
                number = Math.round(Math.random() * 4) + 14;
                return obj[number];
            }
            else if (val === "dead") {
                if (Player.deadCounter > 31) {
                    Player.deadCounter = 19;
                }
                else {
                    Player.deadCounter++;
                }
                return obj[Player.deadCounter];
            }
        };
        Player.delay = 1;
        return Player;
    })(createjs.Bitmap);
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map