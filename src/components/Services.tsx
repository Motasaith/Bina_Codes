import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import '../styles/Services.css';

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
            There was an error initializing the 3D Canvas. This is often due to missing WebGL support.
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
    "BINA INTEGRATION HUB OS v1.2.8 (x86_64-pc-linux-gnu)",
    "Initializing pipeline agent clusters...",
    "CPU: AMD EPYC Rome @ 3.40GHz (128 Cores)",
    "RAM: 512GB ECC DDR5 Registered [OK]",
    "CI/CD: Deployment workflows initialized [OK]",
    "Network: Edge Gateways & API Proxies Online",
    "--------------------------------------------------",
    "Loading integration adapters and controllers...",
    "  [OK] GitHub / GitLab Orchestration Webhooks",
    "  [OK] REST / GraphQL Gateway Routing Modules",
    "  [OK] OAuth2 / OpenID Security Guard Rails",
    "  [OK] Stripe / Payment Hook Handlers",
    "  [OK] Terraform / AWS IaC Cloud Watcher",
    "--------------------------------------------------",
    "Bina Core: BOOT SEQUENCE SUCCESSFUL.",
    "Awaiting client directive...",
    "Executing command: binacodes-integrator --active"
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
        setLogs((prev) => [...prev, "Workflows active. Listening for API payloads..."]);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [bootIndex]);

  // Real-time fake traffic logs after boot
  useEffect(() => {
    if (showBanner) {
      const interval = setInterval(() => {
        const events = [
          "DEVOPS: GitHub push main - build #412 triggered",
          "INTEGRATION: Shopify hook received - Order #88432",
          "GATEWAY: POST /api/v1/user/auth - token issued (1.4ms)",
          "DEVOPS: Kubernetes replica set scale-up [OK]",
          "INTEGRATION: Stripe invoice.paid webhook verified",
          "GATEWAY: GET /api/v2/products - cached hit (0.4ms)"
        ];
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        
        setLogs((prev) => {
          const sliced = prev.length > 40 ? prev.slice(prev.length - 20) : prev;
          return [...sliced, `[HUB] ${randomEvent}`];
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
        <div className="terminal-title">bina-codes-os @ devops-node-01</div>
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
              <span className="terminal-prompt">#</span> DevOps & API Orchestration: ACTIVE
            </div>
            <div className="terminal-line pulse">
              <span className="terminal-prompt">$</span> Listening for integration payloads...<span className="cursor-blink">_</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Procedural Interactive 3D Terminal Screen Component
function InteractiveTerminal() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Float bobbing effect
    const bob = Math.sin(t * 1.3) * 0.06;
    groupRef.current.position.y = bob;

    // Gentle side-to-side rotation + cursor follow
    const autoSwayY = Math.sin(t * 0.5) * 0.12;
    const autoSwayX = Math.cos(t * 0.7) * 0.02;

    const targetY = autoSwayY + state.pointer.x * 0.4;
    const targetX = autoSwayX - state.pointer.y * 0.4;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.1);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.1);

    // Hover scale
    const targetScale = hovered ? 1.08 : 1.0;
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1));
  });

  return (
    <group 
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      rotation={[0.06, -0.35, 0]}
    >
      {/* 1. Main Monitor Glass Screen Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3.2, 2.0, 0.08]} />
        <meshPhysicalMaterial 
          transmission={0.8} 
          roughness={0.1} 
          thickness={0.4} 
          ior={1.3} 
          color="#e0f2fe" 
          clearcoat={0.9} 
          clearcoatRoughness={0.1}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* 2. Metallic Bezel / Frame */}
      {/* Left bezel */}
      <mesh position={[-1.61, 0, 0]}>
        <boxGeometry args={[0.02, 2.0, 0.1]} />
        <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.2} />
      </mesh>
      {/* Right bezel */}
      <mesh position={[1.61, 0, 0]}>
        <boxGeometry args={[0.02, 2.0, 0.1]} />
        <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.2} />
      </mesh>
      {/* Top bezel */}
      <mesh position={[0, 1.01, 0]}>
        <boxGeometry args={[3.24, 0.02, 0.1]} />
        <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.2} />
      </mesh>
      {/* Bottom bezel */}
      <mesh position={[0, -1.01, 0]}>
        <boxGeometry args={[3.24, 0.02, 0.1]} />
        <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.2} />
      </mesh>

      {/* 3. Screen Stand / Base */}
      <group position={[0, -1.15, -0.1]} rotation={[Math.PI / 6, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.04, 0.04, 0.3, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.2} />
        </mesh>
      </group>
      <group position={[0, -1.3, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.35, 0.03, 16, 64]} />
          <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.2} />
        </mesh>
      </group>
      
      {/* 4. Interactive HTML Terminal Content */}
      <Html
        transform
        position={[0, 0, 0.05]}
        distanceFactor={1.45}
        center
        occlude={false}
      >
        <TerminalScreen />
      </Html>
    </group>
  );
}

// 3D Canvas Fallback Loader
function CanvasLoader() {
  return (
    <div className="canvas-loader-container">
      <div className="canvas-spinner"></div>
      <p className="canvas-loader-text">Loading 3D Terminal Environment...</p>
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
        <div className="services-grid">
          
          {/* Left panel: Software House Copy */}
          <div className="services-content-col">
            <div className="services-chip">
              <span>Bina DevOps & API Hub</span>
              <span className="services-chip-arrow">→</span>
            </div>
            
            <h2 className="services-brush-title">
              <span className="brush-title-line">BINA</span>
              <span className="brush-title-line">INTEGRATIONS</span>
            </h2>
            
            <p className="services-brush-desc">
              We construct automated DevOps pipelines, secure API integrations, and scalable 
              cloud architectures. Our solutions streamline deployment cycles, unify disparate 
              SaaS data streams, and optimize high-throughput applications.
            </p>
            
            <div className="services-bullet-list">
              <div className="services-bullet-item">
                <div className="bullet-icon-wrapper">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <div className="bullet-text-wrapper">
                  <h4>CI/CD & DevOps Automation</h4>
                  <p>Fully automated build pipelines, containerized orchestration, and zero-downtime rollouts.</p>
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
                  <h4>API & Gateway Integration</h4>
                  <p>Unified API gateways, microservices integration, secure token management, and data sync.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: 3D Canvas Column */}
          <div className="services-canvas-col">
            <div className="services-canvas-wrapper">
              <CanvasErrorBoundary>
                <Suspense fallback={<CanvasLoader />}>
                  <Canvas
                    shadows
                    camera={{ position: [0, 0, 4.2], fov: 42 }}
                    gl={{ antialias: true, alpha: true }}
                  >
                    <ambientLight intensity={1.8} />
                    
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
                    
                    {/* Centered terminal group inside the canvas column */}
                    <group position={[0, 0, 0]}>
                      <InteractiveTerminal />
                    </group>
                    
                    <OrbitControls enableZoom={false} enablePan={false} />
                  </Canvas>
                </Suspense>
              </CanvasErrorBoundary>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

