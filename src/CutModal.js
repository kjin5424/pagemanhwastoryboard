/*
< PanelModal
  panel
  onUpdatePanel
  onClose
/>

컷 메모 / 대사 편집
저장 → App 액션 호출
❗ modal 내부에서 직접 state 수정 금지
*/
export default function CutModal({ cut }) {
  return (
    <div className="modal cut-modal">
      <p onClick={() => console.log(cut)}>cutId : {cut.cutId}</p>
      
    </div>
  );
}
