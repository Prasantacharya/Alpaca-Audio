import Parser from "rss-parser"

let parser = new Parser();

export const parseRSSFeed = async (rssURL) => {
    let feed = await parser.parseURL(rssURL);
    let podcast = {
        title: feed.title,
        description: feed.description,
        image: feed.itunes.image,
        pubDate: feed.pubDate,
    }
    let episodes = [];
    feed.items.forEach((item) => {
        episodes.push({
            title: item.title,
            link: item.link,
            image: item.itunes.image,
            description: item.itunes.subtitle,
            explicit: item.itunes.explicit
        })
    });
    return (podcast, episodes);
}