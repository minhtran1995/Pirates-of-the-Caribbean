/*
 ***************************************************************************************
 * Source file name : captainShield.ts                                                 *
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
    export class CaptainShield extends objects.GameObject {

        constructor() {
            super("enemy");
            this.name = "enemy";
            this.reset(this._rightBound);
        }

        //reset objects location
        public reset(value: number): void {
            this.image = assets.getResult("enemy");
            this.rotation = 0;
            this.speed.x = Math.round((Math.random() * 4) + 1);

            var a = (440 - this.height * 0.5);
            var b = config.Screen.HEIGHT - a - this.height * 0.5;

            this.x = value;
            this.y = Math.round((Math.random() * b + a));

        }
        //check if objects in the right location
        protected _checkBound(value: number): void {

            if (this.x <= value) {
                this.reset(this._rightBound);
            }
        }

        //update objects in the scene
        public update(): void {

            this.x -= this.speed.x;

            this._checkBound(this._leftBound);
        }
    }
}