// components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, Home, Star, MessageCircle, User, Settings, Contact } from 'lucide-react';
import Image from 'next/image';

interface NavLinkProps {
  href: string;
  label: string;
  icon: React.ElementType;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLink = ({ href, label, icon: Icon }: NavLinkProps) => {
    const isActive = pathname === href;

    return (
      <Link href={href}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${isActive
            ? 'bg-black text-white shadow-lg' // Level 3 (Black) for active state
            : 'text-black hover:bg-orange-500 hover:text-white' // Level 2 (Orange) for hover
            }`}
        >
          <Icon className="w-5 h-5" />
          <span className="font-medium">{label}</span>
        </motion.div>
      </Link>
    );
  };

  const links = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/explore', label: 'Explore', icon: Star },
    { href: '/build', label: 'Build with Us', icon: MessageCircle },
    { href: '/sectors', label: 'Sectors', icon: Settings },
    { href: '/contact', label: 'Contact Us', icon: Contact },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-white' // Level 1 (White) for background
        }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="h-10 w-10 rounded-xl flex items-center justify-center"> {/* Level 3 (Black) for logo background */}
              <Image src="/logo.svg" width={50} height={50} alt="AI Competitor" className="h-8 w-8" />
            </div>
            <span className="text-xl font-bold text-black">Luminary AI</span> {/* Level 3 (Black) for text */}
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-4">
            {links.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </div>

          {/* Sign In Button (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/signin">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-2 rounded-xl bg-black text-white font-medium hover:bg-orange-500 transition-colors shadow-lg" // Level 3 (Black) for button
              >
                <User className="w-5 h-5" />
                Sign In
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-black" />
            ) : (
              <Menu className="w-6 h-6 text-black" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-orange-500" // Level 2 (Orange) for border
          >
            <div className="space-y-2">
              {links.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
              <Link href="/signin">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-black text-white font-medium shadow-lg hover:bg-orange-500 transition-colors" // Level 3 (Black) for button
                >
                  <User className="w-5 h-5" />
                  Sign In
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}