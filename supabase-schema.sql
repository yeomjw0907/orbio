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

-- 샘플 데이터 삽입 (선택사항)
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
