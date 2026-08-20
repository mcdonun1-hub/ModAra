export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <hemisphereLight args={['#ffffff', '#22242c', 0.7]} />
      {/* key light */}
      <spotLight
        position={[4, 6, 5]}
        angle={0.5}
        penumbra={0.6}
        intensity={1.6}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {/* fill light */}
      <directionalLight position={[-4, 2, 3]} intensity={0.5} />
      {/* rim / accent light */}
      <pointLight position={[-3, 3, -4]} intensity={0.6} color="#fbbf24" />
    </>
  );
}
