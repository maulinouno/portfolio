import { useProgress } from '@react-three/drei'

export const Loader = () => {
    const { progress, active } = useProgress()
    return (
        <div className={`absolute top-0 left-0 w-full h-full flex justify-center items-center bg-[#171720] z-50 transition-opacity duration-500 pointer-events-none ${active ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-white text-2xl font-bold flex flex-col items-center gap-4">
                <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-500 transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div>
                    {progress.toFixed(0)}%
                </div>
            </div>
        </div>
    )
}
