// 📦 LocalStorage에서의 구조 (현재 단계)
// // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ● localStorage 키 분리
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. 유저 정보 (로그인 전에는 없음)
localStorage.setItem(
  "user",
  JSON.stringify({
    userId: "user-001",
    displayName: "베베",
    email: "user@example.com",
  })
);

// 2. Collection 데이터
localStorage.setItem(
  "collectionData",
  JSON.stringify({
    collection: {
      ownerId: "user-001",
      permissions: {
        "user-001": "owner",
      },
      projectOrder: ["initial-project"],
      projects: {
        /* ... */
      },
    },
  })
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ● 초기화 로직 (App.jsx 또는 index.jsx)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function App() {
  // 1. 로그인 확인 (지금은 가짜 데이터)
  const userFromStorage = JSON.parse(localStorage.getItem("user")) || {
    userId: "guest-001",
    displayName: "Guest",
  };

  // 2. Collection 데이터 로드
  const collectionFromStorage =
    JSON.parse(localStorage.getItem("collectionData")) || initialData;

  return (
    <AuthProvider initialUser={userFromStorage}>
      <DataProvider initialData={collectionFromStorage}>
        <Router>{/* ... */}</Router>
      </DataProvider>
    </AuthProvider>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ● localStorage 구조 (지금)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
localStorage: {
  "user": {
    userId: "user-001",
    displayName: "베베",
    email: "user@example.com",
  },
  
  "collectionData": {
    collection: {
      ownerId: "user-001",  // ✅ ID만
      permissions: {
        "user-001": "owner",
      },
      projectOrder: [...],
      projects: {...},
    },
  },
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ● 서버 DB 구조 (차후)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TABLE users {
  user_id        VARCHAR(50) PRIMARY KEY,
  email          VARCHAR(255) UNIQUE,
  display_name   VARCHAR(100),
  password_hash  VARCHAR(255),
  created_at     TIMESTAMP,
}

TABLE collections {
  collection_id  VARCHAR(50) PRIMARY KEY,
  owner_id       VARCHAR(50) REFERENCES users(user_id),
  data           JSON,  -- projectOrder, projects, episodes, pages, cuts 전체
  created_at     TIMESTAMP,
  updated_at     TIMESTAMP,
}

TABLE collection_permissions {
  collection_id  VARCHAR(50) REFERENCES collections(collection_id),
  user_id        VARCHAR(50) REFERENCES users(user_id),
  permission     VARCHAR(20),  -- 'owner' | 'editor' | 'commentonly' | 'readonly'
  PRIMARY KEY (collection_id, user_id),
}