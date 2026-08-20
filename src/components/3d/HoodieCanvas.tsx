import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import HoodieModel from './HoodieModel';
import Lights from './Lights';
import { Hotspots } from './Hotspots';
import { useProductStore, PRESET_VIEWS } from '../../store/useProductStore';
import { controlsBridge } from './controlsBridge';

function CameraRig() {
  const activeView = useProductStore((s) => s.activeView);
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const anim = useRef<{ pos: THREE.Vector3; tgt: THREE.Vector3 } | null>(null);
  const fromPos = useRef(new THREE.Vector3(0, 1.1, 4.6));
  const fromTgt = useRef(new THREE.Vector3(0, 1.1, 0));
  const lastView = useRef(activeView);

  // register controls in the bridge
  useFrame(() => {
    if (controlsRef.current) {
      controlsBridge.setControls(controlsRef.current);
      controlsBridge.setAutoRotate(controlsBridge.autoRotate);
    }
    if (anim.current) {
      const ease = 1 - Math.pow(0.001, 1 / 60);
      fromPos.current.lerp(anim.current.pos, ease);
      fromTgt.current.lerp(anim.current.tgt, ease);
      camera.position.copy(fromPos.current);
      controlsRef.current?.target.copy(fromTgt.current);
      controlsRef.current?.update();
      if (fromPos.current.distanceTo(anim.current.pos) < 0.01) {
        anim.current = null;
      }
    }
  });

  if (lastView.current !== activeView) {
    lastView.current = activeView;
    if (activeView && PRESET_VIEWS[activeView]) {
      const v = PRESET_VIEWS[activeView];
      fromPos.current.copy(camera.position);
      fromTgt.current.copy(controlsRef.current?.target ?? new THREE.Vector3(0, 1.1, 0));
      anim.current = {
        pos: new THREE.Vector3(...v.position),
        tgt: new THREE.Vector3(...v.target),
      };
    }
  }

  return <OrbitControls ref={controlsRef} makeDefault enableDamping dampingFactor={0.08} minDistance={1.5} maxDistance={9} />;
}

export default function HoodieCanvas({ onReady }: { onReady?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef(false);

  // notify parent once the canvas is mounted
  useEffect(() => {
    if (!readyRef.current) {
      readyRef.current = true;
      onReady?.();
    }
  }, [onReady]);

  return (
    <div
      ref={containerRef}
      className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(ellipse_at_center,#17171c_0%,#0c0c10_70%)] sm:h-[560px] lg:h-[620px]"
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 1.1, 4.6], fov: 42 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Lights />
          <HoodieModel />
          <Hotspots />
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  );
}
