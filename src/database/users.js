import {DB} from "./database";
import {mglobal} from "mg-dbx-napi";

class Users {
    /**
     * Creates a connection to the user database
     */
    constructor(){
        this.Users = new mglobal(DB, "users");
    }

    addUser(){

    }

    getUserRssFeeds(){

    }

    deleteUser(){

    }

    removeUserRssFeed(){

    }
}

/**
 * Database global that stores the users and their RSS feeds
 * Below is the schema for how the data is stored and queried
 * 
 * ^USERS : {
 *
 *      <user-email>: {
 *          preferred-name: "<From github>",
 *          RSS : [
 *             <RSS-feed-url>: "",
 *              ... 
 *          ]
 *      }, ...
 * }
 */
export const USERS = new Users();