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
    var CaptainShield = (function (_super) {
        __extends(CaptainShield, _super);
        function CaptainShield() {
            _super.call(this, "captainShield");
            this.reset(this._rightBound);
            this.name = "captainShield";
        }
        //reset objects location
        CaptainShield.prototype.reset = function (value) {
            this.speed.x = Math.round((Math.random() * 5) + 3);
            this.speed.y = Math.round((Math.random() * 6) - 3);
            this.x = value;
            this.y = Math.round((Math.random() * this._bottomBound) + this._topBound);
        };
        //check if objects in the right location
        CaptainShield.prototype._checkBound = function (value) {
            if (this.x <= value) {
                this.reset(this._rightBound);
            }
        };
        //update objects in the scene
        CaptainShield.prototype.update = function () {
            this.y -= this.speed.y;
            this.x -= this.speed.x;
            this.rotation -= Math.round((Math.random() * 3) + 7);
            this._checkBound(this._leftBound);
        };
        return CaptainShield;
    })(objects.GameObject);
    objects.CaptainShield = CaptainShield;
})(objects || (objects = {}));
//# sourceMappingURL=captainShield.js.map