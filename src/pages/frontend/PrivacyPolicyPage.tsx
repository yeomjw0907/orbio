import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-orbio-blue-50 via-white to-orbio-green-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            개인정보처리방침
          </h1>
          <p className="text-lg text-gray-600">
            ORBIO는 고객의 개인정보 보호를 위해 최선을 다하고 있습니다.
          </p>
        </motion.div>

        <Card className="p-8 sm:p-12">
          <div className="prose prose-lg max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">1. 개인정보 수집 및 이용 목적</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                ORBIO는 다음과 같은 목적으로 개인정보를 수집 및 이용합니다:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
                <li>서비스 제공 및 고객 지원</li>
                <li>주문 처리 및 배송</li>
                <li>마케팅 및 프로모션 정보 제공</li>
                <li>고객 문의 및 불만 처리</li>
                <li>서비스 개선 및 신규 서비스 개발</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">2. 수집하는 개인정보 항목</h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">필수 정보</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>이름, 이메일 주소, 연락처</li>
                  <li>주문 정보 (상품명, 수량, 배송지)</li>
                  <li>결제 정보 (결제 방법, 결제 금액)</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-6">선택 정보</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>회사명, 직책</li>
                  <li>마케팅 수신 동의 여부</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">3. 개인정보 보유 및 이용 기간</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                수집된 개인정보는 수집 및 이용 목적이 달성된 후에는 지체 없이 파기합니다. 
                단, 관련 법령에 의해 보존이 필요한 경우에는 해당 기간 동안 보관합니다.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
                <li>주문 정보: 5년 (전자상거래법)</li>
                <li>고객 문의: 3년</li>
                <li>마케팅 정보: 동의 철회 시까지</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">4. 개인정보 제3자 제공</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                ORBIO는 원칙적으로 고객의 개인정보를 외부에 제공하지 않습니다. 
                다만, 다음의 경우에는 예외로 합니다:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
                <li>고객이 사전에 동의한 경우</li>
                <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
                <li>배송업체에 배송에 필요한 최소한의 정보 제공</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">5. 개인정보 보호를 위한 기술적/관리적 대책</h2>
              <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
                <li>개인정보 암호화 저장 및 전송</li>
                <li>해킹 등에 대비한 기술적 대책 마련</li>
                <li>개인정보에 대한 접근 제한</li>
                <li>개인정보 처리 시스템의 접근 기록 관리</li>
                <li>개인정보 처리 직원의 최소화 및 교육</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">6. 개인정보 보호책임자</h2>
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <p className="text-gray-700 mb-2"><strong>개인정보 보호책임자:</strong> ORBIO 개인정보보호팀</p>
                <p className="text-gray-700 mb-2"><strong>연락처:</strong> privacy@orbio.com</p>
                <p className="text-gray-700">개인정보 처리에 관한 불만이나 문의사항이 있으시면 언제든지 연락해 주시기 바랍니다.</p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">7. 개인정보처리방침의 변경</h2>
              <p className="text-gray-700 mb-8 leading-relaxed">
                이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 
                삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
              </p>

              <div className="text-center mt-12 pt-8 border-t border-gray-200">
                <p className="text-gray-600">
                  <strong>시행일:</strong> 2024년 1월 1일
                </p>
              </div>
            </motion.div>
          </div>
        </Card>
      </div>
    </div>
  );
};

