import { Maximize, Minimize } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProductStore } from '../../store/useProductStore';

export default function FullscreenButton() {
  const isActive = useProductStore((s) => s.fullscreen);
  const setFullscreen = useProductStore((s) => s.setFullscreen);

  const toggle = () => {
    setFullscreen(!isActive);
    document.documentElement.requestFullscreen?.().catch(() => {});
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggle}
      aria-label="تمام‌صفحه"
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-dark-900/80 text-white/80 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
    >
      {isActive ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
    </motion.button>
  );
}
