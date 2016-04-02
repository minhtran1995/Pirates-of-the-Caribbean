/*
 ***************************************************************************************
 * Source file name : label.ts                                                     *
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
    // LABEL CLASS ++++++++++++++++++++++++++++++++++++++++++++++
    export class Label extends createjs.Text {
        // CONSTRUCTOR METHOD +++++++++++++++++++++++++++++++++++
        constructor(labelString: string, labelFont: string, labelColour: string, x: number, y: number, centered: boolean) {
            super(labelString, labelFont, labelColour);
            if (centered) {
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getBounds().height * 0.5;
            }
            this.x = x;
            this.y = y;
        }
    }
} 