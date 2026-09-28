/**
 * Botanical Monogram "P & A" with watercolor blue and eucalyptus greenery wreath
 * Designed directly following the model in "Convite Sandrinha.png".
 */

export function FloralMonogram({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Decorative SVG Floral Wreath around the letters */}
      <svg
        viewBox="0 0 240 220"
        className="w-48 h-44 sm:w-56 sm:h-52 drop-shadow-sm select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients for eucalyptus leaves */}
          <linearGradient id="sageLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#87aa98" />
            <stop offset="100%" stopColor="#4e7261" />
          </linearGradient>

          {/* Gradients for watercolor turquoise / pastel blue roses */}
          <linearGradient id="bluePetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6dc5db" />
            <stop offset="50%" stopColor="#319db7" />
            <stop offset="100%" stopColor="#1e7389" />
          </linearGradient>

          <linearGradient id="goldStemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8cf7e" />
            <stop offset="100%" stopColor="#b58d2a" />
          </linearGradient>
        </defs>

        {/* Botanical foliage clusters on the left / bottom */}
        {/* Left eucalyptus stem */}
        <path
          d="M 50 160 Q 40 120 70 80"
          stroke="url(#sageLeafGrad)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Leaves along left stem */}
        <path
          d="M 46 140 C 30 135 28 120 45 125 C 55 128 50 138 46 140 Z"
          fill="url(#sageLeafGrad)"
          opacity="0.85"
        />
        <path
          d="M 55 115 C 38 105 45 88 60 98 C 65 102 62 112 55 115 Z"
          fill="url(#sageLeafGrad)"
          opacity="0.9"
        />
        <path
          d="M 68 85 C 58 70 75 60 82 74 C 85 80 78 86 68 85 Z"
          fill="url(#sageLeafGrad)"
          opacity="0.8"
        />

        {/* Top-right delicate sprigs */}
        <path
          d="M 160 50 Q 185 45 200 65"
          stroke="url(#goldStemGrad)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="185" cy="46" r="3" fill="#319db7" opacity="0.8" />
        <circle cx="198" cy="55" r="2.5" fill="#6dc5db" opacity="0.9" />
        <circle cx="170" cy="48" r="2" fill="#d4af37" opacity="0.8" />
        <path
          d="M 180 52 C 190 40 205 48 196 58 Z"
          fill="url(#bluePetalGrad)"
          opacity="0.8"
        />

        {/* Bottom floral bouquet with watercolor blue roses */}
        {/* Blue blossom 1 (bottom left) */}
        <g transform="translate(68, 142) scale(0.85)">
          <path
            d="M 20 20 C 10 5 35 0 35 15 C 45 5 55 20 40 30 C 50 45 25 50 15 35 C 5 30 10 15 20 20 Z"
            fill="url(#bluePetalGrad)"
            opacity="0.95"
          />
          <circle cx="28" cy="24" r="6" fill="#1b5a6c" opacity="0.7" />
          <circle cx="27" cy="23" r="3" fill="#e0f4f9" opacity="0.9" />
        </g>

        {/* Blue blossom 2 (small accent) */}
        <g transform="translate(100, 168) scale(0.65)">
          <path
            d="M 15 15 C 8 2 28 -2 28 10 C 38 2 45 15 32 24 C 40 36 20 40 12 28 C 4 24 8 12 15 15 Z"
            fill="url(#bluePetalGrad)"
            opacity="0.9"
          />
          <circle cx="22" cy="18" r="4" fill="#1b5a6c" opacity="0.7" />
        </g>

        {/* Eucalyptus leaves at bottom right */}
        <path
          d="M 115 170 Q 150 175 170 150"
          stroke="url(#sageLeafGrad)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 130 172 C 142 185 160 180 152 168 C 145 160 135 165 130 172 Z"
          fill="url(#sageLeafGrad)"
          opacity="0.85"
        />
        <path
          d="M 155 162 C 170 168 180 152 168 145 C 160 140 152 150 155 162 Z"
          fill="url(#sageLeafGrad)"
          opacity="0.85"
        />

        {/* Golden berries and leaves */}
        <circle cx="62" cy="140" r="3.5" fill="#d4af37" opacity="0.85" />
        <circle cx="55" cy="150" r="2.8" fill="#d4af37" opacity="0.75" />
        <circle cx="120" cy="185" r="3" fill="#d4af37" opacity="0.8" />
      </svg>

      {/* Signature Monogram Letters overlay: P & A */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative flex items-center justify-center font-cormorant font-light text-[#0d3830]">
          {/* Letter P */}
          <span className="text-6xl sm:text-7xl font-light -mr-2 tracking-tighter drop-shadow-sm select-none">
            P
          </span>

          {/* Ampersand & in smaller classic script */}
          <span className="font-script text-2xl sm:text-3xl text-[#1a5b4e] -mx-1 mt-4 z-10 select-none">
            &
          </span>

          {/* Letter A */}
          <span className="text-6xl sm:text-7xl font-light -ml-1 tracking-tighter drop-shadow-sm select-none">
            A
          </span>
        </div>
      </div>
    </div>
  );
}
