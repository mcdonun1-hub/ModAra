import { useState, useEffect } from 'react';
import { assetUrl } from '../../lib/format';

const ITEMS = [
  { name: 'پیراهن کلاسیک', img: '/images/prod-shirt-1.jpg', accent: '#f59e0b' },
  { name: 'عینک لوکس', img: '/images/prod-glasses-1.jpg', accent: '#38bdf8' },
  { name: 'ساعت طلایی', img: '/images/prod-watch-1.jpg', accent: '#fbbf24' },
  { name: 'کیف چرم', img: '/images/prod-bag-1.jpg', accent: '#f97316' },
  { name: 'شلوار جین', img: '/images/prod-pants-1.jpg', accent: '#60a5fa' },
  { name: 'هودی کرم', img: '/images/prod-shirt-4.jpg', accent: '#a8a29e' },
  { name: 'ست جواهری', img: '/images/prod-jewelry-1.jpg', accent: '#f472b6' },
  { name: 'کوله چرم', img: '/images/prod-bag-3.jpg', accent: '#b45309' },
];

type Props = { onNavigate: (view: string, param?: string) => void };

export default function HeroCarousel3D({ onNavigate }: Props) {
  const [angle, setAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const radius = 340;
  const itemAngle = 360 / ITEMS.length;

  useEffect(() => {
    if (!autoRotate) return;
    const timer = setInterval(() => setAngle((a) => a - 1.2), 50);
    return () => clearInterval(timer);
  }, [autoRotate]);

  const goTo = (dir: number) => setAngle((a) => a + dir * itemAngle);

  return (
    <div
      className="relative h-screen min-h-[600px] w-full overflow-hidden bg-dark-950"
      dir="rtl"
      onMouseEnter={() => setAutoRotate(false)}
      onMouseLeave={() => setAutoRotate(true)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-slate-900/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.12),transparent_60%)]" />

      {/* 3D stage */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1200px' }}>
        <div className="relative" style={{ transformStyle: 'preserve-3d', width: radius * 2, height: radius * 2 }}>
          {ITEMS.map((item, i) => {
            const rotY = i * itemAngle;
            const isFront = Math.round(((angle + rotY) % 360 + 360) % 360 / itemAngle) === 0;
            return (
              <div
                key={i}
                onClick={() => isFront && onNavigate('shop')}
                className="absolute left-1/2 top-1/2 cursor-pointer"
                style={{
                  transform: `rotateY(${rotY}deg) translateZ(${radius}px) translate(-50%,-50%)`,
                  transition: 'transform 0.05s linear',
                }}
              >
                <div
                  className="relative overflow-hidden rounded-2xl border-2 bg-white shadow-2xl transition-all duration-500"
                  style={{
                    width: 180,
                    height: 240,
                    borderColor: isFront ? item.accent : 'rgba(255,255,255,0.15)',
                    transform: isFront ? 'scale(1.1)' : 'scale(0.85)',
                    opacity: isFront ? 1 : 0.5,
                    filter: isFront ? 'none' : 'blur(1px)',
                  }}
                >
                  <img src={assetUrl(item.img)} alt={item.name} className="h-full w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-sm font-bold text-white">{item.name}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Title */}
      <div className="pointer-events-none absolute inset-x-0 top-12 z-10 text-center">
        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          چرخ‌دندهٔ <span className="text-amber-400">سه‌بعدی</span> مُدارا
        </h1>
        <p className="mt-2 text-white/60">حلقهٔ محصولات را بچرخانید و کالکشن را کاوش کنید</p>
      </div>

      {/* Controls */}
      <button
        onClick={() => goTo(1)}
        className="absolute left-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
      >
        →
      </button>
      <button
        onClick={() => goTo(-1)}
        className="absolute right-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
      >
        ←
      </button>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs text-white/40">
        با ماوس روی صحنه، چرخش خودکار متوقف می‌شود
      </div>
    </div>
  );
}
