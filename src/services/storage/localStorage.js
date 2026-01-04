// LocalStorage 로직
// 데이터 구조: 마이그레이션 경로 확보

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ● collections : 작품 정보 데이터
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const collections = {
  collection: {
    "user-001": {
      // ● 생성자 정보
      ownerId: "user-001",
      // ● 공유 권한
      permissions: {
        "user-001": "owner", // 소유자
        "user-002": "editor", // 편집 가능
        "user-003": "commentonly", // 코멘트만
        "user-004": "readonly", // 읽기전용
      },
      // ● 프로젝트 목록
      projectOrder: ["initial-project"],
      projects: {
        "initial-project": {
          id: "initial-project",
          name: "Initial Project",
          permissions: {},
          settings: {
            defaultPageCount: 24,
            startPageType: "odd", // 'odd' | 'even'
            readingDirection: "rtl", // 'rtl' | 'ltr'
          },
          // ● 에피소드 목록
          episodeOrder: ["episode-0001"],
          episodes: {
            "episode-0001": {
              id: "episode-0001",
              name: "Initial Episode",
              permissions: {},
              memo: "",
              settings: {
                /* 프로젝트 설정 상속 또는 override */
              },
              // ● 페이지 목록
              pageOrder: ["page-0001"],
              pages: {
                "page-0001": {
                  pageId: "page-0001",
                  pageNumber: 1,
                  permissions: {},
                  memo: "",
                  // ● 컷 목록
                  cutOrder: ["cut-0001"],
                  cuts: { "cut-0001": { cutId: "cut-0001", memo: "" } },
                },
              },
            },
          },
        },
      },
    },
  },
};
localStorage.setItem("collectionData", JSON.stringify(collectionData));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ● userData : 유저 정보 데이터
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const userData = {
  userId: "user-001",
  displayName: "베베",
  email: "kjin5424@gmail.com",
};
localStorage.setItem("user", JSON.stringify(userData));
