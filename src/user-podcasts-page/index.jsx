// TODO
import { NavBar, Footer } from "../ui-components/common";

export const Feed = (profile) => {
  console.log("Number of rss feeds: " + profile);
  let userComp = "";
  return (
    <html lang="en" data-theme={profile.theme}>
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
          <dialog id="searchRSS" class="modal">
            <div class="modal-box">
              <h3 class="text-lg font-bold">Hello!</h3>
              <p class="py-4">Press ESC key or click outside to close</p>
              <label class="input input-bordered flex items-center gap-2">
                <input 
                  type="text" 
                  class="grow" 
                  placeholder="Search" 
                  hx-post="/add-rss"
                  hx-target=""/>
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

const PodcastCard = (podcastInfo) => {
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

/** TODO */
const PodcastSearchGrid = () => {
  return (
    <table class="table-lg">
              { /* head */}
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
                
                { /* row 1 */}
                <tr class="hover">
                    { /* play icon*/}
                  <td class="text-primary">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="40" 
                        height="40" 
                        viewBox="0 0 24 24"
                        class="fill-current hover:scale-[1.05]"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="m9 17 8-5-8-5z"></path></svg>
                  </td>
                  { /* episode details */}
                  <td>
                    <div class="flex items-center gap-3">
                      <div class="avatar">
                        <div class="mask mask-squircle h-24 w-24">
                          <img
                          src="https://static.libsyn.com/p/assets/3/4/5/f/345fbd6a253649c0/RevolutionsLogo_V2.jpg"
                            alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div class="font-bold">Final Episode- Adieu Mes Amis</div>
                        <div class="text-sm opacity-50"><p>If you wanna drop a tip on your way out the door, <a href= "https://www.paypal.com/donate/?hosted_button_id=3KKMXWSYDRJ48">Click Here To Donate</a>.</p> <p>See you on the other side my friends.</p></div>
                      </div>
                    </div>
                  </td>
                  { /* duration */}
                  <td>39:04</td>
                  { /* pub date*/}
                  <td>
                    <div class="tooltip" data-tip="Sunday, 12/25/2022 @ 9:43">12/25/2022</div>
                  </td>
                  { /* Explicit tag */}
                  <th>
                    <div class="badge badge-warning tooltip" data-tip="Explicit">E</div>
                  </th>
                </tr>
                <tr class="hover">
                  { /* play icon*/}
                <td class="text-primary">
                  <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="40" 
                      height="40" 
                      viewBox="0 0 24 24"
                      class="fill-current hover:scale-[1.05]"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="m9 17 8-5-8-5z"></path></svg>
                </td>
                { /* episode details */}
                <td>
                  <div class="flex items-center gap-3">
                    <div class="avatar">
                      <div class="mask mask-squircle h-24 w-24">
                        <img
                        src="https://static.libsyn.com/p/assets/3/4/5/f/345fbd6a253649c0/RevolutionsLogo_V2.jpg"
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div class="font-bold">Final Episode- Adieu Mes Amis</div>
                      <div class="text-sm opacity-50"><p>If you wanna drop a tip on your way out the door, <a href= "https://www.paypal.com/donate/?hosted_button_id=3KKMXWSYDRJ48">Click Here To Donate</a>.</p> <p>See you on the other side my friends.</p></div>
                    </div>
                  </div>
                </td>
                { /* duration */}
                <td>39:04</td>
                { /* pub date*/}
                <td>
                  <div class="tooltip" data-tip="Sunday, 12/25/2022 @ 9:43">12/25/2022</div>
                </td>
                { /* Explicit tag */}
                <th>
                  <div class="badge badge-warning tooltip" data-tip="Explicit">E</div>
                </th>
                </tr>
                <tr class="hover">
                  { /* play icon*/}
                <td class="text-primary">
                  <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="40" 
                      height="40" 
                      viewBox="0 0 24 24"
                      class="fill-current hover:scale-[1.05]"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="m9 17 8-5-8-5z"></path></svg>
                </td>
                { /* episode details */}
                <td>
                  <div class="flex items-center gap-3">
                    <div class="avatar">
                      <div class="mask mask-squircle h-24 w-24">
                        <img
                        src="https://static.libsyn.com/p/assets/3/4/5/f/345fbd6a253649c0/RevolutionsLogo_V2.jpg"
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div class="font-bold">Final Episode- Adieu Mes Amis</div>
                      <div class="text-sm opacity-50"><p>If you wanna drop a tip on your way out the door, <a href= "https://www.paypal.com/donate/?hosted_button_id=3KKMXWSYDRJ48">Click Here To Donate</a>.</p> <p>See you on the other side my friends.</p></div>
                    </div>
                  </div>
                </td>
                { /* duration */}
                <td>39:04</td>
                { /* pub date*/}
                <td>
                  <div class="tooltip" data-tip="Sunday, 12/25/2022 @ 9:43">12/25/2022</div>
                </td>
                { /* Explicit tag */}
                <th>
                </th>
                </tr>
                
              </tbody>
              { /* foot */}
            </table>
  );
}