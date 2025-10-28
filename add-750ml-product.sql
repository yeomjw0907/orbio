-- 750ml 제품 추가
INSERT INTO products (name, description, price, category, image, features, specifications) VALUES
('ORBIO Easy-Clean 텀블러 750ml', '혁신적인 초친수 코팅으로 물만으로도 완벽하게 세척되는 대용량 텀블러입니다. 높은 표면경도와 강력한 내구성으로 스크래치 방지와 세정 용이성을 동시에 제공합니다. 색바램 없는 표면으로 깨끗한 수분 섭취가 가능합니다.', 35000, 'easy-clean', '/images/products/tumbler-750ml.jpg',
 '["무세제 완벽 세척", "99.999% 이상 항균력", "색바램 없는 표면", "높은 표면경도로 스크래치 방지", "대용량 디자인"]',
 '{"material": "FDA 승인 실리콘", "dimensions": "높이 26cm, 직경 7.5cm", "weight": "350g", "capacity": "750ml", "certifications": ["FDA", "CE", "ISO 9001"]}');

-- 재고 데이터도 추가
INSERT INTO inventory (sku, product_name, current_stock, min_stock, max_stock, status) VALUES
('ORB-EC-003', 'ORBIO Easy-Clean 텀블러 750ml', 100, 30, 300, 'in-stock');
