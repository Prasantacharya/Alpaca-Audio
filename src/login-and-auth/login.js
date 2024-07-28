import {Elysia, redirect} from "elysia";
import {generateRandomInteger} from "oslo/crypto";
import { GitHub , generateState } from "arctic";
import { jwt } from '@elysiajs/jwt';

const clientId = process.env.GITHUB_CLIENT_ID // grab from env varaibles
const clientSecret = process.env.GITHUB_CLIENT_SECRET // grab from env variables
const github = new GitHub(clientId, clientSecret);

export const loginAndLogout = new Elysia("/accounts").get("/github/login", async ({redirect , cookie: {github_oauth_state}}) => {
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
})
.get("/github/login/callback", async ({query, cookie : {github_oauth_state, user_Cookie}}) => {
  if(!query.code || !github_oauth_state.value || query.state !== github_oauth_state.value){
    return new Response(null, {
      status: 401
    })
  }

  try {
    const tokens = await github.validateAuthorizationCode(query.code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
    const githubUserResult = await githubUserResponse.json();
    // 1. check if user exists
    // 2. generate JWT
    // 3. redirect to 

    user_Cookie.value = {
      isLoggedIn: true,
      username: "PrasantAcharya",
      uid: "prasantacharyabusiness@gmail.com",
      sessionId: 123123123123,
    };
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
})
.get("/logout", async () => {
  return <p>blah</p>;
});
