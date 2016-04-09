/*
 ***************************************************************************************
 * Source file name : health.ts                                                        *
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
    var Money = (function (_super) {
        __extends(Money, _super);
        function Money(val) {
            _super.call(this, val);
            this.speed.x = 2;
            this.reset(this._rightBound);
            this.name = "goldChest";
        }
        //reset health location
        Money.prototype.reset = function (value) {
            var a = (440 - this.height * 0.5);
            var b = config.Screen.HEIGHT - a - this.height * 0.5;
            this.x = value;
            this.y = Math.round((Math.random() * b + a));
        };
        //check if health item is in right location
        Money.prototype._checkBound = function (value) {
            //check if the top of island is top of scene
            if (this.x <= value) {
                this.reset(this._rightBound);
            }
        };
        //update my objects in the scene
        Money.prototype.update = function () {
            this.x -= this.speed.x;
            this._checkBound((-config.Screen.WIDTH) * 2);
        };
        return Money;
    })(objects.GameObject);
    objects.Money = Money;
})(objects || (objects = {}));
//# sourceMappingURL=money.js.map