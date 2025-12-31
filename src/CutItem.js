import "./Page.css";
/*
< PanelItem
  panel
  onClick
/>

컷 번호
컷 메모 요약
선택 이벤트만 발생
컷 데이터 수정 금지
*/

export default function CutItem({ cut, onClick, className }) {
  return (
    <div className={`cut ${className}`} onClick={onClick}>
      <p>
        {cut.cutId} : {cut.memo}
      </p>
      <input type="text" />
    </div>
  );
}
