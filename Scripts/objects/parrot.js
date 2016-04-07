var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Parrot = (function (_super) {
        __extends(Parrot, _super);
        function Parrot() {
            _super.call(this, "parrot");
            this.counter = 0;
            this.parrotArray = new Array();
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
        Parrot.prototype.reset = function (value) {
            var a = (440 - this.height * 0.5);
            var b = config.Screen.HEIGHT - a - this.height * 0.5;
            this.x = value;
            this.y = Math.round((Math.random() * b + a));
        };
        //check if health item is in right location
        Parrot.prototype._checkBound = function (value) {
            //check if the top of island is top of scene
            if (this.x <= value) {
                this.reset(this._rightBound);
            }
        };
        //update my objects in the scene
        Parrot.prototype.update = function () {
            this.x = config.Screen.CENTER_X;
            if (Parrot.delay % 180 === 0) {
                if (this.scaleX === 1) {
                    //this will flip the image horizontally
                    this.scaleX = -1;
                }
                else {
                    this.scaleX = 1;
                }
                Parrot.delay = 0;
            }
            if (Parrot.delay % 10 === 0) {
                this.image = this.shuffleImages();
            }
            Parrot.delay++;
        };
        Parrot.prototype.shuffleImages = function () {
            if (this.counter >= 7) {
                this.counter = 0;
            }
            else {
                this.counter++;
            }
            return this.parrotArray[this.counter];
        };
        Parrot.delay = 0;
        return Parrot;
    })(objects.GameObject);
    objects.Parrot = Parrot;
})(objects || (objects = {}));
//# sourceMappingURL=parrot.js.map