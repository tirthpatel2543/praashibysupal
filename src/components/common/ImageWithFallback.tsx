import React, { useState } from 'react';
import { Sparkles, Gem, Crown } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackCategory?: string;
  theme?: 'dark' | 'light' | 'gold';
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Praashi Jewellery',
  fallbackTitle,
  fallbackCategory,
  theme = 'light',
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  React.useEffect(() => {
    setHasError(false);
    setLoaded(false);
  }, [src]);

  // If error occurred or src is empty, render the luxury editorial fallback
  if (hasError || !src) {
    const isDark = theme === 'dark';
    return (
      <div
        className={`relative overflow-hidden flex flex-col items-center justify-center p-6 text-center select-none ${
          isDark
            ? 'bg-gradient-to-br from-[#1c1d1a] via-[#2c2b26] to-[#141512] text-[#f4ecd8]'
            : theme === 'gold'
            ? 'bg-gradient-to-br from-[#f8f1e5] via-[#eddcc4] to-[#deb887] text-[#3d2025]'
            : 'bg-gradient-to-br from-[#fcf9f5] via-[#f5ede2] to-[#ebe0cf] text-[#3d2025]'
        } ${containerClassName || className}`}
        style={{ minHeight: '180px' }}
      >
        {/* Decorative Luxury Background Rings */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full border border-[#c5a059]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-[#c5a059]" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full border border-[#c5a059]" />
        </div>

        {/* Brand Monogram */}
        <div className="relative z-10 mb-3 flex flex-col items-center">
          <div
            className={`w-12 h-12 rounded-full border flex items-center justify-center font-serif text-lg tracking-wider mb-2 shadow-sm ${
              isDark
                ? 'border-[#c5a059]/60 text-[#c5a059] bg-[#c5a059]/10'
                : 'border-[#b38e46]/60 text-[#9b4f52] bg-white/70'
            }`}
          >
            P
          </div>
          <div className="flex items-center gap-1.5 opacity-60 text-xs">
            <Sparkles size={11} className="text-[#c5a059]" />
            <span className="font-sans text-[9px] uppercase tracking-[0.25em]">Praashi Atelier</span>
            <Sparkles size={11} className="text-[#c5a059]" />
          </div>
        </div>

        {/* Title / Description */}
        <div className="relative z-10 max-w-[85%]">
          <h4 className="font-serif text-sm font-medium tracking-wide line-clamp-2">
            {fallbackTitle || alt || 'High Jewellery Piece'}
          </h4>
          {fallbackCategory && (
            <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.18em] opacity-70 text-[#9b4f52]">
              {fallbackCategory}
            </p>
          )}
        </div>

        <div className="absolute bottom-2 text-[8px] tracking-[0.2em] uppercase opacity-40 font-mono">
          Ready for image upload
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-[#f7f2ea] animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] font-serif text-xs">
            P
          </div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setHasError(true)}
        className={`transition-opacity duration-700 ease-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};
