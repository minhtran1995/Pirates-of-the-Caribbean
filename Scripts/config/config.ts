﻿/*
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

module config {

    // Scene Constants
    export class Scene {
        public static LOADING: number = 0;
        public static MENU: number = 1;
        public static INSTRUCTION: number = 2;
        public static LEVEL1: number = 3;
        public static INSTRUCTION2: number = 4;
        public static LEVEL2: number = 5;
        public static INSTRUCTION3: number = 6;
        public static LEVEL3: number = 7;
        public static END: number = 8;
        public static WIN: number = 9;
    }


    // Screen Constants
    export class Screen {
        public static WIDTH: number = 1000;
        public static HEIGHT: number = 600;
        public static CENTER_X: number = Screen.WIDTH / 2;
        public static CENTER_Y: number = Screen.HEIGHT / 2;
    }

    // Game Constants
    export class Game {
        public static FPS: number = 60;
    }
}