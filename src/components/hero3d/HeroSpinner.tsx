import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Html, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useProductTexture, type ShowProduct } from './useProductTexture';

const PRODUCTS: ShowProduct[] = [
  { slug: 'luxury-gold-watch', name: 'ساعت طلایی لوکس', price: 4500000, image: '/images/prod-watch-1.jpg', color: '#b45309' },
  { slug: 'luxury-sunglasses-classic', name: 'عینک آفتابی لوکس', price: 1800000, image: '/images/prod-glasses-1.jpg', color: '#1e293b' },
  { slug: 'leather-handbag-women', name: 'کیف دستی چرم', price: 2300000, image: '/images/prod-bag-1.jpg', color: '#78350f' },
  { slug: 'sport-watch', name: 'ساعت اسپرت', price: 2800000, image: '/images/prod-watch-2.jpg', color: '#0f172a' },
  { slug: 'womens-jewelry-set', name: 'ست جواهری', price: 3200000, image: '/images/prod-jewelry-1.jpg', color: '#9d174d' },
];

function SpinnerProduct({ product }: { product: ShowProduct }) {
  const tex = useProductTexture(product.image);
  const grp = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!grp.current) return;
    grp.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
  });

  return (
    <group ref={grp}>
      <RoundedBox args={[2.4, 2.4, 0.15]} radius={0.1} smoothness={4}>
        <meshStandardMaterial color="#0f172a" metalness={0.3} roughness={0.3} />
      </RoundedBox>
      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[2.15, 2.15]} />
        <meshBasicMaterial map={tex} />
      </mesh>
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[2.5, 2.5]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.06} />
      </mesh>
      <Html position={[0, -1.7, 0]} center style={{ pointerEvents: 'none' }}>
        <div className="whitespace-nowrap text-center text-white/50 text-xs">🖱️ بکشید تا بچرخد</div>
      </Html>
    </group>
  );
}

/** Applies drag-driven rotation to its child group. */
function RotatingGroup({ rotRef, product }: { rotRef: React.MutableRefObject<{ x: number; y: number; vx: number; vy: number; dragging: boolean }>; product: ShowProduct }) {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!ref.current) return;
    const r = rotRef.current;
    if (!r.dragging) {
      r.vx *= 0.94;
      r.vy *= 0.94;
    }
    r.x += r.vx;
    r.y += r.vy;
    r.x = Math.max(-0.6, Math.min(1.0, r.x));
    ref.current.rotation.x = r.x;
    ref.current.rotation.y = r.y;
  });

  return (
    <group ref={ref} position={[0, 0.4, 0]}>
      <SpinnerProduct product={product} />
    </group>
  );
}

type Props = { onNavigate: (view: string, param?: string) => void };

export default function HeroSpinner({ onNavigate }: Props) {
  const [index, setIndex] = useState(0);
  const info = PRODUCTS[index];
  const rotRef = useRef({ x: 0.2, y: 0.4, vx: 0, vy: 0, dragging: false });
  const last = useRef({ x: 0, y: 0 });

  const handleDown = (e: React.PointerEvent) => {
    rotRef.current.dragging = true;
    last.current = { x: e.clientX, y: e.clientY };
  };
  const handleMove = (e: React.PointerEvent) => {
    if (!rotRef.current.dragging) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    rotRef.current.vy += dx * 0.006;
    rotRef.current.vx += dy * 0.006;
  };
  const handleUp = () => { rotRef.current.dragging = false; };

  return (
    <div
      className="relative h-screen min-h-[600px] w-full overflow-hidden bg-dark-950"
      dir="rtl"
      onPointerDown={handleDown}
      onPointerMove={handleMove}
      onPointerUp={handleUp}
      onPointerLeave={handleUp}
      style={{ cursor: 'grab', touchAction: 'none' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-slate-900/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.12),transparent_55%)]" />

      <Canvas camera={{ position: [0, 0.7, 5], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true }} style={{ position: 'absolute', inset: 0 }}>
        <ambientLight intensity={0.6} />
        <hemisphereLight args={['#ffffff', '#1a1625', 0.7]} />
        <spotLight position={[5, 8, 6]} angle={0.4} penumbra={1} intensity={1.8} />
        <pointLight position={[-5, -3, 5]} intensity={0.5} color="#fbbf24" />
        <RotatingGroup key={index} rotRef={rotRef} product={info} />
        <ContactShadows position={[0, -1.8, 0]} opacity={0.5} scale={6} blur={2.5} far={3} />
      </Canvas>

      {/* Product info */}
      <div className="pointer-events-none absolute inset-x-0 bottom-24 z-10 flex flex-col items-center">
        <div className="pointer-events-auto flex flex-col items-center rounded-2xl bg-dark-950/70 px-8 py-4 backdrop-blur-md border border-white/10 text-center">
          <h2 className="text-2xl font-bold text-white">{info.name}</h2>
          <span className="mt-1 text-lg font-semibold text-amber-400">
            {new Intl.NumberFormat('fa-IR').format(info.price)} تومان
          </span>
          <button
            onClick={() => onNavigate('product', info.slug)}
            className="mt-3 rounded-xl bg-amber-500 px-6 py-2 font-semibold text-dark-900 transition-all hover:bg-amber-400 active:scale-95"
          >
            مشاهدهٔ محصول
          </button>
        </div>
      </div>

      {/* Product selector */}
      <div className="absolute left-1/2 top-20 z-10 flex -translate-x-1/2 gap-2">
        {PRODUCTS.map((p, i) => (
          <button
            key={p.slug}
            onClick={() => { setIndex(i); rotRef.current.vx = 0; rotRef.current.vy = 0; }}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all ${
              i === index ? 'bg-amber-500 text-dark-900 scale-110' : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/40">
        🖱️ برای چرخش ۳۶۰° بکشید · با دکمه‌ها محصول را عوض کنید
      </div>
    </div>
  );
}
