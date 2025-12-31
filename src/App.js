// import { CutNumberProvider } from "./recyclebin/CutNumberContext";
// 삭제 → 삭제 이유 해당 파일 참조
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Sidebar from "./Sidebar";
import PageWorkspace from "./PageWorkspace";
import CutModal from "./CutModal";
import "./App.css";
import "./Layout.css";

//배열 대신 정규화(normalized) 구조 사용
//페이지 순서 변경 대비
//서버 JSON 그대로 사용 가능

function App() {
  /*=========================================================
                          state 정의
  ==========================================================*/
  // ▶ 프로젝트 전체 상태
  const [project, setProject] = useState(createInitialProject());
  function createInitialProject() {
    const pages = {};
    const pageOrder = [];

    for (let i = 1; i <= 24; i++) {
      const pageId = `page-${String(i).padStart(4, "0")}`; //-- 차후 변경 예정
      pages[pageId] = {
        pageId: pageId,
        pageNumber: i,
        memo: "",
        cutOrder: [],
        cuts: {},
      };
      pageOrder.push(pageId);
    }

    return {
      projectId: "local-project-001",
      title: "Storyboard Project",
      pageOrder: pageOrder,
      pages: pages,
      meta: {
        nextPageSeq: 25, //-- 차후 변경 예정
        // version: 1,      -- 차후 추가 예정: 서버 저장시 충돌 감지 역할
        // updatedAt: null  -- 차후 추가 예정: 마지막 변경 시각
        // history:[],
      },
    };
  }

  // ▶ UI 상태
  const [uiState, setUiState] = useState({
    selectedPageId: null,
    selectedCutId: null,
    isCutModalOpen: false,
    uiScale: { zoom: 1.0 },
    pageListGrid: {
      columnsPerRow: 5, // 한 줄에 표시할 페이지 수
      minColumns: 2, // 최소 페이지 수(더 작게는 안됨)
      maxColumns: 10, // 최대 페이지 수(더 크게는 안됨)
    },
    // 아래 두 속성은 차후 에피소드별 설정으로 이동 예정
    readingDirection: "rtl", // 'rtl' | 'ltr'
    //--- 읽기 방향
    sidebarViewMode: "spread", // 'single' | 'spread'
    //--- 사이드바 뷰 모드, single: 단면, spread: 양면
  });

  /*=========================================================
                           함수 정의
  ==========================================================*/
  // PageWorkspace에서 PageHeader로 전달
  // 컷 추가 버튼을 누르면 컷이 추가 됨
  const addCut = () => {
    setProject((prev) => {
      const page = prev.pages[uiState.selectedPageId];
      if (!page) return prev;

      const cutId = `cut-${nanoid(8)}`;
      return {
        ...prev,
        meta: {
          ...prev.meta,
          nextCutSeq: prev.meta.nextCutSeq + 1,
          // ID생성 + meta증가 = 원자적 업데이트

          // [컷 삭제시 바뀌는 것]
          // CutOrder → 변경됨
          // cuts     → 변경됨
          // meta     → 변경안함
          // ※ meta에 존재하는 데이터는 다음에 쓸 데이터일 뿐
          //    "현재 존재하는 데이터"가 아니기 때문
        },
        pages: {
          ...prev.pages,
          [uiState.selectedPageId]: {
            ...page,
            cutOrder: [...page.cutOrder, cutId],
            cuts: { ...page.cuts, [cutId]: { cutId, memo: "" } },
          },
        },
      };
    });
  };
  // CutItem에서 사용
  // 메모 변경 시마다 적용됨
  const changeCutMemo = () => {};

  // PageMemo에서 사용
  // 페이지 메모 변경 시마다 적용됨
  const changePageMemo = () => {};

  // PageWorkspace의 .page-workspace-body에서 사용
  // .page-workspace-body 내부에서 Ctrl+스크롤 시 UI 스케일 조정
  const changeUiScale = (e) => {
    if (!e.ctrlKey) return;
    e.preventDefault();

    //wheel 이벤트 감지를 사용하며
    // e.deltaY 값이 양수면 down wheel, 음수면 up wheel로 판단할 수 있다.
    // 마찬가지로 e.deltaX 는 양수일 때 오른쪽, 음수일 때 왼쪽으로 판단할 수 있다.

    setUiState((prev) => {
      const next = prev.uiScale.zoom + (e.deltaY < 0 ? 0.1 : -0.1);
      return { ...prev, uiScale: { zoom: next } };
    });
  };

  /*=========================================================
                           useEffect
  ==========================================================*/
  useEffect(() => {
    setUiState((prev) => ({ ...prev, isCutModalOpen: false }));
  }, [uiState.selectedPageId]);

  /*=========================================================
                            렌더링
  ==========================================================*/
  return (
    <main>
      <div className="main-container">
        <Sidebar
          project={project}
          selectPage={(page) => {
            setUiState((prev) => {
              return { ...prev, selectedPageId: page };
            });
          }}
        />
        <PageWorkspace
          // PageList.js에 project 정보 전달
          project={project}
          // CutList.js에 page 정보 전달
          page={project.pages[uiState.selectedPageId]}
          // PageHeader의 버튼으로 전달할 addCut 함수
          addCut={addCut}
          openModal={(cutId) => {
            setUiState((prev) => {
              return { ...prev, isCutModalOpen: true, selectedCutId: cutId };
            });
          }}
          changeUiScale={changeUiScale}
        />
        {uiState.isCutModalOpen && (
          <CutModal
            cut={
              project.pages[uiState.selectedPageId].cuts[uiState.selectedCutId]
            }
          />
        )}
      </div>
    </main>
  );
}

export default App;

// Local storage 저장 단위
// localStorage.setItem("storyboard_project", JSON.stringify(project));

/*
앞으로 추가될 State (별도 관리)
❌ 절대 project에 UI 상태 섞지 마라.

project 상태 단독소유
uiState 상태 소유
상태 변경 함수 정의
하위 컴포넌트에 함수만 전달
App 이외의 컴포넌트는 상태 변경 불가(setState 금지)

 [향후 추가할 undo/redo에 대해서]
 undo/redo는 스냡샷 방식 또는 커맨드(액션)방식으로 이루어지는데
 이 프로젝트에서 적절한 건 스냅샷 방식(왜인지는 모름)
 다음과 같은 식으로 meta 안에서 사용됨
 history = [
  project_v1,
  project_v2,
  project_v3,
]
meta는 project의 일부이기 때문에
undo 시에는 meta도 함께 이전 상태로 돌아가고
redo 시에도 다시 증가된 meta로 복원되기 때문에
ID충돌이 없어 redo 후 새 컷을 추가해도 안전함

history 크기 관리 전략 (메모리 폭발 방지)?
history는 meta안에 들어가는 데이터라고 보면 되는건가?
redo/undo 버튼을 누를 때마다 prev 프로젝트를 저장하는 식?
*/
