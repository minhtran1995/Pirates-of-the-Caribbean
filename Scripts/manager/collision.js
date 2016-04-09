/*
 ***************************************************************************************
 * Source file name : collision.ts                                                     *
 * Author's name : Duc Minh Tran (300771859)                                           *
 * Last Modified by : Duc Minh Tran (300771859)                                        *
 * Last Modified date : March 27 2016                                                  *
 * Program description : This is a webgame that use  a Side Scroller background        *
 *                                                                                     *
 * Revision History : 1 - Update Internal Documentation                                *
 *                                                                                     *
 ***************************************************************************************
*/
var managers;
(function (managers) {
    //Collision class
    var Collision = (function () {
        function Collision(player) {
            this._player = player;
            Collision._counter = 0;
            Collision._healthHit = 0;
        }
        Collision.prototype.distance = function (startPoint, endPoint) {
            return Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2));
        };
        //check collision between player and objects
        Collision.prototype.checkEnemyCollision = function (obj) {
            var startPoint = new createjs.Point();
            var endPoint = new createjs.Point();
            var playerHalfWidth = this._player.width * 0.5;
            var objHalfWidth = obj.width * 0.5;
            var minDistance = playerHalfWidth + objHalfWidth;
            startPoint.x = this._player.x;
            startPoint.y = this._player.y;
            endPoint.x = obj.x;
            endPoint.y = obj.y;
            if (!this._player.isDead) {
                if (this.distance(startPoint, endPoint) < minDistance) {
                    if (!obj.isColliding) {
                        // check if it's a enemy hit
                        if (obj.name === "enemy") {
                            this._player.hitEnemy = true;
                            scoreValue -= 10;
                            livesValue -= 8;
                            createjs.Sound.play("broken").volume = 1;
                        }
                        else {
                            this._player.hitEnemy = true;
                        }
                        obj.isColliding = true;
                    }
                }
                else {
                    obj.isColliding = false;
                    if (this._player.hitEnemy) {
                        if (Collision._counter % 80 === 0) {
                            this._player.hitEnemy = false;
                            Collision._counter = 0;
                        }
                        else {
                            this._player.hitEnemy = true;
                        }
                        Collision._counter++;
                    }
                }
            }
        };
        Collision.prototype.checkHealthCollision = function (obj) {
            var startPoint = new createjs.Point();
            var endPoint = new createjs.Point();
            var playerHalfWidth = this._player.width * 0.5;
            var objHalfWidth = obj.width * 0.5;
            var minDistance = playerHalfWidth + objHalfWidth;
            startPoint.x = this._player.x;
            startPoint.y = this._player.y;
            endPoint.x = obj.x;
            endPoint.y = obj.y;
            if (!this._player.isDead) {
                if (this.distance(startPoint, endPoint) < minDistance) {
                    if (!obj.isColliding) {
                        // check if it's an health hit
                        if (obj.name === "goldChest") {
                            this._player.hitMoney = true;
                            scoreValue += 100;
                            createjs.Sound.play("money");
                            createjs.Sound.play("haha");
                            //place it far far away so it will float black
                            obj.reset((config.Screen.WIDTH + obj.width) * 2);
                        }
                        obj.isColliding = true;
                    }
                }
                else {
                    obj.isColliding = false;
                    if (this._player.hitMoney) {
                        if (Collision._healthHit % 80 === 0) {
                            this._player.hitMoney = false;
                            Collision._healthHit = 0;
                        }
                        else {
                            this._player.hitMoney = true;
                        }
                        Collision._healthHit++;
                    }
                }
            }
        };
        //check collision between bullet and objects
        Collision.prototype.bulletCollision = function (obj1, obj2) {
            var startPoint = new createjs.Point();
            var endPoint = new createjs.Point();
            var obj1HalfWidth = obj1.width * 0.5;
            var obj2HalfWidth = obj2.width * 0.5;
            var minDistance = obj1HalfWidth + obj2HalfWidth;
            startPoint.x = obj1.x;
            startPoint.y = obj1.y;
            endPoint.x = obj2.x;
            endPoint.y = obj2.y;
            if (!this._player.isDead) {
                if (this.distance(startPoint, endPoint) < minDistance) {
                    if (obj2.name === "enemy") {
                        if (Collision._counter < 3) {
                            obj2.speed.x += 0.5;
                            obj2.x += obj2.width * 0.25;
                            obj2.rotation = 0;
                            scoreValue += 5;
                            obj2.image = assets.getResult("explosion");
                            createjs.Sound.play("ricochet");
                            //set this lower to make enemies stronger
                            Collision._counter += 5;
                        }
                        else {
                            obj2.reset(config.Screen.WIDTH + obj2.width);
                            Collision._counter = 0;
                        }
                    }
                    else if (obj2.name === "enemyLevel2") {
                        if (Collision._counter < 6) {
                            obj2.speed.x += 0.5;
                            obj2.x += obj2.width * 0.25;
                            obj2.rotation = 0;
                            scoreValue += 5;
                            obj2.image = assets.getResult("explosion");
                            createjs.Sound.play("ricochet");
                            //set this lower to make enemies stronger
                            Collision._counter += 2;
                        }
                        else {
                            obj2.reset(config.Screen.WIDTH + obj2.width);
                            Collision._counter = 0;
                        }
                    }
                    else if (obj2.name === "parrot") {
                        if (Collision._counter < 1) {
                            createjs.Sound.play("parrotSound", 0, 0, 0, 2, 2);
                            createjs.Sound.play("haha2");
                            //health added
                            if (livesValue < 100) {
                                if (livesValue > 90) {
                                    livesValue += 100 - livesValue;
                                }
                                else {
                                    livesValue += 10;
                                }
                            }
                            Collision._counter++;
                            obj2.reset(config.Screen.WIDTH + obj2.width);
                        }
                        Collision._counter = 0;
                    }
                    else {
                    }
                }
            }
        };
        return Collision;
    })();
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map