
export async function getResponse(url: string) {
    const cloudscraper = require('cloudscraper')
    return cloudscraper(url)
}