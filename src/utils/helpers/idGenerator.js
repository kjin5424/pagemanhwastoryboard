// pageId, cutId 생성 로직

// utils/helpers/idGenerator.js
export const generatePageId = (index) => {
  return `page-${String(index).padStart(4, "0")}`;
};

export const generateCutId = (pageId, index) => {
  return `${pageId}-cut-${String(index).padStart(4, "0")}`;
};

export const generateEpisodeId = (index) => {
  return `ep-${String(index).padStart(4, "0")}`;
};

// // PageManagement/index.jsx
// import { generatePageId } from '../../../utils/helpers/idGenerator';
// import { addToOrder } from '../../../utils/helpers/orderManager';
// import { DEFAULT_PAGE_COUNT } from '../../../utils/constants/defaults';

// function PageManagement() {
//   const handleAddPage = () => {
//     const newPageId = generatePageId(pages.length + 1);
//     const newPageOrder = addToOrder(currentPageOrder, newPageId);

//     // ...
//   };
// }
