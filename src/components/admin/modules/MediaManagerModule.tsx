import React, { useState } from 'react';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { Folder, Image as ImageIcon, Copy, Check, Info } from 'lucide-react';

export const MediaManagerModule: React.FC = () => {
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [testPreviewPath, setTestPreviewPath] = useState('/images/hero/main.jpg');

  const folders = [
    {
      name: 'hero',
      path: '/images/hero/',
      files: ['main.jpg', '1st.jpg', '2nd.jpg', '3rd.jpg'],
      description: 'Primary cinematic hero banner (main.jpg) and rotating campaign slides.',
    },
    {
      name: 'products',
      path: '/images/products/',
      files: [
        'noor-necklace.jpg',
        'aster-earrings.jpg',
        'luna-ring.jpg',
        'saanjh-bangle.jpg',
        'solitaire-studs.jpg',
        'meera-bracelet.jpg',
        'zoya-kada.jpg',
        'celestial-choker.jpg',
        'ananya-ring.jpg',
      ],
      description: 'Individual catalogue pieces with transparent or warm ivory editorial styling.',
    },
    {
      name: 'categories',
      path: '/images/categories/',
      files: [
        'all.jpg',
        'gold.jpg',
        'diamond.jpg',
        'earrings.jpg',
        'daily-wear.jpg',
        'necklaces.jpg',
        'rings.jpg',
        'bracelets.jpg',
        'bangles.jpg',
      ],
      description: 'Thumbnail photography for the 9 core category showcases.',
    },
    {
      name: 'banners',
      path: '/images/banners/',
      files: ['bridal-atelier.jpg', 'craftsmanship.jpg', 'gold-festive.jpg', 'solitaire-promo.jpg'],
      description: 'Wide full-bleed editorial and promotional campaign banners.',
    },
    {
      name: 'collections',
      path: '/images/collections/',
      files: ['heirloom.jpg', 'everyday.jpg', 'occasion.jpg', 'bride.jpg', 'solitaire.jpg', 'gift.jpg'],
      description: 'Curated collection card visuals for the horizontal homepage rail.',
    },
    {
      name: 'brand',
      path: '/images/brand/',
      files: ['founder.jpg', 'atelier-craft.jpg', 'heritage.jpg'],
      description: 'Portrait photography for Supal and atelier master craftsmen.',
    },
  ];

  const copyToClipboard = (fullPath: string) => {
    navigator.clipboard.writeText(fullPath);
    setCopiedPath(fullPath);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#4A252B]">
          Centralized Image Asset Manager
        </h2>
        <p className="text-xs text-[#806F72] mt-0.5 font-light">
          Drop your jewellery photography files directly into these local folders in <code className="text-[#4A252B] font-mono">public/images/</code>. They are loaded instantly with graceful luxury fallbacks.
        </p>
      </div>

      {/* Architecture Guidance Alert */}
      <div className="p-5 rounded-2xl bg-[#FAF6F2] border border-[#EADBCE] text-xs text-[#4A252B] leading-relaxed flex items-start gap-3">
        <Info size={18} className="text-[#B38E46] shrink-0 mt-0.5" />
        <div>
          <strong className="block font-medium mb-1">Local Asset Workflow:</strong>
          <span>
            You requested local paths like <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#E8DBD2]">/images/hero/main.jpg</code>. As you manually drop actual client photographs into the corresponding folders, the website automatically loads them without modifying code. If a file is not yet added, the application automatically displays an elegant, luxury editorial fallback with gold accents.
          </span>
        </div>
      </div>

      {/* Interactive Path Previewer */}
      <div className="p-6 rounded-2xl bg-white border border-[#EADBCE] shadow-sm">
        <h3 className="font-serif text-lg font-medium text-[#4A252B] mb-2">
          Image Path Live Inspector
        </h3>
        <p className="text-xs text-[#806F72] mb-4">
          Test any asset path to preview its real rendering or verified fallback.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            value={testPreviewPath}
            onChange={(e) => setTestPreviewPath(e.target.value)}
            placeholder="/images/hero/main.jpg"
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#FAF7F3] border border-[#E2D2C6] text-xs font-mono text-[#4A252B] outline-none"
          />
          <div className="w-24 h-24 rounded-xl overflow-hidden bg-[#ECE0D3] shrink-0 border border-[#E8DBD2]">
            <ImageWithFallback
              src={testPreviewPath}
              alt="Test preview"
              fallbackTitle="Preview Piece"
              className="w-full h-full object-cover"
              containerClassName="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Folder Structure Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {folders.map((folder) => (
          <div
            key={folder.name}
            className="p-5 rounded-2xl bg-white border border-[#EADBCE] shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-[#9B4F52] mb-2">
                <Folder size={18} />
                <h4 className="font-mono font-bold text-sm text-[#4A252B]">{folder.path}</h4>
              </div>

              <p className="text-[11px] text-[#806F72] mb-4 font-light leading-relaxed">
                {folder.description}
              </p>

              <div className="space-y-1.5 border-t border-[#F0E6DE] pt-3">
                <span className="text-[9px] uppercase tracking-wider text-[#806F72] font-semibold block mb-1">
                  Expected Files ({folder.files.length}):
                </span>
                {folder.files.map((file) => {
                  const fullPath = `${folder.path}${file}`;
                  const isCopied = copiedPath === fullPath;
                  return (
                    <div
                      key={file}
                      className="flex items-center justify-between p-1.5 rounded bg-[#FAF7F3] hover:bg-[#F4ECE3] text-[11px] font-mono text-[#4A252B]"
                    >
                      <span className="truncate max-w-[200px]">{file}</span>
                      <button
                        onClick={() => copyToClipboard(fullPath)}
                        className="text-[#806F72] hover:text-[#9B4F52] pl-2 flex items-center gap-1 text-[10px]"
                        title="Copy relative web path"
                      >
                        {isCopied ? <Check size={12} className="text-[#56775D]" /> : <Copy size={12} />}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
