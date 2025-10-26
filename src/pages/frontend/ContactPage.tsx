import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Button, Input, Textarea } from '../../components/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt 
} from '@fortawesome/free-solid-svg-icons';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const inquiryTypes = [
    { value: 'general', label: '일반 문의' },
    { value: 'product', label: '제품 문의' },
    { value: 'partnership', label: '파트너십' },
    { value: 'press', label: '언론 문의' },
    { value: 'support', label: '고객 지원' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock submission - 실제로는 API 호출
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Card glass className="p-12 max-w-md mx-auto">
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
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            문의하기
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            ORBIO에 대해 궁금한 점이 있으시거나 제품에 대한 문의가 있으시면 
            언제든지 연락해주세요. 빠르고 정확한 답변을 드리겠습니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card glass className="p-8">
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
                
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '전송 중...' : '문의 보내기'}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <Card glass className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                연락처 정보
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orbio-blue/20 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faEnvelope} className="text-orbio-blue" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">이메일</p>
                    <p className="text-gray-600">contact@orbio.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orbio-green/20 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faPhone} className="text-orbio-green" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">전화</p>
                    <p className="text-gray-600">02-1234-5678</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orbio-gray/20 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-orbio-gray" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">주소</p>
                    <p className="text-gray-600">서울시 강남구 테헤란로 123</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Business Hours */}
            <Card glass className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                운영 시간
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">월요일 - 금요일</span>
                  <span className="font-medium text-gray-800">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">토요일</span>
                  <span className="font-medium text-gray-800">09:00 - 13:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">일요일</span>
                  <span className="font-medium text-gray-800">휴무</span>
                </div>
              </div>
            </Card>

            {/* FAQ */}
            <Card glass className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                자주 묻는 질문
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">
                    배송은 얼마나 걸리나요?
                  </h4>
                  <p className="text-sm text-gray-600">
                    일반적으로 주문 후 2-3일 내에 배송됩니다.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">
                    교환/반품이 가능한가요?
                  </h4>
                  <p className="text-sm text-gray-600">
                    제품 수령 후 7일 이내에 교환/반품이 가능합니다.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">
                    대량 주문 할인은 있나요?
                  </h4>
                  <p className="text-sm text-gray-600">
                    대량 주문 시 별도 할인 혜택을 제공합니다.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <Card glass className="p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              더 빠른 답변이 필요하신가요?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              급한 문의사항이 있으시면 전화로 연락해주세요. 
              평일 오전 9시부터 오후 6시까지 상담 가능합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4">
                02-1234-5678
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                카카오톡 상담
              </Button>
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};
