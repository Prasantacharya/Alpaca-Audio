import { Elysia} from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { routes, htmxRoutes } from "./src/routes.js";
import { loginAndLogout} from "./src/login-and-auth/login.js"

// initializing
const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .use(loginAndLogout)
  .use(routes)
  .use(htmxRoutes);
// end oauth 

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
