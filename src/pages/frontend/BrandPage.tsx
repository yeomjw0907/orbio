import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui';
import { brandValues, certifications } from '../../data';

export const BrandPage: React.FC = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            브랜드 스토리
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            ORBIO는 "The Circle of Clean"이라는 슬로건 아래, 
            혁신적인 세척 기술로 더 깨끗하고 지속 가능한 세상을 만들어갑니다.
          </p>
        </motion.div>

        {/* Mission Section */}
        <section className="mb-20">
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
                혁신적으로 변화시키고자 합니다. 물만으로도 완벽하게 세척되는 
                Easy-Clean 기술을 통해 더 편리하고 친환경적인 생활을 제안합니다.
              </p>
              <p className="text-lg text-gray-600">
                우리는 단순히 제품을 만드는 것이 아니라, 사람들의 라이프스타일을 
                개선하고 지구 환경을 보호하는 데 기여하고자 합니다.
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
                      <span className="text-white text-xl">🎯</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">혁신</h3>
                      <p className="text-gray-600">기존의 한계를 뛰어넘는 기술</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orbio-green to-orbio-gray rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">🌱</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">지속가능성</h3>
                      <p className="text-gray-600">환경을 생각하는 제품 개발</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orbio-gray to-orbio-blue rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">🤝</span>
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
        </section>

        {/* Core Values Section */}
        <section className="mb-20">
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
        </section>

        {/* Certifications Section */}
        <section className="mb-20">
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
                    <span className="text-gray-700">Easy-Clean 기술: 물만으로 완벽 세척</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orbio-green rounded-full"></div>
                    <span className="text-gray-700">Antimicrobial 코팅: 99.9% 항균 효과</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orbio-gray rounded-full"></div>
                    <span className="text-gray-700">Eco 소재: 100% 재활용 가능</span>
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
                특히 Easy-Clean 기술은 물의 표면장력을 이용한 혁신적인 기술로, 
                세제 없이도 완벽한 세척을 가능하게 합니다.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};
