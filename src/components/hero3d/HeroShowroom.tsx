import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useProductTexture, type ShowProduct } from './useProductTexture';

const PRODUCTS: ShowProduct[] = [
  { slug: 'classic-white-shirt', name: 'پیراهن کلاسیک', price: 890000, image: '/images/prod-shirt-1.jpg', color: '#f5f5f4' },
  { slug: 'luxury-sunglasses-classic', name: 'عینک لوکس', price: 1800000, image: '/images/prod-glasses-1.jpg', color: '#1e293b' },
  { slug: 'luxury-gold-watch', name: 'ساعت طلایی', price: 4500000, image: '/images/prod-watch-1.jpg', color: '#b45309' },
  { slug: 'leather-handbag-women', name: 'کیف چرم', price: 2300000, image: '/images/prod-bag-1.jpg', color: '#78350f' },
  { slug: 'slim-jeans-men', name: 'شلوار جین', price: 1500000, image: '/images/prod-pants-1.jpg', color: '#1d4ed8' },
];

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const count = 400;
  const base = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;
    const px = state.pointer.x;
    const py = state.pointer.y;
    for (let i = 0; i < count; i++) {
      const bx = base[i * 3];
      const by = base[i * 3 + 1];
      const bz = base[i * 3 + 2];
      let x = bx + Math.sin(t * 0.5 + i * 0.1) * 0.25;
      let y = by + Math.cos(t * 0.4 + i * 0.1) * 0.25;
      let z = bz + Math.sin(t * 0.6 + i) * 0.15;
      // pointer repulsion (particles pushed away from cursor)
      const dx = x / 12 - px;
      const dy = y / 7 - py;
      const d2 = dx * dx + dy * dy;
      const radius = 0.12;
      if (d2 < radius && d2 > 0.0001) {
        const d = Math.sqrt(d2);
        const push = ((radius - d) / radius) * 2;
        x += (dx / d) * push * 0.6;
        y += (dy / d) * push * 0.6;
        z += push * 0.5;
      }
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[base, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#fbbf24"
        size={0.06}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function HoverCard({ product, index, hovered, setHovered, onPick }: {
  product: ShowProduct;
  index: number;
  hovered: number | null;
  setHovered: (i: number | null) => void;
  onPick: (slug: string) => void;
}) {
  const tex = useProductTexture(product.image);
  const grp = useRef<THREE.Group>(null);
  const isHovered = hovered === index;

  useFrame(({ clock }) => {
    if (!grp.current) return;
    const t = clock.elapsedTime;
    const sc = 1;
    const targetY = isHovered ? 1.2 : Math.sin(t * 0.6 + index) * 0.15;
    grp.current.position.y += (targetY - grp.current.position.y) * 0.08;
    grp.current.rotation.y += Math.sin(t * 0.4 + index) * 0.002;
    const s = sc * (isHovered ? 1.15 : 1);
    grp.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
  });

  return (
    <group
      position={[0, 0, 0]}
      ref={grp}
      onClick={(e) => { e.stopPropagation(); onPick(product.slug); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(index); }}
      onPointerOut={() => setHovered(null)}
    >
      <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.8}>
        <RoundedBox args={[1.7, 2.3, 0.12]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color={product.color} metalness={0.15} roughness={0.4} />
        </RoundedBox>
        <mesh position={[0, 0.15, 0.07]}>
          <planeGeometry args={[1.5, 1.5]} />
          <meshBasicMaterial map={tex} />
        </mesh>
        <mesh position={[0, 0, -0.07]}>
          <planeGeometry args={[1.7, 2.3]} />
          <meshStandardMaterial color="#000000" transparent opacity={0.15} />
        </mesh>
      </Float>
      {isHovered && (
        <Html position={[0, 1.5, 0]} center style={{ pointerEvents: 'none' }}>
          <div className="flex flex-col items-center rounded-xl bg-dark-950/90 px-4 py-2 text-center backdrop-blur-md border border-amber-400/40 shadow-xl whitespace-nowrap">
            <span className="text-sm font-bold text-white">{product.name}</span>
            <span className="text-xs font-semibold text-amber-400">
              {new Intl.NumberFormat('fa-IR').format(product.price)} تومان
            </span>
            <span className="mt-1 rounded-full bg-amber-500 px-3 py-0.5 text-[10px] font-bold text-dark-900">
              مشاهدهٔ محصول
            </span>
          </div>
        </Html>
      )}
    </group>
  );
}

function Scene({ onPick }: { onPick: (slug: string) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const groupRef = useRef<THREE.Group>(null);
  const count = PRODUCTS.length;
  const radius = 3.4;

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.1;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <hemisphereLight args={['#ffffff', '#1a1625', 0.6]} />
      <spotLight position={[5, 10, 6]} angle={0.4} penumbra={1} intensity={1.6} />
      <pointLight position={[-6, -3, 5]} intensity={0.6} color="#fbbf24" />

      <ParticleField />

      <group ref={groupRef}>
        {PRODUCTS.map((p, i) => {
          const angle = (i / count) * Math.PI * 2;
          return (
            <group key={p.slug} position={[Math.cos(angle) * radius, i % 2 === 0 ? 0.5 : -0.5, Math.sin(angle) * radius]}>
              <HoverCard product={p} index={i} hovered={hovered} setHovered={setHovered} onPick={onPick} />
            </group>
          );
        })}
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.8}
        dampingFactor={0.08}
        enableDamping
        autoRotate={hovered === null}
        autoRotateSpeed={0.5}
      />
    </>
  );
}

type Props = { onNavigate: (view: string, param?: string) => void };

export default function HeroShowroom({ onNavigate }: Props) {
  return (
    <div className="relative h-screen min-h-[600px] w-full overflow-hidden bg-dark-950" dir="rtl">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/25 via-transparent to-slate-900/40" />
      <Canvas camera={{ position: [0, 1.4, 8], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true }} style={{ position: 'absolute', inset: 0 }}>
        <Scene onPick={(slug) => onNavigate('product', slug)} />
      </Canvas>

      <div className="pointer-events-none absolute inset-x-0 top-16 z-10 text-center">
        <h1 className="text-3xl font-bold text-white sm:text-5xl">
          Showroom <span className="text-amber-400">تعاملی</span> مُدارا
        </h1>
        <p className="mt-2 text-sm text-white/60">صحنه را بچرخانید و روی محصولات هاور کنید</p>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/40">
        🖱️ کشیدن برای چرخاندن · هاور روی کارت‌ها · ذرات به ماوس واکنش نشان می‌دهند
      </div>
    </div>
  );
}
