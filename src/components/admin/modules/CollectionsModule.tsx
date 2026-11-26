import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import type { CollectionItem } from '@/types';
import { Plus, Trash2, Edit3, X } from 'lucide-react';

export const CollectionsModule: React.FC = () => {
  const { collections, updateCollection, addCollection, deleteCollection } = useStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCol, setEditingCol] = useState<CollectionItem | null>(null);

  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [detail, setDetail] = useState('');
  const [image, setImage] = useState('/images/collections/heirloom.jpg');
  const [accentColor, setAccentColor] = useState('#3B342B');

  const openAdd = () => {
    setEditingCol(null);
    setName('');
    setSubtitle('Curated Selection');
    setDetail(`0${collections.length + 1} — 06`);
    setImage('/images/collections/heirloom.jpg');
    setAccentColor('#3B342B');
    setModalOpen(true);
  };

  const openEdit = (col: CollectionItem) => {
    setEditingCol(col);
    setName(col.name);
    setSubtitle(col.subtitle);
    setDetail(col.detail);
    setImage(col.image);
    setAccentColor(col.accentColor || '#3B342B');
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCol) {
      updateCollection({
        ...editingCol,
        name,
        subtitle,
        detail,
        image,
        accentColor,
      });
    } else {
      addCollection({
        id: `col-${Date.now()}`,
        name,
        subtitle,
        detail,
        image,
        accentColor,
      });
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#4A252B]">
            Collections Management
          </h2>
          <p className="text-xs text-[#806F72] mt-0.5 font-light">
            Manage high-level editorial stories and curated product edits displayed on the homepage rail.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="px-5 py-2.5 rounded-full bg-[#4A252B] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#9B4F52] flex items-center gap-1.5 shadow"
        >
          <Plus size={15} />
          <span>Add Collection</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((col) => (
          <div
            key={col.id}
            className="rounded-2xl bg-white border border-[#EADBCE] overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div className="relative aspect-[4/3] bg-[#ECE0D3]">
              <ImageWithFallback
                src={col.image}
                alt={col.name}
                fallbackTitle={col.name}
                fallbackCategory={col.subtitle}
                theme="gold"
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
              />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/40 text-white font-mono text-[9px]">
                {col.detail}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#9B4F52] font-semibold">
                  {col.subtitle}
                </span>
                <h3 className="font-serif font-medium text-lg text-[#4A252B] mt-0.5">
                  {col.name}
                </h3>
                <p className="font-mono text-[10px] text-[#806F72] mt-1 truncate">
                  Path: {col.image}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#EDE1D6] flex justify-end gap-2">
                <button
                  onClick={() => openEdit(col)}
                  className="p-1.5 rounded-lg border border-[#D9C4B5] text-[#4A252B] hover:bg-[#FAF6F2]"
                >
                  <Edit3 size={14} />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete "${col.name}"?`)) deleteCollection(col.id);
                  }}
                  className="p-1.5 rounded-lg border border-[#D9C4B5] text-[#9B4F52] hover:bg-[#FAF0F0]"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 border border-[#EADBCE] shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#EDE1D6] mb-5">
              <h3 className="font-serif text-xl text-[#4A252B] font-medium">
                {editingCol ? 'Edit Collection' : 'Add New Collection'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-[#806F72] hover:text-[#4A252B]">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                  Collection Title *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. The Celestial Edit"
                  className="w-full px-3.5 py-2 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Handcrafted Heritage"
                  className="w-full px-3.5 py-2 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                  Detail Code
                </label>
                <input
                  type="text"
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  placeholder="01 — 06"
                  className="w-full px-3.5 py-2 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                  Image Path (in /public/images/collections/) *
                </label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none font-mono text-[11px]"
                />
              </div>

              <div className="pt-4 border-t border-[#EDE1D6] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2 rounded-full border border-[#D9C4B5] text-[#4A252B] text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#4A252B] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#9B4F52]"
                >
                  Save Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
