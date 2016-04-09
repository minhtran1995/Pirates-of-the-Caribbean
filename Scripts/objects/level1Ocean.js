var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Level1Ocean = (function (_super) {
        __extends(Level1Ocean, _super);
        function Level1Ocean() {
            _super.call(this, "night");
            this.speed.x = 2;
            this.reset(0);
            this.regX = 0;
            this.regY = 0;
        }
        //reset objects location
        Level1Ocean.prototype.reset = function (value) {
            this.x = value;
        };
        //check if objects in the right location
        Level1Ocean.prototype._checkBound = function (value) {
            if (this.x <= value) {
                this.reset(0);
            }
        };
        //update objects in the scene
        Level1Ocean.prototype.update = function () {
            //console.log(this.x+" "+ this.y)            
            this.x -= this.speed.x;
            this._checkBound(-2000);
        };
        return Level1Ocean;
    })(objects.GameObject);
    objects.Level1Ocean = Level1Ocean;
})(objects || (objects = {}));
//# sourceMappingURL=level1Ocean.js.map