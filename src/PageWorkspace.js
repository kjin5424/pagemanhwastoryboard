import "./Layout.css";
import PageHeader from "./PageHeader";
import CutList from "./CutList";
import { useEffect, useState } from "react";
import PageList from "./PageList";

/*
{
  pageId: "page-001",
  pageNumber: 1,          // 표시용
  memo: "",
  panelOrder: [],        // 컷 순서
  panels: {},            // panelId → Panel
}
*/
//pageNumber ≠ 순서
//순서는 pageOrder가 관리
//페이지 이동 시 pageId 불변

/*
<PageWorkspace
  page
  onUpdatePageMemo
  onAddPanel
  onSelectPanel
/>

페이지 상세 편집 컨테이너
하위 컴포넌트에 pageId 전달
*/
export default function PageWorkspace({
  project,
  page,
  addCut,
  openModal,
  changeUiScale,
}) {
  // [1차 시도]
  /*
  const [cutMap, setCutMap] = useState({});

  useEffect(() => {
    const map = {};
    if (page !== undefined) {
      try {
        page.cuts.forEach((cut) => {
          map[cut.cutId] = cut;
        });
      } catch (error) {
        console.log(error);
      }
    }
    setCutMap(map);
    console.log("useEffect완료");
  }, [index]);

  화면이 바껴야 된다는 생각에 pageWorkspace에 state를 둠
  */
  const makeMap = () => {
    const map = {};
    for (let i = 0; i < page.cutOrder.length; i++) {
      const cutId = page.cutOrder[i];
      map[cutId] = page.cuts[cutId];
    }
    return map;
  };
  const cutMap = page !== null && page !== undefined ? makeMap() : {};

  const onWheel = (e) => {
    if (!e.ctrlKey) return;
    e.preventDefault();
  };
  return (
    <>
      <div className="page-workspace">
        <div className="page-workspace-head">
          <PageHeader addCut={addCut} pageId={page ? page.pageId : null} />
        </div>
        <div className="page-workspace-body" onWheel={changeUiScale}>
          {page !== undefined && page !== null ? (
            <>
              {page.cutOrder.length > 0 && (
                <CutList page={page} cutMap={cutMap} openModal={openModal} />
              )}
            </>
          ) : (
            <PageList project={project} />
          )}
        </div>
      </div>
    </>
  );
}
