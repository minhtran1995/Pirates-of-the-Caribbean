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
    var Health = (function (_super) {
        __extends(Health, _super);
        function Health() {
            _super.call(this, "arcReactorFixed");
            this.speed.x = 2;
            this.reset(this._rightBound);
            this.name = "health";
        }
        //reset health location
        Health.prototype.reset = function (value) {
            this.x = value;
            this.y = Math.floor(Math.random() * this._bottomBound + this._topBound);
            this.image = assets.getResult("arcReactorFixed");
        };
        //check if health item is in right location
        Health.prototype._checkBound = function (value) {
            //check if the top of island is top of scene
            if (this.x <= value) {
                this.reset(this._rightBound);
            }
        };
        //update my objects in the scene
        Health.prototype.update = function () {
            this.x -= this.speed.x;
            this._checkBound((-config.Screen.WIDTH) * 2);
            //console.log((-config.Screen.WIDTH)*2)       
        };
        return Health;
    })(objects.GameObject);
    objects.Health = Health;
})(objects || (objects = {}));
//# sourceMappingURL=health.js.map