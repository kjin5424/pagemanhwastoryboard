// cutOrder, pageOrder 관리

// utils/helpers/orderManager.js
export const reorderItems = (order, fromIndex, toIndex) => {
  //   // 현재 순서
  //   episodeOrder = ["ep-0001", "ep-0002", "ep-0003"];
  //   //                 0번         1번         2번

  //   // 0번 에피소드를 2번 위치로 드래그했음
  //   reorderItems(episodeOrder, 0, 2);

  // 1단계: 원본 배열 복사 (불변성 유지)
  const newOrder = [...order];
  // newOrder = ['ep-0001', 'ep-0002', 'ep-0003']

  // 2단계: fromIndex 위치의 항목을 제거하고 그걸 moved에 저장
  const [moved] = newOrder.splice(fromIndex, 1);
  // moved = 'ep-0001'  (0번 위치에서 1개 제거)
  // newOrder = ['ep-0002', 'ep-0003']  (제거 후 남은 배열)

  // 3단계: toIndex 위치에 moved를 삽입
  newOrder.splice(toIndex, 0, moved);
  newOrder.splice(toIndex, 0, moved);
  // toIndex=2 위치에, 0개 제거하고, 'ep-0001' 삽입
  // newOrder = ['ep-0002', 'ep-0003', 'ep-0001']

  return newOrder;
};

// // 사용 예시
// const newEpisodeOrder = reorderItems(episodeOrder, 0, 2);
// // ['ep-0001', 'ep-0002', 'ep-0003'] → ['ep-0002', 'ep-0003', 'ep-0001']

// utils/helpers/orderManager.js
// 배열 순서 변경
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// 항목 추가
export const addToOrder = (order, newId, position = -1) => {
  if (position === -1) {
    return [...order, newId];
  }
  const newOrder = [...order];
  newOrder.splice(position, 0, newId);
  return newOrder;
};

// 항목 제거
export const removeFromOrder = (order, id) => {
  return order.filter((item) => item !== id);
};
