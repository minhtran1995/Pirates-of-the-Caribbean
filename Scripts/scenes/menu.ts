/*
 ***************************************************************************************
 * Source file name : menu.ts                                                          *
 * Author's name : Duc Minh Tran (300771859)                                           *
 * Last Modified by : Duc Minh Tran (300771859)                                        *
 * Last Modified date : March 27 2016                                                  *
 * Program description : This is a webgame that use  a Side Scroller background        * 
 *                                                                                     *  
 * Revision History : 1 - Update Internal Documentation                                *
 *                                                                                     *
 ***************************************************************************************
*/

// MENU SCENE
module scenes {
    export class Menu extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++

        private _startButton: objects.Button;

        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }

        // PUBLIC METHODS +++++++++++++++++++++

        // Start Method
        public start(): void {
            this._setupBackground("menuBG");
            this._fadeIn(500);

            createjs.Sound.stop();
            createjs.Sound.play("bmg").loop = -1;
            createjs.Sound.volume = 50;



            // add the Start button to the MENU scene
            this._startButton = new objects.Button(
                "StartButton",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y + 260, true);
            this.addChild(this._startButton);

            // Start Button event listener
            this._startButton.on("click", this._startButtonClick, this);


            // add this scene to the global stage container
            stage.addChild(this);
        }

        // INTRO Scene updates here
        public update(): void {

        }


        //EVENT HANDLERS ++++++++++++++++++++

        // LEFT_CAVE Button click event handler
        private _startButtonClick(event: createjs.MouseEvent) {

            this._fadeOut(500, () => {
                // Switch to the instruction Scene
                scene = config.Scene.INSTRUCTION;
                changeScene();
            });

        }

    }
}