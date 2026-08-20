import { RotateCw, Maximize, ZoomIn, ZoomOut } from 'lucide-react';
import { motion } from 'framer-motion';

interface ControlsProps {
  onRotate: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onFullscreen: () => void;
}

export function ControlButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      title={label}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-dark-900/80 text-white/80 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
    >
      {children}
    </motion.button>
  );
}

export default function Controls({ onRotate, onZoomIn, onZoomOut, onReset, onFullscreen }: ControlsProps) {
  return (
    <div className="flex flex-col gap-2">
      <ControlButton onClick={onRotate} label="چرخش خودکار">
        <RotateCw className="h-5 w-5" />
      </ControlButton>
      <ControlButton onClick={onZoomIn} label="بزرگ‌نمایی">
        <ZoomIn className="h-5 w-5" />
      </ControlButton>
      <ControlButton onClick={onZoomOut} label="کوچک‌نمایی">
        <ZoomOut className="h-5 w-5" />
      </ControlButton>
      <ControlButton onClick={onReset} label="بازنشانی دوربین">
        <span className="text-sm font-bold">⟲</span>
      </ControlButton>
      <ControlButton onClick={onFullscreen} label="تمام‌صفحه">
        <Maximize className="h-5 w-5" />
      </ControlButton>
    </div>
  );
}
