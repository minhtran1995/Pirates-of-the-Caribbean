/*
 ***************************************************************************************
 * Source file name : scene.ts                                                     *
 * Author's name : Duc Minh Tran (300771859)                                           *
 * Last Modified by : Duc Minh Tran (300771859)                                        *
 * Last Modified date : March 27 2016                                                  *
 * Program description : This is a webgame that use  a Side Scroller background        * 
 *                                                                                     *  
 * Revision History : 1 - Update Internal Documentation                                *
 *                                                                                     *
 ***************************************************************************************
*/

module objects {
    // Scene Class
    export class Scene extends createjs.Container {
        
        // PROTECTED INSTANCE VARIABLES
        protected _blackBackground: createjs.Bitmap;
        // CONSTRUCTOR +++++++++++++++++++++++++++++
        constructor() {
            super();
            this.start();
        }
        
        // Add game objects to my scene in this method
        public start(): void {
            stage.addChild(this);
        }
        
        // update game objects in my scene
        public update(): void {

        }
        
        // Setup Background
        protected _setupBackground(background: string): void {
            this._blackBackground = new createjs.Bitmap(assets.getResult(background));
            this.addChild(this._blackBackground);
        }
        
        
        // FadeIn method
        protected _fadeOut(transitionTime: number, callback?: any): void {
            if (callback == null) {
                createjs.Tween.get(this._blackBackground).to({ alpha: 0 }, transitionTime, createjs.Ease.getPowInOut(2));
            }else{
                createjs.Tween.get(this._blackBackground).to({ alpha: 0 }, transitionTime, createjs.Ease.getPowInOut(2)).call(callback);
            }
        }
        
        // FadeIn method
        protected _fadeIn(transitionTime: number, callback?: any): void {
            this._blackBackground.alpha = 0;
            if (callback == null) {
                createjs.Tween.get(this._blackBackground).to({ alpha: 1 }, transitionTime, createjs.Ease.getPowInOut(2));
            }else{
                createjs.Tween.get(this._blackBackground).to({ alpha: 1 }, transitionTime, createjs.Ease.getPowInOut(2)).call(callback);
            }
        }
    }
}