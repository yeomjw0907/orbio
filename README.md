# ORBIO 공식 웹사이트

ORBIO의 공식 웹사이트와 관리자 대시보드입니다. React + TypeScript + Tailwind CSS로 구축되었습니다.

## 🚀 주요 기능

### 프론트엔드 (고객용)
- **홈페이지**: 브랜드 소개 및 주요 제품 소개
- **브랜드 페이지**: ORBIO의 미션, 가치, 기술력 소개
- **제품 페이지**: Easy-Clean, Antimicrobial, Eco 제품 라인업
- **블로그**: 최신 소식 및 기술 정보
- **문의 페이지**: 고객 문의 및 구매 요청

### 관리자 대시보드
- **대시보드**: 방문자 통계 및 주요 지표
- **주문 관리**: 고객 주문 현황 및 상태 관리
- **블로그 관리**: 글 작성, 수정, 삭제
- **회원 관리**: 가입자 정보 및 등급 관리
- **재고 관리**: 제품 재고 현황 및 알림

## 🛠 기술 스택

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Glassmorphism design
- **Animation**: Framer Motion
- **Charts**: Recharts
- **State Management**: Zustand
- **Routing**: React Router v6
- **Icons**: Lucide React

## 🎨 디자인 특징

- **Glassmorphism**: 투명하고 고급스러운 유리 효과
- **반응형 디자인**: 모바일/태블릿/데스크탑 대응
- **브랜드 컬러**: Deep Aqua Blue (#027A9C), Mist Green (#A3D9B1), Silver Gray (#C7D1D9)
- **부드러운 애니메이션**: 페이지 전환 및 인터랙션 효과

## 📦 설치 및 실행

### 필수 요구사항
- Node.js 16.0 이상
- npm 또는 yarn

### 설치
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

### 빌드
```bash
# 프로덕션 빌드
npm run build
```

## 🔐 관리자 접근

관리자 대시보드에 접근하려면:
1. `/admin/login` 페이지로 이동
2. 테스트 계정으로 로그인:
   - 이메일: `admin@orbio.com`
   - 비밀번호: `admin123`

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── ui/             # 기본 UI 컴포넌트
│   └── layout/         # 레이아웃 컴포넌트
├── pages/              # 페이지 컴포넌트
│   └── frontend/       # 프론트엔드 페이지
├── admin/              # 관리자 관련
│   ├── pages/          # 관리자 페이지
│   └── components/     # 관리자 컴포넌트
├── store/              # 상태 관리
├── types/              # TypeScript 타입 정의
├── utils/              # 유틸리티 함수
└── data/               # Mock 데이터
```

## 🌟 주요 컴포넌트

### UI 컴포넌트
- `Button`: 다양한 스타일의 버튼
- `Card`: 글래스모피즘 카드
- `Input`: 폼 입력 필드
- `Textarea`: 텍스트 영역
- `Chart`: Recharts 기반 차트

### 페이지 컴포넌트
- `HomePage`: 메인 홈페이지
- `BrandPage`: 브랜드 소개
- `ProductsPage`: 제품 목록
- `BlogPage`: 블로그 목록
- `ContactPage`: 문의 페이지

### 관리자 컴포넌트
- `AdminDashboard`: 관리자 대시보드
- `AdminOrders`: 주문 관리
- `AdminBlog`: 블로그 관리
- `AdminUsers`: 회원 관리
- `AdminInventory`: 재고 관리

## 🎯 브랜드 가치

1. **위생**: 99.9% 항균 효과
2. **편의**: Easy-Clean 기술로 물만으로 세척
3. **친환경**: 100% 재활용 가능한 소재
4. **신뢰**: FDA, CE 등 국제 인증

## 📱 반응형 디자인

- **모바일**: 320px 이상
- **태블릿**: 768px 이상
- **데스크탑**: 1024px 이상

## 🔧 개발 가이드

### 새로운 페이지 추가
1. `src/pages/frontend/` 또는 `src/admin/pages/`에 컴포넌트 생성
2. `src/App.tsx`에 라우트 추가
3. 필요시 네비게이션 메뉴 업데이트

### 새로운 컴포넌트 추가
1. `src/components/ui/`에 컴포넌트 생성
2. `src/components/ui/index.tsx`에서 export
3. 필요한 곳에서 import하여 사용

### 상태 관리
- Zustand를 사용하여 전역 상태 관리
- `src/store/index.ts`에서 스토어 정의
- 컴포넌트에서 `useAuthStore`, `useAdminStore` 사용

## 📄 라이선스

이 프로젝트는 ORBIO의 소유입니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 contact@orbio.com으로 연락해주세요.