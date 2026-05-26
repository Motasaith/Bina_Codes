import React, { useState, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import '../styles/Contact.css';

// React Error Boundary to catch 3D Canvas crashes
class CanvasErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.error("CanvasErrorBoundary in Contact caught error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="contact-3d-fallback">
          <div className="fallback-envelope">✉</div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Interactive 3D Glass Envelope Component
function GlassEnvelope() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Float bobbing effect
    const bob = Math.sin(t * 1.5) * 0.12;
    groupRef.current.position.y = bob;

    // Cursor tracking / dynamic tilt
    const targetX = state.pointer.y * 0.4 + Math.sin(t * 0.8) * 0.05;
    const targetY = state.pointer.x * 0.4 + Math.cos(t * 0.6) * 0.05;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.08);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.08);

    // Hover scale effect
    const targetScale = hovered ? 1.15 : 1.0;
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1));
  });

  return (
    <group 
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      rotation={[0.15, -0.45, 0.05]}
    >
      {/* 1. Main Transparent Glass Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.5, 1.6, 0.1]} />
        <meshPhysicalMaterial 
          transmission={0.9} 
          roughness={0.08} 
          thickness={0.5} 
          ior={1.5} 
          color="#ffffff" 
          clearcoat={1.0} 
          clearcoatRoughness={0.05}
          transparent
        />
      </mesh>

      {/* 2. Inner Letter (Golden sand-colored card/paper sheet) */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[2.35, 1.45, 0.02]} />
        <meshStandardMaterial 
          color="#f4e0d4" // Warm sand/gold paper
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>

      {/* 3. Chrome Outlines (Silver metallic borders) */}
      {/* Left border */}
      <mesh position={[-1.25, 0, 0]}>
        <boxGeometry args={[0.03, 1.6, 0.12]} />
        <meshStandardMaterial color="#ffffff" metalness={1.0} roughness={0.05} />
      </mesh>
      {/* Right border */}
      <mesh position={[1.25, 0, 0]}>
        <boxGeometry args={[0.03, 1.6, 0.12]} />
        <meshStandardMaterial color="#ffffff" metalness={1.0} roughness={0.05} />
      </mesh>
      {/* Top border */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[2.53, 0.03, 0.12]} />
        <meshStandardMaterial color="#ffffff" metalness={1.0} roughness={0.05} />
      </mesh>
      {/* Bottom border */}
      <mesh position={[0, -0.8, 0]}>
        <boxGeometry args={[2.53, 0.03, 0.12]} />
        <meshStandardMaterial color="#ffffff" metalness={1.0} roughness={0.05} />
      </mesh>

      {/* 4. Fold lines (V-flaps in metallic chrome) */}
      {/* Top Left-to-Center */}
      <group position={[-0.625, 0.35, 0.065]} rotation={[0, 0, -0.64]}>
        <mesh>
          <boxGeometry args={[1.56, 0.025, 0.025]} />
          <meshStandardMaterial color="#ffffff" metalness={1.0} roughness={0.05} />
        </mesh>
      </group>
      {/* Top Right-to-Center */}
      <group position={[0.625, 0.35, 0.065]} rotation={[0, 0, 0.64]}>
        <mesh>
          <boxGeometry args={[1.56, 0.025, 0.025]} />
          <meshStandardMaterial color="#ffffff" metalness={1.0} roughness={0.05} />
        </mesh>
      </group>

      {/* Bottom Left-to-Center */}
      <group position={[-0.625, -0.45, 0.065]} rotation={[0, 0, 0.51]}>
        <mesh>
          <boxGeometry args={[1.4, 0.025, 0.025]} />
          <meshStandardMaterial color="#ffffff" metalness={1.0} roughness={0.05} />
        </mesh>
      </group>
      {/* Bottom Right-to-Center */}
      <group position={[0.625, -0.45, 0.065]} rotation={[0, 0, -0.51]}>
        <mesh>
          <boxGeometry args={[1.4, 0.025, 0.025]} />
          <meshStandardMaterial color="#ffffff" metalness={1.0} roughness={0.05} />
        </mesh>
      </group>

      {/* Connection Seal Disk at center */}
      <mesh position={[0, -0.1, 0.07]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.02, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={1.0} roughness={0.05} />
      </mesh>
    </group>
  );
}

// Bobbing Glass Orbs
interface FloatingOrbProps {
  position: [number, number, number];
  size: number;
  speed: number;
  bobHeight: number;
  phase: number;
}

function FloatingOrb({ position, size, speed, bobHeight, phase }: FloatingOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() * speed + phase;
    meshRef.current.position.y = position[1] + Math.sin(t) * bobHeight;
    meshRef.current.position.x = position[0] + Math.cos(t * 0.4) * (bobHeight * 0.4);
  });

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <sphereGeometry args={[size, 32, 32]} />
      <meshPhysicalMaterial 
        transmission={0.9}
        roughness={0.05}
        thickness={size * 1.5}
        ior={1.45}
        color="#fef08a" // warm orange/yellow tint inside orbs
        clearcoat={1.0}
        clearcoatRoughness={0.05}
        transparent
      />
    </mesh>
  );
}

// Sparkling Stars
interface SparklingStarProps {
  position: [number, number, number];
  scale: number;
  speed: number;
  phase: number;
}

