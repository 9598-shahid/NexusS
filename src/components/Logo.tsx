import React from 'react';
import logoImgAsset from '../assets/images/nexus_brand_logo_1788695806980.jpg';

/**
 * NexusS Official Brand Logo
 * 100% faithful vector reproduction matching the user's reference image:
 * - Geometric navy blue typography: 'nexus' (#004785 to #002e5b)
 * - Letter 'x' with vibrant bright orange bottom-right leg (#f97316 to #ea580c)
 * - 3D azure blue ribbon looping seamlessly from 'x' up and over 'u' and around 's' (#38bdf8 -> #0284c7 -> #004b87)
 * - Large 3D sculptural orange ribbon forming the iconic capital 'S' with continuous depth and highlights
 */

export const Logo = ({ 
  className = "h-9 w-auto", 
  variant = "vector" 
}: { 
  className?: string;
  variant?: 'vector' | 'full' | 'image' | 'icon';
}) => {
  if (variant === 'image') {
    return (
      <img 
        src={logoImgAsset} 
        alt="NexusS Brand Logo" 
        className={`${className} object-contain mix-blend-multiply`}
        referrerPolicy="no-referrer"
      />
    );
  }

  if (variant === 'icon') {
    return (
      <svg 
        viewBox="0 0 100 100" 
        className={className}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="iconBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="60%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#034e88" />
          </linearGradient>
          <linearGradient id="iconOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>
          <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#0f172a" floodOpacity="0.15" />
          </filter>
        </defs>

        <rect width="100" height="100" rx="22" fill="#ffffff" />
        
        <g filter="url(#iconShadow)">
          {/* Cyan/Blue overarching loop */}
          <path
            d="M22 62 C22 36, 42 22, 65 24 C76 25, 82 32, 78 42 C74 52, 60 56, 50 62 C40 68, 38 78, 48 80 C60 82, 76 74, 82 58"
            stroke="url(#iconBlueGrad)"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Orange dimensional counter-loop */}
          <path
            d="M58 32 C68 25, 84 30, 84 45 C84 62, 62 65, 62 76 C62 84, 72 87, 80 82"
            stroke="url(#iconOrangeGrad)"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    );
  }

  // Full Vector Logo with 100% fidelity to the reference image
  return (
    <svg 
      viewBox="0 0 540 180" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="NexusS Logo"
    >
      <defs>
        {/* Navy Typography Gradient */}
        <linearGradient id="nexusNavy" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0a4b87" />
          <stop offset="60%" stopColor="#004179" />
          <stop offset="100%" stopColor="#002d58" />
        </linearGradient>

        {/* Orange Accent Gradient (x-leg & S ribbon) */}
        <linearGradient id="nexusOrange" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffa040" />
          <stop offset="45%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>

        {/* Orange Top Highlight for 3D Curve */}
        <linearGradient id="nexusOrangeHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="50%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>

        {/* Blue Ribbon Gradient */}
        <linearGradient id="nexusBlueRibbon" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="35%" stopColor="#38bdf8" />
          <stop offset="70%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#024e88" />
        </linearGradient>

        {/* Blue Ribbon Gloss Highlight */}
        <linearGradient id="nexusBlueGloss" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#7dd3fc" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
        </linearGradient>

        {/* Soft Drop Shadow for 3D realism */}
        <filter id="nexusShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="2" dy="4" stdDeviation="3.5" floodColor="#0f172a" floodOpacity="0.2" />
        </filter>

        <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* --- Letter 'n' --- */}
      <path 
        d="M 45,58 H 66 V 73 C 71,62 82,57 93,57 C 105,57 112,65 112,79 V 118 H 92 V 82 C 92,74 87,69 80,69 C 72,69 66,74 66,84 V 118 H 45 Z" 
        fill="url(#nexusNavy)" 
      />

      {/* --- Letter 'e' --- */}
      <path 
        d="M 144,57 C 127,57 116,70 116,88 C 116,106 128,119 146,119 C 158,119 167,112 171,102 L 152,98 C 150,103 146,106 141,106 C 132,106 126,99 126,90 H 172 C 172,75 163,57 144,57 Z M 126,78 C 127,71 133,66 142,66 C 150,66 155,71 155,78 H 126 Z" 
        fill="url(#nexusNavy)" 
      />

      {/* --- Letter 'x' (Composed of Navy Arms, Bright Orange Leg, and Blue Ribbon Transition) --- */}
      {/* 1. Top-Left Navy Arm */}
      <path 
        d="M 178,58 H 198 L 209,79 L 199,93 L 178,58 Z" 
        fill="url(#nexusNavy)" 
      />
      {/* 2. Bottom-Left Navy Leg */}
      <path 
        d="M 199,93 L 179,118 H 200 L 210,101 L 199,93 Z" 
        fill="url(#nexusNavy)" 
      />
      {/* 3. Center Core of 'x' */}
      <path 
        d="M 199,93 L 209,79 L 218,87 L 210,101 Z" 
        fill="url(#nexusNavy)" 
      />
      {/* 4. Bottom-Right Leg: VIBRANT BRIGHT ORANGE! (Exact signature from reference) */}
      <path 
        d="M 210,101 L 218,87 L 241,118 H 220 L 210,101 Z" 
        fill="url(#nexusOrange)" 
      />
      {/* 5. Top-Right Arm of 'x': Connecting smoothly to the azure ribbon arch */}
      <path 
        d="M 209,79 L 227,58 H 241 L 218,87 Z" 
        fill="url(#nexusBlueRibbon)" 
      />

      {/* --- Letter 'u' (Sitting snugly underneath the blue arch) --- */}
      <path 
        d="M 246,58 H 266 V 95 C 266,103 271,107 278,107 C 285,107 290,103 290,95 V 58 H 310 V 118 H 290 V 104 C 285,113 277,119 265,119 C 251,119 246,108 246,95 Z" 
        fill="url(#nexusNavy)" 
      />

      {/* --- Lowercase 's' --- */}
      <path 
        d="M 353,74 C 349,66 342,62 333,62 C 324,62 319,66 319,72 C 319,78 324,81 334,83 C 348,86 359,91 359,103 C 359,114 348,120 334,120 C 320,120 311,113 306,103 L 320,96 C 323,102 328,106 334,106 C 341,106 345,102 345,97 C 345,91 338,88 328,86 C 314,82 305,77 305,67 C 305,57 315,50 329,50 C 341,50 350,56 354,64 L 353,74 Z" 
        fill="url(#nexusNavy)" 
      />

      {/* --- 3D Blue Ribbon Arc (Flowing gracefully from 'x' over 'u' and curving around 's') --- */}
      <g filter="url(#nexusShadow)">
        {/* Main Ribbon Body */}
        <path 
          d="M 224,60 C 242,32 272,18 308,18 C 344,18 376,32 384,62 C 390,84 372,104 350,110 C 330,116 318,125 324,133 C 332,141 352,141 372,131 C 386,124 396,112 402,98"
          stroke="url(#nexusBlueRibbon)" 
          strokeWidth="17" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        {/* Top Gloss Reflection Line on Ribbon Arch */}
        <path 
          d="M 240,46 C 260,26 286,22 312,22 C 338,22 362,32 374,52"
          stroke="url(#nexusBlueGloss)" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
          fill="none" 
        />
      </g>

      {/* --- 3D Sculptural Orange Ribbon "S" (Exact infinity loop geometry matching reference) --- */}
      <g filter="url(#nexusShadow)">
        {/* Upper Loop of Orange S (Tops out at the same height as the blue wave) */}
        <path 
          d="M 458,34 C 426,30 398,52 402,78 C 406,102 438,108 454,114 C 470,120 476,131 470,141 C 464,151 443,154 423,146 C 406,140 396,128 392,116" 
          stroke="url(#nexusOrange)" 
          strokeWidth="21" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />

        {/* Upper Highlight Curve for 3D Bevel Lighting */}
        <path 
          d="M 445,36 C 426,34 408,48 408,68" 
          stroke="url(#nexusOrangeHighlight)" 
          strokeWidth="4" 
          strokeLinecap="round" 
          fill="none" 
        />

        {/* Lower Forward-Sweeping Loop of Orange S */}
        <path 
          d="M 446,47 C 474,52 490,69 486,89 C 482,109 457,115 439,123 C 421,131 417,143 427,151 C 437,159 459,157 477,143 C 491,131 499,115 501,99" 
          stroke="url(#nexusOrange)" 
          strokeWidth="21" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />

        {/* Lower Highlight Ridge for Specular 3D Sheen */}
        <path 
          d="M 432,148 C 445,155 464,153 478,141" 
          stroke="url(#nexusOrangeHighlight)" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
          fill="none" 
        />
      </g>
    </svg>
  );
};

