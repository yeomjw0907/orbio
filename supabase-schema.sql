-- Supabase 데이터베이스 스키마
-- 이 SQL을 Supabase SQL Editor에서 실행하세요

-- 프로필 테이블 (사용자 정보)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 제품 테이블
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL, -- 센트 단위로 저장
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  features JSONB NOT NULL DEFAULT '[]',
  specifications JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 블로그 포스트 테이블
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  author TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL,
  tags JSONB NOT NULL DEFAULT '[]',
  featured BOOLEAN DEFAULT FALSE,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 주문 테이블
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  products JSONB NOT NULL DEFAULT '[]',
  total_amount INTEGER NOT NULL, -- 센트 단위로 저장
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  shipping_address JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 재고 테이블
CREATE TABLE inventory (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sku TEXT UNIQUE NOT NULL,
  product_name TEXT NOT NULL,
  current_stock INTEGER NOT NULL DEFAULT 0,
  min_stock INTEGER NOT NULL DEFAULT 0,
  max_stock INTEGER NOT NULL DEFAULT 1000,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'in-stock' CHECK (status IN ('in-stock', 'low-stock', 'out-of-stock')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 문의 테이블
CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  privacy_agreed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FAQ 테이블
CREATE TABLE faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('general', 'product', 'shipping', 'payment', 'refund')),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  views INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 공지사항 테이블
CREATE TABLE notices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  is_important BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 이벤트 테이블
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) 정책 설정

-- 프로필 테이블 정책
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "사용자는 자신의 프로필만 조회 가능" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "사용자는 자신의 프로필만 업데이트 가능" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "사용자는 자신의 프로필만 삽입 가능" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 제품 테이블 정책 (모든 사용자가 읽기 가능)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "모든 사용자가 제품 조회 가능" ON products
  FOR SELECT USING (true);

CREATE POLICY "관리자만 제품 생성 가능" ON products
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "관리자만 제품 업데이트 가능" ON products
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "관리자만 제품 삭제 가능" ON products
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 블로그 포스트 테이블 정책
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "모든 사용자가 블로그 포스트 조회 가능" ON blog_posts
  FOR SELECT USING (true);

CREATE POLICY "관리자만 블로그 포스트 생성 가능" ON blog_posts
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "관리자만 블로그 포스트 업데이트 가능" ON blog_posts
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "관리자만 블로그 포스트 삭제 가능" ON blog_posts
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 주문 테이블 정책
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "사용자는 자신의 주문만 조회 가능" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "관리자는 모든 주문 조회 가능" ON orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "인증된 사용자는 주문 생성 가능" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "관리자만 주문 업데이트 가능" ON orders
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 재고 테이블 정책 (관리자만 접근 가능)
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "관리자만 재고 조회 가능" ON inventory
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "관리자만 재고 생성 가능" ON inventory
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "관리자만 재고 업데이트 가능" ON inventory
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 문의 테이블 정책
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "모든 사용자가 문의 생성 가능" ON inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "관리자만 문의 조회 가능" ON inquiries
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "관리자만 문의 업데이트 가능" ON inquiries
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 업데이트 시간 자동 갱신 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 트리거 설정
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON inventory
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 고객센터 테이블 정책
-- FAQ 테이블 정책 (모든 사용자가 읽기 가능, 관리자만 쓰기 가능)
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "모든 사용자가 FAQ 조회 가능" ON faqs
  FOR SELECT USING (true);

CREATE POLICY "관리자만 FAQ 생성 가능" ON faqs
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "관리자만 FAQ 업데이트 가능" ON faqs
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "관리자만 FAQ 삭제 가능" ON faqs
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 공지사항 테이블 정책 (모든 사용자가 읽기 가능, 관리자만 쓰기 가능)
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "모든 사용자가 공지사항 조회 가능" ON notices
  FOR SELECT USING (true);

CREATE POLICY "관리자만 공지사항 생성 가능" ON notices
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "관리자만 공지사항 업데이트 가능" ON notices
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "관리자만 공지사항 삭제 가능" ON notices
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 이벤트 테이블 정책 (모든 사용자가 읽기 가능, 관리자만 쓰기 가능)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "모든 사용자가 이벤트 조회 가능" ON events
  FOR SELECT USING (true);

CREATE POLICY "관리자만 이벤트 생성 가능" ON events
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "관리자만 이벤트 업데이트 가능" ON events
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "관리자만 이벤트 삭제 가능" ON events
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 고객센터 테이블 트리거
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notices_updated_at BEFORE UPDATE ON notices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 고객센터 샘플 데이터
INSERT INTO faqs (category, question, answer) VALUES
('general', 'ORBIO는 어떤 회사인가요?', 'ORBIO는 친환경 세척 기술을 선도하는 혁신적인 기업입니다. 초친수 코팅 기술을 통해 무세제로도 완벽한 세척이 가능한 제품을 제공합니다.'),
('product', '초친수 코팅이 무엇인가요?', '초친수 코팅은 물이 표면에 완전히 퍼져 자가정화 효과를 제공하는 혁신적인 기술입니다. 일반 발수 코팅과 달리 물이 스스로 오염물질을 씻어내는 구조입니다.'),
('product', '99.999% 항균력이 정말인가요?', '네, ORBIO의 항균 기술은 첨단 나노 기술을 기반으로 99.999% 이상의 극강 항균력을 제공합니다. 이는 일반 항균제 99.9%보다 10배 이상 강력한 수준입니다.'),
('shipping', '배송은 얼마나 걸리나요?', '일반적으로 주문 후 2-3일 내에 배송되며, 도착까지는 1-2일이 추가로 소요됩니다. 급한 경우 당일 배송도 가능합니다.'),
('payment', '어떤 결제 방법을 지원하나요?', '신용카드, 체크카드, 계좌이체, 간편결제(카카오페이, 네이버페이, 페이코) 등 다양한 결제 방법을 지원합니다.'),
('refund', '교환/반품 정책은 어떻게 되나요?', '제품 수령 후 7일 이내에 교환/반품이 가능합니다. 단순 변심의 경우 배송비는 고객 부담이며, 제품 하자의 경우 무료로 처리됩니다.');

