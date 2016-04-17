module objects {
    export class Boss extends objects.GameObject {

        private counter = 0;
        private static delay = 0;

        public static health: number;

        private _rotationSpeed: number;

        constructor() {
            super("boss");
            this.speed.x = 2;
            this.name = "boss";
            this.counter = 0;


            this._rotationSpeed = 0;
            this._leftBound = this.width * 0.5;
            this._rightBound = config.Screen.WIDTH - this.width * 0.5
            this._topBound = this.height * 0.5;
            this._bottomBound = config.Screen.HEIGHT - this.height * 0.5;

            this.x = Math.round(Math.random() * config.Screen.WIDTH);
            this.y = 4.1 * config.Screen.HEIGHT;

            Boss.health = 1000;
        }

        //reset health location
        public reset(): void {
            this.image = assets.getResult("boss");
            this.x = Math.round(Math.random() * config.Screen.WIDTH);
            this.speed.x = 0.3;

            if (this.x > config.Screen.CENTER_X) {
                this.scaleX = 1;

                this.speed.y = 10;
                this._rotationSpeed = 5;
                this.rotation = 0;
            } else {
                this.scaleX = -1;

                this.speed.y = 10;
                this._rotationSpeed = -5;
                this.rotation = 0;
            }

        }


        //update my objects in the scene
        public update(): void {


            if (this.scaleX === 1) {

                if (this.y < config.Screen.HEIGHT + 50) {
                    this.speed.x = 5;
                }

                this.x -= this.speed.x;
                this.y -= this.speed.y;
                this.rotation += this._rotationSpeed;

                if (this.y < this._topBound + 100) {
                    this.rotation = 30;
                    this.speed.y = -7;
                    this._rotationSpeed = -1.5;
                }



                if (this.y > 4 * config.Screen.HEIGHT) {
                    this.speed.y = 10;
                    this._rotationSpeed = 2;
                    this.rotation = 0;

                    //make the boss jump in to a new location
                    this.reset();
                }

                if (this.rotation > 60) {
                    this.rotation = 60;
                }

                if (this.rotation < -60) {
                    this.rotation = -60;
                }
            }


            if (this.scaleX === -1) {

                if (this.y < config.Screen.HEIGHT + 50) {
                    this.speed.x = 5;
                }

                this.x += this.speed.x;
                this.y -= this.speed.y;

                this.rotation += this._rotationSpeed;

                if (this.y < this._topBound + 100) {
                    this.rotation = -30
                    this.speed.y = -7;
                    this._rotationSpeed = 1.5;
                }


                if (this.y > 4 * config.Screen.HEIGHT) {
                    this.speed.y = 10;
                    this._rotationSpeed = -2;
                    this.rotation = 0;

                    //make the boss jump in to a new location
                    this.reset();
                }

                if (this.rotation > 90) {
                    this.rotation = 90;
                }

                if (this.rotation < -60) {
                    this.rotation = -60;
                }
            }

            //sconsole.log(this.x + " " + this.y);

        }




    }
}