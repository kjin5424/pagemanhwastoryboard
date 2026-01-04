import { useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import PageManagement from "./components/screens/Page";
import CutManagement from "./components/screens/Cut";

function App() {
  const [currentScreen, setCurrentScreen] = useState("page");

  return (
    <AuthProvider>
      <DataProvider>
        {/* 전역 데이터만 관리 */}
        {/* 차후 project, episode 추가 */}
        {currentScreen === "page" && <PageManagement />}
        {currentScreen === "cut" && <CutManagement />}
      </DataProvider>
    </AuthProvider>
  );
}

export default App;

// 각 components/screens/해당폴더/index.jsx 참조
// 왜 이렇게 하냐면: 각 화면마다 필요한 state가 다르기 때문이에요.

// 페이지 관리: 선택된 페이지, 그리드 확장 여부
// 컷 관리: 현재 페이지, 줌 레벨, 컷 편집 모드
