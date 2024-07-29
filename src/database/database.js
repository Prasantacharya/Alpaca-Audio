import {server, mglobal, mclass} from 'mg-dbx-napi';

export const DB = new server();

// set up the schema
DB.open({
    type: "YottaDB",
    path: "/usr/local/lib/yottadb/r200",
    env_vars: {
        ydb_gbldir: process.env.ydb_gbldir, // get from env
        ydb_routines: process.env.ydb_routines, // get from env
        ydb_ci: process.env.ydb_ci, // get from env
    }
});

export const FEED = new mglobal(DB, "feed"); // list of rss feeds and the data associated with them
export const USERS = new mglobal(DB, "users");
export const NOTES = new mglobal(DB, "notes");