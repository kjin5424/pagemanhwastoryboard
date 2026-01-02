import { useState } from "react";
import PageSidebar from "./PageSidebar";
import PageHeader from "./PageHeader";
import PageGrid from "./PageGrid";
// PageManagement 컨테이너
// 페이지 관리: 선택된 페이지, 그리드 확장 여부

export default function PageManagement() {
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [isGridExpanded, setIsGridExpanded] = useState(false);
  //const { addPage } = usePage(); // hooks/data/usePage.js 훅에서 가져옴
  //const { currentEpisode } = useData();

  const handleAddPage = () => {
    //addPage("ep-0001"); // useData 훅이 있으면 간단!
  };
  // 헬퍼 훅이 있으면 간단!
  //const pages = currentEpisode.pages;
  //const pageOrder = currentEpisode.pageOrder;

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
