import { lazy, Suspense, useState } from 'react';
import HeroCarousel3D from './HeroCarousel3D';
import HeroParallax from './HeroParallax';
import HeroRibbon from './HeroRibbon';

// WebGL (three.js) is heavy, so load it lazily only when that variant is active.
const Hero3D = lazy(() => import('./Hero3D'));

type Variant = 'webgl' | 'carousel' | 'parallax' | 'ribbon';

const VARIANTS: { id: Variant; label: string; icon: string }[] = [
  { id: 'webgl', label: 'ویترین WebGL', icon: '🧊' },
  { id: 'carousel', label: 'چرخ‌دندهٔ CSS', icon: '🎠' },
  { id: 'parallax', label: 'پارالاکس', icon: '🪟' },
  { id: 'ribbon', label: 'روبان ابریشمی', icon: '🎀' },
];

type Props = { onNavigate: (view: string, param?: string) => void };

export default function Hero3DSwitcher({ onNavigate }: Props) {
  const [active, setActive] = useState<Variant>('webgl');

  return (
    <div className="relative">
      {/* Variant switcher pill */}
      <div className="absolute left-1/2 z-30 mt-4 -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-full border border-white/15 bg-dark-900/80 p-1 backdrop-blur-md shadow-xl">
          {VARIANTS.map((v) => (
            <button
              key={v.id}
              onClick={() => setActive(v.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
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
        <Suspense
          fallback={
            <div className="flex h-screen min-h-[600px] w-full items-center justify-center bg-dark-950">
              <p className="text-white/50">در حال بارگذاری صحنهٔ سه‌بعدی...</p>
            </div>
          }
        >
          <Hero3D onNavigate={onNavigate} />
        </Suspense>
      )}
      {active === 'carousel' && <HeroCarousel3D onNavigate={onNavigate} />}
      {active === 'parallax' && <HeroParallax onNavigate={onNavigate} />}
      {active === 'ribbon' && <HeroRibbon onNavigate={onNavigate} />}
    </div>
  );
}
