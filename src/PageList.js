export default function PageList({ project, selectPage }) {
  return (
    <div>
      {project.pageOrder.map((pageId) => {
        return (
          <div
            key={pageId}
            onClick={() => selectPage(pageId)}
            className="page-body"
          >
            {project.pages[pageId].pageNumber}
          </div>
        );
      })}
    </div>
  );
}
