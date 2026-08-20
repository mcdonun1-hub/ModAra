import { motion } from 'framer-motion';
import { useProductStore } from '../../store/useProductStore';
import { HOODIE_COLORS } from '../../types/product';

export default function ColorSelector() {
  const color = useProductStore((s) => s.color);
  const setColor = useProductStore((s) => s.setColor);

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-medium text-white/60">رنگ</span>
      <div className="flex flex-wrap items-center gap-2">
        {HOODIE_COLORS.map((c) => {
          const active = c.id === color.id;
          return (
            <motion.button
              key={c.id}
              whileTap={{ scale: 0.85 }}
              onClick={() => setColor(c)}
              title={c.name}
              aria-label={`رنگ ${c.name}`}
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all ${
                active ? 'border-amber-400 scale-110' : 'border-white/20 hover:border-white/50'
              }`}
              style={{ backgroundColor: c.hex }}
            >
              {active && <span className="h-2 w-2 rounded-full bg-white/80" />}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
