# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 접속하여 계정을 생성하세요.
2. "New Project" 버튼을 클릭하여 새 프로젝트를 생성하세요.
3. 프로젝트 이름을 입력하고 데이터베이스 비밀번호를 설정하세요.
4. 프로젝트가 생성될 때까지 기다리세요 (약 2-3분 소요).

## 2. 데이터베이스 스키마 설정

1. Supabase 대시보드에서 "SQL Editor" 탭으로 이동하세요.
2. `supabase-schema.sql` 파일의 내용을 복사하여 SQL Editor에 붙여넣으세요.
3. "Run" 버튼을 클릭하여 스키마를 생성하세요.

## 3. 환경변수 설정

1. 프로젝트 루트에 `.env.local` 파일을 생성하세요.
2. Supabase 대시보드의 "Settings" > "API"에서 다음 정보를 복사하세요:
   - Project URL
   - anon public key

3. `.env.local` 파일에 다음과 같이 설정하세요:

```env
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 4. 관리자 계정 생성

Supabase Auth를 통해 관리자 계정을 생성하려면:

1. Supabase 대시보드의 "Authentication" > "Users" 탭으로 이동하세요.
2. "Add user" 버튼을 클릭하여 새 사용자를 생성하세요.
3. 이메일과 비밀번호를 설정하세요.
4. 생성된 사용자의 ID를 복사하세요.
5. SQL Editor에서 다음 쿼리를 실행하여 관리자 권한을 부여하세요:

```sql
INSERT INTO profiles (id, name, email, role)
VALUES ('사용자-ID', '관리자', 'admin@orbio.com', 'admin');
```

## 5. 테스트 데이터 확인

데이터베이스에 샘플 데이터가 정상적으로 삽입되었는지 확인하세요:

- **제품**: `products` 테이블에서 제품 데이터 확인
- **블로그**: `blog_posts` 테이블에서 블로그 포스트 확인  
- **재고**: `inventory` 테이블에서 재고 데이터 확인

## 6. 보안 설정 확인

RLS (Row Level Security) 정책이 올바르게 설정되었는지 확인하세요:

- 모든 테이블에 RLS가 활성화되어 있는지
- 적절한 정책이 설정되어 있는지
- 관리자와 일반 사용자의 권한이 올바르게 구분되어 있는지

## 7. 개발 서버 재시작

환경변수를 설정한 후 개발 서버를 재시작하세요:

```bash
npm start
```

## 8. 연결 테스트

브라우저에서 다음을 확인하세요:

1. **프론트엔드**: 제품과 블로그 포스트가 정상적으로 로드되는지
2. **관리자 페이지**: 로그인 후 데이터가 정상적으로 표시되는지
3. **콘솔**: 네트워크 탭에서 Supabase API 호출이 정상적으로 이루어지는지

## 문제 해결

### 일반적인 문제들:

1. **CORS 오류**: Supabase 프로젝트 설정에서 도메인을 허용 목록에 추가하세요.
2. **인증 오류**: 환경변수가 올바르게 설정되었는지 확인하세요.
3. **RLS 오류**: 정책이 올바르게 설정되었는지 확인하세요.

### 디버깅 팁:

- 브라우저 개발자 도구의 Network 탭에서 API 호출 확인
- Supabase 대시보드의 Logs 탭에서 서버 로그 확인
- 콘솔에서 에러 메시지 확인
