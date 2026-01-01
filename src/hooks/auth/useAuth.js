// 권한 체크 (canEdit, canComment, isOwner 등)

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function useAuth() {
  const { auth } = useContext(AuthContext);

  return {
    auth,
    canEdit: ["owner", "editor"].includes(auth),
    canComment: ["owner", "editor", "commentonly"].includes(auth),
    canDelete: auth === "owner",
    isReadonly: auth === "readonly",
    isOwner: auth === "owner",
  };
}

export default useAuth;

// // PageCard.jsx
// import { useAuth } from '../../../hooks/auth/useAuth';

// function PageCard() {
//   const { canEdit, canDelete } = useAuth();

//   return (
//     <div>
//       {canEdit && <button>수정</button>}
//       {canDelete && <button>삭제</button>}
//     </div>
//   );
// }

// // CutItem.jsx
// function CutItem() {
//   const { canEdit, isReadonly } = useAuth();

//   return (
//     <div>
//       {canEdit && <button>수정</button>}
//       {!isReadonly && <DragHandle />}
//     </div>
//   );
// }
