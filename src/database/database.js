import {server} from 'mg-dbx-napi';

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

export const $DATA = {
    DOES_NOT_EXIST : "0",
    EXISTS_AND_NO_DESCENDANTS : "1",
    HAS_DATA_AND_DESCENDANTS : "11",
    NO_DATA_AND_DESCENDANTS : "10"
}
