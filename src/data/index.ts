import { Product, BlogPost } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'ORBIO Easy-Clean 컵',
    description: '혁신적인 Easy-Clean 기술로 더 이상 어려운 청소는 없습니다. 물만으로도 완벽하게 세척되는 혁신적인 컵입니다.',
    price: 15000,
    category: 'easy-clean',
    image: '/images/products/easy-clean-cup.jpg',
    features: [
      '물만으로 완벽 세척',
      '99.9% 항균 효과',
      '친환경 소재',
      '내구성 우수'
    ],
    specifications: {
      material: 'FDA 승인 실리콘',
      dimensions: '높이 12cm, 직경 8cm',
      weight: '150g',
      certifications: ['FDA', 'CE', 'ISO 9001']
    }
  },
  {
    id: '2',
    name: 'ORBIO Antimicrobial 플레이트',
    description: '항균 코팅 기술로 세균 번식을 원천 차단하는 혁신적인 플레이트입니다.',
    price: 25000,
    category: 'antimicrobial',
    image: '/images/products/antimicrobial-plate.jpg',
    features: [
      '항균 코팅 기술',
      '미세먼지 차단',
      '열전도성 우수',
      'Dishwasher Safe'
    ],
    specifications: {
      material: '항균 코팅 세라믹',
      dimensions: '25cm x 25cm',
      weight: '300g',
      certifications: ['FDA', 'CE', 'ISO 14001']
    }
  },
  {
    id: '3',
    name: 'ORBIO Eco 보울 세트',
    description: '100% 재활용 가능한 친환경 소재로 제작된 보울 세트입니다.',
    price: 35000,
    category: 'eco',
    image: '/images/products/eco-bowl-set.jpg',
    features: [
      '100% 재활용 가능',
      '자연 분해',
      '화학물질 무첨가',
      '내열성 우수'
    ],
    specifications: {
      material: 'PLA 바이오 플라스틱',
      dimensions: '다양한 사이즈 (S, M, L)',
      weight: '200g (M 사이즈 기준)',
      certifications: ['FDA', 'CE', 'ASTM D6400']
    }
  }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'ORBIO의 혁신적인 Easy-Clean 기술',
    content: `
      <h2>Easy-Clean 기술의 혁신</h2>
      <p>ORBIO의 Easy-Clean 기술은 기존의 세척 방식을 완전히 바꿔놓았습니다. 물만으로도 완벽하게 세척되는 이 기술은...</p>
      
      <h3>주요 특징</h3>
      <ul>
        <li>물만으로 완벽 세척</li>
        <li>세제 사용 불필요</li>
        <li>환경 친화적</li>
        <li>시간 절약</li>
      </ul>
      
      <p>이러한 혁신적인 기술로 ORBIO는 업계를 선도하고 있습니다.</p>
    `,
    excerpt: '혁신적인 세척 기술로 더 이상 어려운 청소는 없습니다. 물만으로도 완벽하게 세척되는 ORBIO의 Easy-Clean 기술을 소개합니다.',
    author: 'ORBIO R&D 팀',
    publishedAt: new Date('2024-01-15'),
    tags: ['기술', '혁신', 'Easy-Clean'],
    featured: true,
    image: '/images/blog/easy-clean-tech.jpg'
  },
  {
    id: '2',
    title: '친환경 라이프스타일과 ORBIO',
    content: `
      <h2>지속 가능한 미래를 위한 선택</h2>
      <p>ORBIO는 환경을 생각하는 브랜드입니다. 우리의 모든 제품은...</p>
      
      <h3>친환경 특징</h3>
      <ul>
        <li>100% 재활용 가능한 소재</li>
        <li>자연 분해 가능</li>
        <li>화학물질 무첨가</li>
        <li>탄소 발자국 최소화</li>
      </ul>
    `,
    excerpt: '지속 가능한 미래를 위한 친환경 라이프스타일. ORBIO와 함께 환경을 생각하는 생활을 시작해보세요.',
    author: 'ORBIO 마케팅 팀',
    publishedAt: new Date('2024-01-10'),
    tags: ['친환경', '지속가능', '라이프스타일'],
    featured: false,
    image: '/images/blog/eco-lifestyle.jpg'
  },
  {
    id: '3',
    title: '항균 기술의 과학적 원리',
    content: `
      <h2>항균 코팅의 과학</h2>
      <p>ORBIO의 항균 기술은 첨단 나노 기술을 기반으로 합니다...</p>
      
      <h3>작동 원리</h3>
      <p>나노 실버 입자가 세균의 세포벽을 파괴하여...</p>
    `,
    excerpt: 'ORBIO의 항균 기술이 어떻게 작동하는지 과학적 원리를 자세히 알아보세요.',
    author: 'ORBIO 연구소',
    publishedAt: new Date('2024-01-05'),
    tags: ['과학', '항균', '기술'],
    featured: false,
    image: '/images/blog/antimicrobial-science.jpg'
  }
];

export const brandValues = [
  {
    title: '위생',
    description: '99.9% 항균 효과로 완벽한 위생을 보장합니다.',
    icon: '🛡️',
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: '편의',
    description: '물만으로도 완벽하게 세척되는 Easy-Clean 기술.',
    icon: '✨',
    color: 'from-green-500 to-green-600'
  },
  {
    title: '친환경',
    description: '100% 재활용 가능한 소재로 지구를 생각합니다.',
    icon: '🌱',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    title: '신뢰',
    description: 'FDA, CE 등 국제 인증을 받은 품질을 보장합니다.',
    icon: '🏆',
    color: 'from-purple-500 to-purple-600'
  }
];

export const certifications = [
  { name: 'FDA', description: '미국 식품의약국 승인' },
  { name: 'CE', description: '유럽 연합 안전 인증' },
  { name: 'ISO 9001', description: '품질 경영 시스템 인증' },
  { name: 'ISO 14001', description: '환경 경영 시스템 인증' },
  { name: 'ASTM D6400', description: '생분해성 플라스틱 인증' }
];
