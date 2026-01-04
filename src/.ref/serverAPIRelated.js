
// ✅ 분리 방식의 장점
// User API
GET /api/user/me  → userData만 반환
PUT /api/user/me  → userData만 업데이트

// Collection API
GET /api/collections/my-collections  → collection 목록
GET /api/collections/{collectionId}  → collection 상세
POST /api/collections/{collectionId}/share  → 권한 부여

// 장점:
// - 각 도메인이 독립적으로 변경 가능
// - 필요한 데이터만 불러올 수 있음 (성능)
// - 권한 관리가 명확해짐

//=======================================================

// ❌ 통합 방식
const sharedData = {
  user: {
    email: "owner@example.com",  // 🚫 공유 시 소유자 이메일 노출
    phone: "010-1234-5678",      // 🚫 개인정보 노출
    },
    collection: {
      projects: { ... }
      }
      };
      
      // 문제:
      // - 프로젝트를 공유하면 소유자 개인정보까지 넘어감
      // - 협업자가 소유자의 민감한 정보를 볼 수 있음

// ✅ 분리 방식
const collectionData = {
  ownerId: "user-001",  // ✅ ID만 저장
  ownerDisplayName: "베베", // ✅ 공개 가능한 정보만
  permissions: {
    "user-002": "editor",
    },
    // ... collection 데이터
    };

    // 서버에서 권한 체크:
    // 1. 요청자의 userId 확인
    // 2. permissions[userId]로 권한 확인
// 3. 권한에 따라 데이터 필터링해서 반환

// 클라이언트는 자신의 권한에 맞는 데이터만 받음

//=======================================================

// 유저 한 명이 여러 collection 소유 가능
const userCollections = {
  userId: "user-001",
  ownedCollections: [
    "collection-001",  // 본인 소유
    "collection-002",  // 본인 소유
  ],
  sharedCollections: [
    {
      collectionId: "collection-003",  // 다른 사람 소유
      permission: "editor",            // 편집 권한만
    },
  ],
};

// 여러 유저가 하나의 collection 공유 가능
const collectionPermissions = {
  collectionId: "collection-001",
  permissions: {
    "user-001": "owner",
    "user-002": "editor",
    "user-003": "readonly",
  },
};
