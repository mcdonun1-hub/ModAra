import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowLeft } from 'lucide-react';
import { asset } from '../lib/format';

type Slide = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
  cta: string;
  accent: string;
};

const slides: Slide[] = [
  {
    title: 'استایل شما',
    subtitle: 'بیان شخصیت شماست',
    description: 'جدیدترین کالکشن پاییزه با طراحی‌های منحصربه‌فرد و قیمت‌های باورنکردنی منتظر شماست',
    image: '/images/hero-1.jpg',
    badge: 'کالکشن جدید پاییز',
    cta: 'مشاهده کالکشن',
    accent: 'from-amber-500 to-orange-700',
  },
  {
    title: 'اکسسوری‌های لوکس',
    subtitle: 'تکمیل‌کننده استایل',
    description: 'عینک‌های آفتابی، ساعت‌های مچی و جواهراتی که ظاهر شما را متحول می‌کنند',
    image: '/images/hero-2.jpg',
    badge: 'تخفیف ویژه',
    cta: 'خرید اکسسوری',
    accent: 'from-slate-600 to-slate-900',
  },
  {
    title: 'شیک‌پوشی',
    subtitle: 'با لباس‌های برند',
    description: 'از پیراهن‌های کلاسیک تا شلوارهای مدرن، بهترین‌ها را برای شما گردآوری کرده‌ایم',
    image: '/images/hero-3.jpg',
    badge: 'پرفروش‌ترین‌ها',
    cta: 'مشاهده لباس‌ها',
    accent: 'from-rose-500 to-pink-700',
  },
];

type HeroSliderProps = {
  onNavigate: (view: string, param?: string) => void;
};

export default function HeroSlider({ onNavigate }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  return (
    <div
      className="relative h-screen min-h-[600px] w-full overflow-hidden bg-dark-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides background images */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-all duration-1000 ${
            idx === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
        >
          <img
            src={asset(slide.image)}
            alt={slide.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-dark-950/90 via-dark-950/60 to-dark-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-dark-950/40" />
        </div>
      ))}

      {/* Animated decorative orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br ${slides[current].accent} opacity-20 blur-3xl animate-float`} />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8" dir="rtl">
        <div className="max-w-2xl">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`transition-all duration-700 ${
                idx === current
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8 pointer-events-none absolute'
              }`}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm border border-white/20 animate-fade-in">
                <Sparkles className="h-4 w-4 text-amber-400" />
                {slide.badge}
              </div>
              <h1 className="text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl text-balance">
                {slide.title}
                <br />
                <span className="bg-gradient-to-l from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  {slide.subtitle}
                </span>
              </h1>
              <p className="mt-6 max-w-lg text-lg text-white/70 leading-relaxed">
                {slide.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('shop')}
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-dark-900 shadow-2xl transition-all hover:bg-dark-50 active:scale-95"
                >
                  {slide.cta}
                  <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                </button>
                <button
                  onClick={() => onNavigate('blog')}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 active:scale-95"
                >
                  مطالعه بلاگ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === current
                ? 'w-8 bg-white'
                : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-50 to-transparent z-10" />
    </div>
  );
}
