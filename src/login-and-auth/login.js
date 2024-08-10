import {Elysia, redirect, t} from "elysia";
import { GitHub , generateState } from "arctic";
import { USERS } from "../database/users.js";
import { jwt } from '@elysiajs/jwt';
import {ACCESS_TOKEN_EXP, JWT_NAME, SECURE_FLAG} from "../../login-config.js"

const clientId = process.env.GITHUB_CLIENT_ID // grab from env variables
const clientSecret = process.env.GITHUB_CLIENT_SECRET // grab from env variables
const github = new GitHub(clientId, clientSecret);

if(!SECURE_FLAG) console.log("WARNING - SECURE_FLAG in login.js set to false!")

function getExpTimestamp(seconds) {
  const currentTimeMillis = Date.now();
  const secondsIntoMillis = seconds * 1000;
  const expirationTimeMillis = currentTimeMillis + secondsIntoMillis;
  
  return Math.floor(expirationTimeMillis / 1000);
}

// plugin to handle auth 
export const authPlugin = (app) => app.use(
    jwt({
      name: JWT_NAME,
      secret: process.env.JWT_SECRET
    })
  )
  .derive( async ({ jwt, set, cookie: {accessToken}}) => {
    // if the refresh token isnt there, then the user is logged out
    if(!accessToken.value) {
      set.status = "Unauthorized";
      return {
        userId: ""
      }
    }
    const accessTokenVerified = await jwt.verify(accessToken.value);
    if (!accessTokenVerified){
      set.status = "Forbidden";
      throw new Error("Refresh Token incorrect");
    }
    
    return {
      userId: accessTokenVerified.sub
    };
  });

export const loginAndLogout = new Elysia({ prefix: "/accounts"})
.use(jwt({
  name: JWT_NAME,
  secret: process.env.JWT_SECRET
}))
.get("/github/login", async ({redirect , cookie: {github_oauth_state}}) => {
    const state = generateState();
    const url = await github.createAuthorizationURL(state, {
      scopes: ["user:email"]
    });
    github_oauth_state.set({
      "value": state,
      "httpOnly": true,
      "secure": SECURE_FLAG,
      "path": "/"
    });
    return redirect(url);
})
.get("/github/login/callback", async ({query, jwt, cookie : {github_oauth_state, accessToken}}) => {
  // check if oauth response is all good
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
    const githubUserData = await githubUserResponse.json();
    // check if database has this user
    console.log(githubUserData.email + " : " + githubUserData.name);
    // USERS.addUser(githubUserData.email, githubUserData.name);

    const accessJWTToken = await jwt.sign({
      sub: githubUserData.email, // user id
      exp: getExpTimestamp(ACCESS_TOKEN_EXP),
    }); 
    accessToken.set({
      value: accessJWTToken,
      httpOnly: true,
      maxAge: ACCESS_TOKEN_EXP,
      secure: SECURE_FLAG
    });

    return redirect("/podcasts");
  } catch (e) {
    console.log("UH OH SPAGETTI OH : " + e);
  }

  // replace with a redirect to '/'
  return new Response(null, {
    status: 301,
    headers: {
      Location: "/",
    }
  }).redirect("/accounts/test", 301);
}, {
    query: t.Object({
        code: t.String(),
        state: t.String(),
    })
    // add afterHandle to edit the header
})
.get("/test", async ({jwt, cookie: {accessToken}}) => {
  const profile = await jwt.verify(accessToken.value);
  if (!profile){
      set.status = 401;
      return 'Unauthorized';
  }
    return "Authed + " + profile.sub;
})
.get("/logout", async ({ redirect, jwt, cookie: {accessToken}}) => {
  // increment the refresh token
  if(!accessToken.value) {
    set.status = "Unauthorized";
    return redirect("/")
  }
  const accessTokenVerified = await jwt.verify(accessToken.value);
  if (!accessTokenVerified){
    set.status = "Forbidden";
  }
  accessToken.remove();
  return redirect("/");
});
