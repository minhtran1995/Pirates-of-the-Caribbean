/*
 ***************************************************************************************
 * Source file name : loading.ts                                                       *
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
// LOADING SCENE
var scenes;
(function (scenes) {
    var Loading = (function (_super) {
        __extends(Loading, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function Loading() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        Loading.prototype.start = function () {
            Loading._flag = false;
            this._counter = 0;
            //this part require a preload
            this._queue = new createjs.LoadQueue();
            this._queue.installPlugin(createjs.Sound);
            this._queue.loadManifest([
                { id: "loading", src: "../../Assets/sample/loading-resized.jpg" },
                { id: "PreloaderImage", src: "../../Assets/sample/steeringWheel-resized.png" },
            ]);
            this._queue.on("complete", this.addBitMaps, this);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // loading Scene updates here
        Loading.prototype.update = function () {
            //im making sure that the preloader images is loaded, and then it will be modified here
            if (Loading._flag) {
                this._preloader.rotation += 3;
            }
            if (this._counter % 30 === 0) {
                if (this._counter % 90 === 0) {
                    this._loadingLabel.text = "Loading.";
                    this._counter = 0;
                }
                else {
                    this._loadingLabel.text += ".";
                }
            }
            this._counter++;
        };
        Loading.prototype.addBitMaps = function () {
            //add background
            this._loadingBG = new createjs.Bitmap(this._queue.getResult("loading"));
            this._loadingBG.regX = this._loadingBG.getBounds().width * 0.5;
            this._loadingBG.regY = this._loadingBG.getBounds().height * 0.5;
            this._loadingBG.x = config.Screen.CENTER_X;
            this._loadingBG.y = config.Screen.CENTER_Y;
            this.addChild(this._loadingBG);
            this._preloader = new createjs.Bitmap(this._queue.getResult("PreloaderImage"));
            //i tried to get height and width of a bitmap            
            this._preloader.regX = this._preloader.getBounds().width * 0.5;
            this._preloader.regY = this._preloader.getBounds().height * 0.5;
            this._preloader.x = config.Screen.CENTER_X;
            this._preloader.y = config.Screen.CENTER_Y + 180;
            this.addChild(this._preloader);
            Loading._flag = true;
            this._loadingLabel = new objects.Label("Loading.", "35px Merienda One", "#B40404", config.Screen.CENTER_X - 25, config.Screen.CENTER_Y + 250, true);
            this.addChild(this._loadingLabel);
        };
        return Loading;
    })(objects.Scene);
    scenes.Loading = Loading;
})(scenes || (scenes = {}));
//# sourceMappingURL=loading.js.map