import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui';
import { brandValues, certifications } from '../../data';

export const BrandPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <section className="relative py-32 px-4 overflow-hidden">
        {/* Background with gradient and pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-orbio-blue-50 via-orbio-green-50 to-emerald-50">
          <div className="absolute inset-0 opacity-10">
            {/* Water pattern background */}
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q25 30, 50 50 T100 50' stroke='%23027A9C' fill='none'/%3E%3Cpath d='M0 80 Q25 60, 50 80 T100 80' stroke='%23027A9C' fill='none'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px'
            }}></div>
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6">
              브랜드 스토리
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              ORBIO는 "The Circle of Clean"이라는 슬로건 아래, 
              무세제 초친수 코팅 기술로 더 깨끗하고 지속 가능한 세상을 만들어갑니다.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Mission Section */}
        <section className="mb-20 relative rounded-3xl overflow-hidden">
          {/* Background for Mission Section */}
          <div className="absolute inset-0 bg-gradient-to-r from-orbio-blue-100 via-white to-orbio-green-100 opacity-30"></div>
          <div className="relative p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                우리의 미션
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                ORBIO는 일상생활에서 가장 기본적이면서도 중요한 '청소'라는 행위를 
                혁신적으로 변화시키고자 합니다. 무세제로 완벽하게 세척되는 
                초친수 코팅 기술을 통해 더 편리하고 친환경적인 생활을 제안합니다.
              </p>
              <p className="text-lg text-gray-600">
                우리는 단순히 제품을 만드는 것이 아니라, 세제 없이도 깨끗한 생활을 
                실현하고 지구 환경을 보호하는 데 기여하고자 합니다.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card glass className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orbio-blue to-orbio-green rounded-full flex items-center justify-center">
                      <img src="/images/icons/innovation.svg" alt="혁신" className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">혁신</h3>
                      <p className="text-gray-600">기존의 한계를 뛰어넘는 기술</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orbio-green to-orbio-gray rounded-full flex items-center justify-center">
                      <img src="/images/icons/sustainability.svg" alt="지속가능성" className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">지속가능성</h3>
                      <p className="text-gray-600">환경을 생각하는 제품 개발</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orbio-gray to-orbio-blue rounded-full flex items-center justify-center">
                      <img src="/images/icons/trust.svg" alt="신뢰" className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">신뢰</h3>
                      <p className="text-gray-600">고객과의 약속을 지킵니다</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="mb-20 relative py-16 rounded-3xl overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-orbio-green-50 to-orbio-blue-50"></div>
          <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              핵심 가치
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ORBIO의 모든 제품과 서비스는 다음 네 가지 핵심 가치를 바탕으로 합니다.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {brandValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card glass className="p-8 text-center h-full">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${value.color} flex items-center justify-center`}>
                    <img src={value.icon} alt={value.title} className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="mb-20 relative py-16 px-8 rounded-3xl overflow-hidden bg-gradient-to-r from-orbio-blue-100 via-purple-50 to-orbio-green-100">
          <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              국제 인증
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ORBIO의 모든 제품은 엄격한 국제 기준을 통과한 안전하고 신뢰할 수 있는 제품입니다.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orbio-blue to-orbio-green rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{cert.name}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-gray-600">
                    {cert.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card glass className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  혁신적인 기술력
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orbio-blue rounded-full"></div>
                    <span className="text-gray-700">초친수 코팅: 무세제로 완벽 세척</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orbio-green rounded-full"></div>
                    <span className="text-gray-700">항균 코팅: 99.999% 이상 항균력</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orbio-gray rounded-full"></div>
                    <span className="text-gray-700">높은 표면경도: 스크래치 방지, 세정 용이, 내구성 강화</span>
                  </div>
                </div>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                기술 혁신
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                ORBIO는 지속적인 연구개발을 통해 혁신적인 기술을 개발하고 있습니다. 
                우리의 R&D 팀은 매일 새로운 기술을 연구하고, 
                더 나은 제품을 만들기 위해 노력하고 있습니다.
              </p>
              <p className="text-lg text-gray-600">
                특히 초친수 코팅 기술은 물이 표면에 완전히 퍼져 자가정화 효과를 제공하는 
                혁신적인 기술로, 무세제로도 완벽한 세척을 가능하게 합니다.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};
