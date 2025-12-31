import PageItem from "./PageItem";

export default function PageList({ project, selectPage }) {
  return (
    <div>
      {project.pageOrder.map((pageId) => {
        return (
          <div
            key={pageId}
            // onClick={() => selectPage(pageId)}
            className="page-list-grid"
          >
            <PageItem className="pageList" />
          </div>
        );
      })}
    </div>
  );
}
