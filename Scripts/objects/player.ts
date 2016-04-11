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

        private _deadSoundPlayed: boolean;



        public hitMoney: boolean;
        public hitEnemy: boolean;
        public hitGunTreasure: boolean;

        public isShooting: boolean;
        public isDead: boolean;

        //Static Variables++++++
        private static flag: boolean;

        private static up: boolean;
        private static down: boolean;
        private static left: boolean;
        private static right: boolean;
        public static counter: number;
        public static bulletCounter: number;
        public static moneyCounter: number;
        public static deadCounter: number;
        public static delay: number = 1;
        private static didTheStuff: boolean;

        constructor() {
            super(assets.getResult("player"));

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
            Player.deadCounter = 13

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
                    if (!Player.didTheStuff) {
                        createjs.Sound.play("reloadSound");
                        Player.didTheStuff = true;
                    }

                    Cannon.isloaded = true;
                    objects.Player.bulletCounter = 8;
                } else {
                    Player.didTheStuff = false;
                }


            }

            //player can control this only when they are alive
            if (!this.isDead) {
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
            }

            //make sure bullet dont appear when player is idle
            window.onmouseup = function() {
                Player.flag = false;
                Player.counter = 0;
            }


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
                };



                window.onmousedown = function() {
                    console.log("Mouse disabled");
                };
            }
            else {
                Player.delay = 0;
                window.onmousedown = function() {
                    if (Cannon.isloaded) {
                        console.log("Shoot");
                        Player.flag = true;
                        createjs.Sound.play("leftClick");

                        if (Player.bulletCounter < 2) {
                            Cannon.isloaded = false;
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
                    window.onmousedown = function() {
                        console.log("Mouse disabled");
                    };
                }

                if (this.hitMoney) {
                    this.image = this.shuffleImages("money");
                    window.onmousedown = function() {
                        console.log("Mouse disabled");
                    };
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

            //hitEnemy animation
            obj[8] = assets.getResult("hitEnemy");
            obj[9] = assets.getResult("hitEnemy1");
            obj[10] = assets.getResult("hitEnemy2");
            obj[11] = assets.getResult("hitEnemy3");
            obj[12] = assets.getResult("hitEnemy4");

            //die
            obj[13] = assets.getResult("sinking");
            obj[14] = assets.getResult("sinking1");
            obj[15] = assets.getResult("sinking2");
            obj[16] = assets.getResult("sinking3");
            obj[17] = assets.getResult("sinking4");
            obj[18] = assets.getResult("sinking5");
            obj[19] = assets.getResult("sinking6");
            obj[20] = assets.getResult("sinking7");
            obj[21] = assets.getResult("sinking8");
            obj[22] = assets.getResult("sinking9");
            obj[23] = assets.getResult("sinking10");
            obj[24] = assets.getResult("sinking11");
            obj[25] = assets.getResult("sinking12");




            var number;

            if (val === "") {
                number = 0;
                return obj[number];
            }
            else if (val === "shoot") {
                return obj[1];
            }
            else if (val === "money") {
                if (Player.moneyCounter > 7) {
                    Player.moneyCounter = 2;
                } else {
                    Player.moneyCounter++;
                }
                return obj[Player.moneyCounter];
            }
            else if (val === "hit") {
                number = Math.round(Math.random() * 4) + 8;
                return obj[number];
            }
            else if (val === "dead") {
                if (Player.deadCounter > 25) {
                    Player.deadCounter = 13;
                } else {
                    Player.deadCounter++;
                }
                return obj[Player.deadCounter];
            }
        }

    }
}