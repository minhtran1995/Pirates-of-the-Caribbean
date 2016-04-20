/*
 ***************************************************************************************
 * Source file name : end.ts                                                           *
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
    var End = (function (_super) {
        __extends(End, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function End() {
            _super.call(this);
        }
        // PUBLIC METHODS ++++++++++++++++++++
        // Start Method
        End.prototype.start = function () {
            createjs.Sound.stop();
            this._setupBackground('end');
            this._fadeIn(500);
            // add the BACK button to the OVER scene
            this._restartButton = new objects.Button("tryAgainButton", config.Screen.CENTER_X - 310, config.Screen.CENTER_Y + 150, true);
            this.addChild(this._restartButton);
            // START_OVER Button event listener
            this._restartButton.on("click", this._restartButtonClick, this);
            //status
            this._status = new objects.Label("You Lose !", "Bold 50px Merienda One", "#ff0000", config.Screen.CENTER_X, 50, true);
            this.addChild(this._status);
            //current score
            this._currentScore = new objects.Label("Your Score: " + Math.round(scoreValue), "Bold 50px Merienda One", "#ffcc00", config.Screen.CENTER_X - 310, config.Screen.CENTER_Y - 100, true);
            this.addChild(this._currentScore);
            //high score
            this._highScore = new objects.Label("High Score: " + Math.round(highScoreValue), "Bold 35px Merienda One", "#990000", config.Screen.CENTER_X - 310, config.Screen.CENTER_Y, true);
            this.addChild(this._highScore);
            //some video
            this.loseVideo = document.getElementById("lose");
            //javascript
            this.loseVideo.play();
            this.vid = new createjs.Bitmap(this.loseVideo);
            this.vid.setTransform(config.Screen.CENTER_X - 50, config.Screen.CENTER_Y - 150, 0.6, 0.6, 0, 0, 0);
            this.addChild(this.vid);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // end Scene updates here
        End.prototype.update = function () {
        };
        //EVENT HANDLERS ++++++++++++++++++++
        // START_OVER Button click event handler
        End.prototype._restartButtonClick = function (event) {
            this.loseVideo.pause();
            this.loseVideo.currentTime = 0;
            this._fadeOut(500, function () {
                // Switch to the menu Scene
                scene = config.Scene.MENU;
                changeScene();
            });
        };
        return End;
    })(objects.Scene);
    scenes.End = End;
})(scenes || (scenes = {}));
//# sourceMappingURL=end.js.map