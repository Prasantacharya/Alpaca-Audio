import { NavBar, Footer } from "../ui-components/common";

export const Episodes = (podcast, episodes, theme) => {
  theme = theme === "" ? "lofi" : theme;
  let episodeRows = [];
  
  episodes.forEach((episode, i) => {
    episodeRows.push(EpisodeRow(episode.title, episode.image, episode.description, episode.link, episode.duration, episode.pubDate, episode.explicit));
  });
  
  return (
    <html lang="en" data-theme={theme}>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          src="https://unpkg.com/htmx.org@2.0.2"
          integrity="sha384-Y7hw+L/jvKeWIRRkqWYfPcvVxHzVzn5REgzbawhxAuQGwX1XWe70vji+VSeHOThJ"
          crossorigin="anonymous"
        ></script>
        <title>Alpaca Audio</title>
      </head>
      <body class="h-screen flex flex-col">
        <NavBar></NavBar>

        <div class="bg-base-300 flex flex-col items-center gap-5 px-4">
          <h2 class="font-bold text-2xl pt-3">{podcast.title}</h2>
          <img src={podcast.image} class="rounded-lg shadow-md max-w-80" />
          <div>{podcast.description}</div>
          <div class="overflow-x-auto">
            <table class="table-lg">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {...episodeRows}
              </tbody>
            </table>
          </div>
        </div>

        <div class="grow bg-base-300"></div>
        <Footer></Footer>
      </body>
    </html>
  );
};

const EpisodeRow = (title, img, description, url, duration, pubDate, explicit) => {
  console.log("EPISODE = " + url);
  const date = new Date(pubDate);
  return (
    <tr class="hover">
      <td class="text-primary">
        <button class="button">
          <a href={url}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              class="fill-current hover:scale-[1.05]"
            >
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
              <path d="m9 17 8-5-8-5z"></path>
            </svg>
          </a>
        </button>
      </td>

      <td>
        <div class="flex items-center gap-3">
          <div class="avatar">
            <div class="mask mask-squircle h-24 w-24">
              <img
                src={img}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div class="line-clamp-5">
            <div class="font-bold">{title}</div>
            <div class="text-sm opacity-50">
              {description}
            </div>
          </div>
        </div>
      </td>

      <td>{convertToTimeStamp(duration)}</td>

      <td>
        <div class="tooltip" data-tip={pubDate}>
          {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
        </div>
      </td>

      <th>{
        explicit === "yes" ? <div class="badge badge-warning tooltip" data-tip="Explicit">
          E
        </div> : <></>
        }
      </th>
    </tr>
  );
};

function convertToTimeStamp(time){
  if(time.indexOf(":") !== -1){
    return time;
  }
  // update the time stamp
  let tempTime = "";
  let hours = Math.floor(time / 3600);
  // helper lambda
  const paddingZero = (num) => num.toString().padStart(2,'0');
  // add hours
  tempTime += (hours > 0 ? paddingZero(hours) + ":" : "");
  time %= 3600;
  let minutes = Math.floor(time / 60);
  // minutes
  tempTime += paddingZero(minutes) + ":";
  let seconds = Math.floor(time % 60);
  // seconds
  tempTime += paddingZero(seconds);
  return tempTime;
}