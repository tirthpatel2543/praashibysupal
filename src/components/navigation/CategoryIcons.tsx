import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const IconAllJewellery: React.FC<IconProps> = ({ size = 22, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z" />
    <circle cx="12" cy="11" r="1.5" />
  </svg>
);

export const IconGold: React.FC<IconProps> = ({ size = 22, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Elegant Gold Ingot / Ornate Kada Crest */}
    <rect x="3" y="6" width="18" height="12" rx="3" />
    <path d="M7 6V18" strokeDasharray="1 2" />
    <path d="M17 6V18" strokeDasharray="1 2" />
    <path d="M12 9V15" />
    <path d="M9.5 12H14.5" />
    <circle cx="12" cy="6" r="0.8" fill="currentColor" />
  </svg>
);

export const IconDiamond: React.FC<IconProps> = ({ size = 22, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Solitaire Brilliant Cut Diamond */}
    <path d="M6 3H18L22 9L12 21L2 9L6 3Z" />
    <path d="M2 9H22" />
    <path d="M12 21L7.5 9L10 3" />
    <path d="M12 21L16.5 9L14 3" />
  </svg>
);

export const IconEarrings: React.FC<IconProps> = ({ size = 22, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Luxury Chandelier / Drop Jhumka Earrings */}
    <circle cx="8" cy="4" r="1.5" />
    <path d="M8 5.5V9" />
    <path d="M5.5 12C5.5 10.5 8 9 8 9C8 9 10.5 10.5 10.5 12L11 16H5L5.5 12Z" />
    <circle cx="8" cy="18.5" r="0.9" fill="currentColor" />

    <circle cx="16" cy="4" r="1.5" />
    <path d="M16 5.5V9" />
    <path d="M13.5 12C13.5 10.5 16 9 16 9C16 9 18.5 10.5 18.5 12L19 16H13L13.5 12Z" />
    <circle cx="16" cy="18.5" r="0.9" fill="currentColor" />
  </svg>
);

export const IconDailyWear: React.FC<IconProps> = ({ size = 22, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Chic Minimalist Charm / Modern Everyday Radiance */}
    <circle cx="12" cy="12" r="4.5" />
    <path d="M12 3V5" />
    <path d="M12 19V21" />
    <path d="M3 12H5" />
    <path d="M19 12H21" />
    <path d="M5.6 5.6L7 7" />
    <path d="M17 17L18.4 18.4" />
    <path d="M5.6 18.4L7 17" />
    <path d="M17 7L18.4 5.6" />
  </svg>
);

export const IconNecklaces: React.FC<IconProps> = ({ size = 22, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Collar Necklace with Drop Pendant */}
    <path d="M4 4C6 11 10 16 12 16C14 16 18 11 20 4" />
    <path d="M6 4C7.5 9.5 10.5 13.5 12 13.5C13.5 13.5 16.5 9.5 18 4" strokeDasharray="1 2" />
    <path d="M12 16V19" />
    <polygon points="12,19 14,21.5 12,23 10,21.5" fill="none" />
  </svg>
);

export const IconRings: React.FC<IconProps> = ({ size = 22, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Solitaire Ring */}
    <circle cx="12" cy="14" r="7" />
    <path d="M10 7L12 4L14 7" />
    <path d="M9.5 7H14.5" />
    <circle cx="12" cy="4" r="1" fill="currentColor" />
  </svg>
);

export const IconBracelets: React.FC<IconProps> = ({ size = 22, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Delicate Linked Bracelet */}
    <ellipse cx="12" cy="12" rx="9" ry="5" />
    <circle cx="12" cy="17" r="1.5" fill="currentColor" />
    <circle cx="7" cy="15" r="0.8" fill="currentColor" />
    <circle cx="17" cy="15" r="0.8" fill="currentColor" />
    <path d="M12 18.5V21" />
  </svg>
);

export const IconBangles: React.FC<IconProps> = ({ size = 22, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Stacked Traditional Bangles / Kada */}
    <ellipse cx="12" cy="9" rx="8" ry="4" />
    <path d="M4 9C4 11.2 7.6 13 12 13C16.4 13 20 11.2 20 9" />
    <path d="M4 13C4 15.2 7.6 17 12 17C16.4 17 20 15.2 20 13" />
  </svg>
);
