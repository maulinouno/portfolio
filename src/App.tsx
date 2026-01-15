import { Canvas } from '@react-three/fiber'
import { Experience } from './components/Experience'
import { Overlay } from './components/Overlay'
import { useState } from 'react'
import './index.css'

function App() {
    const [section, setSection] = useState(0)

    return (
        <>
            <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ position: [2.5, 2, 5], fov: 35 }}
            >
                <color attach="background" args={['#171720']} />
                <Experience section={section} onSectionChange={setSection} />
            </Canvas>
            <Overlay section={section} onSectionChange={setSection} />
        </>
    )
}

export default App
