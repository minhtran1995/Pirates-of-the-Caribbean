var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Level3Ocean = (function (_super) {
        __extends(Level3Ocean, _super);
        function Level3Ocean() {
            _super.call(this, "night");
            this.ocean3 = new Array();
            this.speed.x = 2;
            this.reset(0);
            this.regX = 0;
            this.regY = 0;
            for (var i = 0; i < 9; i++) {
                this.ocean3[i] = assets.getResult("level3Ocean" + i);
            }
            Level3Ocean.counter = 0;
            Level3Ocean.switch = false;
        }
        //reset objects location
        Level3Ocean.prototype.reset = function (value) {
            this.x = value;
        };
        //check if objects in the right location
        Level3Ocean.prototype._checkBound = function (value) {
            if (this.x <= value) {
                this.reset(0);
            }
        };
        //update objects in the scene
        Level3Ocean.prototype.update = function () {
            //console.log(this.x+" "+ this.y)            
            this.x -= this.speed.x;
            this._checkBound(-2000);
            if (Level3Ocean.counter > 120) {
                var rand = Math.round(Math.random() * 8);
                //i want to decrease the chance of thunder storm
                if (rand === 8) {
                    rand = Math.round(Math.random() * 4 + 4);
                }
                this.image = this.ocean3[rand];
                Level3Ocean.switch = true;
            }
            if (!Level3Ocean.switch) {
                Level3Ocean.counter++;
            }
        };
        return Level3Ocean;
    })(objects.GameObject);
    objects.Level3Ocean = Level3Ocean;
})(objects || (objects = {}));
//# sourceMappingURL=level3Ocean.js.map