/*
 ***************************************************************************************
 * Source file name : config.ts                                                        *
 * Author's name : Duc Minh Tran (300771859)                                           *
 * Last Modified by : Duc Minh Tran (300771859)                                        *
 * Last Modified date : March 27 2016                                                  *
 * Program description : This is a webgame that use  a Side Scroller background        *
 *                                                                                     *
 * Revision History : 1 - Update Internal Documentation                                *
 *                    2 - Add Wining Scene                                             *
 ***************************************************************************************
*/
var config;
(function (config) {
    // Scene Constants
    var Scene = (function () {
        function Scene() {
        }
        Scene.LOADING = 0;
        Scene.MENU = 1;
        Scene.INSTRUCTION = 2;
        Scene.PLAY = 3;
        Scene.END = 4;
        Scene.WIN = 5;
        return Scene;
    })();
    config.Scene = Scene;
    // Screen Constants
    var Screen = (function () {
        function Screen() {
        }
        Screen.WIDTH = 1000;
        Screen.HEIGHT = 600;
        Screen.CENTER_X = Screen.WIDTH / 2;
        Screen.CENTER_Y = Screen.HEIGHT / 2;
        return Screen;
    })();
    config.Screen = Screen;
    // Game Constants
    var Game = (function () {
        function Game() {
        }
        Game.FPS = 60;
        return Game;
    })();
    config.Game = Game;
})(config || (config = {}));
//# sourceMappingURL=config.js.map