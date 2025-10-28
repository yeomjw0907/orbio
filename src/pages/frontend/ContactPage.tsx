import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button, Input, Textarea } from '../../components/ui';
import { inquiryApi } from '../../lib/api';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general',
    privacyAgreed: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const inquiryTypes = [
    { value: 'general', label: '일반 문의' },
    { value: 'product', label: '제품 문의' },
    { value: 'partnership', label: '파트너십' },
    { value: 'press', label: '언론 문의' },
    { value: 'support', label: '고객 지원' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // 전화번호 자동 포맷팅
    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedPhone
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };

  const formatPhoneNumber = (value: string) => {
    // 숫자만 추출
    const phoneNumber = value.replace(/[^\d]/g, '');
    
    // 길이에 따라 포맷팅
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 7) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    } else if (phoneNumber.length <= 11) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7)}`;
    } else {
      // 11자리 초과시 11자리까지만
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // 필수 필드 검증
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('필수 항목을 모두 입력해주세요.');
      return;
    }
    
    if (!formData.privacyAgreed) {
      setError('개인정보처리방침에 동의해주세요.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await inquiryApi.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        subject: formData.subject,
        message: formData.message,
        privacy_agreed: formData.privacyAgreed
      });
      
      setIsSubmitted(true);
    } catch (error: any) {
      setError('문의 전송에 실패했습니다. 다시 시도해주세요.');
      console.error('문의 전송 에러:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl p-12 max-w-md mx-auto text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            문의가 접수되었습니다!
          </h2>
          <p className="text-gray-600 mb-6">
            문의해주셔서 감사합니다. 빠른 시일 내에 답변드리겠습니다.
          </p>
          <Button onClick={() => setIsSubmitted(false)}>
            새 문의 작성하기
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modal-style Contact Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orbio-blue-500 to-orbio-green-500 px-8 py-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              문의하기
            </h1>
            <p className="text-white/90">
              ORBIO에 대해 궁금한 점이 있으시거나 제품에 대한 문의가 있으시면 
              언제든지 연락해주세요. 빠르고 정확한 답변을 드리겠습니다.
            </p>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              문의 양식
            </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="이름 *"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="홍길동"
                  />
                  <Input
                    label="이메일 *"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="example@email.com"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="연락처"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="010-1234-5678"
                  />
                  <Input
                    label="회사명"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="회사명"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    문의 유형 *
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orbio-blue focus:border-transparent"
                  >
                    {inquiryTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <Input
                  label="제목 *"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="문의 제목을 입력하세요"
                />
                
                <Textarea
                  label="문의 내용 *"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  placeholder="문의하실 내용을 자세히 입력해주세요."
                />
                
                {/* 개인정보처리방침 동의 */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="privacyAgreed"
                    name="privacyAgreed"
                    checked={formData.privacyAgreed}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-orbio-blue-600 focus:ring-orbio-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="privacyAgreed" className="text-sm text-gray-700">
                    <Link to="/privacy" className="text-orbio-blue-600 hover:text-orbio-blue-700 underline">
                      개인정보처리방침
                    </Link>
                    에 동의합니다. *
                  </label>
                </div>
                
                {/* 에러 메시지 */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}
                
                <Button
                  type="submit"
                  size="lg"
                  className="w-full orbio-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '전송 중...' : '문의 보내기'}
                </Button>
              </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
