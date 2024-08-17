import Parser from "rss-parser"

export const parsePodcastInfoOnly = async (rssURL) => {
    let [podcast, _] = await parseRSSFeed(rssURL);
    console.log("Parsed " + podcast.title);
    return {
        title: podcast.title,
        description: podcast.description,
        image: podcast.itunes.image,
        pubDate: podcast.pubDate,
        totalEp: 5
    };
}

export const parseRSSFeed = async (rssURL) => {
    let parser = new Parser();
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
    return [podcast, episodes];
}