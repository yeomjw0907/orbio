import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Input, Textarea } from './ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle, 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt,
  faCommentDots
} from '@fortawesome/free-solid-svg-icons';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
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

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: '',
      inquiryType: 'general'
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="eco-card p-8 m-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    문의하기
                  </h2>
                  <p className="text-gray-600">
                    ORBIO에 대해 궁금한 점이 있으시면 언제든지 연락해주세요.
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <span className="text-xl">×</span>
                </button>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-eco-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-4xl text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    문의가 접수되었습니다!
                  </h3>
                  <p className="text-gray-600 mb-8">
                    문의해주셔서 감사합니다. 빠른 시일 내에 답변드리겠습니다.
                  </p>
                  <button
                    onClick={handleClose}
                    className="eco-button px-8 py-3 text-lg font-semibold"
                  >
                    확인
                  </button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Contact Form */}
                  <div className="lg:col-span-2">
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-eco-green-500 focus:border-transparent transition-colors"
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
                      
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={handleClose}
                          className="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-semibold"
                        >
                          취소
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 eco-button px-6 py-3 text-white font-semibold disabled:opacity-50"
                        >
                          {isSubmitting ? '전송 중...' : '문의 보내기'}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-6">
                    {/* Contact Details */}
                    <div className="eco-card-light p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        연락처 정보
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-eco-green-100 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faEnvelope} className="text-eco-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">이메일</p>
                            <p className="text-gray-600">contact@orbio.com</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-eco-mint-100 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faPhone} className="text-eco-mint-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">전화</p>
                            <p className="text-gray-600">02-1234-5678</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-eco-blue-100 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-eco-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">주소</p>
                            <p className="text-gray-600">서울시 강남구 테헤란로 123</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Business Hours */}
                    <div className="eco-card-light p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        운영 시간
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">월요일 - 금요일</span>
                          <span className="font-medium text-gray-900">09:00 - 18:00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">토요일</span>
                          <span className="font-medium text-gray-900">09:00 - 13:00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">일요일</span>
                          <span className="font-medium text-gray-900">휴무</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="eco-card-light p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        빠른 연락
                      </h3>
                      <div className="space-y-3">
                        <button className="w-full eco-button-secondary py-3 text-center font-semibold">
                          <FontAwesomeIcon icon={faPhone} className="mr-2" />
                          전화 상담
                        </button>
                        <button className="w-full eco-button-mint py-3 text-center font-semibold">
                          <FontAwesomeIcon icon={faCommentDots} className="mr-2" />
                          카카오톡 상담
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
