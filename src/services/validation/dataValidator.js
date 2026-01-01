// 데이터 유효성 검증
// 서버에서 받은 데이터가 올바른지 검증하는 역할

// 페이지 데이터 검증
export const validatePage = (page) => {
  const errors = [];

  if (!page.pageId || typeof page.pageId !== "string") {
    errors.push("pageId is required and must be string");
  }

  if (typeof page.pageNumber !== "number") {
    errors.push("pageNumber must be number");
  }

  if (!Array.isArray(page.cutOrder)) {
    errors.push("cutOrder must be array");
  }

  if (!page.cuts || typeof page.cuts !== "object") {
    errors.push("cuts must be object");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// 전체 데이터 검증
export const validateProjectData = (data) => {
  if (!data.project) {
    return { isValid: false, errors: ["project is missing"] };
  }

  const { project } = data;

  // episodeOrder와 episodes 일치 여부 확인
  const episodeIds = Object.keys(project.episodes);
  const missingEpisodes = project.episodeOrder.filter(
    (id) => !episodeIds.includes(id)
  );

  if (missingEpisodes.length > 0) {
    return {
      isValid: false,
      errors: [`Missing episodes: ${missingEpisodes.join(", ")}`],
    };
  }

  return { isValid: true, errors: [] };
};

// // services/storage/apiService.js
// export const loadData = async () => {
//   const response = await fetch('/api/projects/current');
//   const data = await response.json();

//   // 서버 데이터 검증
//   const validation = validateProjectData(data);
//   if (!validation.isValid) {
//     console.error('Invalid data from server:', validation.errors);
//     return getInitialData(); // 기본 데이터 반환
//   }

//   return data;
// };

// 서버에서 이상한 데이터 보낼 수도 있음
// 데이터베이스 오류로 일부 필드 누락 가능
// 프론트 앱이 터지는 걸 방지
