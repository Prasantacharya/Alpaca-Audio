import {DB} from "./database";
import {mglobal} from "mg-dbx-napi";


class feed {
    constructor(){
        this.FEED = new mglobal(DB, "feed");
    }


}

/**
 * SCHEMA:
 * ^FEED : {
 * 
 *      <rss-feed-link>: {
 * 
 *          title: "",
 * 
 * 
 *      }
 * }
 */
export const FEED = new feed();