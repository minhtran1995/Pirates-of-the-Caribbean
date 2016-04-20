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

module scenes {
    export class End extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++

        private _restartButton: objects.Button;
        private _status: objects.Label;
        private _currentScore: objects.Label;
        private _highScore: objects.Label;

        //video
        private vid: createjs.Bitmap;
        private loseVideo;
        
        
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }

        // PUBLIC METHODS ++++++++++++++++++++


        // Start Method
        public start(): void {
            createjs.Sound.stop();
            this._setupBackground('end');
            this._fadeIn(500);

            // add the BACK button to the OVER scene
            this._restartButton = new objects.Button(
                "tryAgainButton",
                config.Screen.CENTER_X - 310,
                config.Screen.CENTER_Y + 150, true);
            this.addChild(this._restartButton);

            // START_OVER Button event listener
            this._restartButton.on("click", this._restartButtonClick, this);

            //status
            this._status = new objects.Label("You Lose !", "Bold 50px Merienda One",
                "#ff0000",
                config.Screen.CENTER_X, 50, true);
            this.addChild(this._status);

            //current score
            this._currentScore = new objects.Label("Your Score: " + Math.round(scoreValue), "Bold 50px Merienda One",
                "#ffcc00",
                config.Screen.CENTER_X - 310, config.Screen.CENTER_Y - 100, true);
            this.addChild(this._currentScore);

            //high score
            this._highScore = new objects.Label("High Score: " + Math.round(highScoreValue), "Bold 35px Merienda One",
                "#990000",
                config.Screen.CENTER_X - 310, config.Screen.CENTER_Y, true);
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
        }

        // end Scene updates here
        public update(): void {

        }


        //EVENT HANDLERS ++++++++++++++++++++

        // START_OVER Button click event handler
        private _restartButtonClick(event: createjs.MouseEvent) {
            this.loseVideo.pause();
            this.loseVideo.currentTime = 0;
            this._fadeOut(500, () => {
                // Switch to the menu Scene
                scene = config.Scene.MENU;
                changeScene();

            });

        }
    }
}