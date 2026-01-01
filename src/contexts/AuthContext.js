// 권한 관리 (readonly/commentonly/editor/owner)
import { createContext, useState } from "react";

// 관리자 권한 관련 컨텍스트
export const AuthContext = createContext();

export const AuthProvider = ({ children, initialAuth = "owner" }) => {
  const [auth, setAuth] = useState(initialAuth);

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
