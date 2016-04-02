/*
 ***************************************************************************************
 * Source file name : bullet.ts                                                        *
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
    export class Bullet extends objects.GameObject {

        private _player: Player;
        private doneTheStuff: boolean;
        constructor(player: Player) {
            super("bullet");
            this.name = "bullet";
            this._player = player;
            this.speed.x = 180;
            this.y = this._player.y;
            this.reset(this._leftBound + 500);

        }

        //reset objects location
        public reset(value: number): void {
            this.y = this._player.y;
            this.x = value;

        }

        //check if objects in the right location
        protected _checkBound(value: number): void {
            var resetVal = this._leftBound + 500;
            if (this.x >= value) {
                this.reset(resetVal);
            }
        }

        //update objects in the scene
        public update(): void {
            if (!this.doneTheStuff) {
                this.doneTheStuff = true;
                this.y = this._player.y;
            }


            var boundVal = this._rightBound;
            this.x += this.speed.x;
            this._checkBound(boundVal);


        }
    }
}