import {DB, $DATA} from "./database";
import {mglobal} from "mg-dbx-napi";


class feed {
    constructor(){
        this.FEED = new mglobal(DB, "feed");
    }

    /**
     * 
     * @param {string} url 
     * @param {optional} feedObj 
     */
    addFeed(url, feedObj){
        if(this.FEED.defined(url) === $DATA.DOES_NOT_EXIST)
            return -1;
        this.FEED.set(url, )
    }
    
    /**
     * 
     * @param {string} url - RSS feed for the podcast
     * @returns 
     */
    getFeed(url){
        if(this.FEED.defined(url) === $DATA.DOES_NOT_EXIST)
            return -1;
        let query = new mcursor(DB, {global: "feed", key: [url]}, {getdata: true});
        let result = query.next();
        if(result === null) return -1;
        return result;
    }

    updateFeed(url, feedObj){
        //grantee that the feed exists
        if(this.addFeed(url, feedObj) === -1){
            this.FEED.set(url, )
        }
        
    }
}

/**
 * SCHEMA:
 * ^FEED : {
 * 
 *      <rss-feed-link>: {
 *          title: "",
 *          description: "",
 *          image: "image link"
 *          pubDate: "date"
 *          episodes: [
 *              <link>: "1",
 *              ...
 *          ]
 *      }, ...
 * }
 */
export const FEED = new feed();