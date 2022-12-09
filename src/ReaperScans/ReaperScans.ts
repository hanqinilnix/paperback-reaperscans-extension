import {
    Chapter,
    ChapterDetails,
    ContentRating,
    HomeSection,
    HomeSectionType,
    LanguageCode,
    Manga,
    MangaStatus,
    PagedResults,
    SearchRequest,
    Source,
    SourceInfo,
    TagType,
} from "paperback-extensions-common";

import { getResponse } from "./CloudscraperRequest";

export const ReaperScansInfo: SourceInfo = { // The name of this variable has to be {filename}Info in order for the source to appear on the site.
    version: "1.0.0",
    name: "ReaperScans",
    icon: "icon.png",
    author: "hanqinilnix",
    authorWebsite: "https://github.com/hanqinilnix",
    description: "Extension that pulls manhwa from ReaperScans",
    contentRating: ContentRating.EVERYONE,
    websiteBaseURL: "https://reaperscans.com",
    sourceTags: [
        {
            text: "Cloudflare",
            type: TagType.RED,
        },
        {
            text: "Buggy",
            type: TagType.YELLOW
        }
    ],
};

let BASE_DOMAIN = "https://reaperscans.com/"


export class ReaperScans extends Source { // The name of this class does not have to be {filename}.
    requestManager = createRequestManager({
        requestsPerSecond: 2,
        requestTimeout: 10000,
    });

    // mangaId: comics/{some-number}-{title}/
    async getMangaDetails(mangaId: string): Promise<Manga> {
        throw new Error("Method not implemented")
        // let request = {
        //     url: BASE_DOMAIN + mangaId,
        //     method: 'GET'
        // }

        // let response = await this.cloudscraper(request)
        // let $ = this.cheerio.load(response)

        // let titleText = $('title').text()!.split('-')[0]!.trim()
        // let imageLink = $('img').toArray().map(image => $(image).attr('src'))[2]
        // let description = $('.prose').toArray().map(item => $(item).text()!.trim())[0]

        // // other = [source language, source status, age rating, release status, total chapters, last updated]
        // let other = $('dd').toArray().map(otherStuff => $(otherStuff).text()!.trim())
        // let status = other[1]
        // let lastUpdate = other[5]

        // return createManga({
        //     id: mangaId,
        //     titles: [titleText],
        //     status: MangaStatus.ONGOING,
        //     image: (imageLink as string),
        //     desc: description,
        // })
    
    }

    async getChapters(mangaId: string): Promise<Chapter[]> {
        throw new Error("Method not implemented")
        // let request = {
        //     url: BASE_DOMAIN + mangaId,
        //     method: 'GET'
        // }
        
        // let response = await this.cloudscraper(request)
        // let $ = this.cheerio.load(response)

        // // check how many pages there are for this manga
        // // if more than 1, pages =  ceiling(total chapters / 32)
        // // else, pages = 1

        // let getNumber = function(str: string) {
        //     let len = str.length
        //     let num = ''

        //     let newNum = num
        //     for (let i = 0; i < len; i++) {
        //         newNum += str[i]
        //         if (Number.isNaN(+newNum)) {
        //             break
        //         }
        //         num = newNum
        //     }

        //     return +num
        // }

        // let getChapterNumber = (link:string) => {
        //     let chapterNumber = ''
            
        //     let i = link.length - 1
            
        //     while (link[i] != '-') {
        //         chapterNumber = link[i] + chapterNumber
        //         i -= 1
        //     }
            
        //     return +chapterNumber
        // }

        // let numberOfChapters = getNumber($('h1').toArray().map(value => $(value).text())[1]!.trim())
        // let chapterPerPage = 32;

        // let chapters = $('li').toArray().slice(0,-6) // last 6 elements are not chapters
        // // if (numberOfChapters > 32) {
        // //     let numberOfPages = Math.ceil(numberOfChapters / chapterPerPage)

        // //     for (let i = 2; i < numberOfPages + 1; i++) {
        // //         let pageLink = BASE_DOMAIN + mangaId + '?page=' + i
        // //         request = {
        // //             url: pageLink,
        // //             method: 'POST'
        // //         }
        // //         response = await cloudscraper(request)
        // //         $ = this.cheerio.load(response)

        // //         chapters.concat($('li').toArray().slice(0,-6))
        // //     }
        // // }
        // return chapters.map(chapter => {
        //     let link = $(chapter).find('a').attr('href')!
        //     return createChapter({
        //         id: link,
        //         mangaId: mangaId,
        //         chapNum: getChapterNumber(link),
        //         langCode: LanguageCode.ENGLISH,
        //     })
        // })
    }

    async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
        throw new Error("Method not implemented")
        // let request = {
        //     url: BASE_DOMAIN + mangaId + chapterId,
        //     method: 'GET'
        // }

        // let response = await this.cloudscraper(request)
        // let $ = this.cheerio.load(response)

        // // first 2 images are logos, 3rd image and last image are reaperscans ad
        // let pages = $('img').toArray().map(img => $(img).attr('src')!).slice(3, -1)

        // return createChapterDetails({
        //     id: chapterId,
        //     mangaId: mangaId,
        //     pages: pages,
        //     longStrip: true
        // })
    }

    override async getSearchResults(searchQuery: SearchRequest, metadata: any): Promise<PagedResults> {
        throw new Error("Method not implemented")
    }

    override getMangaShareUrl(mangaId: string): string {
        return BASE_DOMAIN + mangaId;
    }

    override async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
        // throw new Error("Method not implemented")
        let request = createRequestObject({
            url: BASE_DOMAIN,
            method: 'GET',
        })

        let response = await this.requestManager.schedule(request, 1)
        // response = await getResponse(BASE_DOMAIN)
        if (response.status != 200) {
            throw new Error("Fuck you: " + response.status)
        }
        let $ = this.cheerio.load(response.data)

        let stringContains = function (str:string, cmp:string) {
            if (str.length < cmp.length) {
                return false;
            }
        
            for (let i = 0; i < str.length - cmp.length; i++) {
                if (str.slice(i, i + cmp.length) === cmp) {
                    return true
                }
            }
            return false
        }

        let todaysPicksSection = createHomeSection({
            id: 'today',
            title: 'Today\'s Picks',
            type: HomeSectionType.featured,
        })
        sectionCallback(todaysPicksSection)
        let todaysPickItems = $('li').toArray()
                            .filter(item => stringContains($(item).find('a').attr('href')!, 'comic'))
        todaysPicksSection.items = todaysPickItems.map(item => createMangaTile({
            id: $(item).find('a').attr('href')!.slice(BASE_DOMAIN.length,),
            title: createIconText({text: $(item).find('a.my-2').text()!.trim()}),
            image: $(item).find('img').attr('src')!,
        }))
        sectionCallback(todaysPicksSection)

        let latestComicsSection = createHomeSection({
            id: 'lastest',
            title: 'Latest Comics',
            view_more: true,
        })
        sectionCallback(latestComicsSection)
        let latestComicsItems = $('.grid').toArray()
                                .map(item => $(item).children('.relative').toArray())[1]
        latestComicsSection.items = latestComicsItems!.map(item => createMangaTile({
            id: $(item).find('a').attr('href')!.slice(BASE_DOMAIN.length,),
            title: createIconText({text: $(item).find('a').text()!.trim()}),
            image: $(item).find('img').attr('src')!,
        }))
        sectionCallback(latestComicsSection)
    }

}
