import { OrbitControls } from '@react-three/drei'
import { Room } from './Room'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface ExperienceProps {
    section: number;
    onSectionChange: (section: number) => void;
}

export const Experience = ({ section, onSectionChange }: ExperienceProps) => {
    return (
        <>
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={1} castShadow />
            <OrbitControls makeDefault enableZoom={true} enablePan={true} />
            <CameraHandler section={section} />
            <group position-y={-1}>
                <Room section={section} onSectionChange={onSectionChange} />
            </group>
        </>
    )
}

const CameraHandler = ({ section }: { section: number }) => {
    const { camera, controls } = useThree()

    useFrame((_state, delta) => {
        const targetPos = new THREE.Vector3()
        const targetLookAt = new THREE.Vector3()

        if (section === 0) {
            targetPos.set(2.5, 2, 5)
            targetLookAt.set(0, 0, 0)
        } else if (section === 1) {
            targetPos.set(0, 1.5, 4)
            targetLookAt.set(0, 0.5, 0)
        } else {
            targetPos.set(0, 1.5, 4)
            targetLookAt.set(0, 0.5, 0)
        }

        camera.position.lerp(targetPos, delta * 2)

        if (controls) {
            // @ts-ignore
            controls.target.lerp(targetLookAt, delta * 2)
            // @ts-ignore
            controls.update()
        }
    })
    return null
}
