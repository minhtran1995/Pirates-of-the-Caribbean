module objects {
    export class Level3Ocean extends objects.GameObject {

        private ocean3 = new Array<Object>();
        private static counter: number;
        private static switch: boolean;

        constructor() {
            super("night");
            this.speed.x = 2;
            this.reset(0);
            this.regX = 0;
            this.regY = 0;


            for (var i = 0; i < 8; i++) {
                this.ocean3[i] = assets.getResult("level3Ocean" + i);
                //console.log("level3Ocean" + i);
            }

            Level3Ocean.counter = 0;
            Level3Ocean.switch = false;
        }

        //reset objects location
        public reset(value: number): void {
            this.x = value;
        }
        //check if objects in the right location
        protected _checkBound(value: number): void {
            if (this.x <= value) {
                this.reset(0);
            }
        }

        //update objects in the scene
        public update(): void {
            //console.log(this.x+" "+ this.y)            
            this.x -= this.speed.x;
            this._checkBound(-2000);



            if (Level3Ocean.counter > 120) {
                var rand = Math.round(Math.random() * 7);
                this.image = this.ocean3[rand];
                Level3Ocean.switch = true;
            }

            if (!Level3Ocean.switch) {
                Level3Ocean.counter++
            }

        }
    }
}