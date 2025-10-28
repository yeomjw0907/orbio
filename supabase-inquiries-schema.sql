-- 문의 테이블 추가
CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  privacy_agreed BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS 정책 설정
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 문의 생성 가능
CREATE POLICY "사용자는 문의 생성 가능" ON inquiries
  FOR INSERT WITH CHECK (true);

-- 관리자만 문의 조회 가능
CREATE POLICY "관리자만 문의 조회 가능" ON inquiries
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 관리자만 문의 업데이트 가능
CREATE POLICY "관리자만 문의 업데이트 가능" ON inquiries
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 업데이트 시간 자동 갱신 트리거
CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

