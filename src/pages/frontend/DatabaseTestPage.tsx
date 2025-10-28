import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { productApi, inquiryApi } from '../../lib/api';

export const DatabaseTestPage: React.FC = () => {
  const [status, setStatus] = useState<string>('테스트 중...');
  const [testResult, setTestResult] = useState<any>(null);

  const testConnection = async () => {
    try {
      // 1. 환경 변수 확인
      const url = process.env.REACT_APP_SUPABASE_URL;
      const key = process.env.REACT_APP_SUPABASE_ANON_KEY;

      if (!url || !key) {
        setStatus('❌ 환경 변수가 설정되지 않았습니다.');
        setTestResult({
          error: 'REACT_APP_SUPABASE_URL 또는 REACT_APP_SUPABASE_ANON_KEY가 설정되지 않았습니다.',
          url: url ? '설정됨' : '설정되지 않음',
          key: key ? '설정됨' : '설정되지 않음'
        });
        return;
      }

      // 2. 제품 테이블 조회 테스트
      try {
        const products = await productApi.getAll();
        setStatus(`✅ 제품 테이블 연결 성공! (${products.length}개 제품)`);
        setTestResult({
          success: true,
          productsCount: products.length,
          firstProduct: products[0]
        });
      } catch (error: any) {
        setStatus(`❌ 제품 테이블 조회 실패: ${error.message}`);
        setTestResult({ error: error.message });
      }
    } catch (error: any) {
      setStatus(`❌ 연결 실패: ${error.message}`);
      setTestResult({ error: error.message });
    }
  };

  const testInsert = async () => {
    try {
      const testInquiry = {
        name: '테스트 사용자',
        email: 'test@example.com',
        phone: '010-1234-5678',
        company: '테스트 회사',
        subject: '테스트 문의',
        message: '이것은 테스트 문의입니다.',
        privacy_agreed: true
      };

      const result = await inquiryApi.create(testInquiry);
      setStatus('✅ 문의 테이블 저장 성공!');
      setTestResult({ success: true, inquiry: result });
    } catch (error: any) {
      setStatus(`❌ 문의 테이블 저장 실패: ${error.message}`);
      setTestResult({ error: error.message });
    }
  };

  return (
    <div className="min-h-screen py-20 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">데이터베이스 연결 테스트</h1>
          
          <div className="mb-6">
            <p className="text-gray-600 mb-4">현재 상태: {status}</p>
            <div className="flex gap-4">
              <button
                onClick={testConnection}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                연결 테스트
              </button>
              <button
                onClick={testInsert}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                데이터 저장 테스트
              </button>
            </div>
          </div>

          {testResult && (
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="text-sm overflow-auto">
                {JSON.stringify(testResult, null, 2)}
              </pre>
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">환경 변수 확인</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p>URL: {process.env.REACT_APP_SUPABASE_URL ? '✅ 설정됨' : '❌ 설정되지 않음'}</p>
              <p>Key: {process.env.REACT_APP_SUPABASE_ANON_KEY ? '✅ 설정됨' : '❌ 설정되지 않음'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


