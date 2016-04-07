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
            super("bullet1");
            this.name = "bullet";
            this._player = player;
            this.speed.x = config.Screen.WIDTH - this._player.x;
            this.y = this._player.y;
            this.x = this._player.x;
            this.reset(this._player.x);

        }

        //reset objects location
        public reset(value: number): void {
            this.y = this._player.y;
            this.x = value;
            this.image = null;
        }

        //check if objects in the right location
        protected _checkBound(value: number): void {
            if (this.x >= value) {
                this.reset(-config.Screen.WIDTH);
            }
        }

        //update objects in the scene
        public update(): void {

            if (this._player.isShooting) {
                this.image = assets.getResult("bullet1");
                this.x = stage.mouseX;
                this.y = stage.mouseY;

                //equation to make corresponding bullet direction
                if (this.x < this._player.x) {
                    this.rotation = Math.atan((this.y - this._player.y) / (this.x - this._player.x)) * 180 / Math.PI + 180;
                }
                else {
                    this.rotation = Math.atan((this.y - this._player.y) / (this.x - this._player.x)) * 180 / Math.PI;
                }
            }
            

            


        }
    }
}