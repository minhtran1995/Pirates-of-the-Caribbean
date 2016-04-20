module objects {
    export class Cannon extends objects.GameObject {

        private _player: Player;


        public static isloaded: boolean;
        public static shootCannon: boolean;


        constructor(player: Player, cannonID: string) {
            super(cannonID);
            if (cannonID === "cannon") {
                this.name = "cannon";
            } else {
                this.name = "bigCannon";
            }
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
            this._player = player;
            this.y = this._player.y;
            this.x = this._player.x;
            Cannon.isloaded = true;
            Cannon.shootCannon = false;
        }


        //update objects in the scene
        public update(): void {

            if (this.name === "cannon") {
                this.y = this._player.y + 75;
                this.x = this._player.x + 30;
            } else if (this.name === "bigCannon") {
                this.y = this._player.y + 60;
                this.x = this._player.x - 30;
            }


            if (Cannon.shootCannon) {
                if (this.name === "cannon") {

                    if (this._player.isShooting) {
                        this.image = Cannon.shuffleImages("shoot");

                    }
                    else {
                        this.image = Cannon.shuffleImages("");
                    }
                }
                else {
                    if (this._player.isShooting) {
                        this.image = Cannon.shuffleImages("lv3Cannon-shoot");

                    }
                    else {
                        this.image = Cannon.shuffleImages("lv3Cannon");
                    }
                }
            }
            if (!this._player.isDead) {
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
            obj[2] = assets.getResult("lv3Cannon");
            obj[3] = assets.getResult("lv3Cannon-shoot");

            if (val === "shoot") {
                return obj[1];
            }
            else if (val === "lv3Cannon") {
                return obj[2];
            }
            else if (val === "lv3Cannon-shoot") {
                return obj[3];
            }
            else {
                return obj[0];
            }


        }
    }
}