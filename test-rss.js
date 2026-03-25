const Parser = require('rss-parser');
const parser = new Parser();

(async () => {
    try {
        const feed = await parser.parseURL('https://letterboxd.com/alokx/rss/');
        if (feed.items.length > 0) {
            console.log(JSON.stringify(feed.items[0], null, 2));
        } else {
            console.log("No items found.");
        }
    } catch (e) {
        console.error(e);
    }
})();
