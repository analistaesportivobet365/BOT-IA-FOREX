import React from 'react';

interface BotWatermarkProps {
  className?: string;
  size?: number | string;
}

export default function BotWatermark({ className = 'opacity-[0.06]', size = '100%' }: BotWatermarkProps) {
  return (
    <div className={`pointer-events-none select-none flex items-center justify-center transition-opacity duration-500 ${className}`}>
      <svg
        viewBox="0 0 500 500"
        width={size}
        height={size}
        className="w-full h-full max-w-full max-h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic Gold Gradient */}
          <linearGradient id="watermarkGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BF953F" />
            <stop offset="25%" stopColor="#FCF6BA" />
            <stop offset="50%" stopColor="#B38728" />
            <stop offset="75%" stopColor="#FBF5B7" />
            <stop offset="100%" stopColor="#AA771C" />
          </linearGradient>

          {/* Metallic Silver Gradient */}
          <linearGradient id="watermarkSilver" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#E2E8F0" />
            <stop offset="70%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* Red/Green Neon Gradients */}
          <linearGradient id="watermarkGreen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="watermarkRed" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F43F5E" />
            <stop offset="100%" stopColor="#BE123C" />
          </linearGradient>
          
          {/* Outer glow filter */}
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Outer Embossed Gold Ring */}
        <circle cx="250" cy="250" r="230" stroke="url(#watermarkGold)" strokeWidth="7" filter="url(#goldGlow)" />
        <circle cx="250" cy="250" r="218" stroke="url(#watermarkGold)" strokeWidth="1.5" strokeDasharray="5 5" />
        <circle cx="250" cy="250" r="210" stroke="url(#watermarkGold)" strokeWidth="1" opacity="0.3" />

        {/* 2. Top Section: AI Brain circuits */}
        {/* Left Hemisphere Outline */}
        <path
          d="M250,75 C205,75 180,105 180,135 C180,155 192,170 205,178 C212,182 216,190 216,198 C216,204 221,209 227,209 L242,209"
          stroke="url(#watermarkGold)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Right Hemisphere Outline */}
        <path
          d="M250,75 C295,75 320,105 320,135 C320,155 308,170 295,178 C288,182 284,190 284,198 C284,204 279,209 273,209 L258,209"
          stroke="url(#watermarkGold)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Brain Circuit Dots and Connectors */}
        {/* Left circuits */}
        <path d="M180,135 L145,135" stroke="url(#watermarkGold)" strokeWidth="1.5" />
        <circle cx="145" cy="135" r="3.5" fill="url(#watermarkGold)" />
        <path d="M195,100 L160,80" stroke="url(#watermarkGold)" strokeWidth="1.5" />
        <circle cx="160" cy="80" r="3.5" fill="url(#watermarkGold)" />
        <path d="M210,170 L180,195" stroke="url(#watermarkGold)" strokeWidth="1.5" />
        <circle cx="180" cy="195" r="3.5" fill="url(#watermarkGold)" />

        {/* Right circuits */}
        <path d="M320,135 L355,135" stroke="url(#watermarkGold)" strokeWidth="1.5" />
        <circle cx="355" cy="135" r="3.5" fill="url(#watermarkGold)" />
        <path d="M305,100 L340,80" stroke="url(#watermarkGold)" strokeWidth="1.5" />
        <circle cx="340" cy="80" r="3.5" fill="url(#watermarkGold)" />
        <path d="M290,170 L320,195" stroke="url(#watermarkGold)" strokeWidth="1.5" />
        <circle cx="320" cy="195" r="3.5" fill="url(#watermarkGold)" />

        {/* Central "IA" Microchip box */}
        <rect x="228" y="115" width="44" height="36" rx="6" fill="#020617" stroke="url(#watermarkGold)" strokeWidth="3" />
        <text
          x="250"
          y="138"
          fill="url(#watermarkGold)"
          fontSize="18"
          fontWeight="900"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          letterSpacing="1"
        >
          IA
        </text>

        {/* 3. Middle Section: Forex Candlesticks & Trend Arrows */}
        {/* Down Trend Arrow (Left) */}
        <path
          d="M100,140 L165,215 L180,240"
          stroke="url(#watermarkRed)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M180,240 L165,240 M180,240 L180,225"
          stroke="url(#watermarkRed)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Candlesticks (Interspersed) */}
        {/* Candle 1 (Red) */}
        <line x1="190" y1="210" x2="190" y2="280" stroke="url(#watermarkRed)" strokeWidth="2" />
        <rect x="182" y="225" width="16" height="40" fill="url(#watermarkRed)" rx="2" stroke="url(#watermarkRed)" strokeWidth="0.5" />

        {/* Candle 2 (Green) */}
        <line x1="218" y1="180" x2="218" y2="260" stroke="url(#watermarkGreen)" strokeWidth="2" />
        <rect x="210" y="195" width="16" height="45" fill="url(#watermarkGreen)" rx="2" stroke="url(#watermarkGreen)" strokeWidth="0.5" />

        {/* Candle 3 (Red) */}
        <line x1="248" y1="205" x2="248" y2="275" stroke="url(#watermarkRed)" strokeWidth="2" />
        <rect x="240" y="215" width="16" height="30" fill="url(#watermarkRed)" rx="2" stroke="url(#watermarkRed)" strokeWidth="0.5" />

        {/* Candle 4 (Green) */}
        <line x1="278" y1="170" x2="278" y2="250" stroke="url(#watermarkGreen)" strokeWidth="2" />
        <rect x="270" y="185" width="16" height="50" fill="url(#watermarkGreen)" rx="2" stroke="url(#watermarkGreen)" strokeWidth="0.5" />

        {/* Candle 5 (Green) */}
        <line x1="308" y1="150" x2="308" y2="230" stroke="url(#watermarkGreen)" strokeWidth="2" />
        <rect x="300" y="165" width="16" height="45" fill="url(#watermarkGreen)" rx="2" stroke="url(#watermarkGreen)" strokeWidth="0.5" />

        {/* Up Trend Arrow (Right) */}
        <path
          d="M320,245 L365,190 L400,140"
          stroke="url(#watermarkGreen)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M400,140 L385,140 M400,140 L400,155"
          stroke="url(#watermarkGreen)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Background Grid Lines underneath */}
        <path d="M80,265 L420,265" stroke="url(#watermarkGold)" strokeWidth="1" opacity="0.15" />
        <path d="M80,278 L420,278" stroke="url(#watermarkGold)" strokeWidth="0.7" opacity="0.1" />

        {/* 4. Lower Section: Typography (BOT IA FOREX) */}
        {/* BOT text with metallic look and golden corner cut accent */}
        <text
          x="250"
          y="350"
          fill="url(#watermarkSilver)"
          stroke="#000000"
          strokeWidth="1.5"
          fontSize="92"
          fontWeight="900"
          letterSpacing="4"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          BOT
        </text>

        {/* Golden corner highlight slice on the T character (simulated via polygon) */}
        <polygon points="340,285 360,285 360,300" fill="url(#watermarkGold)" />

        {/* Gold lines and "IA" */}
        {/* Left gold rule */}
        <line x1="100" y1="392" x2="200" y2="392" stroke="url(#watermarkGold)" strokeWidth="3.5" strokeLinecap="round" />
        
        {/* IA Text */}
        <text
          x="250"
          y="405"
          fill="url(#watermarkGold)"
          fontSize="40"
          fontWeight="950"
          letterSpacing="8"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          IA
        </text>

        {/* Right gold rule */}
        <line x1="300" y1="392" x2="400" y2="392" stroke="url(#watermarkGold)" strokeWidth="3.5" strokeLinecap="round" />

        {/* FOREX spaced text */}
        <text
          x="253"
          y="450"
          fill="#FFFFFF"
          opacity="0.9"
          fontSize="26"
          fontWeight="900"
          letterSpacing="18"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          FOREX
        </text>
      </svg>
    </div>
  );
}
