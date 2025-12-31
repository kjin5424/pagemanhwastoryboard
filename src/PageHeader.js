import PageMemo from "./PageMemo";
import "./Layout.css";
/*
<PageHeader
  pageNumber
/>

페이지 상단 헤더
순수 표시 컴포넌트
*/

export default function PageHeader({ addCut }) {
  return (
    <div className="header page-header">
      <PageMemo />
      <button onClick={addCut}>추가</button>
    </div>
  );
}
