/*
 ***************************************************************************************
 * Source file name : bullet.ts                                                        *
 * Author's name : Duc Minh Tran (300771859)                                           *
 * Last Modified by : Duc Minh Tran (300771859)                                        *
 * Last Modified date : March 27 2016                                                  *
 * Program description : This is a webgame that use  a Side Scroller background        *
 *                                                                                     *
 * Revision History : 1 - Update Internal Documentation                                *
 *                                                                                     *
 ***************************************************************************************
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Bullet = (function (_super) {
        __extends(Bullet, _super);
        function Bullet(player) {
            _super.call(this, "bullet1");
            this.name = "bullet";
            this._player = player;
            this.speed.x = config.Screen.WIDTH - this._player.x;
            this.y = this._player.y;
            this.x = this._player.x;
            this.reset(this._player.x);
        }
        //reset objects location
        Bullet.prototype.reset = function (value) {
            this.y = this._player.y;
            this.x = value;
            this.image = null;
        };
        //check if objects in the right location
        Bullet.prototype._checkBound = function (value) {
            if (this.x >= value) {
                this.reset(this._player.x);
            }
        };
        //update objects in the scene
        Bullet.prototype.update = function () {
            if (this._player.isShooting) {
                this.image = assets.getResult("bullet1");
                this.x = stage.mouseX;
                this.y = stage.mouseY;
                //equation to make corresponding bullet direction
                if (this.x < this._player.x) {
                    this.rotation = Math.atan((this.y - this._player.y) / (this.x - this._player.x)) * 180 / Math.PI + 180;
                }
                else {
                    this.rotation = Math.atan((this.y - this._player.y) / (this.x - this._player.x)) * 180 / Math.PI;
                }
            }
            else {
                this.y = this._player.y;
                this.x = this._player.x;
            }
        };
        return Bullet;
    })(objects.GameObject);
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=bullet.js.map