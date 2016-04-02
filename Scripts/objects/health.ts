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
    export class Health extends objects.GameObject {

        constructor() {
            super("arcReactorFixed");
            this.speed.x = 2;
            this.reset(this._rightBound);
            this.name = "health";
        }

        //reset health location
        protected reset(value: number): void {
            this.x = value;
            this.y = Math.floor(Math.random() * this._bottomBound + this._topBound);
            this.image = assets.getResult("arcReactorFixed");
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
            //console.log((-config.Screen.WIDTH)*2)       
        }


    }
}