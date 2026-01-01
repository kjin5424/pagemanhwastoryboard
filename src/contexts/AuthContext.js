// 권한 관리 (readonly/commentonly/editor/owner)
import { createContext, useState } from "react";

// 관리자 권한 관련 컨텍스트
export const AuthContext = createContext();

export const AuthProvider = ({ children, initialAuth = "owner" }) => {
  const [auth, setAuth] = useState(initialAuth); //-- 차후 수정

  const permissions = {
    isOwner: auth === "owner",
    canEdit: ["owner", "editor"].includes(auth),
    canComment: ["owner", "editor", "commentonly"].includes(auth),
    canDelete: auth === "owner",
    isReadonly: auth === "readonly",
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, ...permissions }}>
      {children}
    </AuthContext.Provider>
  );
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
