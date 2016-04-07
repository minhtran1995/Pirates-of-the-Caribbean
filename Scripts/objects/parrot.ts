module objects {
    export class Parrot extends objects.GameObject {

        private counter = 0;
        private static delay = 0;
        private parrotArray = new Array<Object>();

        constructor() {
            super("parrot");
            this.speed.x = 2;
            this.reset(this._rightBound);
            this.name = "parrot";
            this.counter = 0;

            this.parrotArray[0] = assets.getResult("parrot");
            this.parrotArray[1] = assets.getResult("parrot1");
            this.parrotArray[2] = assets.getResult("parrot2");
            this.parrotArray[3] = assets.getResult("parrot3");
            this.parrotArray[4] = assets.getResult("parrot4");
            this.parrotArray[5] = assets.getResult("parrot5");
            this.parrotArray[6] = assets.getResult("parrot6");
            this.parrotArray[7] = assets.getResult("parrot7");

            this.x = config.Screen.CENTER_X;
            this.y = config.Screen.CENTER_Y;

            this._leftBound = this.width * 0.5;
            this._rightBound = config.Screen.WIDTH - this.width * 0.5
            this._topBound = this.height * 0.5;
            this._bottomBound = config.Screen.HEIGHT - this.height * 0.5;
        }

        //reset health location
        public reset(value: number): void {


            this.x = value;
            this.y = Math.round((Math.random() * config.Screen.HEIGHT));

            this.speed.x = Math.random() * 3;
            this.speed.y = Math.random() * 3;
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


            if (Parrot.delay % 180 === 0) {
                if (this.scaleX === 1) {
                    //this will flip the image horizontally
                    this.scaleX = -1;

                } else {
                    this.scaleX = 1;
                }

                Parrot.delay = 0;
            }

            if (this.x > this._rightBound || this.x < this._leftBound || this.y > this._bottomBound || this.y < this._topBound) {
                if (this.x > this._rightBound) {
                    this.speed.x = Math.random() * -2;
                    this.speed.y = Math.random() * -2 + 1;
                }
                if (this.x < this._leftBound) {
                    this.speed.x = Math.random() * 2;
                    this.speed.y = Math.random() * -2 + 1;
                }
                if (this.y < this._topBound) {
                    this.speed.x = Math.random() * -2 + 1;
                    this.speed.y = Math.random() * 2;

                }
                if (this.y > this._bottomBound) {
                    this.speed.x = Math.random() * -2 + 1;
                    this.speed.y = Math.random() * -2;
                }

                this.x += this.speed.x;
                this.y += this.speed.y;

            } else {
                this.x += this.speed.x;
                this.y += this.speed.y;

            }



            if (Parrot.delay % 10 === 0) {
                this.image = this.shuffleImages();

            }
            Parrot.delay++;

        }

        private shuffleImages(): Object {
            if (this.counter >= 7) {
                this.counter = 0;
            } else {
                this.counter++;
            }

            return this.parrotArray[this.counter];
        }


    }
}