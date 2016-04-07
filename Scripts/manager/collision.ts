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

module managers {
    //Collision class
    export class Collision {
        private _player: objects.Player;
        private _playScn: scenes.Play;

        private static _counter: number;




        constructor(player: objects.Player, playScene: scenes.Play) {
            this._player = player;
            Collision._counter = 0;

            this._playScn = playScene;

        }

        public distance(startPoint: createjs.Point, endPoint: createjs.Point): number {
            return Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2));
        }



        //check collision between player and objects
        public checkEnemyCollision(obj: objects.CaptainShield): void {
            var startPoint: createjs.Point = new createjs.Point();
            var endPoint: createjs.Point = new createjs.Point();

            var playerHalfWidth: number = this._player.width * 0.5;
            var objHalfWidth: number = obj.width * 0.5;

            var minDistance: number = playerHalfWidth + objHalfWidth;

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
                            this._playScn.health -= 8;
                            createjs.Sound.play("shocked").volume = 0.5;
                        }
                        else {
                            this._player.hitEnemy = true;
                        }

                        obj.isColliding = true;
                    }
                } else {
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
        }

        public checkHealthCollision(obj: objects.Health): void {
            var startPoint: createjs.Point = new createjs.Point();
            var endPoint: createjs.Point = new createjs.Point();

            var playerHalfWidth: number = this._player.width * 0.5;
            var objHalfWidth: number = obj.width * 0.5;

            var minDistance: number = playerHalfWidth + objHalfWidth;

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
                } else {
                    obj.isColliding = false;
                    this._player.hitMoney = false;
                }

            }
        }


        //check collision between bullet and objects
        public bulletCollision(obj1: objects.Bullet, obj2: objects.GameObject) {
            var startPoint: createjs.Point = new createjs.Point();
            var endPoint: createjs.Point = new createjs.Point();

            var obj1HalfWidth: number = obj1.width * 0.5;
            var obj2HalfWidth: number = obj2.width * 0.5;

            var minDistance: number = obj1HalfWidth + obj2HalfWidth;

            startPoint.x = obj1.x;
            startPoint.y = obj1.y;

            endPoint.x = obj2.x;
            endPoint.y = obj2.y;

            if (!this._player.isDead) {
                if (this.distance(startPoint, endPoint) < minDistance) {

                    if (obj2.name === "enemy") {
                        if (Collision._counter < 2) {
                            obj2.speed.x += 0.5;
                            obj2.x += obj2.width * 0.25;
                            obj2.rotation = 0;
                            this._playScn.point += 5;
                            
                            obj2.image = assets.getResult("explosion");
                            createjs.Sound.play("ricochet");
                            Collision._counter += 5;
                        }
                        else {
                            obj2.reset(config.Screen.WIDTH + obj2.width);
                            Collision._counter = 0;
                        }
                    }

                } else {

                }
            }


        }
    }
}
