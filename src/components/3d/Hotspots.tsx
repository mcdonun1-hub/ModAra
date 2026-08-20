import { Html } from '@react-three/drei';
import { useProductStore } from '../../store/useProductStore';
import { motion } from 'framer-motion';

interface HotspotDef {
  id: string;
  label: string;
  position: [number, number, number];
  description: string;
}

const HOTSPOTS: HotspotDef[] = [
  { id: 'hood', label: 'هود', position: [0, 2.15, 0.42], description: 'هود ضخیم و راحت با آستر نرم برای محافظت در روزهای سرد.' },
  { id: 'drawstrings', label: 'بندها', position: [0.12, 1.95, 0.5], description: 'بندهای پهن و مقاوم با سرهای فلزی مینیمال.' },
  { id: 'pocket', label: 'جیب کانگورویی', position: [0, 1.0, 0.85], description: 'جیب کانگورویی بزرگ و کاربردی برای گرم نگه داشتن دست‌ها.' },
  { id: 'cuffs', label: 'مچ‌ها', position: [1.5, 1.1, 0], description: 'مچ‌های کش‌دار و ریب‌باف برای تناسب بهتر و جلوگیری از نفوذ سرما.' },
  { id: 'waistband', label: 'کمر', position: [0, 0.42, 0.72], description: 'کمربند ریب‌باف کش‌دار با دوخت ظریف.' },
  { id: 'fleece', label: 'پشم داخلی', position: [-0.5, 1.4, 0.55], description: 'آستر فلیس بسیار نرم که گرمای بدن را حفظ می‌کند.' },
  { id: 'stitch', label: 'دوخت‌ها', position: [0.7, 1.6, 0.6], description: 'دوخت‌های دقیق و مقاوم که ظاهری مینیمال و بادوام می‌سازند.' },
];

export function Hotspots() {
  const selected = useProductStore((s) => s.selectedHotspot);
  const setSelected = useProductStore((s) => s.setSelectedHotspot);
  const setActiveView = useProductStore((s) => s.setActiveView);

  const handleClick = (id: string) => {
    if (selected === id) {
      setSelected(null);
    } else {
      setSelected(id);
      setActiveView(null);
    }
  };

  return (
    <>
      {HOTSPOTS.map((h) => {
        const isActive = selected === h.id;
        return (
          <group key={h.id} position={h.position}>
            {/* Hotspot marker */}
            <mesh onClick={() => handleClick(h.id)}>
              <sphereGeometry args={[isActive ? 0.07 : 0.05, 16, 16]} />
              <meshBasicMaterial color={isActive ? '#fbbf24' : '#ffffff'} />
            </mesh>
            {/* pulsing ring */}
            <mesh onClick={() => handleClick(h.id)}>
              <sphereGeometry args={[0.09, 16, 16]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.25} />
            </mesh>
            {isActive && (
              <Html position={[0.1, 0.2, 0]} center distanceFactor={8} style={{ pointerEvents: 'auto' }}>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-52 rounded-xl border border-white/10 bg-dark-950/90 p-3 backdrop-blur-md shadow-2xl"
                >
                  <p className="mb-1 text-sm font-bold text-amber-400">{h.label}</p>
                  <p className="text-xs leading-relaxed text-white/80">{h.description}</p>
                </motion.div>
              </Html>
            )}
          </group>
        );
      })}
    </>
  );
}

export function HotspotsLayer() {
  // lightweight re-export for canvas usage
  return <Hotspots />;
}

export type { HotspotDef };
export { HOTSPOTS };
