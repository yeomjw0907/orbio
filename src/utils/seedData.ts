import { supabase } from '../lib/supabase';

// FAQ 더미 데이터
const faqData = [
  { category: '제품문의', question: 'ORBIO 텀블러는 어떤 재질로 만들어졌나요?', answer: 'ORBIO 텀블러는 식품안전인증을 받은 고품질 스테인리스 스틸로 제작되었습니다. 초친수 코팅 기술이 적용되어 세제 없이도 완벽한 세척이 가능하며, 99.999% 이상의 항균력을 자랑합니다.', views: 156, helpful_count: 23 },
  { category: '제품문의', question: '텀블러 용량은 몇 가지가 있나요?', answer: '현재 350ml, 500ml, 750ml 세 가지 용량으로 출시되어 있습니다. 각 용량별로 다양한 색상과 디자인을 선택하실 수 있습니다.', views: 89, helpful_count: 15 },
  { category: '제품문의', question: '초친수 코팅이 무엇인가요?', answer: '초친수 코팅은 물과의 접촉각을 극도로 낮춰 물방울이 표면에 완전히 퍼지도록 하는 기술입니다. 이를 통해 세제 없이도 오염물질을 효과적으로 제거할 수 있으며, 항균력도 크게 향상됩니다.', views: 234, helpful_count: 45 },
  { category: '배송문의', question: '배송은 얼마나 걸리나요?', answer: '주문 후 1-2일 내에 배송되며, 전국 어디든 2-3일 내에 받아보실 수 있습니다. 급한 경우 당일 배송 서비스도 이용 가능합니다.', views: 67, helpful_count: 12 },
  { category: '배송문의', question: '배송비는 얼마인가요?', answer: '5만원 이상 구매 시 무료배송이며, 미만 구매 시 3,000원의 배송비가 발생합니다. 제주도 및 도서산간 지역은 추가 배송비가 있을 수 있습니다.', views: 45, helpful_count: 8 },
  { category: '배송문의', question: '해외 배송이 가능한가요?', answer: '현재는 국내 배송만 가능합니다. 해외 배송 서비스는 추후 확대 예정이니 많은 관심 부탁드립니다.', views: 23, helpful_count: 3 },
  { category: '교환/환불', question: '교환이나 환불은 어떻게 하나요?', answer: '제품 수령 후 7일 이내에 교환/환불이 가능합니다. 제품에 하자가 있거나 설명과 다른 경우에는 배송비를 포함한 전액 환불해드립니다.', views: 78, helpful_count: 18 },
  { category: '교환/환불', question: '사용한 제품도 환불 가능한가요?', answer: '사용 흔적이 있는 제품의 경우 교환만 가능하며, 환불은 제품 상태에 따라 결정됩니다. 자세한 사항은 고객센터로 문의해주세요.', views: 34, helpful_count: 7 },
  { category: '교환/환불', question: '교환 배송비는 누가 부담하나요?', answer: '제품 하자로 인한 교환의 경우 회사에서 배송비를 부담하며, 고객 변심으로 인한 교환의 경우 고객이 배송비를 부담합니다.', views: 56, helpful_count: 11 },
  { category: 'A/S', question: 'A/S는 어디서 받을 수 있나요?', answer: '전국 오비오 서비스센터에서 A/S를 받으실 수 있습니다. 방문 전 미리 연락주시면 더 빠른 서비스를 받으실 수 있습니다.', views: 89, helpful_count: 16 },
  { category: 'A/S', question: '보증기간은 얼마나 되나요?', answer: '제품 구매일로부터 1년간 무상 A/S를 제공합니다. 정상적인 사용 중 발생한 하자는 무상으로 수리해드립니다.', views: 67, helpful_count: 14 },
  { category: 'A/S', question: 'A/S 기간이 지났어도 수리가 가능한가요?', answer: '보증기간이 지난 제품도 유상으로 수리가 가능합니다. 수리비는 제품 상태와 수리 내용에 따라 달라질 수 있습니다.', views: 45, helpful_count: 9 },
  { category: '기타', question: '대량 구매 시 할인이 있나요?', answer: '100개 이상 구매 시 특별 할인 혜택을 제공합니다. 대량 구매 문의는 영업팀으로 직접 연락주시면 상담해드리겠습니다.', views: 123, helpful_count: 22 },
  { category: '기타', question: '기업 선물용으로 구매하고 싶어요', answer: '기업 선물용 구매 시 맞춤형 포장과 개인화 서비스를 제공합니다. 최소 주문 수량과 특별 가격에 대해 문의해주세요.', views: 78, helpful_count: 17 },
  { category: '기타', question: '환경 친화적인 포장재를 사용하나요?', answer: '네, ORBIO는 환경을 생각하여 재활용 가능한 포장재만을 사용합니다. 포장재 역시 친환경 소재로 제작되어 있습니다.', views: 156, helpful_count: 28 }
];

