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


module scenes {
    export class Win extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++

        private _restartButton: objects.Button;

        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }

        // PUBLIC METHODS ++++++++++++++++++++


        // Start Method
        public start(): void {

            this._setupBackground('win');
            this._fadeIn(1000);



            // add the reset button to the win scene
            this._restartButton = new objects.Button(
                "RestartButton",
                config.Screen.CENTER_X - 325,
                config.Screen.CENTER_Y + 180, true);
            this.addChild(this._restartButton);

            // reset Button event listener
            this._restartButton.on("click", this._restartButtonClick, this);


            // add this scene to the global stage container
            stage.addChild(this);
        }

        // win Scene updates here
        public update(): void {

        }


        //EVENT HANDLERS ++++++++++++++++++++

        // reset Button click event handler
        private _restartButtonClick(event: createjs.MouseEvent) {

            this._fadeOut(500, () => {
                // Switch to the menu Scene
                scene = config.Scene.MENU;
                changeScene();
            });

        }
    }
}