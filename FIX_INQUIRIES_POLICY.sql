-- 문의 테이블 삭제 및 재생성
DROP TABLE IF EXISTS inquiries CASCADE;

-- 문의 테이블 생성
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

-- 업데이트 시간 자동 갱신 함수가 없다면 생성
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 업데이트 시간 자동 갱신 트리거
CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS 정책 설정
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 문의 생성 가능
CREATE POLICY "모든 사용자가 문의 생성 가능" ON inquiries
  FOR INSERT WITH CHECK (true);

-- 모든 사용자가 자신이 생성한 문의 조회 가능
CREATE POLICY "사용자는 자신이 생성한 문의 조회 가능" ON inquiries
  FOR SELECT USING (true);

-- 관리자만 모든 문의 조회 가능
-- (profiles 테이블이 있을 경우)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'profiles') THEN
    EXECUTE 'CREATE POLICY "관리자만 모든 문의 조회 가능" ON inquiries FOR SELECT USING (
      EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND role = ''admin''
      )
    )';
  END IF;
END $$;

-- 관리자만 문의 업데이트 가능
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'profiles') THEN
    EXECUTE 'CREATE POLICY "관리자만 문의 업데이트 가능" ON inquiries FOR UPDATE USING (
      EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND role = ''admin''
      )
    )';
  END IF;
END $$;


