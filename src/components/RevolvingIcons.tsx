import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ModelIcon } from './ModelIcon'

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

export const RevolvingIcons = ({ section, onSectionChange }: { section: number, onSectionChange: (s: number) => void }) => {
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
