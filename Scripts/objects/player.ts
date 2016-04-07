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
        private _leftBounds: number;
        private _rightBounds: number;




        public hitMoney: boolean;
        public hitEnemy: boolean;

        public isShooting: boolean;
        public isDead: boolean;

        //Static Variables++++++
        private static flag: boolean;

        private static up: boolean;
        private static down: boolean;
        private static left: boolean;
        private static right: boolean;
        public static counter: number;



        constructor() {
            super(assets.getResult("ironman"));

            this.y = 200;
            this.x = 0;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;

            this._topBounds = 400;
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

            this.hitMoney = false;
            this.hitEnemy = false;
            this.isShooting = false;
            this.isDead = false;
        }


        //check if player is in the allowed range
        private _checkBounds(): void {

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
        }


        //update game objects in my scene
        public update(): void {

            //control
            document.onkeyup = function(e) {
                if (e.which == 87) { Player.up = false; }
                if (e.which == 83) { Player.down = false; }
                if (e.which == 65) { Player.left = false; }
                if (e.which == 68) { Player.right = false; }
            }


            document.onkeydown = function(e) {
                if (e.which == 87) { Player.up = true; }
                if (e.which == 83) { Player.down = true; }
                if (e.which == 65) { Player.left = true; }
                if (e.which == 68) { Player.right = true; }
                if (e.which == 32) {
                    createjs.Sound.play("reloadSound");
                    Cannon.isloaded = true;
                }
            }

            if (Player.up) {
                this.y--;
            }

            if (Player.down) {
                this.y++;
            }

            if (Player.left) {
                this.x--;
            }

            if (Player.right) {
                this.x++;
            }



            //this.y = stage.mouseY;
            //this.x = stage.mouseX;

            window.onmouseup = function() {
                Player.flag = false;
                Player.counter = 0;
                
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
                    if (Cannon.isloaded) {
                        console.log("Shoot");
                        Player.flag = true;
                        createjs.Sound.play("leftClick");
                        Cannon.isloaded = false;
                    }
                    else {
                        console.log("Reload");
                    }

                };


                if (this.hitEnemy) {
                    this.image = this.shuffleImages("hit");
                }

                if (this.hitMoney) {
                    this.image = this.shuffleImages("health");
                }

                if (!this.hitMoney && !this.hitEnemy) {
                    this.playerAnimation();
                }

            }
            this._checkBounds();
        }

        public playerAnimation(): void {
            if (!Player.flag) {
                this.image = this.shuffleImages("");

            }
            else {
                if (Player.counter <= 2) {
                    this.image = this.shuffleImages("shoot");
                    this.isShooting = true;
                    Cannon.shootCannon = true;
                }
                else {
                    this.isShooting = false;
                }

                Player.counter++;
            }
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