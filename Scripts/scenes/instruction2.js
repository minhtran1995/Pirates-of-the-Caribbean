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
    var Instruction2 = (function (_super) {
        __extends(Instruction2, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function Instruction2() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        Instruction2.prototype.start = function () {
            createjs.Sound.stop();
            createjs.Sound.play("menuBGM", 0, 0, 0, -1);
            this._setupBackground("InstructionBG2");
            this._fadeIn(500);
            // add the Start button to the instruction scene
            this._startButton = new objects.Button("StartButton", config.Screen.CENTER_X, config.Screen.CENTER_Y + 260, true);
            this.addChild(this._startButton);
            // Start Button event listener
            this._startButton.on("click", this._startButtonClick, this);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // instruction Scene updates here
        Instruction2.prototype.update = function () {
        };
        //EVENT HANDLERS ++++++++++++++++++++
        // start Button click event handler
        Instruction2.prototype._startButtonClick = function (event) {
            this._fadeOut(500, function () {
                // Switch to the level 2 Scene
                scene = config.Scene.LEVEL2;
                changeScene();
            });
        };
        return Instruction2;
    })(objects.Scene);
    scenes.Instruction2 = Instruction2;
})(scenes || (scenes = {}));
//# sourceMappingURL=instruction2.js.map