import {DB, $DATA} from "./database";
import {mglobal, mcursor} from "mg-dbx-napi";


class feed {
    constructor(){
        this.Feed = new mglobal(DB, "feed");
    }

    /**
     * 
     * @param {string} url 
     * @param {optional} feedObj 
     */
    addFeed(url, feedObj){
        if(this.Feed.defined(url) === $DATA.DOES_NOT_EXIST)
            return -1;
        this.Feed.set(url, )
    }
    
    /**
     * 
     * @param {string} url - RSS feed for the podcast
     * @returns 
     */
    getFeed(url){
        if(this.Feed.defined(url) === $DATA.DOES_NOT_EXIST)
            return -1;
        let query = new mcursor(DB, {global: "feed", key: [url]}, {getdata: true});
        let result = query.next();
        if(result === null) return -1;
        return result;
    }

    updatePodcast(url, podObj, episodes){
        //grantee that the feed exists
        if(this.addFeed(url, podObj) === -1){
            Object.keys(podObj).forEach((key) => {
                this.Feed.set(url, key, podObj[key]);
            });
        }
        // go in chronological order
        episodes.forEach((epUrl) => {
            if(this.Feed.defined(url, "episodes", epUrl) === $DATA.DOES_NOT_EXIST){
                this.Feed.set(url, "episodes", epUrl);
            } else {
                // quit early if you have seen an episode before
                // assumes latest to earliest ordering
                return 0;
            }
        });
        // if you see an episode that 
        
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