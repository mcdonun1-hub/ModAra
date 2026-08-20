import { create } from 'zustand';
import { HOODIE_COLORS, HOODIE_PRODUCT, PRODUCT_SIZES, type HoodieColorOption, type ProductSize } from '../types/product';

interface CameraView {
  position: [number, number, number];
  target: [number, number, number];
}

export const PRESET_VIEWS: Record<string, CameraView> = {
  front: { position: [0, 1.1, 4.6], target: [0, 1.1, 0] },
  back: { position: [0, 1.1, -4.6], target: [0, 1.1, 0] },
  left: { position: [-4.6, 1.1, 0], target: [0, 1.1, 0] },
  right: { position: [4.6, 1.1, 0], target: [0, 1.1, 0] },
  front45: { position: [3.2, 1.2, 3.2], target: [0, 1.1, 0] },
  back45: { position: [-3.2, 1.2, -3.2], target: [0, 1.1, 0] },
  hood: { position: [0, 2.6, 3.2], target: [0, 2.2, 0.2] },
  pocket: { position: [0, 1.0, 3.0], target: [0, 1.0, 0.4] },
  cuff: { position: [2.4, 1.2, 1.2], target: [1.9, 1.0, 0] },
  fleece: { position: [1.6, 1.4, 2.6], target: [0.6, 1.2, 0.5] },
  stitch: { position: [-2.2, 1.4, 2.4], target: [-0.8, 1.2, 0.3] },
  model: { position: [0, 1.3, 5.2], target: [0, 1.3, 0] },
};

interface ProductState {
  color: HoodieColorOption;
  size: ProductSize | null;
  quantity: number;
  activeView: string | null;
  selectedHotspot: string | null;
  fullscreen: boolean;
  filmMode: boolean;
  cartCount: number;
  setColor: (c: HoodieColorOption) => void;
  setSize: (s: ProductSize) => void;
  setQuantity: (q: number) => void;
  setActiveView: (v: string | null) => void;
  setSelectedHotspot: (id: string | null) => void;
  setFullscreen: (b: boolean) => void;
  setFilmMode: (b: boolean) => void;
  addToCart: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  color: HOODIE_COLORS[0],
  size: null,
  quantity: 1,
  activeView: null,
  selectedHotspot: null,
  fullscreen: false,
  filmMode: false,
  cartCount: 0,
  setColor: (c) => set({ color: c, activeView: null }),
  setSize: (s) => set({ size: s }),
  setQuantity: (q) => set({ quantity: Math.max(1, Math.min(9, q)) }),
  setActiveView: (v) => set({ activeView: v }),
  setSelectedHotspot: (id) => set({ selectedHotspot: id }),
  setFullscreen: (b) => set({ fullscreen: b }),
  setFilmMode: (b) => set({ filmMode: b }),
  addToCart: () =>
    set((s) => ({
      cartCount: s.cartCount + s.quantity,
    })),
}));

export { HOODIE_COLORS, HOODIE_PRODUCT, PRODUCT_SIZES };
