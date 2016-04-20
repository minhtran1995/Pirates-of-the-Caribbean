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
            createjs.Sound.stop();
            this._setupBackground('win');
            this._fadeIn(1000);
            // add the reset button to the win scene
            this._restartButton = new objects.Button("tryAgainButton", config.Screen.CENTER_X - 310, config.Screen.CENTER_Y + 150, true);
            this.addChild(this._restartButton);
            // reset Button event listener
            this._restartButton.on("click", this._restartButtonClick, this);
            //status
            this._status = new objects.Label("You Win !!!", "Bold 50px Merienda One", "#0d0d0d", config.Screen.CENTER_X, 50, true);
            this.addChild(this._status);
            //current score
            this._currentScore = new objects.Label("Your Score: " + Math.round(scoreValue), "Bold 45px Merienda One", "#ffcc00", config.Screen.CENTER_X - 310, config.Screen.CENTER_Y - 100, true);
            this.addChild(this._currentScore);
            //high score
            this._highScore = new objects.Label("High Score: " + Math.round(highScoreValue), "Bold 35px Merienda One", "#ffcc00", config.Screen.CENTER_X - 310, config.Screen.CENTER_Y, true);
            this.addChild(this._highScore);
            //some video
            this.winVideo = document.getElementById("win");
            //javascript
            this.winVideo.play();
            this.vid = new createjs.Bitmap(this.winVideo);
            this.vid.setTransform(config.Screen.CENTER_X - 50, config.Screen.CENTER_Y - 150, 0.6, 0.6, 0, 0, 0);
            this.addChild(this.vid);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // win Scene updates here
        Win.prototype.update = function () {
        };
        //EVENT HANDLERS ++++++++++++++++++++
        // reset Button click event handler
        Win.prototype._restartButtonClick = function (event) {
            this.winVideo.pause();
            this.winVideo.currentTime = 0;
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