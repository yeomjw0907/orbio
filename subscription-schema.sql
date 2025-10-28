-- 구독 테이블 생성
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL DEFAULT 'blog', -- 'blog', 'newsletter', 'product' 등
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 이메일과 타입에 대한 유니크 제약 조건 (중복 구독 방지)
CREATE UNIQUE INDEX IF NOT EXISTS idx_subscriptions_email_type 
ON subscriptions(email, type) 
WHERE is_active = true;

-- 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_type ON subscriptions(type);
CREATE INDEX IF NOT EXISTS idx_subscriptions_active ON subscriptions(is_active);

-- 구독 테이블에 대한 RLS (Row Level Security) 정책
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 구독할 수 있도록 허용
CREATE POLICY "Allow public subscription" ON subscriptions
  FOR INSERT WITH CHECK (true);

-- 구독 상태 확인을 위한 읽기 권한
CREATE POLICY "Allow subscription status check" ON subscriptions
  FOR SELECT USING (true);

-- 구독 해지를 위한 업데이트 권한
CREATE POLICY "Allow subscription update" ON subscriptions
  FOR UPDATE USING (true);

-- 구독 샘플 데이터 (테스트용)
INSERT INTO subscriptions (email, type, subscribed_at, is_active) VALUES
('test@example.com', 'blog', NOW(), true),
('demo@orbio.com', 'blog', NOW(), true)
ON CONFLICT (email, type) DO NOTHING;
