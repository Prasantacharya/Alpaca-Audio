import Elysia from 'elysia';
import { Feed, PaginateRows, PodcastSearchGrid } from './user-podcasts-page/index.jsx';
import { welcomePage } from './main-page/index.js';
import { loginModal, searchModal } from "./ui-components/modal.jsx";
import { authPlugin } from './login-and-auth/login.js';
import {USERS} from "./database/users.js";
import { FEED } from './database/feed.js';
import { search } from './database/podcast-search.js';
import { parseRSSFeed } from './user-podcasts-page/user-podcasts-scripts.js';

export const routes = new Elysia()
    .use(authPlugin)
    .get("/", () => {
        return welcomePage();
    })
    .get("/about", () => {
        
    })
    .get("/podcasts", ({userId}) => {
        
        let userProfile = {
            theme : "",
            rssFeedArr : [],
        };
        
        if(userId !== ""){
            // console.log("user logged in - " + userId);
            userProfile.theme = USERS.getUserTheme(userId);
            // console.log(userProfile.theme);
            userProfile.rssFeedArr = USERS.getUserRssFeeds(userId);
            // console.log(userProfile.rssFeedArr);
        }
        /**/
        return Feed(userProfile);
    })
    .get("/episodes", ({userId}) => {
        
    });

export const htmxRoutes = new Elysia()
    .use(authPlugin)
    .get("/modal/podcast", searchModal)
    .get("/modal/login", loginModal)
    .post("/add-rss", ({body: {searchbox}}) => {
        let feedInfo = FEED.getFeed(searchbox);
        let feedArr;
        if(feedInfo === -1){
            feedArr = search(searchbox);
        } else{
            feedArr.push(feedInfo);
        }
        // await parseRSSFeed(body.rssFeed);
        // grab the post from 
        return PodcastSearchGrid(searchbox, feedArr);
    })
    .get("/add-rows/", ({query: {searchQuery, page}}) => {
        console.log("TEST");
        console.log("Search for: " + searchQuery);
        let feedArr = search(searchQuery, 15, page * 15);
        return PaginateRows(searchQuery, feedArr, parseInt(page) + 1);
    })
    .delete("/delete-element", () => {return ;});