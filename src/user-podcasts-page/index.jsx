import { AddPodcastCard } from "../ui-components/card.jsx";

export const main = async () => {
    return (
        <html lang='en'>
            <head>
                <meta charset="utf-8" />
                <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
                <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
                <link rel="stylesheet" href="./public/style.css" />
                <link rel="stylesheet" href="./public/podcast-card.css" />
                <link rel="stylesheet" href="./public/modal.css" />
                <title>TimeStamp</title>
            </head>
            <body>
                <script src="https://unpkg.com/htmx.org@1.6.0"></script>
                <Header></Header>
                <div class="contentArea">
                    <div id="podcast-area">
                        <AddPodcastCard></AddPodcastCard>
                    </div>
                </div>
                <Footer></Footer>
            </body>
        </html>
    );
}

const Header = () => {
    return (
        <header>
            <nav>
                <h2><a href="/">TimeStamp</a></h2>
                <div class="internal-links">
                    <a href="/" class="active">Podcasts</a>
                    <a href="/">Search</a>
                    <a href="/about">Notes</a>
                </div>
                <div class="outside-link-buttons">
                    <a hx-on="click" hx-get="/login-modal" hx-target="body" hx-swap="beforeend">Login</a>
                </div>
            </nav>
        </header>
    );
}

const Footer = () => {
    return (
        <footer>
            &copy; TimeStamp. All rights reserved.
            <div class="outside-link-buttons">
                <a href="https://github.com/withastro/astro" target="_blank">
                    <svg
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                        width="32"
                        height="32"
                        astro-icon="social/github"
                    >
                        <path
                            fill="currentColor"
                            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                        ></path>
                    </svg>
                </a>
            </div>
        </footer>
    );

}