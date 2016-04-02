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

module objects {
    export class Player extends createjs.Bitmap {

        public width: number;
        public height: number;

        private _topBounds: number;
        private _bottomBounds: number;

        private static flag: boolean;

        public hitHealth: boolean;
        public hitShield: boolean;

        public isShooting: boolean;
        public isDead: boolean;

        constructor() {
            super(assets.getResult("ironman"));
            this.y = stage.mouseY;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;

            this._topBounds = this.height * 0.5;
            this._bottomBounds = config.Screen.HEIGHT - this.height * 0.5;
            this.x = this.regX;

            Player.flag = false;

            this.hitHealth = false;
            this.hitShield = false;
            this.isShooting = false;
            this.isDead = false;
        }


        //check if player is in the allowed range
        private _checkBounds(): void {

            if (this.y < 400) {
                this.y = 400;
            }
            if (this.y > this._bottomBounds) {
                this.y = this._bottomBounds;
            }
        }


        //update game objects in my scene
        public update(): void {


            this.y = stage.mouseY;



            window.onmouseup = function() {
                Player.flag = false;
            }

            if (this.isDead) {
                this.y = this._bottomBounds - this.height;
                this.image = this.shuffleImages("dead");

                window.onmousedown = function() {
                    console.log("Mouse disabled");
                };
            }
            else {

                window.onmousedown = function() {
                    console.log("Shoot");
                    Player.flag = true;
                    createjs.Sound.play("leftClick");
                    createjs.Sound.play("shoot").volume = 0.5;

                };



                if (this.hitHealth) {
                    this.image = this.shuffleImages("health");
                }
                else {
                    if (this.hitShield) {
                        this.image = this.shuffleImages("hit");
                    }
                    else {
                        if (!Player.flag) {
                            this.image = this.shuffleImages("");
                            this.isShooting = false;
                        }
                        else {
                            this.image = this.shuffleImages("shoot");
                            this.isShooting = true;
                        }
                    }
                }
            }
            this._checkBounds();

        }




        //change player images - Animation
        public shuffleImages(val: string): Object {
            var obj = new Array<Object>();

            obj[0] = assets.getResult("ironman1");
            obj[1] = assets.getResult("ironman2");
            obj[2] = assets.getResult("ironman3");

            obj[3] = assets.getResult("ironmanShoot");

            //healed animation
            obj[4] = assets.getResult("healed");
            obj[5] = assets.getResult("healed1");
            obj[6] = assets.getResult("healed2");
            obj[7] = assets.getResult("healed3");


            //hit animation
            obj[8] = assets.getResult("ironmanHit");
            obj[9] = assets.getResult("ironmanHit1");
            obj[10] = assets.getResult("ironmanHit2");
            obj[11] = assets.getResult("ironmanHit3");

            //die
            obj[12] = assets.getResult("dead");



            var rand: number = Math.round(Math.random() * 2);

            if (val === "") {
                return obj[rand];
            }
            else if (val === "shoot") {
                return obj[3];
            }
            else if (val === "health") {
                rand = Math.round(Math.random() * 3) + 4;
                return obj[rand];
            }
            else if (val === "hit") {
                rand = Math.round(Math.random() * 3) + 8;
                return obj[rand];
            }
            else if (val === "dead") {
                return obj[12];
            }
        }

    }
}