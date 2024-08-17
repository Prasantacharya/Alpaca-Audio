import Elysia from 'elysia';
import { Feed, PaginateRows, PodcastCard, PodcastSearchGrid } from './user-podcasts-page/index.jsx';
import { welcomePage } from './main-page/index.js';
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
    .get("/feed", ({userId}) => {
        let userProfile = {
            theme : "",
            rssFeedArr : [],
        };
        if(userId !== ""){
            userProfile.theme = USERS.getUserTheme(userId);
            userProfile.rssFeedArr = USERS.getUserRssFeeds(userId);
        }
        return Feed(userProfile);
    })
    .get("/episodes", ({userId}) => {
        
    });

export const htmxRoutes = new Elysia()
    .use(authPlugin)
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
    .get("/add-podcast/", async ({userId, query: {url}}) => {
        console.log("TEST ADD-PODCAST");
        let [podcast, episode] = await parseRSSFeed(url);
        if(userId !== ""){
            console.log("USER LOGGED IN")
            // add podcast to user field
            USERS.followRSS(userId, url);
        } else {
            console.log("USER NOT LOGGED IN");
        }
        console.log(podcast.title);
        return PodcastCard(podcast, episode.length);
    })
    .delete("/delete-element", () => {return ;});