'use client';

import { useState, useEffect } from 'react';
import type { DbProduct } from '@/lib/database/queries/products';
import { useInventory } from '@/hooks/use-inventory';
import { useCart } from '@/hooks/use-cart';
import { Star, CheckCircle2, Minus, Plus } from 'lucide-react';
import Link from 'next/link';

interface PDPHeroZoneProps {
  product: DbProduct;
}

export function PDPHeroZone({ product }: PDPHeroZoneProps) {
  const { status, stock } = useInventory(product.id);
  const { addToCart, isAdding } = useCart();
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= Math.max(10, stock)) {
      setQuantity(newQuantity);
    }
  };

  const rating = product.rating_avg || 4.8;
  const reviewCount = product.review_count ? product.review_count.toLocaleString() : '50,000+';

  const usps = product.usp_badges && product.usp_badges.length > 0
    ? product.usp_badges
    : [
      'Non-sticky, cushiony comfort',
      'Looks as good as it feels',
      'Built to last a lifetime',
      'Universally flattering'
    ];

  // Using reliable robust solid colored images that load instantly and clearly
  const images = [
    'https://placehold.co/800x800/F2F0EA/B45309.png?text=Main+Image',
    'https://placehold.co/800x800/F2F0EA/B45309.png?text=Detail+1',
    'https://placehold.co/800x800/F2F0EA/B45309.png?text=Detail+2',
    'https://placehold.co/800x800/F2F0EA/B45309.png?text=Detail+3'
  ];

  return (
    <>
      <section className="w-full flex justify-center py-8 lg:py-16 bg-surface-default">
        {/* Strictly 10% gap via 80% container wrapper on large screens */}
        <div className="w-full lg:w-[80%] px-4 xl:px-8">

          {/* TOP ALIGNMENT BAR: Breadcrumb (Left) & Reviews (Right) in a straight line */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-200 pb-8 mb-10 pt-4 gap-4">
            <nav className="flex items-center text-body-sm text-stone-500 font-medium tracking-wide">
              <Link href="/" className="hover:text-amber-800 transition-colors">Home</Link>
              <span className="mx-2 text-stone-300">/</span>
              <Link
                href={`/collections/${product.parent_category_slug}`}
                className="text-stone-700 font-bold uppercase tracking-widest text-[0.75rem] hover:text-amber-800 transition-colors"
              >
                {product.parent_category_name}
              </Link>
              <span className="mx-2 text-stone-300">/</span>
              <Link
                href={`/collections/${product.parent_category_slug}/${product.sub_category_slug}`}
                className="text-stone-500 font-semibold uppercase tracking-widest text-[0.75rem] hover:text-amber-800 transition-colors"
              >
                {product.sub_category_name}
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <div className="flex gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-[19px] h-[19px] ${i < Math.round(rating) ? 'fill-current' : 'text-stone-300'}`} strokeWidth={1.5} />
                ))}
              </div>
              <span className="text-body-sm text-stone-700 font-bold ml-1">{reviewCount} 5 Star Reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-12 lg:gap-x-20 items-start">

            {/* LEFT COLUMN: Immersive Gallery */}
            <div className="flex flex-col gap-5">

              {/* Main Image Container - Finalized to 1:1 Square */}
              <div className="w-full aspect-square relative rounded-xl overflow-hidden bg-stone-100 shadow-sm border border-stone-200">
                <img
                  src={images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              </div>

              {/* Thumbnails Row */}
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((thumbSrc, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-24 relative rounded-lg overflow-hidden border-2 shrink-0 bg-stone-50 transition-all ${activeImage === i ? 'border-amber-800 opacity-100 shadow-md' : 'border-stone-100 opacity-50 hover:opacity-100'}`}
                  >
                    <img
                      src={thumbSrc}
                      alt={`${product.name} view ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

            </div>

            {/* RIGHT COLUMN: Buy Box Configuration */}
            <div className="flex flex-col sticky top-24 pt-0">

              {/* Uniform Height Title Block - Start exactly level with image top */}
              <div className="flex flex-col mb-6">
                <h1 className="text-display-md font-serif font-bold text-stone-900 leading-[1.05] tracking-tight text-balance hover:text-amber-800 transition-colors">
                  {product.name}
                </h1>
              </div>

              {/* Short Description */}
              <p className="text-body-md text-stone-600 leading-relaxed mb-8">
                {product.short_description || "An elevated signature piece that blends restorative Japandi aesthetics with uncompromising modular utility."}
              </p>

              {/* Price Row */}
              <div className="flex items-end gap-3 mb-6">
                {product.compare_at_price_usd && (
                  <span className="text-heading-md lg:text-[1.5rem] text-stone-400 line-through font-medium">
                    ${product.compare_at_price_usd.toFixed(2)}
                  </span>
                )}
                <span className="text-display-sm lg:text-[2.25rem] font-sans font-bold text-amber-800 leading-none">
                  ${product.base_price_usd.toFixed(2)}
                </span>
              </div>

              {/* USPs List */}
              <ul className="flex flex-col gap-2.5 mb-8">
                {usps.map((usp, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="shrink-0 mt-0.5">
                      <CheckCircle2 className="w-5 h-5 text-amber-800" strokeWidth={2.5} />
                    </div>
                    <span className="text-body-md text-stone-800 font-medium">{usp}</span>
                  </li>
                ))}
              </ul>

              {/* Status Pulse */}
              <div className="flex items-center gap-2 mb-8">
                <span className="relative flex h-2.5 w-2.5">
                  {status === 'low_stock' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>}
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${status === 'in_stock' ? 'bg-sage-600' :
                    status === 'low_stock' ? 'bg-amber-500' : 'bg-red-600'
                    }`}></span>
                </span>
                <span className="text-caption font-semibold text-stone-700 uppercase tracking-widest">
                  {status === 'in_stock' ? 'In Stock — Ready to Ship' :
                    status === 'low_stock' ? `Low Stock — Only ${stock} left` : 'Out of Stock'}
                </span>
              </div>

              {/* Conversion Block */}
              <div className="flex flex-col gap-5 bg-white p-5 rounded-xl border border-stone-200 shadow-sm">

                {/* Quantity Control Row */}
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <span className="text-body-sm font-semibold text-stone-900 uppercase tracking-widest">Quantity</span>

                  <div className="flex items-center border border-stone-300 rounded-full h-10 w-[120px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] bg-stone-50 overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="w-10 h-full flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors disabled:opacity-30"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="flex-1 text-center font-bold text-stone-900 select-none bg-white h-full flex items-center justify-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="w-10 h-full flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors disabled:opacity-30"
                      disabled={status === 'out_of_stock'}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Primary Actions Grid */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                  <button
                    onClick={handleAddToCart}
                    disabled={status === 'out_of_stock' || isAdding}
                    className="w-full sm:flex-1 h-14 rounded-full border-2 border-amber-800 bg-amber-50 text-amber-800 font-bold text-lg hover:bg-amber-100/50 transition-colors disabled:opacity-50 disabled:border-stone-300 disabled:text-stone-400"
                  >
                    {isAdding ? 'Adding...' : 'Add to Cart'}
                  </button>

                  <button
                    onClick={() => {
                      handleAddToCart();
                      // Mock redirect logic here
                    }}
                    disabled={status === 'out_of_stock'}
                    className="w-full sm:flex-1 h-14 rounded-full border-2 border-amber-800 bg-amber-800 text-white font-bold text-lg hover:bg-amber-900 hover:border-amber-900 shadow-md transition-all disabled:opacity-50 disabled:bg-stone-300 disabled:border-stone-300"
                  >
                    Buy Now
                  </button>
                </div>

                {/* Shipping Promise */}
                <div className="flex items-center justify-center pt-2">
                  <p className="text-caption text-stone-500 font-medium">🛡️ 100% Satisfaction Guarantee | Worldwide Shipping</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* MOBILE STICKY ATC BAR */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 p-4 border-t border-stone-200 bg-white backdrop-blur-xl lg:hidden flex justify-between items-center transition-transform duration-300 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="flex flex-col">
          <span className="text-body-sm font-semibold text-stone-900 truncate max-w-[150px]">{product.name}</span>
          <span className="text-body-md text-amber-800 font-bold">${product.base_price_usd.toFixed(2)}</span>
        </div>
        <div className="flex gap-2">
          <button
            className="h-10 px-6 rounded-full bg-amber-800 text-white font-bold text-sm hover:bg-amber-900 shadow-sm transition-colors disabled:opacity-50"
            onClick={handleAddToCart}
            disabled={status === 'out_of_stock' || isAdding}
          >
            {isAdding ? 'Adding...' : 'Buy Now'}
          </button>
        </div>
      </div>
    </>
  );
}
