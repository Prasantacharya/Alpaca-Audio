// TODO
import { NavBar, Footer } from "../ui-components/common";

export const Feed = (userid) => {
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
        <title>Alpaca Audio</title>
      </head>
      <body class="h-screen flex flex-col">
        <NavBar></NavBar>

        <div class="bg-base-300 flex flex-row flex-wrap justify-center gap-5 items-stretch">
            <AddRSSFeedCard></AddRSSFeedCard>
        </div>

        <div class="grow bg-base-300"></div>
        <Footer></Footer>
      </body>
    </html>
  );
};

const PodcastCard = (podcastInfo) => {
    return (
        <div class="card card-compact hover:scale-[1.03] ease-in-out duration-150 cursor-pointer my-5 bg-base-100 shadow-xl glass max-w-60">
          <figure>
            <img
              src={podcastInfo.image}
              alt="podcast-image" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">
              <a href="daisy-ui-rewrite-list-episodes.html">
                {podcastInfo.title}
              </a>
            </h2>
            <p>{podcastInfo.description}</p>
            <div class="card-actions justify-end">
              <div class="badge badge-outline">{podcastInfo.totalEp} episodes</div>
            </div>
          </div>
      </div>
    );
}

const AddRSSFeedCard = () => {
    return (
<div class="card card-compact hover:scale-[1.03] ease-in-out duration-150 cursor-pointer my-5 bg-base-100 shadow-xl glass max-w-60">
        <figure>
          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="100%" 
          height="100%" 
          viewBox="0 0 24 24" 
          class="fill-current"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z"></path><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path></svg>
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            Add RSS Feed
          </h2>
          <p>If you cant find a podcast you like, add the RSS Feed here</p>
        </div>
      </div>

    );
}