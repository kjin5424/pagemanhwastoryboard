// 페이지 메모 수정
function PageMemoModal({ page, onSave }) {
  const handleSave = (newMemo) => {
    onSave(page.pageId, newMemo); // 콜백으로 위임
  };
}
export default PageMemoModal;

// 좋은 예
