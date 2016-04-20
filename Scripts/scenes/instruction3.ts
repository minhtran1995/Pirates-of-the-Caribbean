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

// instruction SCENE
module scenes {
    export class Instruction3 extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++

        private _startButton: objects.Button;

        private _label: objects.Label;

        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }

        // PUBLIC METHODS +++++++++++++++++++++

        // Start Method
        public start(): void {
            createjs.Sound.stop();
            createjs.Sound.play("menuBGM", 0, 0, 0, -1);

            this._setupBackground("InstructionBG3");
            this._fadeIn(500);


            // add the Start button to the instruction scene
            this._startButton = new objects.Button(
                "StartButton",
                config.Screen.CENTER_X,
                config.Screen.HEIGHT - 123 * 0.5, true);
            this.addChild(this._startButton);

            // Start Button event listener
            this._startButton.on("click", this._startButtonClick, this);


            // add this scene to the global stage container
            stage.addChild(this);
        }

        // instruction Scene updates here
        public update(): void {

        }


        //EVENT HANDLERS ++++++++++++++++++++

        // start Button click event handler
        private _startButtonClick(event: createjs.MouseEvent) {

            this._fadeOut(500, () => {
                // Switch to the level 2 Scene
                scene = config.Scene.LEVEL3;
                changeScene();
            });

        }

    }
}