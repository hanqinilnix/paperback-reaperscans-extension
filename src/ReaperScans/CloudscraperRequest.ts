import cloudscraper from "cloudscraper"

export async function getResponse(url: string) {
    return cloudscraper(url)
}