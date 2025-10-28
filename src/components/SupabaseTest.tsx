import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export const SupabaseTest: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<string>('테스트 중...');
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Supabase 연결 테스트
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .limit(3);

        if (error) {
          setConnectionStatus(`❌ 연결 실패: ${error.message}`);
        } else {
          setConnectionStatus(`✅ 연결 성공! ${data?.length || 0}개 제품 발견`);
          setProducts(data || []);
        }
      } catch (err) {
        setConnectionStatus(`❌ 오류: ${err}`);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">🔗 Supabase 연결 테스트</h2>
      
      <div className="mb-4">
        <p className="text-lg">{connectionStatus}</p>
      </div>

      {products.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">📦 제품 데이터:</h3>
          <div className="space-y-2">
            {products.map((product) => (
              <div key={product.id} className="p-3 bg-gray-50 rounded">
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-600">₩{product.price?.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 p-4 bg-blue-50 rounded">
        <h4 className="font-semibold mb-2">💡 환경변수 확인:</h4>
        <p className="text-sm">
          URL: {process.env.REACT_APP_SUPABASE_URL ? '✅ 설정됨' : '❌ 미설정'}
        </p>
        <p className="text-sm">
          Key: {process.env.REACT_APP_SUPABASE_ANON_KEY ? '✅ 설정됨' : '❌ 미설정'}
        </p>
      </div>
    </div>
  );
};
