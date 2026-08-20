import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useProductTexture } from './useProductTexture';

type CatItem = { id: string; label: string; emoji: string; accent: string; products: { slug: string; image: string; name: string }[] };

const CATEGORIES: CatItem[] = [
  {
    id: 'clothing', label: 'لباس', emoji: '👕', accent: '#f59e0b',
    products: [
      { slug: 'classic-white-shirt', image: '/images/prod-shirt-1.jpg', name: 'پیراهن' },
      { slug: 'formal-black-blazer', image: '/images/prod-shirt-3.jpg', name: 'کت' },
      { slug: 'camel-wool-coat', image: '/images/prod-shirt-9.jpg', name: 'پالتو' },
    ],
  },
  {
    id: 'pants', label: 'شلوار', emoji: '👖', accent: '#60a5fa',
    products: [
      { slug: 'slim-jeans-men', image: '/images/prod-pants-1.jpg', name: 'جین' },
      { slug: 'beige-chino-pants', image: '/images/prod-pants-3.jpg', name: 'کتان' },
      { slug: 'olive-cargo-pants', image: '/images/prod-pants-8.jpg', name: 'کارگو' },
    ],
  },
  {
    id: 'glasses', label: 'عینک', emoji: '🕶️', accent: '#38bdf8',
    products: [
      { slug: 'luxury-sunglasses-classic', image: '/images/prod-glasses-1.jpg', name: 'لوکس' },
      { slug: 'sport-aviator-sunglasses', image: '/images/prod-glasses-3.jpg', name: 'اسپرت' },
      { slug: 'round-vintage-sunglasses', image: '/images/prod-glasses-5.jpg', name: 'وینتیج' },
    ],
  },
  {
    id: 'watch', label: 'ساعت', emoji: '⌚', accent: '#fbbf24',
    products: [
      { slug: 'luxury-gold-watch', image: '/images/prod-watch-1.jpg', name: 'طلایی' },
      { slug: 'sport-watch', image: '/images/prod-watch-2.jpg', name: 'اسپرت' },
      { slug: 'steel-chronograph', image: '/images/prod-watch-5.jpg', name: 'استیل' },
    ],
  },
  {
    id: 'bag', label: 'کیف', emoji: '👜', accent: '#f97316',
    products: [
      { slug: 'leather-handbag-women', image: '/images/prod-bag-1.jpg', name: 'چرم' },
      { slug: 'men-leather-backpack', image: '/images/prod-bag-3.jpg', name: 'کوله' },
      { slug: 'tan-leather-handbag', image: '/images/prod-bag-5.jpg', name: 'قهوه‌ای' },
    ],
  },
  {
    id: 'accessory', label: 'اکسسوری', emoji: '💎', accent: '#e879f9',
    products: [
      { slug: 'womens-jewelry-set', image: '/images/prod-jewelry-1.jpg', name: 'جواهر' },
      { slug: 'pearl-necklace', image: '/images/prod-accessory-11.jpg', name: 'مروارید' },
      { slug: 'gold-hoop-earrings', image: '/images/prod-accessory-8.jpg', name: 'گوشواره' },
    ],
  },
];

function StageCard({ image, name, position, index, onPick }: {
  image: string; name: string; position: [number, number, number]; index: number; onPick: () => void;
}) {
  const tex = useProductTexture(image);
  const grp = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!grp.current) return;
    const t = state.clock.elapsedTime;
    grp.current.position.y += (Math.sin(t * 0.8 + index * 0.5) * 0.08 - (grp.current.position.y - position[1])) * 0.05;
  });

  return (
      <group position={position}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
        <group ref={grp} onClick={(e) => { e.stopPropagation(); onPick(); }}>
          <RoundedBox args={[1.5, 2.0, 0.1]} radius={0.08} smoothness={4}>
            <meshStandardMaterial color="#0f172a" metalness={0.3} roughness={0.3} />
          </RoundedBox>
          <mesh position={[0, 0.05, 0.06]}>
            <planeGeometry args={[1.35, 1.35]} />
            <meshBasicMaterial map={tex} />
          </mesh>
          <mesh position={[0, -0.85, 0.06]}>
            <planeGeometry args={[1.35, 0.32]} />
            <meshStandardMaterial color="#111827" transparent opacity={0.85} />
          </mesh>
          <Html position={[0, -0.85, 0.09]} center style={{ pointerEvents: 'none' }}>
            <span className="whitespace-nowrap text-[11px] font-bold text-white">{name}</span>
          </Html>
        </group>
      </Float>
    </group>
  );
}

function Stage({ cat, onPick }: { cat: CatItem; onPick: (slug: string) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRot = useRef(0);
  useEffect(() => { targetRot.current = 0; }, [cat.id]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.15;
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <hemisphereLight args={['#ffffff', '#1a1625', 0.6]} />
      <spotLight position={[5, 9, 6]} angle={0.4} penumbra={1} intensity={1.7} />
      <pointLight position={[-5, -3, 5]} intensity={0.5} color={cat.accent} />

      <group ref={groupRef}>
        {cat.products.map((p, i) => {
          const angle = (i / cat.products.length) * Math.PI * 2;
          const radius = 2.8;
          return (
            <StageCard
              key={p.slug}
              image={p.image}
              name={p.name}
              position={[Math.cos(angle) * radius, i === 1 ? 0.6 : -0.4, Math.sin(angle) * radius]}
              index={i}
              onPick={() => onPick(p.slug)}
            />
          );
        })}
      </group>
    </>
  );
}

type Props = { onNavigate: (view: string, param?: string) => void };

export default function HeroCategoryStage({ onNavigate }: Props) {
  const [activeId, setActiveId] = useState('clothing');
  const cat = CATEGORIES.find((c) => c.id === activeId) || CATEGORIES[0];

  return (
    <div className="relative h-screen min-h-[600px] w-full overflow-hidden bg-dark-950" dir="rtl">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-slate-900/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.10),transparent_55%)]" />

      <Canvas camera={{ position: [0, 1.2, 7], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true }} style={{ position: 'absolute', inset: 0 }}>
        <Stage key={cat.id} cat={cat} onPick={(slug) => onNavigate('product', slug)} />
      </Canvas>

      {/* Category chips */}
      <div className="absolute left-1/2 top-20 z-10 flex -translate-x-1/2 gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveId(c.id)}
            className={`flex items-center gap-1 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
              c.id === activeId ? 'bg-amber-500 text-dark-900 scale-105 shadow-lg' : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <span>{c.emoji}</span>
            {c.label}
          </button>
        ))}
      </div>

      {/* Title */}
      <div className="pointer-events-none absolute inset-x-0 bottom-28 z-10 text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          <span className="text-amber-400">{cat.emoji}</span> کالکشن {cat.label}
        </h1>
        <p className="mt-1 text-sm text-white/60">دسته را عوض کنید تا استیج به محصولات آن بچرخد</p>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/40">
        روی یک دسته‌بندی کلیک کنید تا استیج بچرخد
      </div>
    </div>
  );
}
