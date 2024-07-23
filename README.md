# TimeStamped
The podcast annotation app

## Yottadb install instructions:

standard yottadb install:

make sure you are in the project directory 

### Step 1

> mkdir /tmp/tmp && cd /tmp/tmp && wget https://download.yottadb.com/ydbinstall.sh && chmod +x ydbinstall.sh

This downloads and makes executable the yottadb install script in a tmp directory

### Step 2

> sudo ./ydbinstall.sh --utf8

This is the standard yottadb install with utf8 support

### Step 3

Setup for mg-dbx-napi

> source /usr/local/etc/ydb_env_unset

unset any env variables that could be there

> export ydb_dir="whatever directory you want to be working in"

be sure to set the directory to whatever working directory you want the database to be in.
For this project, the default is in the yottadb folder. To set it there, use

> export ydb_dir=$PWD/yottadb

### Step 4

> source /usr/local/etc/ydb_env_set

this sets the environment variables `$ydb_gbldir`, `$ydb_routines`

There is one env variable `$ydb_ci` that is not set, set that in the .env file. The default for the project is `/usr/local/lib/yottadb/r200/zmgsi.ci`

### Step 5

Installing mg-dbx-napi

> bun install mg-dbx-napi@1.4.10

You should be have the everything for the database set up! 

If you close the terminal you are working in, you have to repeat step 3 and 4 before running.
You can use `bun run init-db` to automate steps 3 and 4 for you.