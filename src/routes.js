import Elysia from 'elysia';
import { main } from './user-podcasts-page/index.jsx';
import { loginModal, searchModal } from "./ui-components/modal.jsx";

export const routes = new Elysia()
    .get("/", main);

export const htmxRoutes = new Elysia()
    .get("/modal/podcast", searchModal)
    .get("/modal/login", loginModal)
    .delete("/delete-modal", () => {return ;});