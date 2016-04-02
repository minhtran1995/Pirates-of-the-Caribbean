/*
 ***************************************************************************************
 * Source file name : win.ts                                                           *
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
var scenes;
(function (scenes) {
    var Win = (function (_super) {
        __extends(Win, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function Win() {
            _super.call(this);
        }
        // PUBLIC METHODS ++++++++++++++++++++
        // Start Method
        Win.prototype.start = function () {
            this._setupBackground('win');
            this._fadeIn(1000);
            // add the reset button to the win scene
            this._restartButton = new objects.Button("RestartButton", config.Screen.CENTER_X - 325, config.Screen.CENTER_Y + 180, true);
            this.addChild(this._restartButton);
            // reset Button event listener
            this._restartButton.on("click", this._restartButtonClick, this);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // win Scene updates here
        Win.prototype.update = function () {
        };
        //EVENT HANDLERS ++++++++++++++++++++
        // reset Button click event handler
        Win.prototype._restartButtonClick = function (event) {
            this._fadeOut(500, function () {
                // Switch to the menu Scene
                scene = config.Scene.MENU;
                changeScene();
            });
        };
        return Win;
    })(objects.Scene);
    scenes.Win = Win;
})(scenes || (scenes = {}));
//# sourceMappingURL=win.js.map