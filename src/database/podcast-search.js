import { Database } from "bun:sqlite";
import { FEED } from "./feed";

const db = new Database("search/podcastindex_feeds.db", { readonly: true });

const searchQuery = db.prepare("SELECT * FROM podcasts_fts WHERE podcasts_fts MATCH ?1 AND rank MATCH 'bm25(0,0,10,2,5,0)' ORDER BY rank");

/**
 * search podcast index for podcasts
 * After each search, adds results to the feed global for quicker lookup
 * @param {string} query - query to search title or description
 * @returns object array of 
 */
export function search(query){
    const result = searchQuery.all(query);
    result.forEach((podcastObj) => {
        FEED.addFeed(btoa(podcastObj.url), {
            title: podcastObj.title,
            description: podcastObj.description,
            image: podcastObj.image,
            pubDate: ""
        })
    });
    return result;
}