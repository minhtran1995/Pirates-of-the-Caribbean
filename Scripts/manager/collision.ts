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
        private static _healCounter: number;
        private static _shockCounter: number;



        constructor(player: objects.Player, playScene: scenes.Play) {
            this._player = player;
            Collision._counter = 0;
            Collision._healCounter = 0;
            Collision._shockCounter = 0;
            this._playScn = playScene;

        }

        public distance(startPoint: createjs.Point, endPoint: createjs.Point): number {
            return Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2));
        }

        //check collision between player and objects
        public check(obj: objects.GameObject): void {
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
                    // check if it's an health hit
                    if (obj.name === "health") {
                        this._player.hitHealth = true;
                        obj.setImage("blank");
                        this._playScn.point += 1;
                        this._playScn.healthIMG.rotation += 4;
                        if (this._playScn.health < 100) {
                            this._playScn.health += 0.5;
                        }
                        if (this._playScn.health > 100) {
                            this._playScn.health = 100;
                        }



                        if (Collision._healCounter % 60 === 0) {
                            createjs.Sound.play("heal");
                            Collision._healCounter = 0;
                        }

                        //console.log(Collision._healCounter);
                        Collision._healCounter++;



                    }
                    // check if it's a captainShield hit
                    else if (obj.name === "captainShield") {
                        this._player.hitShield = true;
                        this._playScn.point -= 2;
                        this._playScn.healthIMG.rotation -= 2;
                        this._playScn.health -= 0.1;


                        if (Collision._shockCounter % 60 === 0) {
                            createjs.Sound.play("shocked").volume = 0.5;
                            Collision._shockCounter = 0;
                        }

                        Collision._shockCounter++;
                    }
                }
                else {
                    //set this line after a while 
                    //this is a drity fix
                    if (Collision._counter % 120 === 0) {
                        this._player.hitShield = false;
                        Collision._counter = 0;
                    }
                    this._player.hitHealth = false;

                }
            }


            Collision._counter++;
        }

        //check collision between bullet and objects
        public bulletCollision(obj1: objects.Bullet, obj2: objects.CaptainShield) {
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
                    //console.log("hit");
                    obj2.speed.y = Math.round((Math.random() * 30) - 15);
                    obj2.speed.x += 2;
                    this._playScn.point += 10;
                    createjs.Sound.play("ricochet");
                }
                else {

                }
            }


        }
    }
}