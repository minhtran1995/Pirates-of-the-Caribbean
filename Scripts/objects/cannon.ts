module objects {
    export class Cannon extends objects.GameObject {

        private _player: Player;


        public static isloaded: boolean;
        public static shootCannon: boolean;


        constructor(player: Player) {
            super("cannon");
            this.name = "cannon";
            this._player = player;
            this.y = this._player.y;
            this.x = this._player.x;
            Cannon.isloaded = true;
            Cannon.shootCannon = false;
        }


        //update objects in the scene
        public update(): void {


            this.y = this._player.y + 75;
            this.x = this._player.x + 30;

            if (Cannon.shootCannon) {
                if (this._player.isShooting) {
                    this.image = Cannon.shuffleImages("shoot");

                }
                else {
                    this.image = Cannon.shuffleImages("");

                }

                //equation to make corresponding bullet direction
                if (stage.mouseX <= this.x) {
                    this.rotation = Math.atan((this.y - stage.mouseY) / (this.x - stage.mouseX)) * 180 / Math.PI + 180;
                }
                else {
                    this.rotation = Math.atan((this.y - stage.mouseY) / (this.x - stage.mouseX)) * 180 / Math.PI;
                }
            }

        }

        public static shuffleImages(val: string): Object {
            var obj = new Array<Object>();
            obj[0] = assets.getResult("cannon");
            obj[1] = assets.getResult("cannon-shoot");
            if (val === "shoot") {
                return obj[1];
            }
            else {
                return obj[0];
            }


        }
    }
}