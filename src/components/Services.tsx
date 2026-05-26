import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';
import type { GLTF } from 'three-stdlib';
import '../styles/Services.css';

type GLTFResult = GLTF & {
  nodes: {
    Object_5: THREE.Mesh
    Object_6: THREE.Mesh
    Object_7: THREE.Mesh
    Object_9: THREE.Mesh
    Object_10: THREE.Mesh
    Object_11: THREE.Mesh
    Object_13: THREE.Mesh
    Object_14: THREE.Mesh
    Object_15: THREE.Mesh
    Object_16: THREE.Mesh
    Object_17: THREE.Mesh
    Object_18: THREE.Mesh
    Object_19: THREE.Mesh
    Object_20: THREE.Mesh
    Object_21: THREE.Mesh
    Object_22: THREE.Mesh
    Object_23: THREE.Mesh
    Object_25: THREE.Mesh
    Object_26: THREE.Mesh
    Object_27: THREE.Mesh
    Object_28: THREE.Mesh
    Object_29: THREE.Mesh
    Object_30: THREE.Mesh
    Object_31: THREE.Mesh
    Object_32: THREE.Mesh
    Object_33: THREE.Mesh
    Object_35: THREE.Mesh
    Object_36: THREE.Mesh
  }
  materials: {
    Anodized_aluminum: THREE.MeshStandardMaterial
    Rubber_feet: THREE.MeshStandardMaterial
    Metal_screw: THREE.MeshStandardMaterial
    Keycap: THREE.MeshStandardMaterial
    Keycap_transparent_plastic: THREE.MeshStandardMaterial
    Rubber_gasket: THREE.MeshStandardMaterial
    Plastic_cover: THREE.MeshStandardMaterial
    material: THREE.MeshStandardMaterial
    Black_anodized_aluminum: THREE.MeshStandardMaterial
    Apple_logo: THREE.MeshStandardMaterial
    Display_glass_nanotexture: THREE.MeshPhysicalMaterial
    Display_frame: THREE.MeshStandardMaterial
    Display_glass: THREE.MeshStandardMaterial
    Camera_frame: THREE.MeshStandardMaterial
    Camera_lens: THREE.MeshStandardMaterial
    Gold_pads: THREE.MeshStandardMaterial
    USBC_port: THREE.MeshStandardMaterial
    Steel_sheet: THREE.MeshStandardMaterial
    Jack_port: THREE.MeshStandardMaterial
    Speaker_mesh: THREE.MeshStandardMaterial
    Magsafe_port: THREE.MeshStandardMaterial
    Touchpad_glass: THREE.MeshStandardMaterial
    Touchpad_tint: THREE.MeshStandardMaterial
  }
}

