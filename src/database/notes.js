import {DB, $DATA} from "./database";
import {mglobal, mcursor} from "mg-dbx-napi";

class notes {
    constructor(){
        this.Notes = new mglobal(DB, "notes");
    }

    /**
     * Adds a note to a user's episode
     * @param {string} user - user email
     * @param {string} podcastEpisode podcast episode
     * @param {int} timestamp 
     * @param {string} noteString 
     * @returns -1 if the note cannot be added
     */
    addNote(user, podcastEpisode, timestamp, noteString){
        if (this.Notes.defined(user, podcastEpisode) === $DATA.DOES_NOT_EXIST)
            return -1;
        this.Notes.set(user, podcastEpisode, timestamp, noteString);
        return 0;
    }

    /**
     * Gets all the notes written on a podcast episode 
     * @param {string} user 
     * @param {string} podcastEpisode 
     * @returns 
     */
    getEpisodeNotes(user, podcastEpisode){
        if(this.Notes.defined(user, podcastEpisode) === $DATA.DOES_NOT_EXIST)
            return [];
        const epArr = [];
        let query = new mcursor(DB, {global: "notes", key: [user]}, {getdata: true});
        while((result = query.next()) !== null){
            epArr.push(result);
        }
        return this.Notes.get(user, podcastEpisode, timestamp);
    }

    /**
     * 
     * @param {string} user 
     * @param {string} podcastEpisode 
     * @param {int} timestamp 
     * @returns -1 if the 
     */
    removeNote(user, podcastEpisode, timestamp){
        if (this.Notes.defined(user, podcastEpisode, timestamp) === $DATA.DOES_NOT_EXIST)
            return -1;
        this.Notes.delete(user, podcastEpisode, timestamp);
        return 0;
    }

    /**
     * 
     * @param {*} user 
     * @param {*} podcastEpisode 
     * @param {*} timestamp 
     * @param {*} noteString 
     * @returns 
     */
    updateNote(user, podcastEpisode, timestamp, noteString){
        if (this.Notes.defined(user, podcastEpisode) === $DATA.DOES_NOT_EXIST){
            return -1;
        }
        this.Notes.set(user, podcastEpisode, timestamp, noteString);
        return 0;
    }
}

/**
 * 
 * SCHEMA:
 * 
 * ^Notes {
 *  
 *      <user-email> : {
 *          <podcast-episode> : {
 *              <time in seconds>: "note" 
 *          }
 *      }
 * }
 */
export const NOTES = new notes();