// 전역 데이터 상태 (차후 서버 연동 대비)
import { createContext, useContext, useState } from "react";
import { collections } from "../services/storage/localStorage";
import { errorMsg } from "../components/common/errorMessage";

// context 생성
export const DataContext = createContext();

// provider 컴포넌트
export const DataProvider = ({ children }) => {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 상태 초기화
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // const { user } = useUser(); //-- 차후 유저 정보 추가 시 사용
  const [collectionData, setCollectionData] = useState(null);
  const [currentPermission, setCurrentPermission] = useState(null); //-- 차후 유저 정보 추가 시 수정
  const [uiState, setUiState] = useState({
    currentEpisodeId: null, //-- 선택된 에피소드, 차후 초기값 수정
    currentPageId: null, // 선택된 페이지
    currentCutId: null, // 선택된 페이지
    // ... 기타 UI 상태 추가하기
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 컴포넌트 마운트 시 localStorage에서 데이터 로드
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  useEffect(() => {
    //-- 차후 유저 정보 추가 시 수정
    /*
    if (user) {
      loadCollectionData(user.userId);
    }
    */

    // localStorage에서 데이터 읽기, 없을 시 초기 데이터 불러옴
    //-- 차후 초기 데이터 수정 필요
    const savedData = localStorage.getItem("collectionData");
    const data = savedData ? JSON.parse(savedData) : { collections };
    setCollectionData(data);

    // 첫 번째 에피소드를 current로 설정
    //-- 차후 프로젝트 정보 추가 시 수정
    const firstEpisodeId = data.collection.projectOrder[0]
      ? data.collection.projects[data.collection.projectOrder[0]]
          .episodeOrder[0]
      : null;
    setUiState((prev) => ({ ...prev, currentEpisodeId: firstEpisodeId }));

    // 권한 설정
    //-- 차후 유저 정보 추가 시 수정
    setCurrentPermission("owner");
  }, []);
  //-- dependencies []인 상황, 차후 수정 필요 가능성 있음

  // 차후 서버 요청 시 아래 함수 사용
  const loadCollectionData = async (userId) => {
    const response = await fetch(`/api/collections/my-collections`);
    const data = await response.json();

    setCollectionData(data);

    // 현재 유저의 권한 계산
    const permission = data.collection.permissions[userId];
    setCurrentPermission(permission); // 'owner' | 'editor' | 'commentonly' | 'readonly'
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 데이터 변경 시 localStorage에 저장
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  useEffect(() => {
    if (collectionData) {
      localStorage.setItem("collectionData", JSON.stringify(collectionData));
    }
  }, [collectionData]);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 헬퍼 함수: id 기반으로 접근
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const helpers = {
    // 프로젝트 전체
    getProjects: () => collectionData.projects,
    getProject: (projectId = "initial-project") =>
      projectState.project[projectId], //-- 차후 초기값 수정 필요
    getCurrentProject: () => {}, //-- 차후수정필요

    // 에피소드 관련
    getEpisodes: () => {
      const project = helpers.getProjects();
      return project?.episodes;
    },
    getEpisode: (episodeId = "episode-0001") =>
      projectState.project.episodes[episodeId], //-- 차후 초기값 수정 필요
    getCurrentEpisode: () => {
      if (!uiState.currentEpisodeId) return null;
      return helpers.getEpisode(uiState.currentEpisodeId);
    },

    // 페이지 관련
    getPages: (episodeId) => {
      const episode = helpers.getEpisode(episodeId);
      return episode?.pages;
    },
    getPage: (episodeId, pageId) => {
      const episode = helpers.getEpisode(episodeId);
      return episode?.pages[pageId];
    },
    getCurrentPage: () => {
      if (!uiState.currentPageId) return null;
      return helpers.getPage(uiState.currentPageId);
    },

    // 컷 관련
    getCuts: (pageId) => {
      const page = helpers.getPage(pageId);
      return page?.cuts;
    },
    getCut: (episodeId, pageId, cutId) => {
      // episodeId까지 받는건 너무한가? 받는게 낫나?
      //const episode = helpers.getEpisode(episodeId);
      const page = helpers.getPage(pageId);
      return page?.cuts[cutId];
    },
    getCurrentCut: () => {
      if (!uiState.currentCutId) return null;
      return helpers.getCut(uiState.currentCutId);
    },
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ● 반환 변수 value 선언
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const value = {
    // 원본 상태 값
    // userData,
    // setUserData
    collectionData,
    setCollectionData,
    currentPermission,
    uiState,
    setUiState,

    // 헬퍼 함수
    ...helpers,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// useData 커스텀 훅
export default function useData() {
  const context = useContext(DataContext);

  // Context 밖에서 사용하면 에러
  if (!context) {
    throw new Error(errorMsg.contexts["useData 오류"]);
  }

  return context;
}
