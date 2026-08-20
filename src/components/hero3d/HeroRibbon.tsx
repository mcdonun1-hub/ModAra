import { assetUrl } from '../../lib/format';

type Props = { onNavigate: (view: string, param?: string) => void };

const RIBBONS = [
  { color: '#f59e0b', dur: 9, delay: 0, scale: 1.0 },
  { color: '#f97316', dur: 12, delay: -2, scale: 0.8 },
  { color: '#a855f7', dur: 15, delay: -5, scale: 0.65 },
];

export default function HeroRibbon({ onNavigate }: Props) {
  return (
    <div className="relative h-screen min-h-[600px] w-full overflow-hidden bg-dark-950" dir="rtl">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />

      {/* Animated 3D-looking silk ribbons (SVG waves with blur + depth) */}
      <div className="absolute inset-0">
        {RIBBONS.map((r, i) => (
          <svg
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80"
            viewBox="0 0 1200 600"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            style={{ filter: `blur(${1 + i}px)` }}
          >
            <defs>
              <linearGradient id={`rib-${i}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={r.color} stopOpacity="0.6" />
                <stop offset="50%" stopColor={r.color} stopOpacity="0.95" />
                <stop offset="100%" stopColor={r.color} stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <path
              fill="none"
              stroke={`url(#rib-${i})`}
              strokeWidth="26"
              strokeLinecap="round"
              d="M -200 300 C 50 100, 150 480, 400 300 S 700 120, 950 300 S 1250 480, 1400 300"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; 0 -60; 0 0; 0 40; 0 0"
                dur={`${r.dur}s`}
                repeatCount="indefinite"
                begin={`${r.delay}s`}
              />
            </path>
            <path
              fill="none"
              stroke={`url(#rib-${i})`}
              strokeWidth="6"
              strokeLinecap="round"
              d="M -200 300 C 50 100, 150 480, 400 300 S 700 120, 950 300 S 1250 480, 1400 300"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; 0 -60; 0 0; 0 40; 0 0"
                dur={`${r.dur}s`}
                repeatCount="indefinite"
                begin={`${r.delay}s`}
              />
            </path>
          </svg>
        ))}
      </div>

      {/* Floating product images at the sides */}
      <img
        src={assetUrl('/images/prod-watch-1.jpg')}
        alt="watch"
        className="absolute right-10 top-24 w-40 rotate-12 rounded-2xl border border-white/20 shadow-2xl animate-float"
      />
      <img
        src={assetUrl('/images/prod-glasses-1.jpg')}
        alt="glasses"
        className="absolute left-10 bottom-28 w-40 -rotate-6 rounded-2xl border border-white/20 shadow-2xl animate-float"
        style={{ animationDelay: '2s' }}
      />

      {/* Center content */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <div className="pointer-events-auto text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-amber-300 border border-white/20">
            🎀 ابریشم مُدارا
          </span>
          <h1 className="text-4xl font-bold text-white sm:text-6xl lg:text-7xl">
            مد، <span className="bg-gradient-to-l from-amber-400 via-orange-500 to-purple-500 bg-clip-text text-transparent">مانند ابریشم</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-white/70">
            روبان‌های ابریشمی نرم در فضای سه‌بعدی موج می‌زنند؛ نمادی از لطافت و اصالت در مُدارا
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <button
              onClick={() => onNavigate('shop')}
              className="rounded-xl bg-white px-7 py-3 font-semibold text-dark-900 shadow-2xl transition-all hover:bg-dark-50 active:scale-95"
            >
              خرید کنید
            </button>
            <button
              onClick={() => onNavigate('blog')}
              className="rounded-xl border border-white/20 bg-white/5 px-7 py-3 font-semibold text-white backdrop-blur-sm hover:bg-white/10"
            >
              بلاگ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
