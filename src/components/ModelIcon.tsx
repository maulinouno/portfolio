import { useState, useMemo, useEffect } from 'react'
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

export const ModelIcon = ({ path, colors, isActive, onClick }: { path: string, colors: string[], isActive?: boolean, onClick: () => void }) => {
    const { nodes } = useGLTF(path)
    const texture = useMemo(() => createGradientTexture(colors[0], colors[1]), [colors])

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

useGLTF.preload('/assets/profile.glb')
useGLTF.preload('/assets/briefcase.glb')
useGLTF.preload('/assets/phone.glb')
