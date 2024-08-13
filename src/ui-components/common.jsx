export const NavBar = () => {
  return (
    <div class="navbar bg-base-100 grow">
      <div class="navbar-start">
        <a class="btn btn-ghost text-xl" href="daisy-ui-rewrite-homepage.html">
          <div class="text-primary">
            <AlpacaSVG height="3rem" width="3rem"></AlpacaSVG>
          </div>
          Alpaca Audio
        </a>
      </div>
      <div class="navbar-end lg:flex">
        <button class="btn btn-ghost">Feed</button>
        <button class="btn btn-ghost">Notes</button>
        <div class="divider divider-horizontal divider-neutral"></div>
        <ThemeSwitcher></ThemeSwitcher>
        <Profile></Profile>
      </div>
    </div>
  );
};

export const AlpacaSVG = (height, width) => {
  return (
    <svg
      class="max-h-60 fill-current"
      height={height}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 511.999 511.999"
    >
      <g>
        <g>
          <path
            d="M446.975,280.76l-30.896-16.112c-18.659-9.725-40.381-13.288-61.172-10.03l-134.019,21.002
    c-0.967,0.151-1.893,0.224-2.834,0.224c-6.106,0-11.77-3.031-15.154-8.115c-7.588-11.386-10.999-25.136-9.609-38.724
    l20.151-164.016c0.005-0.045,0.003-0.089,0.007-0.134c0.04-0.362,0.059-0.727,0.063-1.092c0.001-0.112-0.002-0.225-0.004-0.337
    c-0.008-0.336-0.033-0.672-0.073-1.007c-0.01-0.082-0.015-0.162-0.027-0.244c-0.06-0.418-0.142-0.834-0.254-1.246
    c-0.006-0.024-0.016-0.048-0.022-0.072c-0.102-0.366-0.227-0.728-0.37-1.087c-0.046-0.114-0.096-0.225-0.145-0.336
    c-0.116-0.264-0.244-0.524-0.383-0.781c-0.068-0.125-0.136-0.252-0.209-0.375c-0.041-0.069-0.073-0.14-0.116-0.209L178.714,4.984
    c-2.003-3.203-5.557-5.074-9.332-4.981c-3.775,0.119-7.203,2.235-9,5.557c-0.712,1.316-15.8,29.918-4.486,64.741l-52.615,20.107
    c-8.246,3.158-15.244,8.662-20.233,15.909c-5.005,7.256-7.651,15.759-7.651,24.589c0,8.023,6.527,14.55,14.55,14.55h32.753
    c-8.211,15.849-21.238,41.89-33.232,69.726c-2.319,5.383,0.164,11.627,5.548,13.946c5.383,2.321,11.626-0.163,13.946-5.547
    c18.909-43.89,40.452-83.238,40.667-83.629c1.805-3.289,1.74-7.285-0.17-10.513c-1.91-3.227-5.383-5.208-9.133-5.208H97.648
    c0.656-2.073,1.621-4.047,2.877-5.868c2.55-3.704,6.128-6.516,10.339-8.128l79.361-30.327l-18.013,146.611
    c-0.008,0.066-0.016,0.131-0.022,0.197c-1.926,18.522,2.707,37.269,13.045,52.782c7.326,11.003,19.594,17.574,32.819,17.574
    c2.019,0,4.071-0.16,6.111-0.478l134.027-21.003c16.336-2.562,33.412,0.24,48.074,7.881l5.191,2.707l-19.994,4.496
    c-3.726,0.838-6.716,3.614-7.826,7.269c-1.11,3.655-0.172,7.624,2.458,10.394l17.091,17.999l-40.352,60.533
    c-1.162,1.744-1.782,3.791-1.782,5.887v98.018h-6.979l-6.241-49.724c-2.485-19.835-14.859-36.507-33.115-44.675
    c-0.017-0.008-0.033-0.02-0.05-0.028c-11.799-5.941-18.894-13.689-21.689-23.683c-5.862-20.96,9.094-45.049,9.231-45.268
    c3.15-4.942,1.697-11.503-3.246-14.654c-4.941-3.149-11.502-1.697-14.653,3.247c-0.827,1.298-20.155,32.123-11.811,62.253
    c1.455,5.256,3.642,10.13,6.521,14.623l-41.025,8.977c-5.953,1.306-12.114,0.83-17.816-1.378
    c-0.795-0.308-1.624-0.518-2.469-0.628l-24.828-3.217V374.13c0-5.86-4.751-10.613-10.613-10.613s-10.613,4.752-10.613,10.613
    v31.817v84.828h-6.081l-24.59-101.711c-0.864-3.573-3.539-6.453-7.032-7.599c-0.155-0.05-15.612-5.201-29.822-16.928
    c-17.827-14.714-25.613-32.821-23.139-53.817c1.156-9.805,4.032-21.982,8.55-36.193c1.776-5.585-1.313-11.554-6.899-13.33
    c-5.588-1.777-11.553,1.313-13.33,6.899c-4.924,15.492-8.088,28.996-9.4,40.138c-3.354,28.461,7.463,53.754,31.282,73.142
    c11.606,9.446,23.605,15.237,30.47,18.099l22.072,91.298h-7.625c-5.861,0-10.613,4.752-10.613,10.613s4.751,10.613,10.613,10.613
    h21.109h25.046c5.861,0,10.613-4.752,10.613-10.613v-83.364l20.901,2.708c9.244,3.31,19.157,3.95,28.754,1.844l41.519-9.086
    c7.382-1.615,14.918-0.867,21.791,2.165c0.018,0.007,0.036,0.013,0.053,0.02c11.508,5.089,19.309,15.557,20.87,28.016l5.91,47.082
    h-2.861c-5.861,0-10.613,4.752-10.613,10.613s4.751,10.613,10.613,10.613h14.855c0.007,0,0.015,0.001,0.022,0.001
    c0.005,0,0.011-0.001,0.017-0.001h26.953c5.861,0,10.613-4.752,10.613-10.613V395.967l43.269-64.909
    c2.749-4.124,2.277-9.6-1.135-13.195l-10.049-10.585l30.035-6.754c4.346-0.976,7.619-4.563,8.195-8.98
    S450.924,282.82,446.975,280.76z M175.759,62.709c-2.997-9.777-3.289-18.849-2.47-26.365l13.784,22.042L175.759,62.709z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M93,234.022c-5.466-2.119-11.614,0.585-13.736,6.048l-0.522,1.352c-2.102,5.472,0.629,11.611,6.1,13.713
    c1.252,0.481,2.537,0.709,3.804,0.709c4.265,0,8.289-2.591,9.909-6.81l0.492-1.276C101.169,242.295,98.462,236.145,93,234.022z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M164.958,95.034c-5.861,0-10.613,4.752-10.613,10.613v3.056c0,5.86,4.751,10.613,10.613,10.613
    s10.613-4.752,10.613-10.613v-3.056C175.571,99.786,170.82,95.034,164.958,95.034z"
          />
        </g>
      </g>
    </svg>
  );
};

