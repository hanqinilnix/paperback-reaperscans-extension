import {
    Chapter,
    ChapterDetails,
    ContentRating,
    HomeSection,
    Manga,
    MangaStatus,
    PagedResults,
    SearchRequest,
    Source,
    SourceInfo,
    TagType,
} from "paperback-extensions-common";

export const ReaperScans: SourceInfo = {
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

// Number of items requested for paged requests

export const parseMangaStatus = (komgaStatus: string): MangaStatus => {
    switch (komgaStatus) {
        case "ENDED":
            return MangaStatus.COMPLETED;
        case "ONGOING":
            return MangaStatus.ONGOING;
        case "ABANDONED":
            return MangaStatus.ONGOING;
        case "HIATUS":
            return MangaStatus.ONGOING;
    }
    return MangaStatus.ONGOING;
};

export class Paperback extends Source {
    stateManager = createSourceStateManager({});

    requestManager = createRequestManager({
        requestsPerSecond: 4,
        requestTimeout: 20000,
    });

    async getMangaDetails(mangaId: string): Promise<Manga> {
        throw new Error("Method not implemented")
    }

    async getChapters(mangaId: string): Promise<Chapter[]> {
        throw new Error("Method not implemented")
    }

    async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
        throw new Error("Method not implemented")
    }

    override async getSearchResults(searchQuery: SearchRequest, metadata: any): Promise<PagedResults> {
        throw new Error("Method not implemented")
    }

    override async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
        throw new Error("Method not implemented")
    }

}
