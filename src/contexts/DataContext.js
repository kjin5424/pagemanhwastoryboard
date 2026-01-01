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

// Context를 직접 쓰면 매번 반복되는 코드가 생깁니다.
// export default DataContext;

// // ❌ 커스텀 훅 없이 매번 이렇게 써야 함
// import { useContext } from 'react';
// import { DataContext } from '../contexts/DataContext';

// function PageManagement() {
//   const context = useContext(DataContext);
//   if (!context) {
//     throw new Error('DataContext 안에서 써야 합니다!');
//   }
//   const { data, setData } = context;

//   // ... 실제 로직
// }

// 커스텀 훅을 만들면:
// // ✅ 이렇게 간단해짐
// import { useData } from '../contexts/DataContext';

// function PageManagement() {
//   const { data, setData } = useData();  // 한 줄로 끝!

//   // ... 실제 로직
// }
