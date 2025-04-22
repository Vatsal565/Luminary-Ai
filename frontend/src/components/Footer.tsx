'use client'
import React from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Mail,
  Twitter,
  Github,
  Instagram,
  MessageSquare,
  Command,
  Heart,
  LucideIcon,
  MapPin
} from "lucide-react";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

interface SocialButtonProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
  <motion.a
    href={href}
    className="flex items-center gap-2 text-[#151616]/70 hover:text-[#151616] transition-colors"
    whileHover={{ x: 5 }}
    whileTap={{ scale: 0.95 }}>
    <Command className="w-4 h-4" />
    {children}
  </motion.a>
);

const SocialButton: React.FC<SocialButtonProps> = ({ icon: Icon, label, href }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ rotate: 10 }}
    whileTap={{ scale: 0.9 }}
    className="group relative w-10 h-10 bg-white rounded-xl flex items-center justify-center 
      border-2 border-[#151616] shadow-[2px_2px_0px_0px_#151616] hover:shadow-[2px_2px_0px_0px_#151616] 
      hover:translate-y-[2px] hover:translate-x-[2px] hover:bg-level-1 transition-all">
    <Icon className="w-5 h-5 text-[#151616]" />
    <span
      className="absolute -top-8 scale-0 group-hover:scale-100 transition-transform 
      bg-[#151616] text-white text-xs py-1 px-2 rounded">
      {label}
    </span>
  </motion.a>
);

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-white  pt-20 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-0 bg-level-2" />

      <div className="container mx-auto px-6">
        

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16 border-t-2 border-[#151616]">
          <div className="md:col-span-2 space-y-6">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}>
              <div
                className="w-12 h-12 bg-level-2 rounded-xl flex items-center justify-center 
                border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
                <Bot className="w-7 h-7 text-black" />
              </div>
              <h2 className="text-3xl font-bold text-level-4">Team 404 Not Found</h2>
            </motion.div>
            <div className="space-y-2 text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span>SVNIT, Surat, Gujarat</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            <a href="mailto:jd@gmail.com" className="hover:underline">mailme@gmail.com</a>
          </div>
        </div>
            <div className="flex gap-4">
              <SocialButton icon={Twitter} label="Twitter" href="#" />
              <SocialButton icon={Github} label="GitHub" href="#" />
              <SocialButton icon={Instagram} label="Instagram" href="#" />
              <SocialButton icon={MessageSquare} label="Discord" href="#" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg">Navigation</h3>
            <div className="space-y-3">
              <FooterLink href="#">Features</FooterLink>
              <FooterLink href="#">Meditation</FooterLink>
              <FooterLink href="#">Sleep & Wellness</FooterLink>
              <FooterLink href="#">Recommendations</FooterLink>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg">Resources</h3>
            <div className="space-y-3">
              <FooterLink href="#">Help Center</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Use</FooterLink>
              <FooterLink href="#">Contact Support</FooterLink>
            </div>
          </div>
        </div>

        <div
          className="border-t-2 border-[#151616]/10 py-6 flex flex-col md:flex-row 
          justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-[#151616]/70">
            <span>© 2025 Luminary AI. All rights reserved.</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-level-2" /> by Team
              404_#NotFound
            </span>
          </div>

          <motion.div
            className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border-2 
              border-[#151616] shadow-[2px_2px_0px_0px_#151616]"
            whileHover={{ y: -2 }}>
            <span className="w-2 h-2 bg-level-2 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-[#151616]">Support Available 24/7</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;