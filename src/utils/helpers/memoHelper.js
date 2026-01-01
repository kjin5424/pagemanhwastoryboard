// 메모 처리 유틸
// utils/helpers/memoHelper.js
// 메모 요약 (리스트 표시용)
export const summarizeMemo = (memo, maxLength = 50) => {
  if (!memo) return "";
  if (memo.length <= maxLength) return memo;
  return memo.substring(0, maxLength) + "...";
};

// 메모 검색
export const searchInMemo = (memo, keyword) => {
  return memo.toLowerCase().includes(keyword.toLowerCase());
};
// 메모 단어 수 세기
export const countWordsInMemo = (memo) => {
  if (!memo) return 0;
  return memo.trim().split(/\s+/).length;
};
// 메모에서 특정 단어 하이라이트
export const highlightKeywordInMemo = (memo, keyword) => {
  if (!keyword) return memo;
  const regex = new RegExp(`(${keyword})`, "gi");
  return memo.replace(regex, "<mark>$1</mark>");
};
// 메모가 비어있는지 확인
export const isMemoEmpty = (memo) => {
  return !memo || memo.trim().length === 0;
};
// 메모 첫 문장 추출
export const getFirstSentenceOfMemo = (memo) => {
  if (!memo) return "";
  const match = memo.match(/^(.*?[\.\!\?])\s/);
  return match ? match[1] : memo;
};
