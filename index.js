import { Cookie, Elysia,redirect,t } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { GitHub , generateState } from "arctic";
import { routes, apiRoutes, REQUEST_TYPE } from "./src/routes.js";
import { SESSIONS } from "./src/database.js";
import { serializeCookie } from "oslo/cookie";
import {generateRandomInteger} from "oslo/crypto"

const app = new Elysia().use(html()).use(staticPlugin());

routes.forEach((routerObj) => {
  app.get(routerObj.route, routerObj.callback);
});

apiRoutes.forEach((apiObj) => {
  app.get(apiObj.route, apiObj.callback);
  switch (apiObj.type) {
    case REQUEST_TYPE.GET:
      app.get(apiObj.route, apiObj.callback);
      break;
    case REQUEST_TYPE.POST:
      app.post(apiObj.route, apiObj.callback);
      break;
    case REQUEST_TYPE.DELETE:
      app.delete(apiObj.route, apiObj.callback);
      break;
    case REQUEST_TYPE.UPDATE:
      app.update(apiObj.route, apiObj.callback);
      break;
    default:
      app.get(apiObj.route, apiObj.callback);
      break;
  }
});

//// -- deal with oauth here
const clientId = process.env.GITHUB_CLIENT_ID // grab from env varaibles
const clientSecret = process.env.GITHUB_CLIENT_SECRET // grab from env variables
const github = new GitHub(clientId, clientSecret);

app.get("/accounts/github/login", async ({redirect , cookie: {github_oauth_state}}) => {
    const state = generateState();
    const url = await github.createAuthorizationURL(state, {
      scopes: ["user:email"]
    });
    github_oauth_state.set({
      "value": state,
      "httpOnly": true,
      "secure": false,
      "path": "/"
    });
    return redirect(url);
});

app.get("/accounts/github/login/callback", async ({query, cookie : {github_oauth_state, user_Cookie}}) => {
  console.log("! -- RESPONSE FROM GITHUB! -- !");
  if(!query.code || !github_oauth_state.value || query.state !== github_oauth_state.value){
    return new Response(null, {
      status: 401
    })
  }

  try {
    console.log("ASKING GITHUB FOR USER INFO")
    const tokens = await github.validateAuthorizationCode(query.code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
    console.log("FETCHING")
    const githubUserResult = await githubUserResponse.json();
    console.log(user_Cookie);
    user_Cookie.value = {
      isLoggedIn: true,
      username: "PrasantAcharya",
      uid: "prasantacharyabusiness@gmail.com",
      sessionId: 123123123123,
    };
    // TODO
    // create session for user
    /** 
    user.set()
    */
    // add csrf token to header
    // creates an 8 digit random number for the csrf token
    const csrfToken = generateRandomInteger(10000000);
    const userName = "TEST";
    // 
    return redirect("/")
  } catch (e) {
    console.log("UH OH SPAGETTI OH : " + e);
  }
  console.log("MADE IT")
  // replace with a redirect to '/'
  return new Response(null, {
    status: 301,
    headers: {
      Location: "/",
    }
  }).redirect("/", 301);
}, {
    query: t.Object({
        code: t.String(),
        state: t.String(),
    })
    // add afterHandle to edit the header
});

app.get("/logout", async () => {
  return <p>blah</p>;
});

// end oauth 

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
