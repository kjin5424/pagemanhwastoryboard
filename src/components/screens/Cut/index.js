// CutManagement 컨테이너
// 컷 관리: 현재 페이지, 줌 레벨, 컷 편집 모드

// components/screens/CutManagement/index.jsx
export default function CutManagement() {
  const [currentPageId, setCurrentPageId] = useState("page-0001");
  const [zoomLevel, setZoomLevel] = useState(1);

  return (
    <div className="cut-management">
      <CutSidebar currentPageId={currentPageId} />
      <div className="workspace">
        <CutHeader />
        <CutCanvas pageId={currentPageId} zoom={zoomLevel} />
      </div>
    </div>
  );
}
