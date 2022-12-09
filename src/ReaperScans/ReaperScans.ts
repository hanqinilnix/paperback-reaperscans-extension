import {
    Chapter,
    ChapterDetails,
    ContentRating,
    HomeSection,
    Manga,
    MangaStatus,
    MangaTile,
    MangaUpdates,
    PagedResults,
    Request,
    RequestInterceptor,
    Response,
    SearchRequest,
    Section,
    Source,
    SourceInfo,
    SourceStateManager,
    TagSection,
    TagType,
} from "paperback-extensions-common";

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

export class ReaperScans extends Source { // The name of this class does not have to be {filename}.

    requestManager = createRequestManager({
        requestsPerSecond: 2,
        requestTimeout: 10000,
    });

    async getMangaDetails(mangaId: string): Promise<Manga> {
        throw new Error("Method not implemented")
    
    }

    async getChapters(mangaId: string): Promise<Chapter[]> {
        throw new Error("Method not implemented")
    }

    async getChapterDetails(
        mangaId: string,
        chapterId: string
    ): Promise<ChapterDetails> {
        throw new Error("Method not implemented")
    }

    override async getSearchResults(
        searchQuery: SearchRequest,
        metadata: any
    ): Promise<PagedResults> {
        throw new Error("Method not implemented")
    }

    override async getHomePageSections(
        sectionCallback: (section: HomeSection) => void
    ): Promise<void> {
        throw new Error("Method not implemented")
    }

}
