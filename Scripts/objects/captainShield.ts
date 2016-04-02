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
            super("captainShield");
            this.reset(this._rightBound);
            this.name = "captainShield";
        }

        //reset objects location
        protected reset(value: number): void {
            this.speed.x = Math.round((Math.random() * 5) + 3);
            this.speed.y = Math.round((Math.random() * 6) - 3);

            this.x = value;
            this.y = Math.round((Math.random() * this._bottomBound) + this._topBound);

        }
        //check if objects in the right location
        protected _checkBound(value: number): void {

            if (this.x <= value) {
                this.reset(this._rightBound);
            }
        }

        //update objects in the scene
        public update(): void {
            this.y -= this.speed.y;
            this.x -= this.speed.x;

            this.rotation -= Math.round((Math.random() * 3) + 7);
            this._checkBound(this._leftBound);
        }
    }
}