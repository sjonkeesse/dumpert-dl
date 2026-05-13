#!/usr/bin/env node
import M3U8Downloader from "@renmu/m3u8-downloader";
// Get command line arguments (skip first two which are node and script path)
const args = process.argv.slice(2);
// Check if URL argument is provided
if (args.length === 0) {
    console.error("Error: Please provide a URL as an argument");
    console.log("Usage: ddl <url>");
    process.exit(1);
}
// Get the first argument as the URL
const url = args[0];
// Parse the URL to extract the item ID from the path (/item/<id>)
let selectedId;
try {
    const urlObj = new URL(url);
    const match = urlObj.pathname.match(/\/item\/([^/]+)/);
    selectedId = match ? match[1] : null;
    if (!selectedId) {
        console.log(`URL: ${url}`);
        console.log("No item ID found in the URL (expected format: /item/<id>)");
        process.exit(1);
    }
}
catch (error) {
    console.error("Error: Invalid URL format");
    console.log(`Provided URL: ${url}`);
    process.exit(1);
}
(async () => {
    const response = await fetch(`https://post.dumpert.nl/api/v1.0/info/${selectedId}/`, {
        method: "GET",
        headers: { "x-dumpert-nsfw": "1" },
    });
    const data = await response.json();
    const item = data.items[0];
    const resolutions = [
        "2160p",
        "1080p",
        "720p",
        "480p",
        "tablet",
        "360p",
        "270p",
        "mobile",
        "240p",
        "144p",
    ];
    const media = item.media[0].variants
        .filter((variant) => variant.uri.match(/.m3u8/))
        .reverse()
        .find((variant) => resolutions.includes(variant.version));
    if (!media) {
        console.log(`No video found for "${item.title}" (${item.tags})`);
        process.exit(1);
    }
    console.log(`Downloading "${item.title}"...`);
    const downloader = new M3U8Downloader(media.uri, `${item.title}.mp4`, {
        convert2Mp4: true,
    });
    await downloader.download();
    console.log(`Downloaded "${item.title}.mp4" successfully`);
})();
