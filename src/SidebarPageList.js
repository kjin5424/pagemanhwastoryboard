import PageWorkspace from "./PageWorkspace";
/*
< PageListItem
  pageId
  pageNumber
  memo
  isSelected
  onClick
/>

memo는 1줄 요약
선택된 페이지 강조
*/

export default function SidebarPageList({ project, selectPage }) {
  return (
    <div>
      <p
        onClick={() => {
          console.log("project:", project);
          selectPage(null);
        }}
      >
        {project.title}
      </p>
      {project.pageOrder.map((pageId) => {
        return (
          <div key={pageId} onClick={() => selectPage(pageId)}>
            {project.pages[pageId].pageNumber}
          </div>
        );
      })}
    </div>
  );
}
