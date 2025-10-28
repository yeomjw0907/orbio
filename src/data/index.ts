import { Product, BlogPost } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'ORBIO Easy-Clean 텀블러 350ml',
    description: '혁신적인 초친수 코팅 기술로 물만으로도 완벽하게 세척되는 텀블러입니다. 색바램이 없는 내구성 강한 표면으로 깨끗한 수분 섭취가 가능합니다. 컴팩트한 사이즈로 언제 어디서나 편리하게 사용하세요.',
    price: 25000,
    category: 'easy-clean',
    image: '/images/products/tumbler-350ml.jpg',
    features: [
      '무세제 완벽 세척',
      '99.999% 이상 항균력',
      '색바램 없는 표면',
      '높은 표면경도로 스크래치 방지',
      '컴팩트한 사이즈'
    ],
    specifications: {
      material: 'FDA 승인 실리콘',
      dimensions: '높이 18cm, 직경 6.5cm',
      weight: '200g',
      capacity: '350ml',
      certifications: ['FDA', 'CE', 'ISO 9001']
    }
  },
  {
    id: '2',
    name: 'ORBIO Easy-Clean 텀블러 500ml',
    description: '혁신적인 초친수 코팅 기술로 물만으로도 완벽하게 세척되는 텀블러입니다. 높은 표면경도로 스크래치에 강하며, 세정이 용이한 내구성 강한 디자인입니다. 색바램 없는 표면으로 항상 깨끗한 수분 섭취가 가능합니다.',
    price: 30000,
    category: 'easy-clean',
    image: '/images/products/tumbler-500ml.jpg',
    features: [
      '무세제 완벽 세척',
      '99.999% 이상 항균력',
      '색바램 없는 표면',
      '높은 표면경도로 스크래치 방지',
      '세정 용이 디자인'
    ],
    specifications: {
      material: 'FDA 승인 실리콘',
      dimensions: '높이 22cm, 직경 7cm',
      weight: '280g',
      capacity: '500ml',
      certifications: ['FDA', 'CE', 'ISO 9001']
    }
  },
  {
    id: '3',
    name: 'ORBIO Easy-Clean 텀블러 750ml',
    description: '혁신적인 초친수 코팅으로 물만으로도 완벽하게 세척되는 대용량 텀블러입니다. 높은 표면경도와 강력한 내구성으로 스크래치 방지와 세정 용이성을 동시에 제공합니다. 색바램 없는 표면으로 깨끗한 수분 섭취가 가능합니다.',
    price: 35000,
    category: 'easy-clean',
    image: '/images/products/tumbler-750ml.jpg',
    features: [
      '무세제 완벽 세척',
      '99.999% 이상 항균력',
      '색바램 없는 표면',
      '높은 표면경도로 스크래치 방지',
      '대용량 디자인'
    ],
    specifications: {
      material: 'FDA 승인 실리콘',
      dimensions: '높이 26cm, 직경 7.5cm',
      weight: '350g',
      capacity: '750ml',
      certifications: ['FDA', 'CE', 'ISO 9001']
    }
  }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'ORBIO의 혁신적인 초친수 코팅 기술',
    content: `
      <h2>초친수 코팅 기술의 혁신</h2>
      <p>ORBIO의 초친수(Superhydrophilic) 코팅 기술은 기존의 세척 방식을 완전히 바꿔놓았습니다. 물만으로도 완벽하게 세척되는 이 기술은 표면에 물이 완전히 퍼져 모든 오염물질을 제거합니다.</p>
      
      <h3>주요 특징</h3>
      <ul>
        <li>무세제 완벽 세척</li>
        <li>초친수 코팅으로 물방울 흡수</li>
        <li>표면경도가 높아 스크래치 방지</li>
        <li>세정 용이로 내구성 강함</li>
        <li>색바램 없는 표면</li>
        <li>환경 친화적</li>
      </ul>
      
      <h3>초친수 vs 발수</h3>
      <p>일반 발수 코팅은 물방울이 떨어지는 것을 방지하지만, 초친수 코팅은 오히려 물이 표면에 완전히 퍼져 자가정화 효과를 제공합니다. 물이 스스로 오염물질을 씻어내는 구조입니다.</p>
      
      <p>이러한 혁신적인 기술로 ORBIO는 업계를 선도하고 있습니다.</p>
    `,
    excerpt: '혁신적인 초친수 코팅 기술로 더 이상 어려운 청소는 없습니다. 무세제로 완벽하게 세척되는 ORBIO의 코팅 기술을 소개합니다.',
    author: 'ORBIO R&D 팀',
    publishedAt: new Date('2024-01-15'),
    tags: ['기술', '혁신', '초친수', '코팅'],
    featured: true,
    image: '/images/blog/easy-clean-tech.jpg'
  },
  {
    id: '2',
    title: '무세제 친환경 라이프스타일과 ORBIO',
    content: `
      <h2>지속 가능한 미래를 위한 선택</h2>
      <p>ORBIO는 환경을 생각하는 브랜드입니다. 무세제 세척 기술로 세제 사용을 최소화하고, 지구 환경 보호에 기여합니다.</p>
      
      <h3>친환경 특징</h3>
      <ul>
        <li>무세제 세척으로 환경 부담 최소화</li>
        <li>100% 재활용 가능한 소재</li>
        <li>친환경 제조 공정</li>
        <li>화학물질 무첨가</li>
        <li>탄소 발자국 최소화</li>
      </ul>
      
      <p>ORBIO 제품을 사용하면 세제 없이도 완벽하게 세척되어 환경 부담을 줄이면서도 최고의 세척력을 경험할 수 있습니다.</p>
    `,
    excerpt: '무세제로 더 깨끗하게. ORBIO와 함께 환경을 생각하는 친환경 라이프스타일을 시작해보세요.',
    author: 'ORBIO 마케팅 팀',
    publishedAt: new Date('2024-01-10'),
    tags: ['친환경', '무세제', '지속가능', '라이프스타일'],
    featured: false,
    image: '/images/blog/eco-lifestyle.jpg'
  },
  {
    id: '3',
    title: '99.999% 이상 항균 기술의 과학적 원리',
    content: `
      <h2>항균 코팅의 과학</h2>
      <p>ORBIO의 항균 기술은 첨단 나노 기술을 기반으로 99.999% 이상의 극강 항균력을 제공합니다. 일반 항균제 99.9%보다 10배 이상 강력한 항균력을 자랑합니다.</p>
      
      <h3>작동 원리</h3>
      <p>나노 레벨의 항균 입자가 세균의 세포벽을 파괴하여 99.999% 이상의 세균을 사멸시킵니다. 이는 FDA와 국제 표준을 크게 상회하는 수준입니다.</p>
      
      <h3>항균력 비교</h3>
      <ul>
        <li>일반 항균 코팅: 99.9%</li>
        <li>ORBIO 코팅: 99.999% 이상 (10배 강력)</li>
      </ul>
      
      <p>이러한 강력한 항균력으로 ORBIO 제품은 최고의 위생성을 보장합니다.</p>
    `,
    excerpt: '99.999% 이상의 극강 항균력. ORBIO의 항균 기술이 어떻게 작동하는지 과학적 원리를 자세히 알아보세요.',
    author: 'ORBIO 연구소',
    publishedAt: new Date('2024-01-05'),
    tags: ['과학', '항균', '기술', '위생'],
    featured: false,
    image: '/images/blog/antimicrobial-science.jpg'
  }
];

export const brandValues = [
  {
    title: '위생',
    description: '99.99% 이상의 각종 유해균, 오염물로부터 안전하게 보호합니다.',
    icon: 'shield-virus',
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: '편의',
    description: '첨단 초친수 코팅 기술로 간편하게 세척할 수 있습니다.',
    icon: 'droplet',
    color: 'from-green-500 to-green-600'
  },
  {
    title: '친환경',
    description: '세제와 화학적 잔류물이 남지 않는 친환경 세정, 지구 환경까지 생각합니다.',
    icon: 'leaf',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    title: '신뢰',
    description: 'ORBIO는 FDA, CE 등 글로벌 품질 인증을 획득해 신뢰할 수 있습니다.',
    icon: 'certificate',
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
