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
        this.Users.set(user, url, "");
    }

    getUserRssFeeds(user){
        if(this.Users.defined(user) === $DATA.DOES_NOT_EXIST)
            return -1;

    }

    deleteUser(user){
        if(this.Users.defined(user) === $DATA.DOES_NOT_EXIST)
            return -1;
        this.Users.delete(user);
    }

    removeUserRssFeed(user, url){
        if(this.Users.defined(user) === $DATA.DOES_NOT_EXIST)
            return -1;
        this.Users.delete(user, url);
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