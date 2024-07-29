import {Elysia, redirect, t} from "elysia";
import { GitHub , generateState } from "arctic";
import { USERS, $DATA } from "../database/database.js"
import { jwt } from '@elysiajs/jwt';
import {ACCESS_TOKEN_EXP, REFRESH_TOKEN_EXP, JWT_NAME, SECURE_FLAG} from "../../login-config.js"

const clientId = process.env.GITHUB_CLIENT_ID // grab from env varaibles
const clientSecret = process.env.GITHUB_CLIENT_SECRET // grab from env variables
const github = new GitHub(clientId, clientSecret);

if(!SECURE_FLAG) console.log("WARNING - SECURE_FLAG in login.js set to false!")

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
.get("/github/login/callback", async ({query, jwt, cookie : {github_oauth_state, accessToken, refreshToken}}) => {
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
    var refreshTokenVersion = -1;
    // check if database has this user
    switch (USERS.defined(githubUserData.email)){
      case $DATA.DOES_NOT_EXIST:
        // sign up the user
        USERS.set(githubUserData.email, githubUserData.name);
        USERS.set(githubUserData.email, "refreshTokenIncrement", "0");
        refreshTokenVersion = 0;
        break;
      case $DATA.EXISTS_AND_NO_DESCENDANTS:
        // should be impossible
        // if you are here, that means the refresh token increment is not there at a minimum
        break;
      case $DATA.HAS_DATA_AND_DESCENDANTS:
        // the user exists, and they 
        refreshTokenVersion = parseInt(USERS.increment(githubUserData.email, "refreshTokenIncrement"));
        break;
      case $DATA.NO_DATA_AND_DESCENDANTS:
        // this should be impossible, flag error just in case
        break;
      default:
        // returns null, panic
        break;
    }

    const accessJWTToken = await jwt.sign({
      sub: githubUserData.email, // user id
      exp: ACCESS_TOKEN_EXP,
    }); 
    accessToken.set({
      value: accessJWTToken,
      httpOnly: true,
      maxAge: ACCESS_TOKEN_EXP,
      secure: SECURE_FLAG
    });

    const refreshJWTToken = await jwt.sign({
      sub: githubUserData.email,
      exp: REFRESH_TOKEN_EXP,
      refresh_token_version : refreshTokenVersion
    });

    refreshToken.set({
      value: refreshJWTToken,
      httpOnly: true,
      secure: SECURE_FLAG,
      maxAge: REFRESH_TOKEN_EXP,
    });
    return redirect("/");
  } catch (e) {
    console.log("UH OH SPAGETTI OH : " + e);
  }

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
.get("/refresh", async () => {

})
.get("/logout", async () => {
  
});
