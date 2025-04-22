// components/Hero.tsx
'use client';

import Link from 'next/link';
import DotMatrixText from './DottedText';

export default function Hero() {
  return (
    <div className="bg-white min-h-screen flex pt-[130px]  justify-center">
      <div className="text-center ">
        {/* Heading */}
        <h1 className="text-6xl font-bold text-gray-900 mb-2 ">
          Unlock The Power of
        </h1>
        <div className=''>
          <DotMatrixText />
        </div>

        {/* Subheading */}
        <p className="text-xl text-gray-600 mb-8">
          Harness AI agents for powerful solutions.
        </p>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <Link
            href="/build"
            className="px-6 py-3 bg-level-2 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            BUILD YOUR AGENT
          </Link>
          <Link
            href="/demo"
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            TRY DEMO
          </Link>
        </div>
      </div>
    </div>
  );
}