var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Boss = (function (_super) {
        __extends(Boss, _super);
        function Boss() {
            _super.call(this, "boss");
            this.counter = 0;
            this.speed.x = 2;
            this.name = "boss";
            this.counter = 0;
            this._rotationSpeed = 0;
            this._leftBound = this.width * 0.5;
            this._rightBound = config.Screen.WIDTH - this.width * 0.5;
            this._topBound = this.height * 0.5;
            this._bottomBound = config.Screen.HEIGHT - this.height * 0.5;
            this.x = Math.round(Math.random() * config.Screen.WIDTH);
            this.y = 2.6 * config.Screen.HEIGHT;
            Boss.health = 1000;
        }
        //reset health location
        Boss.prototype.reset = function () {
            this.x = Math.round(Math.random() * config.Screen.WIDTH);
            this.speed.x = 3;
            if (this.x > config.Screen.CENTER_X) {
                this.scaleX = 1;
                this.speed.y = 10;
                this._rotationSpeed = 2;
                this.rotation = 0;
            }
            else {
                this.scaleX = -1;
                this.speed.y = 10;
                this._rotationSpeed = -2;
                this.rotation = 0;
            }
        };
        //update my objects in the scene
        Boss.prototype.update = function () {
            if (this.scaleX === 1) {
                this.x -= this.speed.x;
                this.y -= this.speed.y;
                this.rotation += this._rotationSpeed;
                if (this.y < this._topBound + 100) {
                    this.rotation = 60;
                    this.speed.y = -5;
                    this._rotationSpeed = -2;
                }
                if (this.y > 2.5 * config.Screen.HEIGHT) {
                    this.speed.y = 10;
                    this._rotationSpeed = 2;
                    this.rotation = 0;
                    //make the boss jump in to a new location
                    this.reset();
                }
                if (this.rotation > 60) {
                    this.rotation = 60;
                }
                if (this.rotation < -90) {
                    this.rotation = -90;
                }
            }
            if (this.scaleX === -1) {
                this.x += this.speed.x;
                this.y -= this.speed.y;
                this.rotation += this._rotationSpeed;
                if (this.y < this._topBound + 100) {
                    this.rotation = -60;
                    this.speed.y = -5;
                    this._rotationSpeed = 2;
                }
                if (this.y > 2.5 * config.Screen.HEIGHT) {
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
            //console.log(this.x + " " + this.y);
        };
        Boss.delay = 0;
        return Boss;
    })(objects.GameObject);
    objects.Boss = Boss;
})(objects || (objects = {}));
//# sourceMappingURL=level3Boss.js.map