'use client'

import React, { useState, useEffect } from 'react'

export default function SkillHuntLogo({ className = "" }) {
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const font = new FontFace('Poppins', 'url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1xlFd2JQEk.woff2)')
    font.load().then(() => {
      document.fonts.add(font)
    }).catch((error) => {
      console.error('Failed to load font:', error)
    })
  }, [])

  return (
    <div 
      className={`flex flex-col items-center ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: 'translateX(60px)',  // Reduced translateX to 20px
        transition: 'transform 0.3s ease-in-out'
      }}
    >
      <svg 
        width="200" 
        height="200" 
        viewBox="0 0 150 150" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="skillhunt-logo-title"
      >
        <title id="skillhunt-logo-title">SkillHunt Logo</title>
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6A0DAD" /> {/* Purple gradient start */}
            <stop offset="100%" stopColor="#9D50BB" /> {/* Purple gradient end */}
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background circle */}
        <circle cx="75" cy="75" r="70" fill="url(#bgGradient)" />
        
        {/* Briefcase */}
        <path 
          d="M45 60H105C107.761 60 110 62.2386 110 65V100C110 102.761 107.761 105 105 105H45C42.2386 105 40 102.761 40 100V65C40 62.2386 42.2386 60 45 60Z" 
          fill="#E0BBE4"  // Light purple fill for the briefcase
          filter="url(#glow)"
        >
          <animate 
            attributeName="d" 
            dur="3s" 
            repeatCount="indefinite"
            values="
              M45 60H105C107.761 60 110 62.2386 110 65V100C110 102.761 107.761 105 105 105H45C42.2386 105 40 102.761 40 100V65C40 62.2386 42.2386 60 45 60Z;
              M45 58H105C107.761 58 110 60.2386 110 63V102C110 104.761 107.761 107 105 107H45C42.2386 107 40 104.761 40 102V63C40 60.2386 42.2386 58 45 58Z;
              M45 60H105C107.761 60 110 62.2386 110 65V100C110 102.761 107.761 105 105 105H45C42.2386 105 40 102.761 40 100V65C40 62.2386 42.2386 60 45 60Z"
          />
        </path>
        
        {/* Briefcase handle */}
        <path 
          d="M65 60V50C65 47.2386 67.2386 45 70 45H80C82.7614 45 85 47.2386 85 50V60" 
          stroke="#E0BBE4"  // Light purple stroke for the handle
          strokeWidth="5"
          filter="url(#glow)"
        >
          <animate 
            attributeName="d" 
            dur="3s" 
            repeatCount="indefinite"
            values="
              M65 60V50C65 47.2386 67.2386 45 70 45H80C82.7614 45 85 47.2386 85 50V60;
              M65 58V48C65 45.2386 67.2386 43 70 43H80C82.7614 43 85 45.2386 85 48V58;
              M65 60V50C65 47.2386 67.2386 45 70 45H80C82.7614 45 85 47.2386 85 50V60"
          />
        </path>
        
        {/* Magnifying glass */}
        <circle cx="85" cy="85" r="15" stroke="#FFFFFF" strokeWidth="5" fill="none" filter="url(#glow)">
          <animate 
            attributeName="r" 
            values="15;17;15" 
            dur="3s" 
            repeatCount="indefinite" 
          />
        </circle>
        <line x1="95" y1="95" x2="110" y2="110" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" filter="url(#glow)">
          <animate 
            attributeName="x2" 
            values="110;112;110" 
            dur="3s" 
            repeatCount="indefinite" 
          />
          <animate 
            attributeName="y2" 
            values="110;112;110" 
            dur="3s" 
            repeatCount="indefinite" 
          />
        </line>
      </svg>
      <div 
        className="text-center mt-2"
        style={{
          transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        <h1 
          className="text-4xl font-bold"  // Increased text size to 4xl
          style={{ 
            fontFamily: "'Poppins', sans-serif",
            background: 'linear-gradient(45deg, #6A0DAD, #9D50BB)', // Purple gradient for text
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          SkillHunt
        </h1>
        
      </div>
    </div>
  )
}