INSERT INTO notices (title, content, author, is_important) VALUES
('ORBIO 공식 홈페이지 오픈 안내', '<h2>ORBIO 공식 홈페이지가 오픈되었습니다!</h2><p>더 나은 서비스 제공을 위해 새로운 홈페이지를 구축했습니다. 다양한 제품 정보와 기술 소개를 확인해보세요.</p>', 'ORBIO 마케팅팀', true),
('2024년 신제품 출시 예정', '<h2>혁신적인 신제품이 곧 출시됩니다</h2><p>더욱 향상된 초친수 코팅 기술이 적용된 신제품을 준비 중입니다. 많은 관심과 기대 부탁드립니다.</p>', 'ORBIO R&D팀', false),
('시스템 점검 안내', '<h2>정기 시스템 점검 안내</h2><p>더 나은 서비스 제공을 위해 매월 첫째 주 일요일 새벽 2시-4시에 시스템 점검을 실시합니다.</p>', 'ORBIO IT팀', false);

INSERT INTO events (title, description, start_date, end_date, is_active) VALUES
('신규 회원 20% 할인 이벤트', 'ORBIO 신규 회원을 위한 특별 할인 이벤트입니다. 모든 제품에 20% 할인이 적용됩니다.', '2024-01-01 00:00:00', '2024-12-31 23:59:59', true),
('초친수 코팅 기술 세미나', 'ORBIO의 혁신적인 초친수 코팅 기술에 대한 전문가 세미나를 개최합니다. 무료 참가 가능합니다.', '2024-02-15 14:00:00', '2024-02-15 17:00:00', true),
('친환경 라이프스타일 캠페인', '지구를 위한 친환경 라이프스타일을 함께 실천해보세요. 참여자 전원에게 특별 선물을 드립니다.', '2024-03-01 00:00:00', '2024-03-31 23:59:59', true);
-- 제품 샘플 데이터
INSERT INTO products (name, description, price, category, image, features, specifications) VALUES
('ORBIO Easy-Clean 텀블러 350ml', '혁신적인 초친수 코팅 기술로 물만으로도 완벽하게 세척되는 텀블러입니다.', 25000, 'easy-clean', '/images/products/tumbler-350ml.jpg', 
 '["무세제 완벽 세척", "99.999% 이상 항균력", "색바램 없는 표면", "높은 표면경도로 스크래치 방지", "컴팩트한 사이즈"]',
 '{"material": "FDA 승인 실리콘", "dimensions": "높이 18cm, 직경 6.5cm", "weight": "200g", "capacity": "350ml", "certifications": ["FDA", "CE", "ISO 9001"]}'),
('ORBIO Easy-Clean 텀블러 500ml', '혁신적인 초친수 코팅 기술로 물만으로도 완벽하게 세척되는 텀블러입니다.', 30000, 'easy-clean', '/images/products/tumbler-500ml.jpg',
 '["무세제 완벽 세척", "99.999% 이상 항균력", "색바램 없는 표면", "높은 표면경도로 스크래치 방지", "세정 용이 디자인"]',
 '{"material": "FDA 승인 실리콘", "dimensions": "높이 22cm, 직경 7cm", "weight": "280g", "capacity": "500ml", "certifications": ["FDA", "CE", "ISO 9001"]}');

-- 블로그 포스트 샘플 데이터
INSERT INTO blog_posts (title, content, excerpt, author, published_at, tags, featured, image) VALUES
('ORBIO의 혁신적인 초친수 코팅 기술', '<h2>초친수 코팅 기술의 혁신</h2><p>ORBIO의 초친수(Superhydrophilic) 코팅 기술은 기존의 세척 방식을 완전히 바꿔놓았습니다.</p>', 
 '혁신적인 초친수 코팅 기술로 더 이상 어려운 청소는 없습니다.', 'ORBIO R&D 팀', NOW() - INTERVAL '10 days',
 '["기술", "혁신", "초친수", "코팅"]', true, '/images/blog/easy-clean-tech.jpg');

-- 재고 샘플 데이터
INSERT INTO inventory (sku, product_name, current_stock, min_stock, max_stock, status) VALUES
('ORB-EC-001', 'ORBIO Easy-Clean 텀블러 350ml', 150, 50, 500, 'in-stock'),
('ORB-EC-002', 'ORBIO Easy-Clean 텀블러 500ml', 200, 50, 500, 'in-stock');
