import {DB, $DATA} from "./database";
import {mglobal, mcursor} from "mg-dbx-napi";


class feed {
    constructor(){
        this.Feed = new mglobal(DB, "feed");
    }

    generateFeedId(title){
        
    }
    /**
     * 
     * @param {string} url 
     * @param {optional} feedObj 
     */
    addFeed(url, feedObj){
        if(this.Feed.defined(url) !== $DATA.DOES_NOT_EXIST){
            return -1;
        }
        this.Feed.set(url, "title", feedObj.title);
        this.Feed.set(url, "description", feedObj.description);
        this.Feed.set(url, "image", feedObj.image);
        this.Feed.set(url, "pubDate", feedObj.pubDate);
        this.Feed.set(url, "episodes");
    }
    
    /**
     * 
     * @param {string} url - RSS feed for the podcast
     * @returns 
     */
    getFeed(url){
        if(this.Feed.defined(url) !== $DATA.HAS_DATA_AND_DESCENDANTS)
            return -1;
        return {
            title: this.Feed.get(url, "title"),
            description: this.Feed.get(url, "description"),
            image: this.Feed.get(url, "image"),
            pubDate: this.Feed.get(url, "pubDate"),
        };
    }

    updatePodcast(url, podObj){
        //grantee that the feed exists
        if(this.addFeed(url, podObj) === -1){
            Object.keys(podObj).forEach((key) => {
                this.Feed.set(url, key, podObj[key]);
            });
        }
    }

    addEpisodes(url, episodeArr){
        if(this.Feed.defined(url) === $DATA.DOES_NOT_EXIST)
            return -1;
        episodeArr.forEach((epObj, i) => {
            this.Feed.set(url, "episodes", i, "title", epObj.title);
            this.Feed.set(url, "episodes", i, "pubDate", epObj.pubDate);
            this.Feed.set(url, "episodes", i, "description", epObj.description);
            this.Feed.set(url, "episodes", i, "explicit", epObj.explicit);
        });
        return 0;
    }

    getEpisodes(url, start, end){
        if(this.Feed.defined(url) === $DATA.DOES_NOT_EXIST)
            return -1;
        let retArr = [];
        for (let i = start; i < end; i++) {
            if(this.Feed.defined(url, 'episodes', i) == $DATA.DOES_NOT_EXIST){
                return retArr;
            }
            retArr.push({
                title : this.Feed.get(url, "episodes", i, "title"),
                pubDate : this.Feed.get(url, "episodes", i, "pubDate"),
                description : this.Feed.get(url, "episodes", i, "description"),
                explicit : this.Feed.get(url, "episodes", i, "explicit")
            });
        }
        return retArr;
    }
}

/**
 * SCHEMA:
 * ^FEED : {
 *      <rss-feed-link>: {
 *          title: "",
 *          description: "",
 *          image: "image link"
 *          pubDate: "date",
 *          episodes: [
 *              0: {
 *                  title: "",
 *                  pubDate: "",
 *                  description: "",
 *                  explicit: ""
 *              }, ...
 *          ]
 *      }, ...
 * }
 */
export const FEED = new feed();