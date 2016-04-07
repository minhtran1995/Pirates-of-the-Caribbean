var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Cannon = (function (_super) {
        __extends(Cannon, _super);
        function Cannon(player) {
            _super.call(this, "cannon");
            this.name = "cannon";
            this._player = player;
            this.y = this._player.y;
            this.x = this._player.x;
            Cannon.isloaded = true;
            Cannon.shootCannon = false;
        }
        //update objects in the scene
        Cannon.prototype.update = function () {
            this.y = this._player.y + 20;
            this.x = this._player.x + 50;
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
        };
        Cannon.shuffleImages = function (val) {
            var obj = new Array();
            obj[0] = assets.getResult("cannon");
            obj[1] = assets.getResult("cannon-shoot");
            if (val === "shoot") {
                return obj[1];
            }
            else {
                return obj[0];
            }
        };
        return Cannon;
    })(objects.GameObject);
    objects.Cannon = Cannon;
})(objects || (objects = {}));
//# sourceMappingURL=cannon.js.map