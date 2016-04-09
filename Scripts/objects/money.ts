/*
 ***************************************************************************************
 * Source file name : health.ts                                                        *
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
    export class Money extends objects.GameObject {

        constructor(val:string) {
            super(val);
            this.speed.x = 2;
            this.reset(this._rightBound);
            this.name = "goldChest";
        }

        //reset health location
        public reset(value: number): void {
            var a = (440 - this.height * 0.5);
            var b = config.Screen.HEIGHT - a - this.height * 0.5;

            this.x = value;
            this.y = Math.round((Math.random() * b + a));
        }

        //check if health item is in right location
        protected _checkBound(value: number): void {
            //check if the top of island is top of scene
            if (this.x <= value) {
                this.reset(this._rightBound);
            }
        }

        //update my objects in the scene
        public update(): void {
            this.x -= this.speed.x;
            this._checkBound((-config.Screen.WIDTH) * 2);

        }


    }
}