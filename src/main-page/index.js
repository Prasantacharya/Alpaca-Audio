// TODO
import { NavBar, AlpacaSVG, Footer } from "../ui-components/common";

export const welcomePage = () => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <script src="https://cdn.tailwindcss.com"></script>
        <title>Document</title>
      </head>
      <body class="h-screen flex flex-col">
        <NavBar></NavBar>

        <div class="hero bg-base-200 min-h-screen">
          <div class="hero-content text-center">
            <div class="max-w-md">
              <div class="flex-column justify-items-center text-primary">
                <AlpacaSVG height="100%" width="100%"></AlpacaSVG>
              </div>

              <h1 class="text-5xl font-bold">Alpaca Audio</h1>
              <p class="py-6">Annotate Audio with Alpaca!</p>
              <a href="./daisy-ui-rewrite-add-rss.html">
                <button class="btn btn-primary">Get Started</button>
              </a>
            </div>
          </div>
        </div>

        <div class="grow bg-base-300"></div>
        <Footer></Footer>
      </body>
    </html>
  );
};
