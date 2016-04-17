var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Tracker = (function (_super) {
        __extends(Tracker, _super);
        function Tracker(boss) {
            _super.call(this, assets.getResult("tracker"));
            this.counter = 0;
            this.name = "tracker";
            this.counter = 0;
            this._boss = boss;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            this._leftBound = this.width * 0.5;
            this._rightBound = config.Screen.WIDTH - this.width * 0.5;
            this._topBound = this.height * 0.5;
            this._bottomBound = config.Screen.HEIGHT - this.height * 0.5;
            this.x = this._boss.x;
            this.y = this._boss.y - (this.height * 2);
        }
        //update my objects in the scene
        Tracker.prototype.update = function () {
            this.x = this._boss.x;
            this.y = this._boss.y - (this.height * 2);
            if (this._boss.x >= this._rightBound) {
                this.x = this._rightBound;
            }
            if (this._boss.x < this._leftBound) {
                this.x = this._leftBound;
            }
            if (this._boss.y < this._topBound) {
                this.y = this._topBound;
            }
            if (this._boss.y > this._bottomBound) {
                this.y = this._bottomBound;
            }
        };
        Tracker.delay = 0;
        return Tracker;
    })(createjs.Bitmap);
    objects.Tracker = Tracker;
})(objects || (objects = {}));
//# sourceMappingURL=bossIndicator.js.map