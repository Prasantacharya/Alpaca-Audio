import { NavBar, Footer } from "../ui-components/common";

export const EpisodePlayerPage = () => {
  return (
    <html>
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
        <div class="bg-base-300 flex flex-col items-center gap-5">
          <div class="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content flex flex-col items-center gap-4">
              {/* Page content here */}
              <h2 class="font-bold text-2xl pt-3">Revolutions Podcast</h2>
              <img
                src="https://static.libsyn.com/p/assets/3/4/5/f/345fbd6a253649c0/RevolutionsLogo_V2.jpg"
                class="rounded-lg shadow-md max-w-80"
              />

              {/* shows up when the width is small */}
              <label
                for="my-drawer-2"
                class="btn btn-primary drawer-button lg:hidden"
              >
                Time stamps
              </label>
            </div>
            {/* notes here*/}
            <div class="drawer-side">
              <label
                for="my-drawer-2"
                aria-label="close sidebar"
                class="drawer-overlay"
              ></label>
              <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <li class="form-control">
                  <label class="flex-row flex-nowrap justify-start">
                    <input
                      type="radio"
                      name="radio-10"
                      class="radio radio-primary"
                      checked="checked"
                    />
                    <div class="badge badge-sm badge-info">00:00</div>
                    <span class="label-text">Note 1 here</span>
                  </label>
                </li>
                <li class="form-control">
                  <label class="flex-row flex-nowrap justify-start">
                    <input
                      type="radio"
                      name="radio-10"
                      class="radio radio-primary"
                      checked="checked"
                    />
                    <div class="badge badge-sm badge-neutral">00:10</div>
                    <span class="label-text">Note 2 here</span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="grow bg-base-300"></div>
        <Footer></Footer>
      </body>
    </html>
  );
};
