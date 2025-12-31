import "./Layout.css";
import SidebarPageList from "./SidebarPageList";
/*
< PageSidebar
  pageOrder
  pages
  selectedPageId
  onSelectPage
/>

페이지 목록 표시
페이지 번호 + 메모 요약 표시
페이지 선택 이벤트 발생만 담당
🚫 페이지 데이터 수정 금지
*/
export default function Sidebar({ project, selectPage }) {
  return (
    <div className={"page-sidebar"}>
      <SidebarPageList project={project} selectPage={selectPage} />
    </div>
  );
}
