'use client'
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

interface Agent {
  title: string;
  subtitle: string;
  imagePath: string;
  isFirst?: boolean;
}

const agents: Agent[] = [
  {
    title: 'Healthcare Assistant',
    subtitle: 'Your AI-powered legal companion',
    imagePath: '/healthcare.png',
    isFirst: true
  },
  {
    title: 'AI Consultant',
    subtitle: 'Advanced AI solutions',
    imagePath: '/Legal.png'
  },
  {
    title: 'Business Advisor',
    subtitle: 'Strategic insights engine',
    imagePath: '/Ecommerce.png'
  },
  {
    title: 'Analytics Expert',
    subtitle: 'Data-driven decisions',
    imagePath: '/Finance.png'
  }
];

const AgentCard: React.FC<Agent & {
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({
  title,
  subtitle,
  imagePath,
  isFirst,
  isHovered,
  onMouseEnter,
  onMouseLeave
}) => {
    return (
      <div
        className="transform transition-all duration-300 ease-out"
        style={{
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Card
          className={`${isFirst ? 'w-80 h-[440px]' : 'w-72 h-[400px]'} bg-white rounded-xl p-6 hover:shadow-2xl transition-shadow relative`}
        >
          <div className="w-full h-1/2 mb-4">
            <Image
              src={imagePath}
              alt={title}
              height={160}
              width={160}
              className="w-full h-full object-cover rounded-xl"></Image>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-amber-500 font-bold">O</span>
                <span className="text-gray-600">Olama</span>
              </div>

              <div className="flex space-x-2">
                <button className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                </button>
                <button className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                </button>
              </div>
            </div>

            {isFirst ? (
              <Link href="/chat">
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Try Now
              </button>
              </Link>
            ) : (
              <button className="w-full py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed font-medium">
                Coming Soon
              </button>
            )}
          </div>
        </Card>
      </div>
    );
  };

const AgentRow: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full pt-32">
      <div className="flex justify-between items-center max-w-7xl mx-auto gap-6">
        {agents.map((agent, index) => (
          <AgentCard
            key={index}
            {...agent}
            isHovered={hoveredIndex === index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>
    </div>
  );
};

export default AgentRow;