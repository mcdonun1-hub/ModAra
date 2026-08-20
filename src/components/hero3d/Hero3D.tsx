import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { assetUrl } from '../../lib/format';

type Product3D = { name: string; image: string; color: string; accent: string; slug: string };

const PRODUCTS: Product3D[] = [
  { name: 'پیراهن کلاسیک', image: assetUrl('/images/prod-shirt-1.jpg'), color: '#f5f5f4', accent: '#f59e0b', slug: 'classic-white-shirt' },
  { name: 'عینک لوکس', image: assetUrl('/images/prod-glasses-1.jpg'), color: '#1e293b', accent: '#38bdf8', slug: 'luxury-sunglasses-classic' },
  { name: 'ساعت طلایی', image: assetUrl('/images/prod-watch-1.jpg'), color: '#b45309', accent: '#fbbf24', slug: 'luxury-gold-watch' },
  { name: 'کیف چرم', image: assetUrl('/images/prod-bag-1.jpg'), color: '#78350f', accent: '#f59e0b', slug: 'leather-handbag-women' },
  { name: 'شلوار جین', image: assetUrl('/images/prod-pants-1.jpg'), color: '#1d4ed8', accent: '#60a5fa', slug: 'slim-jeans-men' },
];

type CardProps = { product: Product3D; position: [number, number, number]; speed: number; onClick: () => void };

function ProductCard3D({ product, position, speed, onClick }: CardProps) {
  const meshRef = useRef<THREE.Group>(null);
  const texture = useMemo(() => {
    const img = new Image();
    img.src = product.image;
    const tex = new THREE.Texture(img);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [product.image]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = Math.sin(t * speed) * 0.4;
    meshRef.current.rotation.x = Math.sin(t * speed * 0.6) * 0.1;
  });

  return (
    <group position={position}>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.2}>
        <group ref={meshRef} onClick={onClick}>
          <RoundedBox args={[1.7, 2.3, 0.12]} radius={0.08} smoothness={4}>
            <meshStandardMaterial color={product.color} metalness={0.15} roughness={0.4} />
          </RoundedBox>
          {/* Image plane on the card */}
          <mesh position={[0, 0.15, 0.07]}>
            <planeGeometry args={[1.5, 1.5]} />
            <meshBasicMaterial map={texture} />
          </mesh>
          {/* Name plate */}
          <mesh position={[0, -0.98, 0.08]}>
            <planeGeometry args={[1.5, 0.32]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.95} />
          </mesh>
          <mesh position={[0, -0.98, 0.09]}>
            <planeGeometry args={[1.42, 0.24]} />
            <meshStandardMaterial color="#111827" transparent opacity={0} />
          </mesh>
          <mesh position={[0, 0, -0.07]}>
            <planeGeometry args={[1.7, 2.3]} />
            <meshStandardMaterial color="#000000" transparent opacity={0.2} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function Scene({ onPick }: { onPick: (slug: string) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const products = PRODUCTS;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y += delta * 0.15;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.15;
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <pointLight position={[-5, -2, 4]} intensity={0.8} color="#fbbf24" />

      <group ref={groupRef}>
        {products.map((p, i) => {
          const angle = (i / products.length) * Math.PI * 2;
          const radius = 3.2;
          return (
            <ProductCard3D
              key={p.slug}
              product={p}
              position={[Math.cos(angle) * radius, (i % 2 === 0 ? 0.4 : -0.4), Math.sin(angle) * radius]}
              speed={0.6 + i * 0.2}
              onClick={() => onPick(p.slug)}
            />
          );
        })}
      </group>
      <hemisphereLight args={['#ffffff', '#1a1625', 0.7]} />
      <spotLight position={[5, 10, 5]} angle={0.4} penumbra={1} intensity={1.5} />
    </>
  );
}

type Hero3DProps = { onNavigate: (view: string, param?: string) => void };

export default function Hero3D({ onNavigate }: Hero3DProps) {
  return (
    <div className="relative h-screen min-h-[600px] w-full overflow-hidden bg-dark-950" dir="rtl">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-transparent to-slate-900/40" />

      <Canvas
        camera={{ position: [0, 1.2, 7], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Scene onPick={(slug) => onNavigate('product', slug)} />
      </Canvas>

      {/* Overlay title */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <div className="pointer-events-auto flex flex-col items-center rounded-3xl bg-dark-950/30 px-10 py-8 backdrop-blur-md border border-white/10 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-amber-300 border border-white/20">
            ✨ کالکشن جدید پاییز ۱۴۰۵
          </span>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            ویترین <span className="bg-gradient-to-l from-amber-400 to-orange-500 bg-clip-text text-transparent">سه‌بعدی</span> مُدارا
          </h1>
          <p className="mt-3 max-w-md text-white/70">
            محصولات را در فضای سه‌بعدی بچرخانید، روی هرکدام کلیک کنید و کالکشن را کاوش کنید.
          </p>
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => onNavigate('shop')}
              className="rounded-xl bg-white px-6 py-3 font-semibold text-dark-900 shadow-2xl transition-all hover:bg-dark-50 active:scale-95"
            >
              خرید کنید
            </button>
            <button
              onClick={() => onNavigate('blog')}
              className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              بلاگ
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/40">
        🖱️ بچرخانید و روی محصولات کلیک کنید
      </div>
    </div>
  );
}
