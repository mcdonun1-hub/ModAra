import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import HoodieModel from './HoodieModel';
import Lights from './Lights';
import { Hotspots } from './Hotspots';
import { useProductStore, PRESET_VIEWS } from '../../store/useProductStore';
import { controlsBridge } from './controlsBridge';

// Cinematic film sequence: smooth orbit around the hoodie through key views.
const FILM_KEYS = ['front', 'front45', 'right', 'back45', 'back', 'left', 'hood', 'model', 'pocket', 'front'];
const FILM_VIEW = 2.4; // seconds per view

function CameraRig() {
  const activeView = useProductStore((s) => s.activeView);
  const filmMode = useProductStore((s) => s.filmMode);
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const anim = useRef<{ pos: THREE.Vector3; tgt: THREE.Vector3 } | null>(null);
  const fromPos = useRef(new THREE.Vector3(0, 1.1, 4.6));
  const fromTgt = useRef(new THREE.Vector3(0, 1.1, 0));
  const lastView = useRef(activeView);
  const lastFilm = useRef(filmMode);
  const film = useRef({ playing: false, i: 0, t: 0, idle: 0 });

  // register controls in the bridge
  useFrame((_state, delta) => {
    if (controlsRef.current) {
      controlsBridge.setControls(controlsRef.current);
      controlsBridge.setAutoRotate(controlsBridge.autoRotate);
    }

    // ---- Film mode drives the camera ----
    if (film.current.playing) {
      const f = film.current;
      f.t += delta;
      if (f.t >= FILM_VIEW) {
        f.t = 0;
        f.i = (f.i + 1) % FILM_KEYS.length;
        const v = PRESET_VIEWS[FILM_KEYS[f.i]];
        anim.current = {
          pos: new THREE.Vector3(...v.position),
          tgt: new THREE.Vector3(...v.target),
        };
      }
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

  // detect film mode toggles
  if (lastFilm.current !== filmMode) {
    lastFilm.current = filmMode;
    if (filmMode) {
      // start the film from the current camera position
      film.current.playing = true;
      film.current.i = 0;
      film.current.t = 0;
      const v = PRESET_VIEWS[FILM_KEYS[0]];
      anim.current = {
        pos: new THREE.Vector3(...v.position),
        tgt: new THREE.Vector3(...v.target),
      };
    } else {
      film.current.playing = false;
    }
  }

  if (lastView.current !== activeView) {
    lastView.current = activeView;
    if (activeView && PRESET_VIEWS[activeView] && !film.current.playing) {
      const v = PRESET_VIEWS[activeView];
      fromPos.current.copy(camera.position);
      fromTgt.current.copy(controlsRef.current?.target ?? new THREE.Vector3(0, 1.1, 0));
      anim.current = {
        pos: new THREE.Vector3(...v.position),
        tgt: new THREE.Vector3(...v.target),
      };
    }
  }

  return <OrbitControls ref={controlsRef} makeDefault enableDamping dampingFactor={0.08} minDistance={1.5} maxDistance={9} enableZoom={!film.current.playing} enableRotate={!film.current.playing} />;
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