// React Error Boundary to catch 3D Canvas crashes
class CanvasErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: string }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error: error?.message || 'Unknown WebGL/R3F rendering error' };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("CanvasErrorBoundary caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="canvas-error-container">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#f99a3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}>
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <h4 className="canvas-error-title">3D Mainframe Load Failed</h4>
          <p className="canvas-error-subtitle">
            There was an error initializing the 3D Canvas. This is often due to missing WebGL support or a model loading failure.
          </p>
          <pre className="canvas-error-details">{this.state.error}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

// Interactive Terminal Screen component rendered inside the 3D model
function TerminalScreen() {
  const [logs, setLogs] = useState<string[]>([]);
  const [bootIndex, setBootIndex] = useState(0);
  const [showBanner, setShowBanner] = useState(false);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const bootSequence = [
    "BINA CODES OS v1.0.4 (x86_64-pc-linux-gnu)",
    "Initializing CPU core clusters...",
    "CPU: AMD EPYC Rome @ 3.40GHz (128 Cores)",
    "RAM: 512GB ECC DDR5 Registered [OK]",
    "Storage: NVMe RAID array [Uptime 100%] [OK]",
    "Network: 10Gbps Edge Gateway Connected",
    "--------------------------------------------------",
    "Loading enterprise system services...",
    "  [OK] Node.js Edge Runtime Module",
    "  [OK] Go Concurrency Core Channels",
    "  [OK] React R3F Canvas Render Pipeline",
    "  [OK] PostgreSQL Connection Pool",
    "  [OK] Zero-Trust Security Sentinel",
    "--------------------------------------------------",
    "Bina Servers: BOOT SEQUENCE SUCCESSFUL.",
    "Awaiting client directive...",
    "Executing command: bina-codes --deploy"
  ];

  const asciiBanner = `
  ____  _             ____          _             
 | __ )(_)_ __   __ _/ ___|___   __| | ___ ___    
 |  _ \\| | '_ \\ / _\` | |   / _ \\ / _\` |/ _ \\ __|   
 | |_) | | | | | (_| | |__| (_) | (_| |  __/\\__ \\   
 |____/|_|_| |_|\\__,_|\\____\\___/ \\__,_|\\___||___/   
  `;

  // Boot sequence effect
  useEffect(() => {
    if (bootIndex < bootSequence.length) {
      const timeout = setTimeout(() => {
        setLogs((prev) => [...prev, bootSequence[bootIndex]]);
        setBootIndex((prev) => prev + 1);
      }, 150);
      return () => clearTimeout(timeout);
    } else if (!showBanner) {
      const timeout = setTimeout(() => {
        setShowBanner(true);
        setLogs((prev) => [...prev, "System active. Launching shell..."]);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [bootIndex]);

  // Real-time fake traffic logs after boot
  useEffect(() => {
    if (showBanner) {
      const interval = setInterval(() => {
        const ips = ["104.28.142.23", "8.8.8.8", "192.168.1.104", "172.217.16.142", "45.79.112.5", "54.239.26.180"];
        const endpoints = ["/api/v1/deploy", "/assets/hero.mp4", "/api/v1/auth", "/index.html", "/api/v1/stats"];
        const times = ["2.1ms", "14.5ms", "0.9ms", "32.0ms", "5.4ms"];
        const randomIp = ips[Math.floor(Math.random() * ips.length)];
        const randomEnd = endpoints[Math.floor(Math.random() * endpoints.length)];
        const randomTime = times[Math.floor(Math.random() * times.length)];
        
        setLogs((prev) => {
          const sliced = prev.length > 40 ? prev.slice(prev.length - 20) : prev;
          return [...sliced, `[TRAFFIC] ${randomIp} - GET ${randomEnd} - 200 OK (${randomTime})`];
        });
      }, 1800);
      return () => clearInterval(interval);
    }
  }, [showBanner]);

  // Auto scroll effect
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [logs, showBanner]);

  return (
    <div className="terminal-container">
      {/* Terminal Title Bar */}
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <div className="terminal-title">bina-codes-os @ server-cluster-01</div>
      </div>
      
      {/* Terminal Content Area */}
      <div className="terminal-body" ref={terminalBodyRef}>
        {logs.map((log, idx) => (
          <div key={idx} className="terminal-line">
            <span className="terminal-prompt">&gt;</span> {log}
          </div>
        ))}
        
        {showBanner && (
          <div className="terminal-banner-box">
            <pre className="terminal-ascii">{asciiBanner}</pre>
            <div className="terminal-line success">
              <span className="terminal-prompt">#</span> Deployment status: ACTIVE (100% UPTIME)
            </div>
            <div className="terminal-line pulse">
              <span className="terminal-prompt">$</span> Listening for enterprise workloads...<span className="cursor-blink">_</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 3D Laptop Model loader component with automatic floating/swaying animations
function Laptop(props: React.ComponentProps<'group'>) {
  // Restore the working CDN Draco loader path to ensure GLB loads successfully
  const { nodes, materials } = (useGLTF('/macbook_ultra_concept.glb', 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/') as unknown) as GLTFResult;

  const groupRef = useRef<THREE.Group>(null);

  // Gentle float/tilt/spin animation to signal it is a 3D model automatically on load/scroll
  useFrame((state) => {
    if (groupRef.current) {
      const elapsed = state.clock.getElapsedTime();
      
      // Float vertically (swaying hover)
      groupRef.current.position.y = Math.sin(elapsed * 1.3) * 0.015;
      
      // Gentle side-to-side rotation (indicates 3D automatically)
      groupRef.current.rotation.y = Math.sin(elapsed * 0.6) * 0.15;
      
      // Gentle pitch tilt
      groupRef.current.rotation.x = Math.cos(elapsed * 0.8) * 0.025;
    }
  });

  useEffect(() => {
    if (nodes && materials) {
      console.log("3D Laptop Model Loaded Successfully!", { nodes, materials });
      try {
        const geom = nodes.Object_5.geometry;
        geom.computeBoundingBox();
        if (geom.boundingBox) {
          const size = geom.boundingBox.getSize(new THREE.Vector3());
          console.log("3D Model Size Coordinates:", size);
        }
      } catch (e) {
        console.error("Could not compute bounding box on Object_5:", e);
      }
    }
  }, [nodes, materials]);
  
  return (
    <group ref={groupRef} {...props} dispose={null}>
      {/* Base parts */}
      <group position={[0, 0, 0.008]}>
        <mesh geometry={nodes.Object_9.geometry} material={materials.Keycap} />
        <mesh geometry={nodes.Object_10.geometry} material={materials.Keycap_transparent_plastic} />
        <mesh geometry={nodes.Object_11.geometry} material={materials.Anodized_aluminum} />
      </group>
      
      {/* Lid Group - rotated open by -90 deg around X */}
      <group position={[0, -0.001, -0.121]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Object_13.geometry} material={materials.Anodized_aluminum} />
        <mesh geometry={nodes.Object_14.geometry} material={materials.Rubber_gasket} />
        <mesh geometry={nodes.Object_15.geometry} material={materials.Plastic_cover} />
        <mesh geometry={nodes.Object_16.geometry} material={materials.material} />
        <mesh geometry={nodes.Object_17.geometry} material={materials.Black_anodized_aluminum} />
        <mesh geometry={nodes.Object_18.geometry} material={materials.Apple_logo} />
        <mesh geometry={nodes.Object_19.geometry} material={materials.Display_glass_nanotexture} />
        <mesh geometry={nodes.Object_20.geometry} material={materials.Display_frame} />
        <mesh geometry={nodes.Object_21.geometry} material={materials.Display_glass} />
        <mesh geometry={nodes.Object_22.geometry} material={materials.Camera_frame} />
        <mesh geometry={nodes.Object_23.geometry} material={materials.Camera_lens} />
        
        {/* Interactive HTML Terminal Screen Overlay - adjusted scale/distance factor to fit display bezel */}
        <Html
          transform
          position={[0, 0.012, 0.082]}
          rotation={[Math.PI / 2, 0, 0]}
          distanceFactor={0.29}
        >
          <TerminalScreen />
        </Html>
      </group>

      {/* Other case parts */}
      <mesh geometry={nodes.Object_5.geometry} material={materials.Anodized_aluminum} />
      <mesh geometry={nodes.Object_6.geometry} material={materials.Rubber_feet} />
      <mesh geometry={nodes.Object_7.geometry} material={materials.Metal_screw} />
      <mesh geometry={nodes.Object_25.geometry} material={materials.Anodized_aluminum} />
      <mesh geometry={nodes.Object_26.geometry} material={materials.Gold_pads} />
      <mesh geometry={nodes.Object_27.geometry} material={materials.USBC_port} />
      <mesh geometry={nodes.Object_28.geometry} material={materials.Steel_sheet} />
      <mesh geometry={nodes.Object_29.geometry} material={materials.Keycap} />
      <mesh geometry={nodes.Object_30.geometry} material={materials.Jack_port} />
      <mesh geometry={nodes.Object_31.geometry} material={materials.Speaker_mesh} />
      <mesh geometry={nodes.Object_32.geometry} material={materials.Magsafe_port} />
      <mesh geometry={nodes.Object_33.geometry} material={materials.Black_anodized_aluminum} />
      <mesh geometry={nodes.Object_35.geometry} material={materials.Touchpad_glass} />
      <mesh geometry={nodes.Object_36.geometry} material={materials.Touchpad_tint} />
    </group>
  );
}

// 3D Canvas Fallback Loader
function CanvasLoader() {
  return (
    <div className="canvas-loader-container">
      <div className="canvas-spinner"></div>
      <p className="canvas-loader-text">Loading Bina Servers 3D Environment...</p>
    </div>
  );
}

export default function Services() {
  const [isMobile, setIsMobile] = useState(false);

  // Screen size listener to adjust the laptop's positioning dynamically (centered on mobile, offset right on desktop)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="services" className="services-section">
      {/* Decorative floating spheres */}
      <div className="services-sphere sphere-1"></div>
      <div className="services-sphere sphere-2"></div>
      <div className="services-sphere sphere-3"></div>
      <div className="services-sphere sphere-4"></div>
      <div className="services-sphere sphere-5"></div>
      <div className="services-sphere sphere-6"></div>
      <div className="services-sphere sphere-7"></div>
      <div className="services-sphere sphere-8"></div>
      <div className="services-sphere sphere-9"></div>
      
      <div className="container">
        {/* Full-width Canvas container with text overlay directly on top */}
        <div className="canvas-container">
          
          {/* Floating Software House Copy (floats on the left, does not shrink the 3D layout) */}
          <div className="services-overlay-content">
            <div className="services-chip">
              <span>Bina Cloud Mainframe</span>
              <span className="services-chip-arrow">→</span>
            </div>
            
            <h2 className="services-brush-title">
              <span className="brush-title-line">BINA</span>
              <span className="brush-title-line">SERVERS</span>
            </h2>
            
            <p className="services-brush-desc">
              We deploy premium cloud infrastructure, active database nodes, and custom 
              backend networks engineered specifically for forward-thinking software houses. 
              Our architecture optimizes highly reliable query processing with uninterrupted focus.
            </p>
            
            <div className="services-bullet-list">
              <div className="services-bullet-item">
                <div className="bullet-icon-wrapper">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <div className="bullet-text-wrapper">
                  <h4>High-Performance Mainframe</h4>
                  <p>Equipped with GPU node arrays optimized for AI inference and web sockets.</p>
                </div>
              </div>

              <div className="services-bullet-item">
                <div className="bullet-icon-wrapper">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div className="bullet-text-wrapper">
                  <h4>Zero-Trust Security Core</h4>
                  <p>Enforced edge-query filters keeping server nodes completely shielded.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Full-width 3D Canvas rendering underneath (wrapped for responsive height limits) */}
          <div className="services-canvas-wrapper">
            <CanvasErrorBoundary>
              <Suspense fallback={<CanvasLoader />}>
                <Canvas
                  shadows
                  camera={{ position: [0, 0.45, 0.45], fov: 42 }}
                  gl={{ antialias: true, alpha: true }}
                >
                  <ambientLight intensity={1.8} />
                  
                  {/* Strategic premium studio lighting */}
                  <directionalLight 
                    position={[5, 10, 5]} 
                    intensity={2.5} 
                    castShadow 
                    shadow-mapSize-width={1024} 
                    shadow-mapSize-height={1024} 
                  />
                  <spotLight 
                    position={[-5, 8, 5]} 
                    angle={0.25} 
                    penumbra={1} 
                    intensity={2.0} 
                    castShadow 
                  />
                  <pointLight position={[0, -2, 5]} intensity={1.2} />
                  
                  {/* Laptop group: shifted to the right on desktop to prevent overlap with text */}
                  <group position={[isMobile ? 0 : 0.12, -0.07, 0]} rotation={[0.08, -0.4, 0]}>
                    <Laptop />
                  </group>
                  
                  {/* Smooth user controls - limited rotation prevents full 360 spin */}
                  <OrbitControls 
                    enableZoom={false} 
                    minPolarAngle={Math.PI / 4} 
                    maxPolarAngle={Math.PI / 2.1} 
                    minAzimuthAngle={-Math.PI / 3} 
                    maxAzimuthAngle={Math.PI / 3} 
                  />
                  
                  {/* Ground shadows underneath the laptop */}
                  <ContactShadows 
                    position={[0, -0.085, 0]} 
                    opacity={0.45} 
                    scale={2.2} 
                    blur={1.8} 
                    far={1.0} 
                  />
                </Canvas>
              </Suspense>
            </CanvasErrorBoundary>
          </div>
        </div>
      </div>
    </section>
  );
}

useGLTF.preload('/macbook_ultra_concept.glb', 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
