import Elysia from 'elysia';
import { main } from './user-podcasts-page/index.jsx';
import { loginModal, searchModal } from "./ui-components/modal.jsx";
import { jwt } from '@elysiajs/jwt';
import { JWT_NAME } from "../login-config.js"; 
import { authPlugin } from './login-and-auth/login.js';

export const routes = new Elysia()
    .use(authPlugin)
    .get("/", ({user}) => {
        return main();
    });

export const htmxRoutes = new Elysia()
    .get("/modal/podcast", searchModal)
    .get("/modal/login", loginModal)
    .delete("/delete-element", () => {return ;});