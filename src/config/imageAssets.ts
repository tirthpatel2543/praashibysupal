// Centralized Image Assets Configuration for Praashi by Supal
// Royalty-free premium jewellery photography curated from Unsplash
// Automatically falls back to high-res remote images if local client assets are absent,
// while prioritizing local client files when available (main.jpg, 1st.png, 2nd.png, 3rd.png).

export const IMAGE_ASSETS = {
  // Hero Slides (Uses local main.jpg as primary, with royalty-free luxury bridal photography)
  hero: {
    main: '/images/hero/main.jpg',
    slide1: 'https://images.unsplash.com/photo-1611591475877-3e81fc069a5e?auto=format&fit=crop&w=1920&q=85', // Regal Indian Gold Bridal Suite
    slide2: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1920&q=85', // 22K Gold Handcrafted Choker
    slide3: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1920&q=85', // Solitaire Diamond & Gold Radiance
  },

  // Products (Prioritizes local 1st.png, 2nd.png, 3rd.png placed by user, plus curated pieces)
  products: {
    // User local uploads
    userPiece1: '/images/products/1st.png',
    userPiece2: '/images/products/2nd.png',
    userPiece3: '/images/products/3rd.png',

    // Curated Jewellery Catalogue Pieces
    noorNecklace: '/images/products/1st.png',
    asterEarrings: '/images/products/2nd.png',
    lunaRing: '/images/products/3rd.png',
    saanjhBangle: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80', // 22K Gold Filigree Bangles
    solitaireStuds: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80', // Diamond Solitaire Studs
    meeraBracelet: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=800&q=80', // Diamond Tennis Bracelet
    zoyaKada: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80', // Antique Indian Kada
    celestialChoker: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80', // Royal Polki / Kundan Choker
    ananyaRing: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80', // Diamond Solitaire Band
    everydayHoops: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80', // 18K Gold Daily Hoops
    emeraldCocktail: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=800&q=80', // Emerald Cocktail Ring
    goldChainBracelet: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=800&q=80', // Gold Link Bracelet
  },

  // Categories (9 Core Channels)
  categories: {
    all: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80', // All High Jewellery
    gold: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80', // 22K Artisanal Gold
    diamond: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80', // Certified Solitaire Diamonds
    earrings: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80', // Chandelier & Drop Earrings
    dailyWear: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80', // Everyday Minimalist Gold
    necklaces: 'https://images.unsplash.com/photo-1611591475877-3e81fc069a5e?auto=format&fit=crop&w=800&q=80', // Chokers & Bridal Sets
    rings: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80', // Signets & Solitaire Bands
    bracelets: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=800&q=80', // Tennis & Charm Bracelets
    bangles: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80', // Traditional Kadas & Jaali Bangles
  },

  // Curated Collections Rail
  collections: {
    heirloom: 'https://images.unsplash.com/photo-1611591475877-3e81fc069a5e?auto=format&fit=crop&w=900&q=80',
    everyday: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=900&q=80',
    solitaire: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=900&q=80',
    bride: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=900&q=80',
    occasion: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=900&q=80',
    gift: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80',
  },

  // Promotional and Editorial Banners
  banners: {
    bridal: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1600&q=85', // Indian Bride in Royal Jewellery
    craft: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=1600&q=85', // Goldsmithing Atelier Bench Craft
    goldFestive: 'https://images.unsplash.com/photo-1543290954-bc6c2dfb6016?auto=format&fit=crop&w=1600&q=85', // Festive Indian Gold Celebration
    solitairePromo: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=1600&q=85', // Scintillating Diamond Brilliance
  },

  // Brand Story
  brand: {
    founder: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85', // Supal · Creative Director
    atelier: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=900&q=85', // Atelier Craft
    heritage: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=85', // Heritage Jewellery
  },

  // Social / Instagram Showcase
  social: [
    'https://images.unsplash.com/photo-1611591475877-3e81fc069a5e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
  ],
} as const;

// Also export as IMAGE_PATHS for backwards compatibility
export const IMAGE_PATHS = IMAGE_ASSETS;
