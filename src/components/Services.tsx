import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
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
  const terminalEndRef = useRef<HTMLDivElement>(null);

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
      }, 200);
      return () => clearTimeout(timeout);
    } else if (!showBanner) {
      const timeout = setTimeout(() => {
        setShowBanner(true);
        setLogs((prev) => [...prev, "System active. Launching shell..."]);
      }, 400);
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
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [showBanner]);

  // Auto scroll effect
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      <div className="terminal-body">
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
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}

// 3D Laptop Model loader component
function Laptop(props: React.ComponentProps<'group'>) {
  // Let useGLTF handle the Draco decoder path locally.
  const { nodes, materials } = (useGLTF('/macbook_ultra_concept.glb', '/draco/') as unknown) as GLTFResult;

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
    <group {...props} dispose={null}>
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
        
        {/* Interactive HTML Terminal Screen Overlay */}
        <Html
          transform
          occlude
          position={[0, 0.012, 0.082]}
          rotation={[Math.PI / 2, 0, 0]}
          distanceFactor={0.175}
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
        <div className="services-header">
          <h2 className="services-title">Bina Servers</h2>
          <p className="services-subtitle">
            Experience our interactive high-performance server control room. Drag to rotate the 
            mainframe node, hover to inspect, and watch the system execute workloads in real-time.
          </p>
        </div>

        {/* 3D Mainframe Section */}
        <div className="canvas-container">
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
                
                {/* Visual red test box: if this renders, WebGL and R3F are functional. */}
                <mesh position={[0, 0.15, 0]}>
                  <boxGeometry args={[0.02, 0.02, 0.02]} />
                  <meshBasicMaterial color="#ff3333" wireframe />
                </mesh>

                <group position={[0, -0.08, 0]} rotation={[0.08, -0.4, 0]}>
                  <Laptop />
                </group>
                
                {/* Smooth user controls */}
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
    </section>
  );
}

useGLTF.preload('/macbook_ultra_concept.glb', '/draco/');
