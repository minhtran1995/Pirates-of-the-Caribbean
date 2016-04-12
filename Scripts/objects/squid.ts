module objects {
    export class Squid extends objects.GameObject {

        private counter = 0;
        private static delay = 0;
        private squidArray = new Array<Object>();
        private XLocation = new Array<number>();

        private static previousVal: number;

        private doneTheStuff: boolean;

        private static lane1: boolean;
        private static lane2: boolean;
        private static lane3: boolean;
        private static lane4: boolean;

        constructor() {
            super("squid1");
            this.speed.y = 6;
            this.name = "squid";
            this.counter = 0;

            this.squidArray[0] = assets.getResult("squid1");
            this.squidArray[1] = assets.getResult("squid2");
            this.squidArray[2] = assets.getResult("squid3");

            this.XLocation[0] = 600;
            this.XLocation[1] = 700;
            this.XLocation[2] = 800;
            this.XLocation[3] = 900;

            Squid.previousVal = -1;

            this._leftBound = this.width * 0.5;
            this._rightBound = config.Screen.WIDTH - this.width * 0.5
            this._topBound = this.height * 0.5;
            this._bottomBound = config.Screen.HEIGHT - this.height * 0.5;
        }

        //reset health location
        public reset(value: number): void {
            this.y = value;

            this.x = this.XLocation[Math.round(Math.random() * 3)];
            this.name = "squid";

            this.speed.x = 0;
            this.speed.y = Math.random() * 7 + 3;
            this.image = assets.getResult("squid1");
        }


        //update my objects in the scene
        public update(): void {
            //update squid location right away
            if (!this.doneTheStuff) {
                this.reset(this._bottomBound * 2.5);
                this.doneTheStuff = true;
            }

            this.rotation = 90;

            if (this.y <= this._topBound + 100) {
                this.speed.y = -3;
                this.y = this.y - this.speed.y;
                this.image = assets.getResult("squid2");
            }
            else {
                this.y = this.y - this.speed.y;
            }

            //maximum squid depth
            if (this.y > this._bottomBound * 3 || this.x >= this._rightBound + this.width) {
                this.reset(this._bottomBound * 2.5);
            }

            this.x += this.speed.x;

        }




    }
}