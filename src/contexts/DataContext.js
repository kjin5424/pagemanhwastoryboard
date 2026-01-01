// 전역 데이터 상태 (차후 서버 연동 대비)
import { createContext, useState } from "react";
import { initialData } from "../services/storage/localStorage";

export const DataContext = createContext();

export const DataProvider = ({ children, initialData = { initialData } }) => {
  const [data, setData] = useState(initialData);
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
