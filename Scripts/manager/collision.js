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
        function Collision(player, playScene) {
            this._player = player;
            Collision._counter = 0;
            this._playScn = playScene;
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
                            this._playScn.point -= 10;
                            this._playScn.healthIMG.rotation -= 2;
                            this._playScn.health -= 10;
                            createjs.Sound.play("shocked").volume = 0.5;
                        }
                        obj.isColliding = true;
                    }
                }
                else {
                    obj.isColliding = false;
                    this._player.hitEnemy = false;
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
                            this._playScn.point += 100;
                            this._playScn.healthIMG.rotation += 10;
                            if (this._playScn.health < 100) {
                                this._playScn.health += 10;
                            }
                            if (this._playScn.health > 100) {
                                this._playScn.health = 100;
                            }
                            createjs.Sound.play("heal");
                        }
                        obj.isColliding = true;
                    }
                }
                else {
                    obj.isColliding = false;
                    this._player.hitMoney = false;
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
                        if (Collision._counter < 2) {
                            obj2.speed.x += 0.5;
                            obj2.x += obj2.width * 0.5;
                            obj2.rotation = 60;
                            this._playScn.point += 5;
                            obj2.rotation = 0;
                            obj2.image = assets.getResult("explosion");
                            createjs.Sound.play("ricochet");
                            Collision._counter += 5;
                        }
                        else {
                            obj2.reset(config.Screen.WIDTH + obj2.width);
                            Collision._counter = 0;
                        }
                    }
                }
                else {
                }
            }
        };
        return Collision;
    })();
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map