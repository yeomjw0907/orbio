# ORBIO 공식 웹사이트 🚀

ORBIO의 공식 웹사이트와 관리자 대시보드입니다. React + TypeScript + Tailwind CSS + Supabase로 구축된 현대적인 웹 애플리케이션입니다.

**🔗 Live Site**: https://orbio.kr

## ✨ 최신 업데이트 (v2.0)

### 🎨 토스 스타일 모바일 UI
- **햄버거 메뉴**: 우측 상단 배치, 토스 앱과 동일한 UX
- **사이드바**: 완전 불투명한 하얀색 배경, 진한 검정 필터
- **문의하기 버튼**: 하단 고정 배치로 접근성 향상
- **스크롤 안정성**: 흔들림 방지 및 부드러운 애니메이션

### 📱 모바일 최적화
- **반응형 네비게이션**: PC와 모바일 메뉴 구조 통일
- **터치 친화적**: 44px 이상 터치 영역 확보
- **성능 최적화**: 하드웨어 가속 및 스크롤 throttling

## 🚀 주요 기능

### 프론트엔드 (고객용)
- **홈페이지**: 브랜드 소개 및 주요 제품 소개 (350ml, 500ml, 750ml)
- **브랜드 페이지**: ORBIO의 미션, 가치, 기술력 소개
- **제품 페이지**: Easy-Clean 시리즈 제품 라인업
- **블로그**: 최신 소식 및 기술 정보 + 구독 기능
- **문의 페이지**: 고객 문의 및 구매 요청 (전화번호 자동 포맷팅)
- **고객센터**: FAQ, 공지사항, 이벤트 페이지

### 관리자 대시보드
- **대시보드**: 방문자 통계 및 주요 지표
- **주문 관리**: 고객 주문 현황 및 상태 관리
- **블로그 관리**: 글 작성, 수정, 삭제
- **회원 관리**: 가입자 정보 및 등급 관리
- **재고 관리**: 제품 재고 현황 및 알림
- **문의 관리**: 고객 문의사항 처리
- **이벤트 관리**: 이벤트 등록 및 관리

## 🛠 기술 스택

- **Frontend**: React 18, TypeScript
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Styling**: Tailwind CSS
- **UI Components**: 토스 스타일 커스텀 컴포넌트
- **Animation**: Framer Motion
- **Charts**: Recharts
- **State Management**: Zustand
- **Routing**: React Router v6
- **Icons**: FontAwesome, Lucide React
- **Build Tool**: Create React App

## 🎨 디자인 특징

- **Glassmorphism**: 투명하고 고급스러운 유리 효과
- **반응형 디자인**: 모바일/태블릿/데스크탑 대응
- **브랜드 컬러**: Deep Aqua Blue (#027A9C), Mist Green (#A3D9B1), Silver Gray (#C7D1D9)
- **부드러운 애니메이션**: 페이지 전환 및 인터랙션 효과

## 📦 설치 및 실행

### 필수 요구사항
- Node.js 16.0 이상
- npm 또는 yarn
- Supabase 계정 및 프로젝트

### 설치
```bash
# 저장소 클론
git clone https://github.com/your-username/orbio-homepage.git
cd orbio-homepage

# 의존성 설치
npm install
```

### Supabase 설정
1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. 프로젝트 설정에서 API URL과 anon key 확인
3. `.env.local` 파일 생성:
```bash
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```
4. `supabase-schema.sql` 파일의 SQL을 Supabase SQL Editor에서 실행

### 개발 서버 실행
```bash
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
│   ├── ui/             # 기본 UI 컴포넌트 (HamburgerMenu, MobileSidebar 등)
│   ├── layout/         # 레이아웃 컴포넌트 (Header, Footer)
│   ├── cards/          # 카드 컴포넌트 (ProductCard, FeatureCard)
│   ├── animations/     # 애니메이션 컴포넌트
│   └── background/     # 배경 컴포넌트
├── pages/              # 페이지 컴포넌트
│   └── frontend/       # 프론트엔드 페이지 (HomePage, BlogPage 등)
├── admin/              # 관리자 관련
│   ├── pages/          # 관리자 페이지 (AdminDashboard, AdminBlog 등)
│   └── components/     # 관리자 컴포넌트
├── lib/                # 라이브러리 및 API
│   ├── api.ts          # Supabase API 함수들
│   └── supabase.ts     # Supabase 클라이언트 설정
├── store/              # 상태 관리 (Zustand)
├── types/              # TypeScript 타입 정의
├── utils/              # 유틸리티 함수
└── data/               # Mock 데이터
```

## 🌟 주요 컴포넌트

### UI 컴포넌트
- `Button`: 토스 스타일 버튼 (그라데이션, 호버 효과)
- `Card`: 글래스모피즘 카드
- `Input`: 폼 입력 필드 (전화번호 자동 포맷팅)
- `Textarea`: 텍스트 영역
- `HamburgerMenu`: 토스 스타일 햄버거 메뉴
- `MobileSidebar`: 모바일 사이드바 (불투명 배경)
- `WaterDropLoading`: 물방울 로딩 애니메이션

### 페이지 컴포넌트
- `HomePage`: 메인 홈페이지 (제품 카드, 성능 최적화)
- `BrandPage`: 브랜드 소개
- `ProductsPage`: 제품 목록 (350ml, 500ml, 750ml)
- `BlogPage`: 블로그 목록 + 구독 기능
- `ContactPage`: 문의 페이지 (전화번호 포맷팅)
- `FAQPage`: 자주 묻는 질문
- `NoticePage`: 공지사항
- `EventPage`: 이벤트 페이지

### 관리자 컴포넌트
- `AdminDashboard`: 관리자 대시보드
- `AdminOrders`: 주문 관리
- `AdminBlog`: 블로그 관리
- `AdminUsers`: 회원 관리
- `AdminInventory`: 재고 관리
- `AdminInquiries`: 문의 관리
- `AdminEvent`: 이벤트 관리
- `AdminFAQ`: FAQ 관리
- `AdminNotice`: 공지사항 관리

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

프로젝트에 대한 문의사항이 있으시면 yeomjw0907@onecation.co.kr 로 문의 주세요.