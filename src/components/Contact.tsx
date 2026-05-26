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
    const targetScale = hovered ? 1.12 : 1.0;
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
        <boxGeometry args={[2.2, 1.4, 0.08]} />
        <meshPhysicalMaterial 
          transmission={0.8} 
          roughness={0.15} 
          thickness={0.5} 
          ior={1.3} 
          color="#ffffff" 
          clearcoat={0.9} 
          clearcoatRoughness={0.1}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* 2. Inner Letter (Golden sand-colored card/paper sheet) */}
      <mesh position={[0, 0.02, 0.01]}>
        <boxGeometry args={[2.0, 1.2, 0.015]} />
        <meshStandardMaterial 
          color="#f4cda8" // Elegant soft gold tone
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* 3. Chrome Outlines (Silver metallic borders) */}
      {/* Left border */}
      <mesh position={[-1.1, 0, 0]}>
        <boxGeometry args={[0.02, 1.4, 0.09]} />
        <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.2} />
      </mesh>
      {/* Right border */}
      <mesh position={[1.1, 0, 0]}>
        <boxGeometry args={[0.02, 1.4, 0.09]} />
        <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.2} />
      </mesh>
      {/* Top border */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[2.22, 0.02, 0.09]} />
        <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.2} />
      </mesh>
      {/* Bottom border */}
      <mesh position={[0, -0.7, 0]}>
        <boxGeometry args={[2.22, 0.02, 0.09]} />
        <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.2} />
      </mesh>

      {/* 4. Fold lines (V-flaps in metallic chrome) */}
      {/* Top Left-to-Center */}
      <group position={[-0.55, 0.3, 0.05]} rotation={[0, 0, -0.63]}>
        <mesh>
          <boxGeometry args={[1.37, 0.02, 0.02]} />
          <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.2} />
        </mesh>
      </group>
      {/* Top Right-to-Center */}
      <group position={[0.55, 0.3, 0.05]} rotation={[0, 0, 0.63]}>
        <mesh>
          <boxGeometry args={[1.37, 0.02, 0.02]} />
          <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.2} />
        </mesh>
      </group>

      {/* Bottom Left-to-Center */}
      <group position={[-0.55, -0.375, 0.05]} rotation={[0, 0, 0.48]}>
        <mesh>
          <boxGeometry args={[1.25, 0.02, 0.02]} />
          <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.2} />
        </mesh>
      </group>
      {/* Bottom Right-to-Center */}
      <group position={[0.55, -0.375, 0.05]} rotation={[0, 0, -0.48]}>
        <mesh>
          <boxGeometry args={[1.25, 0.02, 0.02]} />
          <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.2} />
        </mesh>
      </group>

      {/* Connection Seal Disk at center */}
      <mesh position={[0, -0.08, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.015, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.2} />
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
        transmission={0.8}
        roughness={0.1}
        thickness={size * 1.2}
        ior={1.3}
        color="#fef08a" // warm orange/yellow tint inside orbs
        clearcoat={0.9}
        clearcoatRoughness={0.1}
        transparent
        opacity={0.4}
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
      <div className="container">
        <div className="contact-grid">
          
          {/* Left panel: Form and Header */}
          <div className="contact-content-col">
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
                      placeholder="Name" 
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
                      placeholder="Email" 
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
                      placeholder="Phone" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="contact-capsule-input"
                    />
                  </div>
                  
                  <div className="form-input-capsule-wrapper">
                    <input 
                      type="text" 
                      name="message" 
                      placeholder="Project details..." 
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
                        <option value="software">Software</option>
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
                        <option value="5-10k">5-10k</option>
                        <option value="10-25k">10-25k</option>
                        <option value="25k+">25k+</option>
                      </select>
                    </div>
                    
                    <button type="submit" className="contact-submit-btn">
                      Send
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
          
          {/* Right panel: 3D Canvas */}
          <div className="contact-canvas-col">
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
                    
                    <group position={[0, 0.05, 0]}>
                      <GlassEnvelope />
                      
                      {/* Floating Orbs bobbing slightly out of sync */}
                      <FloatingOrb position={[1.2, 0.9, -0.5]} size={0.24} speed={1.1} bobHeight={0.08} phase={0} />
                      <FloatingOrb position={[-1.2, 0.7, -0.3]} size={0.16} speed={0.8} bobHeight={0.1} phase={Math.PI / 3} />
                      <FloatingOrb position={[1.4, 0.3, -0.6]} size={0.12} speed={1.4} bobHeight={0.06} phase={Math.PI} />
                      <FloatingOrb position={[0.6, -0.8, -0.7]} size={0.08} speed={0.9} bobHeight={0.05} phase={Math.PI * 1.5} />
                      
                      {/* Shimmering Stars */}
                      <SparklingStar position={[1.3, -0.5, -0.1]} scale={0.4} speed={2.3} phase={0} />
                      <SparklingStar position={[1.0, 0.6, 0.1]} scale={0.28} speed={1.8} phase={Math.PI / 4} />
                      <SparklingStar position={[1.6, -0.8, -0.3]} scale={0.35} speed={2.8} phase={Math.PI / 2} />
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
