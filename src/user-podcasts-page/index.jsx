// TODO
import { NavBar, Footer } from "../ui-components/common";

export const Feed = (profile) => {
  let userComp = "";
  let theme = profile.theme === "" ? "lofi" : profile.theme;
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

        <div id="podcast-area" class="bg-base-300 flex flex-row flex-wrap justify-center gap-5 items-stretch">
          <AddRSSFeedCard></AddRSSFeedCard>
          <dialog id="searchRSS" class="modal">
            <div class="modal-box">
              <h3 class="text-lg font-bold">Hello!</h3>
              <p class="py-4">Press ESC key or click outside to close</p>
              <form>
                <label class="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    name="searchbox"
                    class="grow"
                    placeholder="Search"
                    hx-trigger="keyup changed delay:300ms"
                    hx-post="/add-rss"
                    hx-target="#search-results"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    class="h-4 w-4 opacity-70"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </label>
              </form>
              <div id="search-results"></div>
            </div>
            <form method="dialog" class="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>

        <div class="grow bg-base-300"></div>
        <Footer></Footer>
      </body>
    </html>
  );
};

export const PodcastCard = (podcastInfo) => {
  console.log(podcastInfo);
  return (
    <div class="card card-compact hover:scale-[1.03] ease-in-out duration-150 cursor-pointer my-5 bg-base-100 shadow-xl glass max-w-60">
      <figure>
        <img src={podcastInfo.image} alt="podcast-image" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          <a href="daisy-ui-rewrite-list-episodes.html">{podcastInfo.title}</a>
        </h2>
        <p>{podcastInfo.description}</p>
        <div class="card-actions justify-end">
          <div class="badge badge-outline">{podcastInfo.totalEp} episodes</div>
        </div>
      </div>
    </div>
  );
};

const AddRSSFeedCard = () => {
  return (
    <div
      onclick="searchRSS.showModal()"
      class="card card-compact hover:scale-[1.03] ease-in-out duration-150 cursor-pointer my-5 bg-base-100 shadow-xl glass max-w-60"
    >
      <figure>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          class="fill-current"
        >
          <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z"></path>
          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
        </svg>
      </figure>
      <div class="card-body">
        <h2 class="card-title">Add RSS Feed</h2>
        <p>If you cant find a podcast you like, add the RSS Feed here</p>
      </div>
    </div>
  );
};

export const PodcastSearchGrid = (searchQuery, feedArr) => {
  let outputJSX = [];
  const paginateStr = "/add-rows/?page=2&searchQuery=" + searchQuery;
  feedArr.forEach((feedObj, i) => {
    if(i === feedArr.length - 1){
      outputJSX.push(
        <tr 
        class="hover"
        id="row-2"
        hx-target="#podcast-area"
        hx-trigger="click"
        hx-get={"/add-podcast/?url=" + feedObj.url}
        hx-swap="innerHTML"
        >
          <td
          hx-target="#row-2"
          hx-trigger="intersect once"
          hx-get={paginateStr}
          hx-swap="afterend"
          >
            <div class="avatar">
              <div class="mask mask-squircle h-24 w-24">
                <img src={feedObj.imageUrl} alt="Image Failed"/>
              </div>
            </div>
          </td>
          <td>
            <div class="flex items-center gap-3">
              <div class="font-bold">{feedObj.title}</div>
              <div class="text-sm opacity-50">{feedObj.description}</div>
            </div>
          </td>
        </tr>
      );
    } else {
      outputJSX.push(
        <tr 
        class="hover"
        hx-target="#podcast-area"
        hx-trigger="click"
        hx-get={"/add-podcast/?url=" + feedObj.url}
        hx-swap="innerHTML"
        >
          <td>
            <div class="avatar">
              <div class="mask mask-squircle h-24 w-24">
                <img src={feedObj.imageUrl} alt="Image Failed"/>
              </div>
            </div>
          </td>
          <td>
            <div class="flex items-center gap-3">
              <div class="font-bold">{feedObj.title}</div>
              <div class="text-sm opacity-50">{feedObj.description}</div>
            </div>
          </td>
        </tr>
      );
    }
  });

  return (
    <div class="overflow-x-auto">
      <table class="table table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {...outputJSX}
        </tbody>
      </table>
    </div>
  );
};

export const PaginateRows = (searchQuery, feedArr, page) => {
  let outputJSX = [];
  const paginateStr = "/add-rows/?page=" + page + "&searchQuery=" + searchQuery;
  feedArr.forEach((feedObj, i) => {
    if(i !== feedArr.length - 1){
      outputJSX.push(
      <tr 
      class="hover"
      hx-on:click="">
        <td>
          <div class="avatar">
            <div class="mask mask-squircle h-24 w-24">
              <img src={feedObj.imageUrl} alt="Image Failed"/>
            </div>
          </div>
        </td>
        <td>
          <div class="flex items-center gap-3">
            <div class="font-bold">{feedObj.title}</div>
            <div class="text-sm opacity-50">{feedObj.description}</div>
          </div>
        </td>
      </tr>
      );
    } else {
      outputJSX.push(
        <tr 
        class="hover"
        id={"row-" + page}>
          <td
          hx-target={'#row-' + page}
          hx-trigger="intersect once"
          hx-get={paginateStr}
          hx-swap="afterend"
          >
            <div class="avatar">
              <div class="mask mask-squircle h-24 w-24">
                <img src={feedObj.imageUrl} alt="Image Failed"/>
              </div>
            </div>
          </td>
          <td>
            <div class="flex items-center gap-3">
              <div class="font-bold">{feedObj.title}</div>
              <div class="text-sm opacity-50">{feedObj.description}</div>
            </div>
          </td>
        </tr>
        );
    }
  });
  return (
    <>
      {...outputJSX}
    </>

  );
}

export const PodcastEpisodeGrid = () => {
  return (
    <>
      
    </>
  );
}