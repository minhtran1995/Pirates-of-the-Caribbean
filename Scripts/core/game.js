/*
 ***************************************************************************************
 * Source file name : game.ts                                                          *
 * Author's name : Duc Minh Tran (300771859)                                           *
 * Last Modified by : Duc Minh Tran (300771859)                                        *
 * Last Modified date : March 27 2016                                                  *
 * Program description : This is a webgame that use  a Side Scroller background        *
 *                                                                                     *
 * Revision History : 1 - Update Internal Documentation                                *
 *                    2 - Add Wining Scene                                             *
 ***************************************************************************************
*/
/// <reference path = "_reference.ts" />
// global variables
var assets;
var canvas;
var stage;
var stats;
var currentScene;
var scene;
// Game Scenes
var loading;
var menu;
var instruction;
var level1;
var instruction2;
var level2;
var end;
var win;
var livesValue;
var scoreValue;
var highScoreValue = 0;
var assetData = [
    { id: "StartButton", src: "../../Assets/images/StartButton.png" },
    { id: "RestartButton", src: "../../Assets/images/RestartButton.png" },
    { id: "InstructionButton", src: "../../Assets/sample/instructionButton.png" },
    { id: "ExitButton", src: "../../Assets/sample/exitButton.png" },
    { id: "BackButton", src: "../../Assets/images/BackButton.png" },
    { id: "night", src: "../../Assets/sample/ocean.png" },
    { id: "level2Ocean", src: "../../Assets/sample/Level2Ocean-resized-looped.jpg" },
    { id: "bullet1", src: "../../Assets/sample/bullet1.png" },
    { id: "cannon", src: "../../Assets/sample/cannon-resized.png" },
    { id: "cannon-shoot", src: "../../Assets/sample/cannon-resized-shoot.png" },
    { id: "biggerCannon", src: "../../Assets/sample/biggerCannon-resized.png" },
    { id: "reload", src: "../../Assets/sample/reload-resized.png" },
    { id: "explosion", src: "../../Assets/sample/explosion-resized.png" },
    { id: "menuBG", src: "../../Assets/sample/menuBg-resized.jpg" },
    { id: "end", src: "../../Assets/images/End-fixed.jpg" },
    { id: "instruction", src: "../../Assets/images/instruction.jpg" },
    { id: "win", src: "../../Assets/images/win.jpg" },
    { id: "enemy", src: "../../Assets/sample/enemy-resized.png" },
    { id: "goldChest", src: "../../Assets/sample/goldChest-resized.png" },
    { id: "player", src: "../../Assets/sample/player-resized.png" },
    /*
    { id: "ironman1", src: "../../Assets/images/ironman1.png" },
    { id: "ironman2", src: "../../Assets/images/ironman2.png" },
    { id: "ironman3", src: "../../Assets/images/ironman3.png" },
    */
    { id: "cannonShoot", src: "../../Assets/images/ironmanShoot.png" },
    { id: "arcReactorFixed", src: "../../Assets/images/arcReactor-fixed.png" },
    //hitEnemy effect
    { id: "hitEnemy", src: "../../Assets/sample/collision/sprite 0-resized.png" },
    { id: "hitEnemy1", src: "../../Assets/sample/collision/sprite 1-resized.png" },
    { id: "hitEnemy2", src: "../../Assets/sample/collision/sprite 2-resized.png" },
    { id: "hitEnemy3", src: "../../Assets/sample/collision/sprite 3-resized.png" },
    { id: "hitEnemy4", src: "../../Assets/sample/collision/sprite 4-resized.png" },
    //die animation
    { id: "sinking", src: "../../Assets/sample/player ship sinking/sprite 0-resized.png" },
    { id: "sinking1", src: "../../Assets/sample/player ship sinking/sprite 1-resized.png" },
    { id: "sinking2", src: "../../Assets/sample/player ship sinking/sprite 2-resized.png" },
    { id: "sinking3", src: "../../Assets/sample/player ship sinking/sprite 3-resized.png" },
    { id: "sinking5", src: "../../Assets/sample/player ship sinking/sprite 4-resized.png" },
    { id: "sinking6", src: "../../Assets/sample/player ship sinking/sprite 5-resized.png" },
    { id: "sinking7", src: "../../Assets/sample/player ship sinking/sprite 6-resized.png" },
    { id: "sinking8", src: "../../Assets/sample/player ship sinking/sprite 7-resized.png" },
    { id: "sinking9", src: "../../Assets/sample/player ship sinking/sprite 8-resized.png" },
    { id: "sinking10", src: "../../Assets/sample/player ship sinking/sprite 9-resized.png" },
    { id: "sinking11", src: "../../Assets/sample/player ship sinking/sprite 91-resized.png" },
    { id: "sinking12", src: "../../Assets/sample/player ship sinking/sprite 92-resized.png" },
    //money effect
    { id: "money1", src: "../../Assets/sample/coins/coin1-resized.png" },
    { id: "money2", src: "../../Assets/sample/coins/coin2-resized.png" },
    { id: "money3", src: "../../Assets/sample/coins/coin3-resized.png" },
    { id: "money4", src: "../../Assets/sample/coins/coin4-resized.png" },
    { id: "money5", src: "../../Assets/sample/coins/coin5-resized.png" },
    { id: "money6", src: "../../Assets/sample/coins/coin6-resized.png" },
    { id: "money7", src: "../../Assets/sample/coins/coin7-resized.png" },
    { id: "money8", src: "../../Assets/sample/coins/coin8-resized.png" },
    { id: "money9", src: "../../Assets/sample/coins/coin9-resized.png" },
    { id: "money10", src: "../../Assets/sample/coins/coin10-resized.png" },
    { id: "money11", src: "../../Assets/sample/coins/coin11-resized.png" },
    { id: "money12", src: "../../Assets/sample/coins/coin12-resized.png" },
    //health image
    { id: "health", src: "../../Assets/sample/health-resized.png" },
    //parrot
    { id: "parrot", src: "../../Assets/sample/parrot/parrot.png" },
    { id: "parrot1", src: "../../Assets/sample/parrot/parrot1.png" },
    { id: "parrot2", src: "../../Assets/sample/parrot/parrot2.png" },
    { id: "parrot3", src: "../../Assets/sample/parrot/parrot3.png" },
    { id: "parrot4", src: "../../Assets/sample/parrot/parrot4.png" },
    { id: "parrot5", src: "../../Assets/sample/parrot/parrot5.png" },
    { id: "parrot6", src: "../../Assets/sample/parrot/parrot6.png" },
    { id: "parrot7", src: "../../Assets/sample/parrot/parrot7.png" },
    { id: "blank", src: "../../Assets/images/blank.png" },
    //audio
    { id: "bgm", src: "../../Assets/sample/bgm.mp3" },
    { id: "menuBGM", src: "../../Assets/sample/menuBGM.mp3" },
    { id: "leftClick", src: "../../Assets/sample/leftClick.mp3" },
    { id: "reloadSound", src: "../../Assets/sample/reload.mp3" },
    { id: "parrotSound", src: "../../Assets/sample/parrotSound.mp3" },
    { id: "outOfBullets", src: "../../Assets/sample/outOfBullets.mp3" },
    { id: "money", src: "../../Assets/sample/money-edited.mp3" },
    { id: "broken", src: "../../Assets/sample/broken.mp3" },
    { id: "haha", src: "../../Assets/sample/haha.mp3" },
    { id: "haha2", src: "../../Assets/sample/haha 2.mp3" },
    { id: "haha2", src: "../../Assets/sample/haha 2.mp3" },
    { id: "abandon_ship", src: "../../Assets/sample/abandon_ship-amplified.mp3" },
    { id: "sink", src: "../../Assets/sample/sink.mp3" },
];
//preload assets
function preload() {
    scene = config.Scene.MENU;
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    assets.on("complete", changeScene, this);
    assets.loadManifest(assetData);
}
//init main stage
function init() {
    // create a reference the HTML canvas Element
    canvas = document.getElementById("canvas");
    // create our main display list container
    stage = new createjs.Stage(canvas);
    // Enable mouse events
    stage.enableMouseOver(20);
    // set the framerate to 60 frames per second
    createjs.Ticker.setFPS(config.Game.FPS);
    // create an event listener to count off frames
    createjs.Ticker.on("tick", gameLoop, this);
    // sets up our stats counting workflow
    setupStats();
    // set initial scene
    scene = config.Scene.LOADING;
    changeScene();
    //preload data
    preload();
}
// Main Game Loop function that handles what happens each "tick" or frame
function gameLoop(event) {
    // start collecting stats for this frame
    stats.begin();
    // calling State's update method
    currentScene.update();
    // redraw/refresh stage every frame
    stage.update();
    // stop collecting stats for this frame
    stats.end();
}
// Setup Game Stats
function setupStats() {
    stats = new Stats();
    stats.setMode(0); // shows fps
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
}
// Finite State Machine used to change Scenes
function changeScene() {
    // Launch various scenes
    switch (scene) {
        case config.Scene.LOADING:
            // show the loading scene
            stage.removeAllChildren();
            loading = new scenes.Loading();
            currentScene = loading;
            console.log("Starting loading Scene");
            break;
        case config.Scene.MENU:
            // show the MENU scene
            stage.removeAllChildren();
            menu = new scenes.Menu();
            currentScene = menu;
            console.log("Starting MENU Scene");
            break;
        case config.Scene.INSTRUCTION:
            // show the MENU scene
            stage.removeAllChildren();
            instruction = new scenes.Instruction();
            currentScene = instruction;
            console.log("Starting instruction Scene");
            break;
        case config.Scene.LEVEL1:
            // show the LEVEL1 scene            
            stage.removeAllChildren();
            livesValue = 100;
            scoreValue = 0;
            level1 = new scenes.Level1();
            currentScene = level1;
            console.log("Starting level1 Scene");
            break;
        case config.Scene.INSTRUCTION2:
            // show the PLAY scene
            stage.removeAllChildren();
            instruction2 = new scenes.Instruction2();
            currentScene = instruction2;
            console.log("Starting INSTRUCTION2 Scene");
            break;
        case config.Scene.LEVEL2:
            // show the LEVEL2 scene
            stage.removeAllChildren();
            livesValue = 100;
            scoreValue = 0;
            level2 = new scenes.Level2();
            currentScene = level2;
            console.log("Starting level2 Scene");
            break;
        case config.Scene.END:
            // show the END scene
            stage.removeAllChildren();
            end = new scenes.End();
            currentScene = end;
            console.log("Starting END Scene");
            break;
        case config.Scene.WIN:
            // show the END scene
            stage.removeAllChildren();
            win = new scenes.Win();
            currentScene = win;
            console.log("Starting win Scene");
            break;
    }
}
window.onload = init;
//# sourceMappingURL=game.js.map