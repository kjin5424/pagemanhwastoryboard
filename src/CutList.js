import CutItem from "./CutItem";
/*
< PanelGrid
  panelOrder
  panels
  onAddPanel
  onSelectPanel
/>

현재 : row 기반 렌더링
미래 : layout type 확장 가능 구조
*/
//drag 이동 시 pageId 변경만으로 페이지 이동 가능
//레이아웃 확장 대비
//이미지 추가 시 구조 변경 없음

export default function CutList({ page, cutMap, openModal }) {
  const sortedCuts = page.cutOrder.map((cutId) => cutMap[cutId]);
  // cutOrder 기준으로 정렬된 컷 배열, id 배열인 cutOrder는 이때만 사용됨
  return (
    <div className="page">
      <div className="cut-basic-frame">
        {sortedCuts.map((cut, index) => (
          <CutItem
            key={index}
            cut={cut}
            onClick={() => openModal(cut.cutId)}
            className="cutList"
          />
        ))}
      </div>
    </div>
  );
}

/*
cutOrder: [...page.cutOrder, cutId],
cuts: { ...page.cuts, [cutId]: { cutId, memo: "" } },
*/

/*
{
  panelId: "panel-uuid",
  pageId: "page-001",

  panelNumber: 1,        // 페이지 내 표시용
  note: "",
  dialogue: "",

  layout: {
    type: "row",         // row | column | future
    rowIndex: 0,         // 현재는 row 기반
  },

  positionIndex: 0,      // 내부 정렬용 (drag 대비)

  media: {
    imageUrl: null,      // 차후 이미지
    thumbnailUrl: null
  }
}
 */
