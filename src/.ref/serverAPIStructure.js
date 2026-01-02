//🗄️ 서버 API 구조 (예상)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ● User 도메인
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GET    /api/user/me              // 현재 유저 정보
PUT    /api/user/me              // 유저 정보 수정
GET    /api/user/{userId}        // 다른 유저 공개 정보 (displayName, avatar만)

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ● Collection 도메인
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GET    /api/collections/my-collections       // 내가 소유/공유받은 collection 목록
GET    /api/collections/{collectionId}       // collection 상세 (권한 체크)
POST   /api/collections                      // collection 생성
PUT    /api/collections/{collectionId}       // collection 수정 (권한 체크)
DELETE /api/collections/{collectionId}       // collection 삭제 (owner만)

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ● 권한 관리
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
POST   /api/collections/{collectionId}/share
  body: { userId: "user-002", permission: "editor" }
  
DELETE /api/collections/{collectionId}/share/{userId}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ● 서버 측 권한 체크 로직 (예시)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function checkPermission(collectionId, userId, requiredPermission) {
  const collection = db.getCollection(collectionId);
  const userPermission = collection.permissions[userId];
  
  const permissionLevels = {
    'readonly': 1,
    'commentonly': 2,
    'editor': 3,
    'owner': 4,
  };
  
  return permissionLevels[userPermission] >= permissionLevels[requiredPermission];
}

// 사용 예시
app.put('/api/collections/:collectionId', (req, res) => {
  const { collectionId } = req.params;
  const userId = req.session.userId;
  
  // ✅ 권한 체크
  if (!checkPermission(collectionId, userId, 'editor')) {
    return res.status(403).json({ error: 'Permission denied' });
  }
  
  // 업데이트 수행
  // ...
});