// 공지사항 더미 데이터
const noticeData = [
  { title: 'ORBIO 신제품 출시 안내', content: '안녕하세요, ORBIO입니다.\n\n새로운 초친수 코팅 기술이 적용된 ORBIO 텀블러 시리즈가 출시되었습니다.\n\n주요 특징:\n- 99.999% 이상 항균력\n- 무세제 완벽 세척\n- 높은 표면경도로 스크래치 방지\n- 색바램 없는 표면\n\n자세한 내용은 제품 페이지에서 확인해주세요.\n\n감사합니다.', author: 'ORBIO 마케팅팀', is_important: true, views: 1256, published_at: '2024-01-15T09:00:00+09:00' },
  { title: '배송 시스템 개선 안내', content: '고객님들의 소중한 피드백을 반영하여 배송 시스템을 개선했습니다.\n\n개선 사항:\n- 배송 추적 시스템 업그레이드\n- 배송 시간 단축 (평균 1일 단축)\n- 포장 시스템 개선\n- 고객 알림 서비스 강화\n\n앞으로도 더 나은 서비스로 보답하겠습니다.', author: 'ORBIO 운영팀', is_important: true, views: 892, published_at: '2024-01-10T14:30:00+09:00' },
  { title: '겨울철 텀블러 관리 방법', content: '추운 겨울, 텀블러 관리에 주의하세요!\n\n겨울철 텀블러 관리 팁:\n1. 급격한 온도 변화 피하기\n2. 뜨거운 음료 주입 전 예열하기\n3. 세척 후 완전 건조시키기\n4. 보관 시 뚜껑 열어두기\n\n올바른 사용법으로 더 오래 사용하세요!', author: 'ORBIO 기술팀', is_important: false, views: 567, published_at: '2024-01-08T11:00:00+09:00' },
  { title: '고객센터 운영시간 변경 안내', content: '고객센터 운영시간이 변경되었습니다.\n\n변경된 운영시간:\n- 평일: 09:00 ~ 18:00 (기존 19:00에서 변경)\n- 토요일: 09:00 ~ 15:00 (기존 17:00에서 변경)\n- 일요일 및 공휴일: 휴무\n\n긴급 문의사항은 이메일로 연락주시기 바랍니다.', author: 'ORBIO 고객센터', is_important: false, views: 445, published_at: '2024-01-05T16:00:00+09:00' },
  { title: '환경보호 캠페인 참여 안내', content: 'ORBIO와 함께하는 환경보호 캠페인에 참여해주세요!\n\n캠페인 내용:\n- 사용한 텀블러 사진 인증 시 적립금 지급\n- 친환경 포장재 사용 인증 시 할인 쿠폰 제공\n- 환경보호 실천 인증 시 특별 선물 증정\n\n지구를 위한 작은 실천, 함께해요!', author: 'ORBIO 환경팀', is_important: false, views: 678, published_at: '2024-01-03T10:00:00+09:00' },
  { title: 'A/S 서비스 개선 안내', content: '더욱 편리한 A/S 서비스를 제공합니다.\n\n개선된 서비스:\n- 온라인 A/S 신청 시스템 도입\n- A/S 진행 상황 실시간 알림\n- 수리 완료 후 배송 추적 가능\n- 고객 만족도 조사 실시\n\n언제든 편리하게 이용하세요!', author: 'ORBIO A/S팀', is_important: false, views: 334, published_at: '2024-01-01T09:00:00+09:00' },
  { title: '신년 이벤트 안내', content: '2024년 새해를 맞아 특별 이벤트를 진행합니다!\n\n이벤트 내용:\n- 신규 회원 가입 시 10% 할인\n- 구매 금액별 추가 적립금 지급\n- 추첨을 통한 특별 선물 증정\n- 친구 추천 시 양쪽 모두 혜택\n\n이벤트 기간: 2024년 1월 1일 ~ 1월 31일\n많은 참여 부탁드립니다!', author: 'ORBIO 마케팅팀', is_important: true, views: 1234, published_at: '2023-12-28T15:00:00+09:00' },
  { title: '정기 점검 안내', content: '시스템 정기 점검으로 인한 서비스 일시 중단 안내\n\n점검 일시: 2024년 1월 20일 02:00 ~ 06:00\n영향 범위: 웹사이트 일시 접속 불가\n점검 내용: 서버 성능 개선 및 보안 강화\n\n점검 시간 동안 불편을 드려 죄송합니다.', author: 'ORBIO 개발팀', is_important: false, views: 223, published_at: '2023-12-25T12:00:00+09:00' },
  { title: '제품 품질 인증 획득', content: 'ORBIO 텀블러가 국제 품질 인증을 획득했습니다!\n\n획득 인증:\n- ISO 9001 품질경영시스템 인증\n- FDA 식품안전 인증\n- CE 마킹 인증\n- KC 안전인증\n\n더욱 신뢰할 수 있는 제품으로 보답하겠습니다.', author: 'ORBIO 품질관리팀', is_important: false, views: 789, published_at: '2023-12-20T14:00:00+09:00' },
  { title: '고객 만족도 조사 결과', content: '2023년 고객 만족도 조사 결과를 공유합니다.\n\n조사 결과:\n- 전체 만족도: 4.8/5.0\n- 제품 품질 만족도: 4.9/5.0\n- 서비스 만족도: 4.7/5.0\n- 재구매 의향: 95%\n\n고객님들의 소중한 의견에 감사드리며, 더 나은 서비스로 보답하겠습니다.', author: 'ORBIO 고객만족팀', is_important: false, views: 456, published_at: '2023-12-15T11:00:00+09:00' }
];

