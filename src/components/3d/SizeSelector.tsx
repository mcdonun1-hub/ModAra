import { motion } from 'framer-motion';
import { useProductStore } from '../../store/useProductStore';
import { PRODUCT_SIZES } from '../../types/product';

export default function SizeSelector() {
  const size = useProductStore((s) => s.size);
  const setSize = useProductStore((s) => s.setSize);

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-medium text-white/60">سایز</span>
      <div className="flex flex-wrap items-center gap-2">
        {PRODUCT_SIZES.map((s) => {
          const active = size === s;
          return (
            <motion.button
              key={s}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSize(s)}
              aria-pressed={active}
              className={`flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-xs font-semibold transition-all ${
                active
                  ? 'border-amber-400 bg-amber-400/20 text-amber-300'
                  : 'border-white/15 text-white/70 hover:border-white/40 hover:text-white'
              }`}
            >
              {s}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