function SparklingStar({ position, scale, speed, phase }: SparklingStarProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const sizePulse = (1 + Math.sin(t * speed + phase) * 0.3) * scale;
    groupRef.current.scale.setScalar(sizePulse);
    groupRef.current.rotation.z = t * 0.4 + phase;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* 4-point star crossed lines */}
      <mesh>
        <boxGeometry args={[0.02, 0.4, 0.02]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.4, 0.02, 0.02]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    projectType: 'software',
    budget: '10-25k'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        projectType: 'software',
        budget: '10-25k'
      });
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-outer-card">
        <div className="contact-content-grid">
          
          {/* Left panel: Form and Header */}
          <div className="contact-left-col">
            <h2 className="contact-heading-main">Contact Us</h2>
            
            <div className="contact-form-glass-card">
              {isSubmitted ? (
                <div className="contact-success-box">
                  <h3>Message Sent!</h3>
                  <p>We have received your message. Our team will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form-inner">
                  <div className="form-input-capsule-wrapper">
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="Next name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="contact-capsule-input"
                      required
                    />
                  </div>
                  
                  <div className="form-input-capsule-wrapper">
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Your snome" 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="contact-capsule-input"
                      required
                    />
                  </div>
                  
                  <div className="form-input-capsule-wrapper">
                    <input 
                      type="text" 
                      name="phone" 
                      placeholder="Your your thrire" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="contact-capsule-input"
                      required
                    />
                  </div>
                  
                  <div className="form-input-capsule-wrapper">
                    <input 
                      type="text" 
                      name="message" 
                      placeholder="" 
                      value={formData.message}
                      onChange={handleInputChange}
                      className="contact-capsule-input"
                    />
                  </div>
                  
                  <div className="contact-form-bottom-row">
                    <div className="form-select-capsule-wrapper">
                      <select 
                        name="projectType" 
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="contact-capsule-select"
                      >
                        <option value="software"></option>
                        <option value="web-dev">Web</option>
                        <option value="servers">Servers</option>
                      </select>
                    </div>
                    
                    <div className="form-select-capsule-wrapper">
                      <select 
                        name="budget" 
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="contact-capsule-select"
                      >
                        <option value="5-10k"></option>
                        <option value="10-25k">Mid</option>
                        <option value="25k+">High</option>
                      </select>
                    </div>
                    
                    <button type="submit" className="contact-submit-btn">
                      Contact Us
                    </button>
                  </div>
                </form>
              )}
            </div>
            
            {/* Social Icons matching screenshot */}
            <div className="contact-social-row">
              <a href="#" className="social-icon-circle" aria-label="Facebook">
                <span>f</span>
              </a>
              <a href="#" className="social-icon-circle" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="social-icon-circle" aria-label="Twitter">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="social-icon-circle" aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.388.511a3.002 3.002 0 0 0-2.11 2.107C0 8.048 0 12 0 12s0 3.952.502 5.837a3.003 3.003 0 0 0 2.11 2.107c1.883.511 9.388.511 9.388.511s7.505 0 9.388-.511a3.002 3.002 0 0 0 2.11-2.107C24 15.952 24 12 24 12s0-3.952-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" className="social-icon-circle" aria-label="LinkedIn">
                <span>in</span>
              </a>
              <a href="#" className="social-icon-circle" aria-label="X">
                <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <span className="social-dot-indicator"></span>
              <span className="social-dot-indicator"></span>
            </div>
          </div>
          
          {/* Right panel: 3D Canvas */}
          <div className="contact-right-col">
            <div className="contact-canvas-wrapper">
              <CanvasErrorBoundary>
                <Suspense fallback={
                  <div className="contact-3d-loader">
                    <span className="loader-orb"></span>
                    <span className="loader-text">Initializing interactive 3D space...</span>
                  </div>
                }>
                  <Canvas
                    shadows
                    camera={{ position: [0, 0, 4.2], fov: 42 }}
                    gl={{ antialias: true, alpha: true }}
                  >
                    <ambientLight intensity={1.8} />
                    <directionalLight position={[-4, -3, 3]} intensity={2.2} color="#f59e0b" />
                    <directionalLight position={[4, 4, 3]} intensity={3.5} color="#60a5fa" />
                    <spotLight position={[0, 5, 2]} intensity={2.0} angle={0.6} penumbra={0.5} />
                    
                    <group position={[0.2, 0.1, 0]}>
                      <GlassEnvelope />
                      
                      {/* Floating Orbs bobbing slightly out of sync */}
                      <FloatingOrb position={[1.3, 1.2, -0.6]} size={0.3} speed={1.1} bobHeight={0.1} phase={0} />
                      <FloatingOrb position={[-1.6, 0.9, -0.4]} size={0.2} speed={0.8} bobHeight={0.14} phase={Math.PI / 3} />
                      <FloatingOrb position={[1.8, 0.4, -0.7]} size={0.14} speed={1.4} bobHeight={0.08} phase={Math.PI} />
                      <FloatingOrb position={[0.8, -1.1, -1.0]} size={0.1} speed={0.9} bobHeight={0.07} phase={Math.PI * 1.5} />
                      
                      {/* Shimmering Stars */}
                      <SparklingStar position={[1.7, -0.6, -0.2]} scale={0.55} speed={2.3} phase={0} />
                      <SparklingStar position={[1.3, 0.8, 0.15]} scale={0.35} speed={1.8} phase={Math.PI / 4} />
                      <SparklingStar position={[2.0, -1.0, -0.4]} scale={0.45} speed={2.8} phase={Math.PI / 2} />
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
