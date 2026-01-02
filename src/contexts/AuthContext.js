// 권한 관리 (readonly/commentonly/editor/owner)
import { createContext, useContext, useState } from "react";
import { errorMsg } from "../components/common/errorMessage";

// 관리자 권한 관련 컨텍스트
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 로그인
  const login = async (email, password) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const userData = await response.json();
    setUser(userData);
    setIsAuthenticated(true);
  };

  // 로그아웃
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useUser 커스텀 훅
export const useUser = () => {
  const context = useContext(AuthContext);

  // context 밖에서 사용하면 에러
  if (!context) {
    throw new Error(errorMsg.contexts["useUser 오류"]);
  }

  return context;
};

// // 사용 예시
// function PageCard({ page }) {
//   const { canEdit, isReadonly } = useAuth();

//   return (
//     <div className="page-card">
//       {/* 모든 권한에서 보임 */}
//       <PageThumbnail page={page} />

//       {/* owner, editor만 수정 가능 */}
//       {canEdit && <EditButton onClick={handleEdit} />}

//       {/* readonly는 드래그 불가 */}
//       {!isReadonly && <DragHandle />}
//     </div>
//   );
// }

/*
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ● 1. AuthContext (유저 정보 + 인증 상태)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// contexts/AuthContext.jsx
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const userData = await response.json();
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user,           // userId, email, displayName, avatar 등
      isAuthenticated,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
*/
