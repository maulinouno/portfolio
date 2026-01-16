import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { RevolvingIcons } from './RevolvingIcons'

interface RoomProps {
    section: number;
    onSectionChange: (section: number) => void;
}


export const Room = ({ section, onSectionChange }: RoomProps) => {
    const { scene: floorScene } = useGLTF('/assets/floor.glb')
    const { scene: tableScene } = useGLTF('/assets/table.glb')

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

useGLTF.preload('/assets/floor.glb')
useGLTF.preload('/assets/table.glb')
