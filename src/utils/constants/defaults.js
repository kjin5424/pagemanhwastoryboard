// 기본값 (페이지 수, 컷 구조 등)

// utils/constants/defaults.js
export const DEFAULT_PAGE_COUNT = 24;

export const INITIAL_CUT = {
  cutId: "cut-0001",
  memo: "",
};

export const INITIAL_PAGE = {
  memo: "",
  cutOrder: ["cut-0001"],
  cuts: {
    "cut-0001": INITIAL_CUT,
  },
};