export const Footer = () => {
  return (
    <footer class="footer footer-center bg-base-200 text-base-content rounded p-10">
      <nav class="grid grid-flow-col gap-4">
        <a class="link link-hover">Podcasts</a>
        <a class="link link-hover">Notes</a>
        <a class="link link-hover">Profile</a>
        <a class="link link-hover">About</a>
      </nav>
      <nav>
        <div class="grid grid-flow-col gap-4">
          <a class="h-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              class="fill-current"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
              ></path>
            </svg>
          </a>
        </div>
      </nav>
      <aside>
        <p>Copyright © 2024</p>
      </aside>
    </footer>
  );
};

const ThemeSwitcher = () => {
  return (
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost">
        Themes
      </div>
      <div
        tabindex="0"
        class="card card-compact dropdown-content bg-base-100 z-[1] mt-3 shadow"
      >
        <div class="join join-vertical">
          <input
            type="radio"
            name="theme-buttons"
            class="btn theme-controller join-item"
            aria-label="Default"
            value="lofi"
          />
          <input
            type="radio"
            name="theme-buttons"
            class="btn theme-controller join-item"
            aria-label="Dracula"
            value="dracula"
          />
          <input
            type="radio"
            name="theme-buttons"
            class="btn theme-controller join-item"
            aria-label="Nord"
            value="nord"
          />
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <svg
            class="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path>
          </svg>{" "}
        </div>
      </div>
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        <li>
          <a class="justify-between">
            Profile
            <span class="badge">New</span>
          </a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <a>Logout</a>
        </li>
      </ul>
    </div>
  );
};
