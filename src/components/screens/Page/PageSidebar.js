// 페이지 썸네일 리스트

// components/common/PageSidebar.jsx (통합 버전)
export default function PageSidebar({
  pages,
  currentPageId, // 컷 화면에서만 사용
  onSelectPage,
  mode = "page", // 'page' | 'cut'
}) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>프로젝트명</h3>
        <p>에피소드명</p>
      </div>

      <div className="sidebar-pages">
        {pages.map((page) => (
          <div
            key={page.pageId}
            className={`page-thumbnail ${
              mode === "cut" && page.pageId === currentPageId ? "active" : ""
            }`}
            onClick={() => onSelectPage(page.pageId)}
          >
            {/* 페이지 썸네일 */}
          </div>
        ))}
      </div>
    </div>
  );
}

// // 사용 예시
// // PageManagement에서
// <PageSidebar pages={pages} onSelectPage={handleSelect} mode="page" />

// // CutManagement에서
// <PageSidebar
//   pages={pages}
//   currentPageId={currentPageId}
//   onSelectPage={setCurrentPageId}
//   mode="cut"
// />
