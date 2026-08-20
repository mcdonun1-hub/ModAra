import { lazy, Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Check } from 'lucide-react';
import { useProductStore, HOODIE_PRODUCT, PRESET_VIEWS } from '../../store/useProductStore';
import { controlsBridge } from './controlsBridge';
import ColorSelector from './ColorSelector';
import SizeSelector from './SizeSelector';
import Controls from './Controls';
import FullscreenButton from './FullscreenButton';

// Lazy-load the heavy 3D scene.
const HoodieCanvas = lazy(() => import('./HoodieCanvas'));

const VIEW_KEYS = Object.keys(PRESET_VIEWS);
const VIEW_LABELS: Record<string, string> = {
  front: 'جلو',
  back: 'پشت',
  left: 'چپ',
  right: 'راست',
  front45: 'جلو ۴۵°',
  back45: 'پشت ۴۵°',
  hood: 'هود',
  pocket: 'جیب',
  cuff: 'مچ',
  fleece: 'پشم',
  stitch: 'دوخت',
  model: 'استایل',
};

function Loader() {
  return (
    <div className="flex h-[420px] w-full items-center justify-center rounded-3xl border border-white/10 bg-dark-950 sm:h-[560px] lg:h-[620px]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
        <p className="text-sm text-white/50">در حال بارگذاری صحنهٔ سه‌بعدی...</p>
      </div>
    </div>
  );
}

export default function HoodieHero() {
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const activeView = useProductStore((s) => s.activeView);
  const setActiveView = useProductStore((s) => s.setActiveView);
  const color = useProductStore((s) => s.color);
  const size = useProductStore((s) => s.size);
  const addToCart = useProductStore((s) => s.addToCart);
  const cartCount = useProductStore((s) => s.cartCount);
  const setFullscreen = useProductStore((s) => s.setFullscreen);

  const handleAddToCart = () => {
    if (!size) {
      setActiveView('front');
      return;
    }
    addToCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleFullscreen = () => {
    setFullscreen(true);
    const el = document.querySelector('.hoodie-stage');
    el?.requestFullscreen?.().catch(() => {});
  };

  return (
    <section className="hoodie-stage relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8" dir="rtl">
      {/* Header */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-amber-400">مدل سه‌بعدی</p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">{HOODIE_PRODUCT.name}</h1>
          <p className="mt-1 max-w-lg text-sm text-white/60">{HOODIE_PRODUCT.description}</p>
        </div>
        <div className="text-left">
          <p className="text-2xl font-bold text-amber-400">
            {new Intl.NumberFormat('fa-IR').format(HOODIE_PRODUCT.price)} تومان
          </p>
          <p className="text-xs text-white/50">شامل ارسال رایگان</p>
        </div>
      </div>

      {/* Stage */}
      <div className="relative grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* 3D viewport */}
        <div className="relative min-w-0">
          <Suspense fallback={<Loader />}>
            {loading && <Loader />}
            <HoodieCanvas onReady={() => setLoading(false)} />
          </Suspense>

          {/* floating controls */}
          <div className="absolute left-3 top-3 z-10">
            <Controls
              onRotate={() => controlsBridge.setAutoRotate(!controlsBridge.autoRotate)}
              onZoomIn={() => controlsBridge.zoom(0.12)}
              onZoomOut={() => controlsBridge.zoom(-0.12)}
              onReset={() => controlsBridge.reset()}
              onFullscreen={handleFullscreen}
            />
          </div>
          <div className="absolute right-3 top-3 z-10">
            <FullscreenButton />
          </div>

          {/* active view label */}
          <AnimatePresence>
            {activeView && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute left-1/2 top-3 z-10 -translate-x-1/2 rounded-full bg-dark-900/80 px-4 py-1.5 text-sm font-semibold text-amber-300 backdrop-blur-md border border-white/10"
              >
                نمای {VIEW_LABELS[activeView]}
              </motion.div>
            )}
          </AnimatePresence>

          {/* view preset buttons */}
          <div className="absolute bottom-3 left-1/2 z-10 flex max-w-full -translate-x-1/2 items-center gap-1.5 overflow-x-auto rounded-2xl border border-white/10 bg-dark-900/70 p-1.5 backdrop-blur-md">
            {VIEW_KEYS.map((k) => (
              <button
                key={k}
                onClick={() => setActiveView(activeView === k ? null : k)}
                className={`shrink-0 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-all ${
                  activeView === k ? 'bg-amber-500 text-dark-900' : 'text-white/70 hover:bg-white/10'
                }`}
              >
                {VIEW_LABELS[k]}
              </button>
            ))}
          </div>
        </div>

        {/* Configurator sidebar */}
        <div className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-dark-900/40 p-5 backdrop-blur-md">
          <ColorSelector />
          <SizeSelector />

          <div className="h-px bg-white/10" />

          {/* Quantity + add to cart */}
          <QuantitySelector />
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold transition-all ${
              added ? 'bg-emerald-500 text-dark-900' : 'bg-amber-500 text-dark-900 hover:bg-amber-400'
            }`}
          >
            {added ? (
              <>
                <Check className="h-5 w-5" /> اضافه شد
              </>
            ) : (
              <>
                <ShoppingBag className="h-5 w-5" /> افزودن به سبد خرید
              </>
            )}
          </motion.button>

          {!size && (
            <p className="text-center text-xs text-white/50">برای افزودن به سبد، ابتدا سایز را انتخاب کنید</p>
          )}

          <div className="mt-1 flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
            <span className="text-xs text-white/60">رنگ انتخابی</span>
            <span className="flex items-center gap-2 text-sm font-semibold text-white">
              <span className="h-4 w-4 rounded-full border border-white/20" style={{ backgroundColor: color.hex }} />
              {color.name}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
            <span className="text-xs text-white/60">سبد شما</span>
            <span className="text-sm font-semibold text-amber-400">{cartCount} عدد</span>
          </div>

          <p className="mt-auto text-center text-[11px] leading-relaxed text-white/40">
            🖱️ بکشید تا بچرخد · اسکرول برای زوم · برای نمای ۳۶۰°
          </p>
        </div>
      </div>
    </section>
  );
}

function QuantitySelector() {
  const quantity = useProductStore((s) => s.quantity);
  const setQuantity = useProductStore((s) => s.setQuantity);
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-medium text-white/60">تعداد</span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setQuantity(quantity - 1)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 text-white/70 hover:bg-white/10"
          aria-label="کاهش"
        >
          −
        </button>
        <span className="w-6 text-center font-semibold text-white">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 text-white/70 hover:bg-white/10"
          aria-label="افزایش"
        >
          +
        </button>
      </div>
    </div>
  );
}
