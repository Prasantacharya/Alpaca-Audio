import { Database } from "bun:sqlite";
import { FEED } from "./feed";

export const searchDB = new Database(process.env.sqlite_search, { readonly: true });
/**
 * search podcast index for podcasts
 * After each search, adds results to the feed global for quicker lookup
 * @param {string} query - query to search title or description
 * @returns object array
 * {
 * 
 *  title: podcast title,
 * 
 *  description: podcast description,
 * 
 *  imageUrl: podcast image,
 * 
 *  url: rss feed location
 * 
 * }
 */
export function search(query, limit=15, offset=0){
    const searchQuery = searchDB.prepare("SELECT * FROM podcasts_fts WHERE podcasts_fts MATCH ?1 AND rank MATCH 'bm25(0,0,10,2,5,0)' ORDER BY rank LIMIT ?2 OFFSET ?3");
    const result = searchQuery.all(query, limit, offset);
    /*
    result.forEach((podcastObj) => {
        FEED.addFeed(podcastObj.url, {
            title: podcastObj.title ?? "",
            description: podcastObj.description ?? "",
            image: podcastObj.imageUrl ?? "",
            pubDate: ""
        });
    });*/
    return result;
}