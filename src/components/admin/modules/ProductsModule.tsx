import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import type { Product, JewelleryCategory, MetalType } from '@/types';
import { Plus, Search, Edit3, Trash2, Eye, Check, X, Filter } from 'lucide-react';

const CATEGORIES: JewelleryCategory[] = [
  'All Jewellery',
  'Gold',
  'Diamond',
  'Earrings',
  'Daily Wear',
  'Necklaces',
  'Rings',
  'Bracelets',
  'Bangles',
];

const METALS: MetalType[] = ['Gold', 'Diamond', 'Artificial', 'Gemstone', 'Platinum', 'Silver'];

export const ProductsModule: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [selectedMetal, setSelectedMetal] = useState<string>('All');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState<JewelleryCategory>('Necklaces');
  const [metalType, setMetalType] = useState<MetalType>('Gold');
  const [price, setPrice] = useState(25000);
  const [originalPrice, setOriginalPrice] = useState(28000);
  const [karat, setKarat] = useState('22K Hallmarked Gold');
  const [weight, setWeight] = useState('6.5 gms');
  const [image, setImage] = useState('/images/products/noor-necklace.jpg');
  const [badge, setBadge] = useState<string>('');
  const [description, setDescription] = useState('');
  const [inStock, setInStock] = useState(true);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === 'All' || p.category === selectedCat;
    const matchesMetal = selectedMetal === 'All' || p.metalType === selectedMetal;
    return matchesSearch && matchesCat && matchesMetal;
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setCategory('Necklaces');
    setMetalType('Gold');
    setPrice(35000);
    setOriginalPrice(38000);
    setKarat('22K Hallmarked Gold');
    setWeight('5.2 gms');
    setImage('/images/products/noor-necklace.jpg');
    setBadge('New arrival');
    setDescription('Handcrafted with exceptional attention to weight, balance, and fine Indian craftsmanship.');
    setInStock(true);
    setModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setCategory(p.category);
    setMetalType(p.metalType);
    setPrice(p.price);
    setOriginalPrice(p.originalPrice || 0);
    setKarat(p.karat || '');
    setWeight(p.weight || '');
    setImage(p.image);
    setBadge(p.badge || '');
    setDescription(p.description);
    setInStock(p.inStock);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name,
        category,
        metalType,
        price,
        originalPrice: originalPrice > 0 ? originalPrice : undefined,
        karat,
        weight,
        image,
        badge: (badge as any) || undefined,
        description,
        inStock,
      });
    } else {
      addProduct({
        name,
        category,
        metalType,
        price,
        originalPrice: originalPrice > 0 ? originalPrice : undefined,
        karat,
        weight,
        image,
        badge: (badge as any) || undefined,
        description,
        inStock,
      });
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#4A252B]">
            Product Management
          </h2>
          <p className="text-xs text-[#806F72] mt-0.5 font-light">
            Manage your gold, diamond, and artificial jewellery catalogue. Changes reflect instantly on the storefront.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-2.5 rounded-full bg-[#4A252B] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#9B4F52] flex items-center gap-1.5 shadow"
        >
          <Plus size={15} />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filters & Search Row */}
      <div className="p-4 rounded-xl bg-white border border-[#EADBCE] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#806F72]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by title..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-xs text-[#4A252B] outline-none focus:border-[#9B4F52]"
          />
        </div>

        {/* Category & Metal Dropdowns */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="px-3 py-2 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-xs text-[#4A252B] outline-none"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.filter((c) => c !== 'All Jewellery').map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={selectedMetal}
            onChange={(e) => setSelectedMetal(e.target.value)}
            className="px-3 py-2 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-xs text-[#4A252B] outline-none"
          >
            <option value="All">All Metals / Types</option>
            {METALS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-xl bg-white border border-[#EADBCE] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF6F2] border-b border-[#EDE1D6] text-[10px] uppercase tracking-wider text-[#806F72]">
                <th className="py-3 px-4 font-semibold">Image</th>
                <th className="py-3 px-4 font-semibold">Piece Details</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Metal / Karat</th>
                <th className="py-3 px-4 font-semibold">Price</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4ECE3]">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-[#FAF6F2] transition-colors">
                  <td className="py-3 px-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#ECE0D3]">
                      <ImageWithFallback
                        src={p.image}
                        alt={p.name}
                        fallbackTitle={p.name}
                        fallbackCategory={p.category}
                        className="w-full h-full object-cover"
                        containerClassName="w-full h-full"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <h4 className="font-serif font-medium text-sm text-[#4A252B] leading-tight">
                      {p.name}
                    </h4>
                    {p.badge && (
                      <span className="text-[9px] uppercase tracking-wider text-[#9B4F52] font-semibold">
                        {p.badge}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-[#806F72]">{p.category}</td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-[#4A252B]">{p.metalType}</div>
                    <div className="text-[10px] text-[#806F72]">{p.karat}</div>
                  </td>
                  <td className="py-3 px-4 font-serif font-medium text-sm text-[#4A252B]">
                    ₹{p.price.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        p.inStock ? 'bg-[#EAF3EA] text-[#426E49]' : 'bg-[#FAF0E6] text-[#9A5D3F]'
                      }`}
                    >
                      {p.inStock ? 'In Stock' : 'Crafted on Request'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 rounded-lg border border-[#D9C4B5] text-[#4A252B] hover:bg-[#FAF6F2] transition-colors"
                        title="Edit piece"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${p.name}"?`)) deleteProduct(p.id);
                        }}
                        className="p-1.5 rounded-lg border border-[#D9C4B5] text-[#9B4F52] hover:bg-[#FAF0F0] transition-colors"
                        title="Delete piece"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl bg-white rounded-2xl p-6 sm:p-8 border border-[#EADBCE] shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#EDE1D6] mb-5">
              <h3 className="font-serif text-xl text-[#4A252B] font-medium">
                {editingProduct ? 'Edit Jewellery Piece' : 'Add New Jewellery Piece'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-[#806F72] hover:text-[#4A252B]">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                  Piece Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. The Noor Choker"
                  className="w-full px-3.5 py-2 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none"
                  >
                    {CATEGORIES.filter((c) => c !== 'All Jewellery').map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                    Metal / Type *
                  </label>
                  <select
                    value={metalType}
                    onChange={(e) => setMetalType(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none"
                  >
                    {METALS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                    className="w-full px-3.5 py-2 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                    Original / MRP Price (₹)
                  </label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                    Karat / Purity Specification
                  </label>
                  <input
                    type="text"
                    value={karat}
                    onChange={(e) => setKarat(e.target.value)}
                    placeholder="e.g. 22K Hallmarked Gold"
                    className="w-full px-3.5 py-2 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                    Approx Weight
                  </label>
                  <input
                    type="text"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="e.g. 8.4 gms"
                    className="w-full px-3.5 py-2 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                  Image Path (Local in /public/images/products/) *
                </label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                  placeholder="/images/products/noor-necklace.jpg"
                  className="w-full px-3.5 py-2 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none font-mono text-[11px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                    Storefront Badge
                  </label>
                  <select
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none"
                  >
                    <option value="">None</option>
                    <option value="Bestseller">Bestseller</option>
                    <option value="New arrival">New arrival</option>
                    <option value="Trending">Trending</option>
                    <option value="Crafted to Order">Crafted to Order</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="stockCheck"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="w-4 h-4 text-[#9B4F52]"
                  />
                  <label htmlFor="stockCheck" className="text-xs text-[#4A252B] font-medium">
                    Available for Immediate Order
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#806F72] mb-1 font-semibold">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#FAF7F3] border border-[#E2D2C6] text-[#4A252B] outline-none resize-none"
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
                  Save Piece
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
