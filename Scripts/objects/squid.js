var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Squid = (function (_super) {
        __extends(Squid, _super);
        function Squid() {
            _super.call(this, "squid1");
            this.counter = 0;
            this.squidArray = new Array();
            this.XLocation = new Array();
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
            this._rightBound = config.Screen.WIDTH - this.width * 0.5;
            this._topBound = this.height * 0.5;
            this._bottomBound = config.Screen.HEIGHT - this.height * 0.5;
        }
        //reset health location
        Squid.prototype.reset = function (value) {
            this.y = value;
            this.x = this.XLocation[Math.round(Math.random() * 3)];
            this.name = "squid";
            this.speed.x = 0;
            this.speed.y = Math.random() * 7 + 3;
            this.image = assets.getResult("squid1");
        };
        //update my objects in the scene
        Squid.prototype.update = function () {
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
        };
        Squid.delay = 0;
        return Squid;
    })(objects.GameObject);
    objects.Squid = Squid;
})(objects || (objects = {}));
//# sourceMappingURL=squid.js.map