// PageManagement 컨테이너
export default function PageManagement() {
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [isGridExpanded, setIsGridExpanded] = useState(false);

  return (
    <div className="page-management">
      <PageSidebar onSelectPage={setSelectedPageId} />
      <div className="workspace">
        <PageHeader />
        <PageGrid selectedPageId={selectedPageId} isExpanded={isGridExpanded} />
      </div>
    </div>
  );
}
