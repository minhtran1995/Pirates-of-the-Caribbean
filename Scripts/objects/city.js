/*
 ***************************************************************************************
 * Source file name : city.ts                                                          *
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
    var City = (function (_super) {
        __extends(City, _super);
        function City() {
            _super.call(this, "night");
            this.speed.x = 4;
            this.reset(0);
            this.regX = 0;
            this.regY = 0;
        }
        //reset objects location
        City.prototype.reset = function (value) {
            this.x = value;
        };
        //check if objects in the right location
        City.prototype._checkBound = function (value) {
            if (this.x <= value) {
                this.reset(0);
            }
        };
        //update objects in the scene
        City.prototype.update = function () {
            //console.log(this.x+" "+ this.y)            
            this.x -= this.speed.x;
            this._checkBound(-4000);
        };
        return City;
    })(objects.GameObject);
    objects.City = City;
})(objects || (objects = {}));
//# sourceMappingURL=city.js.map