'use client';

import React from "react";
import { motion } from "framer-motion";
import {
  Search, // Icon for search
  Lightbulb, // Icon for insights
  ShieldCheck, // Icon for strengths,   // Icon for weaknesses
  Users,       // Icon for competitors,
  CheckCircle,
  CircleHelp,     // Icon for location
} from "lucide-react";

interface Step {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  bgcolor: string;
  iconcolor: string;
}

const Work = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const steps: Step[] = [
    {
      icon: Search,
      title: "Company Research & Competitor Analysis",
      description:
        "Conduct in-depth company research, competitor analysis, and SWOT analysis using just the company name and location—regardless of its size. Get valuable SEO keywords for strategic growth.",
      bgcolor: "bg-blue-50",
      iconcolor: "text-blue-500",
    },
    {
      icon: Users,
      title: "Build Your Business",
      description:
        "Generate a unique company name and tagline, and connect with incubation cells directly through our platform to accelerate your startup journey.",
      bgcolor: "bg-green-50",
      iconcolor: "text-green-500",
    },
    {
      icon: ShieldCheck,
      title: "Pretrained Sector Models",
      description: "Access AI-powered chatbots and fraud detection systems tailored for healthcare, finance, legal, and e-commerce. Our solutions include medical bots for general medical queries and health insurance fraud detection.",
      bgcolor: "bg-purple-50",
      iconcolor: "text-purple-500",
    },
    {
      icon: Lightbulb,
      title: "Marketing Bot & Strategy",
      description: "Leverage AI-driven marketing bots for customized marketing strategies. We provide solutions for large-scale user engagement, competition analysis, and sector-based services to optimize your business growth.",
      bgcolor: "bg-orange-50",
      iconcolor: "text-orange-500",
    },
  ];

  return (
    <section className="py-2 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-4">
            <CircleHelp className="w-5 h-5 text-orange-500" />
            <span className="text-orange-700 font-medium">Who we are?</span>
          </div>
          <h2 className="text-5xl font-bold mb-6 mt-2">
            We are AIaaS!
          </h2>
          <p className="text-gray-600 text-3xl leading-relaxed">
            Research, Strategy & Growth in One Platform

          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={item} className="relative group">
              <div
                className={`${step.bgcolor} rounded-xl p-8 h-full transition-all duration-300 
                           group-hover:shadow-xl group-hover:-translate-y-2`}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-16 h-16 ${step.bgcolor} rounded-full flex items-center 
                               justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <step.icon className={`w-10 h-10 ${step.iconcolor}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>

                  <div
                    className="absolute -top-4 -right-4 w-8 h-8 bg-orange-500 rounded-full 
                              flex items-center justify-center text-white font-bold"
                  >
                    {index + 1}
                  </div>
                </div>

                {index !== steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-1/2 left-full w-8 border-t-2 
                               border-dashed border-orange-300 -translate-y-1/2 z-10"
                  ></div>
                )}
              </div>

              <div className="absolute bottom-4 right-4">
                <CheckCircle
                  className="w-6 h-6 text-gray-300 group-hover:text-green-500 
                                   transition-colors"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-6">
            Ready to unlock your AI world?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-orange-500 text-white rounded-lg shadow-lg 
                     shadow-orange-500/30 hover:bg-orange-600 transition-all"
          >
            Get Started Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Work;