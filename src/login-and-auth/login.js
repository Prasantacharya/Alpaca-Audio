import {Elysia, redirect, t} from "elysia";
import { GitHub , generateState } from "arctic";
import { USERS, $DATA } from "../database/database.js"
import { jwt } from '@elysiajs/jwt';
import {ACCESS_TOKEN_EXP, REFRESH_TOKEN_EXP, JWT_NAME, SECURE_FLAG} from "../../login-config.js"

const clientId = process.env.GITHUB_CLIENT_ID // grab from env variables
const clientSecret = process.env.GITHUB_CLIENT_SECRET // grab from env variables
const github = new GitHub(clientId, clientSecret);

const REFRESH_TOKEN_INCREMENT = "refreshTokenIncrement";

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
  .derive( async ({ jwt, set, cookie: {accessToken, refreshToken}}) => {
    // if the refresh token isnt there, then the user is logged out
    if(!refreshToken.value) {
      set.status = "Unauthorized";
      throw new Error("Refresh Token Missing");
    }
    const refreshVerify = await jwt.verify(refreshToken.value);
    if (!refreshVerify){
      set.status = "Forbidden";
      throw new Error("Refresh Token incorrect");
    }
    let accessTokenVerified;
    if(!accessToken.value){
      // generate a new access token if its expired
      accessTokenVerified = {
        sub: refreshVerify.sub, // user id
        exp: getExpTimestamp(ACCESS_TOKEN_EXP),
      }
      const accessJWTToken = await jwt.sign(accessTokenVerified);
      accessToken.set({
        value: accessJWTToken,
        httpOnly: true,
        maxAge: ACCESS_TOKEN_EXP,
        secure: SECURE_FLAG
      });
    } else {
      accessTokenVerified = await jwt.verify(accessToken.value);
      if(!accessTokenVerified){
        set.status = "Forbidden";
        throw new Error("Access Token incorrect");
      }
    }
    // if the refresh token version does not match with the version in the database
    // that means that the user is logged out
    if(refreshVerify.refresh_token_version !== parseInt(USERS.get(accessTokenVerified.sub, REFRESH_TOKEN_INCREMENT))){
      return {
        userId: "user signed out of all devices"
      }
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
        USERS.set(githubUserData.email, REFRESH_TOKEN_INCREMENT, "0");
        refreshTokenVersion = 0;
        break;
      case $DATA.HAS_DATA_AND_DESCENDANTS:
        // the user exists, and they 
        refreshTokenVersion = parseInt(USERS.increment(githubUserData.email, REFRESH_TOKEN_INCREMENT));
        break;
      default:
        // error handling
        break;
    }

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

    const refreshJWTToken = await jwt.sign({
      sub: githubUserData.email,
      exp: getExpTimestamp(REFRESH_TOKEN_EXP),
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
  }).redirect("/accounts/test", 301);
}, {
    query: t.Object({
        code: t.String(),
        state: t.String(),
    })
    // add afterHandle to edit the header
})
.get("/test", async ({jwt, cookie: {accessToken, refreshToken}}) => {
  const profile = await jwt.verify(accessToken.value);
  const refresh = await jwt.verify(refreshToken.value);
  if (!profile){
      set.status = 401;
      return 'Unauthorized';
  }
    return "Authed + " + profile.sub;
})
.get("/logout", async ({ redirect, jwt, cookie: {accessToken, refreshToken}}) => {
  // increment the refresh token
  if(!accessToken.value || !refreshToken.value) {
    set.status = "Unauthorized";
  }
  const accessTokenVerified = await jwt.verify(accessToken.value);
  const refreshVerify = await jwt.verify(accessToken.value);
  if (!refreshVerify || !jwtVerify){
    set.status = "Forbidden";
  }
  // after auth token runs out, that should invalidate all sessions
  USERS.increment(accessTokenVerified.sub, REFRESH_TOKEN_INCREMENT, 1);
  return redirect("/");
});
