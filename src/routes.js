import Elysia from 'elysia';
import { Feed } from './user-podcasts-page/index.jsx';
import { welcomePage } from './main-page/index.js';
import { loginModal, searchModal } from "./ui-components/modal.jsx";
import { authPlugin } from './login-and-auth/login.js';
import {USERS} from "./database/users.js";
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
            username : "",
            rssFeedArr : [],
        };
        if(userId !== ""){
            userProfile.username = userId;
            userProfile.rssFeedArr = USERS.getUserRssFeeds(userId);
        }
        return Feed(userProfile);
    })
    .get("/episodes", ({userId}) => {
        
    });

export const htmxRoutes = new Elysia()
    .use(authPlugin)
    .get("/modal/podcast", searchModal)
    .get("/modal/login", loginModal)
    .post("/add-rss", async ({userId, body}) => {
        if(userId === "") return ;
        console.log(body);
        // grab the post from 
        // await parseRSSFeed(body.rssFeed);
    })
    .delete("/delete-element", () => {return ;});