module objects {
    export class Tracker extends createjs.Bitmap {

        private counter = 0;
        private static delay = 0;

        private _boss: objects.Boss;

        private width: number;
        private height: number;

        private _leftBound: number;
        private _rightBound: number;
        private _topBound: number;
        private _bottomBound: number;

        constructor(boss: objects.Boss) {
            super(assets.getResult("tracker"));
            this.name = "tracker";
            this.counter = 0;

            this._boss = boss;

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;

            this._leftBound = this.width * 0.5;
            this._rightBound = config.Screen.WIDTH - this.width * 0.5;
            this._topBound = this.height * 0.5;
            this._bottomBound = config.Screen.HEIGHT - this.height * 0.5;

            this.x = this._boss.x;
            this.y = this._boss.y - (this.height * 2);

        }

        //update my objects in the scene
        public update(): void {

            this.x = this._boss.x;
            this.y = this._boss.y - (this.height * 2);

            if (this._boss.x >= this._rightBound) {
                this.x = this._rightBound;
            }

            if (this._boss.x < this._leftBound) {
                this.x = this._leftBound;
            }

            if (this._boss.y < this._topBound) {
                this.y = this._topBound;
            }

            if (this._boss.y > this._bottomBound) {
                this.y = this._bottomBound;
            }



        }


    }
}