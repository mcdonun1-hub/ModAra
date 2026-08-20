import { useMemo } from 'react';
import * as THREE from 'three';
import { assetUrl } from '../../lib/format';

/** Load a product image as a Three.js texture (memoized). */
export function useProductTexture(path: string): THREE.Texture {
  return useMemo(() => {
    const img = new Image();
    img.src = assetUrl(path);
    const tex = new THREE.Texture(img);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    img.onload = () => {
      tex.needsUpdate = true;
    };
    return tex;
  }, [path]);
}

export type ShowProduct = {
  slug: string;
  name: string;
  price: number;
  image: string;
  color: string;
};
