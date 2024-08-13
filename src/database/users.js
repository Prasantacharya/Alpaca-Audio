import {$DATA, DB} from "./database";
import {mglobal} from "mg-dbx-napi";

class Users {
    /**
     * Creates a connection to the user database
     */
    constructor(){
        this.Users = new mglobal(DB, "users");
    }

    addUser(user, theme = "lofi"){
        if(this.Users.defined(user) !== $DATA.DOES_NOT_EXIST)
            return -1;
        this.Users.set(user, theme);
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

    getUserTheme(user){
        if(this.Users.defined(user) === $DATA.DOES_NOT_EXIST)
            return -1;
        return this.Users.get(user)
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
 *          "<user theme>", // default is lofi
 *          RSS : [
 *             <RSS-feed-url>: "",
 *              ... 
 *          ]
 *      }, ...
 * }
 */
export const USERS = new Users();