import {DB} from "./database";
import {mglobal} from "mg-dbx-napi";

class notes {
    constructor(){
        this.NOTES = new mglobal(DB, "notes");
    }

    addNote(user, podcastEpisode, timeStamp, noteString){

    }
}

/**
 * 
 * SCHEMA:
 * 
 * ^Notes {
 *  
 *      <user-email> : {
 *          TODO
 *      }
 * 
 * }
 */
export const NOTES = new notes();