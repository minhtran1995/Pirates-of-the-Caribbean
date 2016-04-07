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
            this.x = config.Screen.CENTER_X;

            if (Parrot.delay % 180 === 0) {
                if (this.scaleX === 1) {
                    //this will flip the image horizontally
                    this.scaleX = -1;
                } else {
                    this.scaleX = 1;
                }
                Parrot.delay = 0;

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