// 이벤트 더미 데이터
const eventData = [
  { title: '신년 특가 이벤트', description: '2024년 새해를 맞아 ORBIO 텀블러 특가 이벤트를 진행합니다! 최대 30% 할인과 함께 특별 선물까지 드립니다.', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&h=600&fit=crop', start_date: '2024-01-01', end_date: '2024-01-31', is_active: true, views: 2345 },
  { title: '친환경 캠페인', description: '지구를 위한 작은 실천, ORBIO와 함께하세요! 텀블러 사용 인증 시 특별 혜택을 드립니다.', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop', start_date: '2024-01-15', end_date: '2024-02-15', is_active: true, views: 1890 },
  { title: '발렌타인데이 선물 이벤트', description: '사랑하는 사람에게 특별한 선물을! 커플 텀블러 구매 시 추가 할인과 특별 포장 서비스를 제공합니다.', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop', start_date: '2024-02-01', end_date: '2024-02-14', is_active: true, views: 1567 },
  { title: '봄맞이 신제품 출시', description: '봄을 맞아 새로운 컬러의 ORBIO 텀블러가 출시됩니다! 사전 예약 시 특별 혜택을 받으세요.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', start_date: '2024-03-01', end_date: '2024-03-31', is_active: true, views: 1234 },
  { title: '기업체 특별 할인', description: '기업체 대량 구매 시 특별 할인 혜택! 100개 이상 구매 시 최대 40% 할인과 맞춤형 서비스를 제공합니다.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop', start_date: '2024-01-01', end_date: '2024-12-31', is_active: true, views: 890 },
  { title: '여름 시즌 한정 컬러', description: '여름을 위한 시원한 컬러의 텀블러가 한정 출시! 시원한 민트와 오션 블루 컬러로 여름을 준비하세요.', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop', start_date: '2024-06-01', end_date: '2024-08-31', is_active: false, views: 2100 },
  { title: '추석 연휴 특별 이벤트', description: '추석 연휴를 맞아 가족과 함께할 수 있는 특별 이벤트! 가족 구성원 수만큼 할인 혜택을 드립니다.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', start_date: '2023-09-15', end_date: '2023-09-30', is_active: false, views: 1789 },
  { title: '블랙프라이데이 대박 세일', description: '올해 최대 할인! 블랙프라이데이를 맞아 최대 50% 할인과 함께 특별 선물까지 드립니다.', image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=600&fit=crop', start_date: '2023-11-24', end_date: '2023-11-26', is_active: false, views: 3456 },
  { title: '크리스마스 선물 세트', description: '크리스마스 선물로 완벽한 ORBIO 텀블러 세트! 특별 포장과 함께 사랑하는 사람에게 전하세요.', image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&h=600&fit=crop', start_date: '2023-12-01', end_date: '2023-12-25', is_active: false, views: 2234 },
  { title: '신규 회원 웰컴 이벤트', description: 'ORBIO에 새로 가입하신 회원님들을 위한 특별 혜택! 가입 즉시 20% 할인 쿠폰과 무료배송 혜택을 드립니다.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop', start_date: '2024-01-01', end_date: '2024-12-31', is_active: true, views: 1567 },
  { title: '재고 정리 특가', description: '한정 수량! 재고 정리를 위한 특가 이벤트입니다. 선착순으로 진행되니 서둘러 주문하세요!', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', start_date: '2024-01-20', end_date: '2024-01-25', is_active: true, views: 987 },
  { title: 'SNS 인증 이벤트', description: 'ORBIO 텀블러와 함께한 일상을 SNS에 인증하세요! 매주 추첨을 통해 특별한 선물을 드립니다.', image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop', start_date: '2024-01-01', end_date: '2024-03-31', is_active: true, views: 1345 }
];

// 더미 데이터 삽입 함수
export const seedDatabase = async () => {
  try {
    console.log('더미 데이터 삽입 시작...');

    // FAQ 데이터 삽입
    console.log('FAQ 데이터 삽입 중...');
    const { data: faqInsertData, error: faqError } = await supabase
      .from('faqs')
      .insert(faqData)
      .select();
    
    if (faqError) {
      console.error('FAQ 데이터 삽입 오류:', faqError);
    } else {
      console.log(`✅ FAQ ${faqInsertData?.length || 0}개 삽입 완료`);
    }

    // 공지사항 데이터 삽입
    console.log('공지사항 데이터 삽입 중...');
    const { data: noticeInsertData, error: noticeError } = await supabase
      .from('notices')
      .insert(noticeData)
      .select();
    
    if (noticeError) {
      console.error('공지사항 데이터 삽입 오류:', noticeError);
    } else {
      console.log(`✅ 공지사항 ${noticeInsertData?.length || 0}개 삽입 완료`);
    }

    // 이벤트 데이터 삽입
    console.log('이벤트 데이터 삽입 중...');
    const { data: eventInsertData, error: eventError } = await supabase
      .from('events')
      .insert(eventData)
      .select();
    
    if (eventError) {
      console.error('이벤트 데이터 삽입 오류:', eventError);
    } else {
      console.log(`✅ 이벤트 ${eventInsertData?.length || 0}개 삽입 완료`);
    }

    console.log('🎉 더미 데이터 삽입이 완료되었습니다!');
    
    return {
      success: true,
      faqs: faqInsertData?.length || 0,
      notices: noticeInsertData?.length || 0,
      events: eventInsertData?.length || 0
    };
  } catch (error) {
    console.error('더미 데이터 삽입 중 오류 발생:', error);
    return { success: false, error };
  }
};

