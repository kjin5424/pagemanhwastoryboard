// LocalStorage 로직
// 데이터 구조: 마이그레이션 경로 확보

const initialData = {
  project: {
    id: "initial-project",
    name: "Initial Project",
    settings: {
      defaultPageCount: 24,
      startPageType: "odd", // 'odd' | 'even'
      readingDirection: "rtl", // 'rtl' | 'ltr'
    },
    episodeOrder: ["episode-0001"],
    episodes: {
      "episode-0001": {
        id: "episode-0001",
        name: "Initial Episode",
        memo: "",
        settings: {
          /* 프로젝트 설정 상속 또는 override */
        },
        pageOrder: ["page-0001"],
        pages: {
          "page-0001": {
            pageId: "page-0001",
            pageNumber: 1,
            memo: "",
            cutOrder: ["cut-0001"],
            cuts: { "cut-0001": { cutId: "cut-0001", memo: "" } },
          },
        },
      },
    },
  },
};

export default initialData;
