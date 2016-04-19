/*
 ***************************************************************************************
 * Source file name : instructions.ts                                                  *
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
// instruction SCENE
var scenes;
(function (scenes) {
    var Instruction3 = (function (_super) {
        __extends(Instruction3, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function Instruction3() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        Instruction3.prototype.start = function () {
            createjs.Sound.stop();
            createjs.Sound.play("menuBGM", 0, 0, 0, -1);
            this._setupBackground("blank");
            this._fadeIn(500);
            this._label = new objects.Label("Instruction Level3\n" +
                "Boss", "35px Merienda One", "#B40404", config.Screen.CENTER_X, config.Screen.CENTER_Y, true);
            this.addChild(this._label);
            // add the Start button to the instruction scene
            this._startButton = new objects.Button("StartButton", config.Screen.CENTER_X, config.Screen.CENTER_Y + 260, true);
            this.addChild(this._startButton);
            // Start Button event listener
            this._startButton.on("click", this._startButtonClick, this);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // instruction Scene updates here
        Instruction3.prototype.update = function () {
        };
        //EVENT HANDLERS ++++++++++++++++++++
        // start Button click event handler
        Instruction3.prototype._startButtonClick = function (event) {
            this._fadeOut(500, function () {
                // Switch to the level 2 Scene
                scene = config.Scene.LEVEL3;
                changeScene();
            });
        };
        return Instruction3;
    })(objects.Scene);
    scenes.Instruction3 = Instruction3;
})(scenes || (scenes = {}));
//# sourceMappingURL=instruction3.js.map