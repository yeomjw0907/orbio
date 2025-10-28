-- 문의 테이블 RLS 정책 수정
-- 모든 사용자가 문의 조회 가능하도록 변경

DROP POLICY IF EXISTS "모든 사용자가 문의 생성 가능" ON inquiries;
DROP POLICY IF EXISTS "관리자만 문의 조회 가능" ON inquiries;
DROP POLICY IF EXISTS "관리자만 문의 업데이트 가능" ON inquiries;
DROP POLICY IF EXISTS "사용자는 자신이 생성한 문의 조회 가능" ON inquiries;

-- 모든 사용자가 문의 생성 가능
CREATE POLICY "모든 사용자가 문의 생성 가능" ON inquiries
  FOR INSERT WITH CHECK (true);

-- 모든 사용자가 모든 문의 조회 가능 (테스트용)
CREATE POLICY "모든 사용자가 문의 조회 가능" ON inquiries
  FOR SELECT USING (true);

-- 모든 사용자가 문의 업데이트 가능 (테스트용 - 나중에 제한 가능)
CREATE POLICY "모든 사용자가 문의 업데이트 가능" ON inquiries
  FOR UPDATE USING (true);


