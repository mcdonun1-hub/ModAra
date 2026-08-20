import { lazy, Suspense, useState } from 'react';
import HeroCarousel3D from './HeroCarousel3D';
import HeroParallax from './HeroParallax';
import HeroRibbon from './HeroRibbon';

// Heavy WebGL (three.js) variants are code-split and loaded lazily on demand.
const Hero3D = lazy(() => import('./Hero3D'));
const HeroShowroom = lazy(() => import('./HeroShowroom'));
const HeroSpinner = lazy(() => import('./HeroSpinner'));
const HeroCategoryStage = lazy(() => import('./HeroCategoryStage'));

type Variant =
  | 'webgl'
  | 'showroom'
  | 'spinner'
  | 'category'
  | 'carousel'
  | 'parallax'
  | 'ribbon';

const VARIANTS: { id: Variant; label: string; icon: string }[] = [
  { id: 'webgl', label: 'ویترین', icon: '🧊' },
  { id: 'showroom', label: 'Showroom', icon: '🎬' },
  { id: 'spinner', label: 'آینه ۳۶۰°', icon: '🪞' },
  { id: 'category', label: 'استیج دسته', icon: '🎭' },
  { id: 'carousel', label: 'چرخ‌دنده', icon: '🎠' },
  { id: 'parallax', label: 'پارالاکس', icon: '🪟' },
  { id: 'ribbon', label: 'ابریشم', icon: '🎀' },
];

type Props = { onNavigate: (view: string, param?: string) => void };

function WebGLLoader() {
  return (
    <div className="flex h-screen min-h-[600px] w-full items-center justify-center bg-dark-950">
      <p className="animate-pulse text-white/50">در حال بارگذاری صحنهٔ سه‌بعدی...</p>
    </div>
  );
}

export default function Hero3DSwitcher({ onNavigate }: Props) {
  const [active, setActive] = useState<Variant>('webgl');

  return (
    <div className="relative">
      {/* Variant switcher pill */}
      <div className="absolute left-1/2 z-30 mt-4 -translate-x-1/2 max-w-[95vw]">
        <div className="flex items-center gap-1 overflow-x-auto rounded-full border border-white/15 bg-dark-900/80 p-1 backdrop-blur-md shadow-xl">
          {VARIANTS.map((v) => (
            <button
              key={v.id}
              onClick={() => setActive(v.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                active === v.id
                  ? 'bg-amber-500 text-dark-900 shadow'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="ml-1">{v.icon}</span>
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {active === 'webgl' && (
        <Suspense fallback={<WebGLLoader />}>
          <Hero3D onNavigate={onNavigate} />
        </Suspense>
      )}
      {active === 'showroom' && (
        <Suspense fallback={<WebGLLoader />}>
          <HeroShowroom onNavigate={onNavigate} />
        </Suspense>
      )}
      {active === 'spinner' && (
        <Suspense fallback={<WebGLLoader />}>
          <HeroSpinner onNavigate={onNavigate} />
        </Suspense>
      )}
      {active === 'category' && (
        <Suspense fallback={<WebGLLoader />}>
          <HeroCategoryStage onNavigate={onNavigate} />
        </Suspense>
      )}
      {active === 'carousel' && <HeroCarousel3D onNavigate={onNavigate} />}
      {active === 'parallax' && <HeroParallax onNavigate={onNavigate} />}
      {active === 'ribbon' && <HeroRibbon onNavigate={onNavigate} />}
    </div>
  );
}
