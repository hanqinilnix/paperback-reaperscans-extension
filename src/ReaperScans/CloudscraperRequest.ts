const cloudscraper = require('cloudscraper')

export async function getResponse(url: string) {
    return cloudscraper.get(url)
}