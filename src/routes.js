import Elysia from 'elysia';
import { main } from './user-podcasts-page/index.jsx';
import { loginModal, searchModal } from "./ui-components/modal.jsx";
import { jwt } from '@elysiajs/jwt';
import { JWT_NAME } from "../login-config.js"; 

export const routes = new Elysia()
    .use(jwt({
        name: JWT_NAME,
        secret: process.env.JWT_SECRET
    }))
    .get("/", main);

export const htmxRoutes = new Elysia()
    .get("/modal/podcast", searchModal)
    .get("/modal/login", loginModal)
    .delete("/delete-modal", () => {return ;});