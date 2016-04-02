/*
 ***************************************************************************************
 * Source file name : asset.ts                                                         *
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
    // ASSET CLASS ++++++++++++++++++++++++++
    export class Asset {
        //PUBLIC INSTANCE VARIABLES
        public id:string;
        public src: string;
        // CONSTRUCTOR +++++++++++++++++++++
        constructor(id:string, src:string) {
            this.id = id;
            this.src = src;
        }
    }
}