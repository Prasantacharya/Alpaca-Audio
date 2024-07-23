import { SESSIONS } from "./database.js";

export const PodcastCard = ({cookie: { name }, set, error}) => {
    console.log("name cookie - " + name);
    return (
        <div class="podcast-card">
        <img class="podcast-card-image" src={dbObj.podcastImg} />
        <div class="podcast-card-body">
            <div class="podcast-card-header">
                <b>{dbObj.title}</b>
            </div>
            <hr />
            <div>
                <small><i>{dbObj.numEpisodes}</i></small>
            </div>
        </div>
        </div>
    );
}

/**
 * 
 * @returns button that adds a new PodcastCard to the 
 */
export const AddPodcastCard = () => {
    /**
     * Something here
     * 
     */
    return (
        <button class="podcast-card" hx-get="/modal/podcast" hx-target="body" hx-swap="beforeend">
            <div class="podcast-card-image">
                <svg style="fill: var(--nord14); width: 100%; background-color: var(--nord1); border-radius: inherit;"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z"></path>
                    <path
                        d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z">
                    </path>
                </svg>
            </div>
            <hr></hr>
            <div class="podcast-card-body">
                <div class="podcast-card-header">
                    <b>Add New Podcast</b>
                </div>
            </div>
        </button>
    );
}

/**
 * Card component that displays podcast Episode
 * @param {string} link - url to 
 * @param {*} episodeName 
 * @param {*} description 
 * @param {*} timeStamp 
 * @returns 
 */
export const EpisodeCard = (link, episodeName, description, timeStamp) => {
    return (
        <p>test 2</p>
    );
}