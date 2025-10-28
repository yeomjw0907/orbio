-- 관리자 계정 생성 및 샘플 데이터 추가
-- 이 SQL을 Supabase SQL Editor에서 실행하세요

-- 1. 관리자 프로필 생성 (auth.users 테이블에 사용자가 먼저 생성되어야 함)
-- 실제 사용자 ID로 교체해야 합니다
INSERT INTO profiles (id, name, email, role) VALUES
('00000000-0000-0000-0000-000000000000', '관리자', 'admin@orbio.com', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- 2. 제품 샘플 데이터
INSERT INTO products (name, description, price, category, image, features, specifications) VALUES
('ORBIO Easy-Clean 텀블러 350ml', '혁신적인 초친수 코팅 기술로 물만으로도 완벽하게 세척되는 텀블러입니다. 무세제 세척으로 환경을 생각하며, 99.999% 이상의 항균력을 제공합니다.', 25000, 'easy-clean', '/images/products/tumbler-350ml.jpg', 
 '["무세제 완벽 세척", "99.999% 이상 항균력", "색바램 없는 표면", "높은 표면경도로 스크래치 방지", "컴팩트한 사이즈"]',
 '{"material": "FDA 승인 실리콘", "dimensions": "높이 18cm, 직경 6.5cm", "weight": "200g", "capacity": "350ml", "certifications": ["FDA", "CE", "ISO 9001"]}'),
('ORBIO Easy-Clean 텀블러 500ml', '혁신적인 초친수 코팅 기술로 물만으로도 완벽하게 세척되는 텀블러입니다. 무세제 세척으로 환경을 생각하며, 99.999% 이상의 항균력을 제공합니다.', 30000, 'easy-clean', '/images/products/tumbler-500ml.jpg',
 '["무세제 완벽 세척", "99.999% 이상 항균력", "색바램 없는 표면", "높은 표면경도로 스크래치 방지", "세정 용이 디자인"]',
 '{"material": "FDA 승인 실리콘", "dimensions": "높이 22cm, 직경 7cm", "weight": "280g", "capacity": "500ml", "certifications": ["FDA", "CE", "ISO 9001"]}'),
('ORBIO Easy-Clean 식기 세트', '초친수 코팅 기술이 적용된 식기류로 높은 표면경도로 스크래치를 방지하고 세정이 용이합니다.', 45000, 'tableware', '/images/products/tableware-set.jpg',
 '["무세제 완벽 세척", "높은 표면경도로 스크래치 방지", "세정 용이", "내구성 강함", "친환경 소재"]',
 '{"material": "FDA 승인 실리콘", "pieces": "4인용 세트", "weight": "800g", "certifications": ["FDA", "CE", "ISO 9001"]}')
ON CONFLICT DO NOTHING;

-- 3. 블로그 포스트 샘플 데이터
INSERT INTO blog_posts (title, content, excerpt, author, published_at, tags, featured, image) VALUES
('ORBIO의 혁신적인 초친수 코팅 기술', '<h2>초친수 코팅 기술의 혁신</h2><p>ORBIO의 초친수(Superhydrophilic) 코팅 기술은 기존의 세척 방식을 완전히 바꿔놓았습니다. 물과 표면 사이의 접촉각을 극도로 낮춰 물방울이 표면에 완전히 퍼지도록 만듭니다.</p><h3>기존 99.9% vs ORBIO 99.999%</h3><p>기존 항균 코팅의 99.9% 항균력을 넘어서 ORBIO는 99.999% 이상의 항균력을 제공합니다. 이는 10배 더 강력한 항균 효과를 의미합니다.</p>', 
 '혁신적인 초친수 코팅 기술로 더 이상 어려운 청소는 없습니다.', 'ORBIO R&D 팀', NOW() - INTERVAL '10 days',
 '["기술", "혁신", "초친수", "코팅"]', true, '/images/blog/easy-clean-tech.jpg'),
('무세제 세척의 환경적 가치', '<h2>지구를 위한 선택</h2><p>ORBIO의 무세제 세척 기술은 단순히 편의성을 제공하는 것을 넘어서 환경 보호에 기여합니다. 세제 사용을 줄임으로써 수질 오염을 방지하고, 화학적 잔류물 없이 안전한 세척을 가능하게 합니다.</p>', 
 '세제 없이도 완벽한 청결을 경험하고 지구 환경까지 생각하세요.', 'ORBIO 환경팀', NOW() - INTERVAL '5 days',
 '["환경", "친환경", "무세제", "지속가능성"]', false, '/images/blog/eco-friendly.jpg'),
('색바램 없는 표면의 비밀', '<h2>영원한 아름다움</h2><p>ORBIO 제품의 색바램 없는 표면은 Lock&Lock과 같은 프리미엄 브랜드 수준의 품질을 제공합니다. 시간이 지나도 변하지 않는 아름다운 외관을 유지합니다.</p>', 
 '시간이 지나도 변하지 않는 아름다운 표면을 경험하세요.', 'ORBIO 품질관리팀', NOW() - INTERVAL '3 days',
 '["품질", "내구성", "색바램", "아름다움"]', false, '/images/blog/fade-resistant.jpg')
ON CONFLICT DO NOTHING;

-- 4. 재고 샘플 데이터
INSERT INTO inventory (sku, product_name, current_stock, min_stock, max_stock, status) VALUES
('ORB-EC-001', 'ORBIO Easy-Clean 텀블러 350ml', 150, 50, 500, 'in-stock'),
('ORB-EC-002', 'ORBIO Easy-Clean 텀블러 500ml', 200, 50, 500, 'in-stock'),
('ORB-TW-001', 'ORBIO Easy-Clean 식기 세트', 80, 20, 200, 'in-stock')
ON CONFLICT (sku) DO NOTHING;

-- 5. 샘플 주문 데이터 (테스트용)
INSERT INTO orders (user_id, user_name, products, total_amount, status, shipping_address) VALUES
('00000000-0000-0000-0000-000000000000', '김고객', 
 '[{"productId": "1", "productName": "ORBIO Easy-Clean 텀블러 350ml", "quantity": 2, "price": 25000}]', 
 50000, 'delivered', 
 '{"name": "김고객", "address": "서울시 강남구 테헤란로 123", "phone": "010-1234-5678"}'),
('00000000-0000-0000-0000-000000000000', '이고객', 
 '[{"productId": "2", "productName": "ORBIO Easy-Clean 텀블러 500ml", "quantity": 1, "price": 30000}]', 
 30000, 'processing', 
 '{"name": "이고객", "address": "부산시 해운대구 센텀동로 456", "phone": "010-9876-5432"}')
ON CONFLICT DO NOTHING;
