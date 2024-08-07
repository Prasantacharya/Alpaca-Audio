import {$DATA, DB} from "./database";
import {mglobal} from "mg-dbx-napi";

class Users {
    /**
     * Creates a connection to the user database
     */
    constructor(){
        this.Users = new mglobal(DB, "users");
    }

    addUser(user, displayName = ""){
        if(this.Users.defined(user) === $DATA.DOES_NOT_EXIST)
            return -1;
        this.Users.set(user, displayName);
    }

    followRSS(user, url){
        if(this.Users.defined(user) === $DATA.DOES_NOT_EXIST)
            return -1;
        this.Users.set(user, "rss", url, "");
    }

    getUserRssFeeds(user){
        if(this.Users.defined(user) === $DATA.DOES_NOT_EXIST)
            return -1;
        let query = new mcursor(DB, {global: "users", key: [user, "rss"]}, {multilevel: true});
        let feeds = [];
        let result;
        while((result = query.next()) !== null && result.key[0] === user && result.key[1] === "rss"){
            feeds.push(result.key[2]);
        }
        return feeds;
    }

    deleteUser(user){
        if(this.Users.defined(user) === $DATA.DOES_NOT_EXIST)
            return -1;
        this.Users.delete(user);
    }

    removeUserRssFeed(user, url){
        if(this.Users.defined(user) === $DATA.DOES_NOT_EXIST)
            return -1;
        this.Users.delete(user, "rss", url);
    }
}

/**
 * Database global that stores the users and their RSS feeds
 * Below is the schema for how the data is stored and queried
 * 
 * ^USERS : {
 *
 *      <user-email>: {
 *          display-name: "<From github>",
 *          RSS : [
 *             <RSS-feed-url>: "",
 *              ... 
 *          ]
 *      }, ...
 * }
 */
export const USERS = new Users();