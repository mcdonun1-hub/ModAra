import { useRef, useState } from 'react';
import { assetUrl } from '../../lib/format';

const LAYERS = [
  { img: '/images/prod-shirt-1.jpg', depth: 30, size: 'w-40 h-56', pos: 'left-[8%] top-[22%]', name: 'پیراهن' },
  { img: '/images/prod-glasses-1.jpg', depth: 60, size: 'w-32 h-32', pos: 'right-[10%] top-[20%]', name: 'عینک' },
  { img: '/images/prod-watch-1.jpg', depth: 90, size: 'w-36 h-36', pos: 'right-[20%] bottom-[18%]', name: 'ساعت' },
  { img: '/images/prod-bag-1.jpg', depth: 45, size: 'w-44 h-44', pos: 'left-[16%] bottom-[14%]', name: 'کیف' },
  { img: '/images/prod-jewelry-1.jpg', depth: 75, size: 'w-28 h-28', pos: 'left-[38%] top-[14%]', name: 'جواهر' },
  { img: '/images/prod-pants-1.jpg', depth: 55, size: 'w-40 h-48', pos: 'right-[34%] bottom-[12%]', name: 'شلوار' },
];

type Props = { onNavigate: (view: string, param?: string) => void };

export default function HeroParallax({ onNavigate }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setOffset({ x: x * 40, y: y * 30 });
    setTilt({ rx: -y * 8, ry: x * 8 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={() => { setOffset({ x: 0, y: 0 }); setTilt({ rx: 0, ry: 0 }); }}
      className="relative h-screen min-h-[600px] w-full overflow-hidden bg-dark-950"
      dir="rtl"
      style={{ perspective: '1000px' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/25 via-transparent to-slate-900/50" />

      {/* Floating product layers */}
      {LAYERS.map((l, i) => (
        <div
          key={i}
          className={`absolute ${l.pos} transition-transform duration-300 ease-out`}
          style={{
            transform: `translate3d(${-offset.x * (l.depth / 50)}px, ${-offset.y * (l.depth / 50)}px, ${l.depth}px) rotateZ(${offset.x * 0.1 * (l.depth / 60)}deg)`,
          }}
        >
          <div className={`${l.size} overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-2xl backdrop-blur-sm`}>
            <img src={assetUrl(l.img)} alt={l.name} className="h-full w-full object-cover" />
          </div>
        </div>
      ))}

      {/* Floating decorative orbs */}
      <div className="absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-rose-500/10 blur-3xl" />

      {/* Tilted center content */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      >
        <div className="pointer-events-auto text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-amber-300 border border-white/20">
            ✨ تجربهٔ سه‌بعدی
          </span>
          <h1 className="text-4xl font-bold text-white sm:text-6xl">
            مُدارا
            <br />
            <span className="bg-gradient-to-l from-amber-400 to-orange-500 bg-clip-text text-transparent">مد و فشن</span>
          </h1>
          <p className="mt-4 max-w-md text-white/70">ماوس را حرکت دهید تا محصولات در عمق جابه‌جا شوند</p>
          <button
            onClick={() => onNavigate('shop')}
            className="mt-8 rounded-xl bg-white px-8 py-4 font-semibold text-dark-900 shadow-2xl transition-all hover:bg-dark-50 active:scale-95"
          >
            مشاهده فروشگاه
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/40">
        🖱️ ماوس را حرکت دهید
      </div>
    </div>
  );
}
