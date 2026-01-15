import { useFrame } from '@react-three/fiber'
import { useRef, useMemo, useState, useEffect } from 'react'
import { useGLTF, Outlines } from '@react-three/drei'
import * as THREE from 'three'

function createGradientTexture(c1: string, c2: string) {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    const gradient = context.createLinearGradient(0, 0, 0, 64)
    gradient.addColorStop(0, c1)
    gradient.addColorStop(1, c2)
    context.fillStyle = gradient
    context.fillRect(0, 0, 64, 64)
    const texture = new THREE.CanvasTexture(canvas)
    return texture
}


interface RoomProps {
    section: number;
    onSectionChange: (section: number) => void;
}


export const Room = ({ section, onSectionChange }: RoomProps) => {
    const { scene: floorScene } = useGLTF('/assets/floor.glb')
    const { scene: tableScene } = useGLTF('/assets/table.glb')

    // Memoize materials to prevent recreating them on every render
    const floorMaterial = useMemo(() => {
        let mat: THREE.Material | undefined;
        floorScene.traverse((child) => {
            if (!mat && (child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                if (Array.isArray(mesh.material)) {
                    mat = mesh.material[0];
                } else {
                    mat = mesh.material;
                }
            }
        });

        if (mat) {
            const clonedMat = mat.clone() as THREE.MeshStandardMaterial;
            if (clonedMat.map) {
                clonedMat.map = clonedMat.map.clone();
                clonedMat.map.wrapS = THREE.RepeatWrapping;
                clonedMat.map.wrapT = THREE.RepeatWrapping;
                clonedMat.map.repeat.set(5, 5);
                clonedMat.map.needsUpdate = true;
            }
            return clonedMat;
        }
        return new THREE.MeshStandardMaterial({ color: '#666666', side: THREE.DoubleSide });
    }, [floorScene]);

    const soilMaterial = useMemo(() => {
        return new THREE.MeshStandardMaterial({
            color: '#5d4037',
            roughness: 0.9,
            side: THREE.DoubleSide
        });
    }, []);

    const corners = useMemo(() => [
        { x: -2.5, z: -2.5 },
        { x: 2.5, z: -2.5 },
        { x: 2.5, z: 2.5 },
        { x: -2.5, z: 2.5 }
    ], [])

    const geometry = useMemo(() => {
        const shape = new THREE.Shape();
        if (corners.length === 0) return new THREE.BufferGeometry();

        shape.moveTo(corners[0].x, -corners[0].z);
        for (let i = 1; i < corners.length; i++) {
            shape.lineTo(corners[i].x, -corners[i].z);
        }
        shape.closePath();

        const geo = new THREE.ExtrudeGeometry(shape, {
            depth: 0.05,
            bevelEnabled: false,
        });

        const posAttribute = geo.attributes.position;
        const uvAttribute = geo.attributes.uv;
        const scale = 1;

        for (let i = 0; i < posAttribute.count; i++) {
            const x = posAttribute.getX(i);
            const y = posAttribute.getY(i);
            uvAttribute.setXY(i, x * scale, y * scale);
        }
        return geo;
    }, [corners]);



    return (
        <group>
            <mesh
                rotation={[Math.PI / 2, 0, 0]}
                receiveShadow
                position={[0, -0.05, 0]}
                geometry={geometry}
                material={[floorMaterial, soilMaterial]}
            />

            <primitive object={tableScene} position={[0, 0, 0]} scale={[1.5, 1.5, 1.5]} />

            <group position={[0, 1.0, 0]}>
                <RevolvingIcons section={section} onSectionChange={onSectionChange} />
            </group>
        </group>
    )
}

const iconData = [
    {
        id: 0,
        path: '/assets/profile.glb',
        colors: ['#67e8f9', '#06b6d4']
    },
    {
        id: 1,
        path: '/assets/briefcase.glb',
        colors: ['#60a5fa', '#2563eb']
    },
    {
        id: 2,
        path: '/assets/phone.glb',
        colors: ['#a855f7', '#9333ea']
    },
]

const RevolvingIcons = ({ section, onSectionChange }: { section: number, onSectionChange: (s: number) => void }) => {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((_state, delta) => {
        if (!groupRef.current) return
        groupRef.current.rotation.y += delta * 0.5
    })

    return (
        <group ref={groupRef}>
            {iconData.map((item, index) => {
                const angle = (index / iconData.length) * Math.PI * 2
                const radius = 0.2
                const x = Math.sin(angle) * radius
                const z = Math.cos(angle) * radius

                return (
                    <group key={item.id} position={[x, 0, z]} rotation={[0, angle, 0]}>
                        <ModelIcon
                            path={item.path}
                            colors={item.colors}
                            isActive={section === item.id}
                            onClick={() => onSectionChange(item.id)}
                        />
                    </group>
                )
            })}
        </group>
    )
}

const ModelIcon = ({ path, colors, isActive, onClick }: { path: string, colors: string[], isActive?: boolean, onClick: () => void }) => {
    const { nodes } = useGLTF(path)
    const texture = useMemo(() => createGradientTexture(colors[0], colors[1]), [colors])

    // Memoize emissive color to prevent object churn
    const emissiveColor = useMemo(() => new THREE.Color(colors[1]), [colors])

    const [hovered, setHover] = useState(false)

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
        return () => { document.body.style.cursor = 'auto' }
    }, [hovered])

    return (
        <group
            onClick={onClick}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            scale={isActive ? 0.25 : (hovered ? 0.22 : 0.2)}
        >
            {Object.entries(nodes).map(([name, node]) => {
                if (!(node as THREE.Mesh).isMesh) return null;
                const mesh = node as THREE.Mesh;
                return (
                    <mesh
                        key={name}
                        geometry={mesh.geometry}
                        position={mesh.position}
                        rotation={mesh.rotation}
                        scale={mesh.scale}
                    >
                        <meshStandardMaterial
                            map={texture}
                            color="#ffffff"
                            roughness={0.5}
                            metalness={0.5}
                            emissive={emissiveColor}
                            emissiveIntensity={isActive ? 0.3 : 0}
                        />
                        {isActive && <Outlines thickness={0.05} color="white" />}
                    </mesh>
                )
            })}
        </group>
    )
}

useGLTF.preload('/assets/floor.glb')
useGLTF.preload('/assets/table.glb')
useGLTF.preload('/assets/profile.glb')
useGLTF.preload('/assets/briefcase.glb')
useGLTF.preload('/assets/phone.glb')