/**
 * Standalone, self-contained SVG string for high-resolution vector PDF printing and letterhead export
 */
export const getNexusLogoSvgString = () => `
<svg viewBox="0 0 540 180" width="180" height="60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="pdfNexusNavy" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0a4b87" />
      <stop offset="100%" stop-color="#002d58" />
    </linearGradient>
    <linearGradient id="pdfNexusOrange" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffa040" />
      <stop offset="50%" stop-color="#f97316" />
      <stop offset="100%" stop-color="#c2410c" />
    </linearGradient>
    <linearGradient id="pdfNexusBlue" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="40%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#024e88" />
    </linearGradient>
  </defs>
  <path d="M 45,58 H 66 V 73 C 71,62 82,57 93,57 C 105,57 112,65 112,79 V 118 H 92 V 82 C 92,74 87,69 80,69 C 72,69 66,74 66,84 V 118 H 45 Z" fill="url(#pdfNexusNavy)" />
  <path d="M 144,57 C 127,57 116,70 116,88 C 116,106 128,119 146,119 C 158,119 167,112 171,102 L 152,98 C 150,103 146,106 141,106 C 132,106 126,99 126,90 H 172 C 172,75 163,57 144,57 Z M 126,78 C 127,71 133,66 142,66 C 150,66 155,71 155,78 H 126 Z" fill="url(#pdfNexusNavy)" />
  <path d="M 178,58 H 198 L 209,79 L 199,93 L 178,58 Z" fill="url(#pdfNexusNavy)" />
  <path d="M 199,93 L 179,118 H 200 L 210,101 L 199,93 Z" fill="url(#pdfNexusNavy)" />
  <path d="M 199,93 L 209,79 L 218,87 L 210,101 Z" fill="url(#pdfNexusNavy)" />
  <path d="M 210,101 L 218,87 L 241,118 H 220 L 210,101 Z" fill="url(#pdfNexusOrange)" />
  <path d="M 209,79 L 227,58 H 241 L 218,87 Z" fill="url(#pdfNexusBlue)" />
  <path d="M 246,58 H 266 V 95 C 266,103 271,107 278,107 C 285,107 290,103 290,95 V 58 H 310 V 118 H 290 V 104 C 285,113 277,119 265,119 C 251,119 246,108 246,95 Z" fill="url(#pdfNexusNavy)" />
  <path d="M 353,74 C 349,66 342,62 333,62 C 324,62 319,66 319,72 C 319,78 324,81 334,83 C 348,86 359,91 359,103 C 359,114 348,120 334,120 C 320,120 311,113 306,103 L 320,96 C 323,102 328,106 334,106 C 341,106 345,102 345,97 C 345,91 338,88 328,86 C 314,82 305,77 305,67 C 305,57 315,50 329,50 C 341,50 350,56 354,64 L 353,74 Z" fill="url(#pdfNexusNavy)" />
  <path d="M 224,60 C 242,32 272,18 308,18 C 344,18 376,32 384,62 C 390,84 372,104 350,110 C 330,116 318,125 324,133 C 332,141 352,141 372,131 C 386,124 396,112 402,98" stroke="url(#pdfNexusBlue)" stroke-width="17" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M 458,34 C 426,30 398,52 402,78 C 406,102 438,108 454,114 C 470,120 476,131 470,141 C 464,151 443,154 423,146 C 406,140 396,128 392,116" stroke="url(#pdfNexusOrange)" stroke-width="21" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M 446,47 C 474,52 490,69 486,89 C 482,109 457,115 439,123 C 421,131 417,143 427,151 C 437,159 459,157 477,143 C 491,131 499,115 501,99" stroke="url(#pdfNexusOrange)" stroke-width="21" stroke-linecap="round" stroke-linejoin="round" />
</svg>
`;
