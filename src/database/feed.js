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
        this.Feed.set(url, "title", feedObj.title);
        this.Feed.set(url, "description", feedObj.description);
        this.Feed.set(url, "image", feedObj.image);
        this.Feed.set(url, "pubDate", feedObj.pubDate);
    }
    
    /**
     * 
     * @param {string} url - RSS feed for the podcast
     * @returns 
     */
    getFeed(url){
        if(this.Feed.defined(url) === $DATA.DOES_NOT_EXIST)
            return -1;
        return {
            title: this.Feed.get(url, "title"),
            description: this.Feed.get(url, "description"),
            image: this.Feed.get(url, "image"),
            pubDate: this.Feed.get(url, "pubDate"),
        };
    }

    getFeedItem(url, item){
        if(this.Feed.defined(url) === $DATA.DOES_NOT_EXIST)
            return -1;
        return this.Feed.get(url, item);
    }

    updatePodcast(url, podObj){
        //grantee that the feed exists
        if(this.addFeed(url, podObj) === -1){
            Object.keys(podObj).forEach((key) => {
                this.Feed.set(url, key, podObj[key]);
            });
        }
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
 *      }, ...
 * }
 */
export const FEED = new feed();