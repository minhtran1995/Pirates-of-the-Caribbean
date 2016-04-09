/*
 ***************************************************************************************
 * Source file name : captainShield.ts                                                 *
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
    var Enemy = (function (_super) {
        __extends(Enemy, _super);
        function Enemy() {
            _super.call(this, "enemy");
            this.name = "enemy";
            this.reset(this._rightBound);
        }
        //reset objects location
        Enemy.prototype.reset = function (value) {
            this.image = assets.getResult("enemy");
            this.rotation = 0;
            this.speed.x = Math.round((Math.random() * 4) + 1);
            var a = (440 - this.height * 0.5);
            var b = config.Screen.HEIGHT - a - this.height * 0.5;
            this.x = value;
            this.y = Math.round((Math.random() * b + a));
        };
        //check if objects in the right location
        Enemy.prototype._checkBound = function (value) {
            if (this.x <= value) {
                this.reset(this._rightBound);
            }
        };
        //update objects in the scene
        Enemy.prototype.update = function () {
            this.x -= this.speed.x;
            this._checkBound(this._leftBound);
        };
        return Enemy;
    })(objects.GameObject);
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=enemy.js.map