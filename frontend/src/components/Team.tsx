'use client'
import React, { useState } from 'react';
import { Mail, Linkedin, Instagram } from 'lucide-react';
import Image from 'next/image';

const teamMembers = [
  {
    name: "Lakshit Vedant",
    college: "College Name",
    year: "3rd Year",
    branch: "Computer Science",
    role: "Frontend Developer",
    image: "/2.svg",
    linkedin: "https://www.linkedin.com/in/lakshit-vedant/",
    email: "mailto:email@example.com",
    instagram: "https://instagram.com/username"
  },
  {
    name: "Team Member 2",
    college: "College Name",
    year: "3rd Year",
    branch: "Computer Science",
    role: "Frontend Developer",
    image: "/2.svg",
    linkedin: "https://linkedin.com",
    email: "mailto:email@example.com",
    instagram: "https://instagram.com"
  },
  {
    name: "Team Member 3",
    college: "College Name",
    year: "3rd Year",
    branch: "Computer Science",
    role: "Frontend Developer",
    image: "/2.svg",
    linkedin: "https://linkedin.com",
    email: "mailto:email@example.com",
    instagram: "https://instagram.com"
  }
];

const Team = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-red-100">
      <h1 className="text-center text-6xl pt-10 font-bold max-sm:text-4xl">
        Team Members
      </h1>
      
      <div className="flex justify-center items-center gap-8 h-[80vh] max-sm:block p-3">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="group relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Image
              src={member.image}
              alt={member.name}
              className="w-[450px] h-[450px] transition-all duration-500 group-hover:scale-110"
            />
            
            {hoveredIndex === index && (
              <div className="absolute top-1/2 left-full -translate-y-1/2 ml-4 bg-black/80 text-white p-6 rounded-lg w-64 transition-all duration-300 z-10">
                <h2 className="text-2xl font-bold mb-2">{member.name}</h2>
                <p className="text-lg mb-1">{member.college}</p>
                <p className="mb-1">{member.year} - {member.branch}</p>
                <p className="mb-4">{member.role}</p>
                
                <div className="flex gap-4">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition-colors"
                  >
                    <Linkedin size={24} />
                  </a>
                  <a
                    href={member.email}
                    className="hover:text-blue-400 transition-colors"
                  >
                    <Mail size={24} />
                  </a>
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-400 transition-colors"
                  >
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;