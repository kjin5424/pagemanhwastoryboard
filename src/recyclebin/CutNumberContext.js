import { createContext, useState } from "react";

export const CutNumberContext = createContext();

export function CutNumberProvider({ children }) {
  const [pageNumber, setPageNumber] = useState(0);
  const [cutNumber, setCutNumber] = useState(0);
  return (
    <CutNumberContext.Provider
      value={{ pageNumber, setPageNumber, cutNumber, setCutNumber }}
    >
      {children}
    </CutNumberContext.Provider>
  );
}
// useContext로 CutNumberProvider를 사용하려 했으나
// project에서 uiState를 조정하는 경우
// 그럴 필요가 없어서 삭제함
