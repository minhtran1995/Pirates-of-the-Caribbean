/*
 ***************************************************************************************
 * Source file name : gameObject.ts                                                    *
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
    export class GameObject extends createjs.Bitmap {
        public speed: createjs.Point;
        public width: number;
        public height: number;

        protected _leftBound: number;
        protected _rightBound: number;
        protected _bottomBound: number;
        protected _topBound: number;




        public name: string;
        constructor(bitmapString: String) {
            super(assets.getResult(bitmapString));

            this.speed = new createjs.Point(0, 0);
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;

            this._topBound = this.height;
            this._bottomBound = config.Screen.HEIGHT - this.height;
            this._leftBound = -this.width;
            this._rightBound = config.Screen.WIDTH + this.width;
        }

        //reset ojbect location
        protected reset(value: number): void {
            this.x = value;
        }

        //check if objects are in right location
        protected _checkBound(value: number): void {
            var resetVal = 0;
            if (this.x >= value) {
                this.reset(resetVal);
            }
        }

        //update objects on scene
        public update(): void {
            var boundVal = 0;

            this.x -= this.speed.y;
            this._checkBound(boundVal);
        }


        //set images of current objects
        public setImage(name: string): void {
            this.image = assets.getResult(name);
        }
    }
}