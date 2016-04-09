

module objects {
    export class Level1Ocean extends objects.GameObject {

        constructor() {
            super("night");
            this.speed.x = 2;
            this.reset(0);
            this.regX = 0;
            this.regY = 0;
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
        }
    }
}