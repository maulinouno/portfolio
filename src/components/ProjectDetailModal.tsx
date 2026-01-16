import { motion } from 'framer-motion'
import { getTechIcon, getTagColor } from '../utils/techUtils'

interface ProjectDetailModalProps {
    project: any;
    onClose: () => void;
}

export const ProjectDetailModal = ({ project, onClose }: ProjectDetailModalProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#1a1a24] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 shadow-2xl flex flex-col pointer-events-auto"
            >
                <div className="relative h-64 sm:h-80 w-full shrink-0">
                    <img
                        src={project.image || "https://placehold.co/600x400/1e1e2e/ffffff?text=No+Image"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a24] via-transparent to-transparent" />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-white/20 text-white flex items-center justify-center transition-all backdrop-blur-sm"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-8 -mt-20 relative">
                    <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-2">{project.title}</h2>
                            <div className="flex gap-2 flex-wrap text-sm">
                                {project.tags.map((tag: string) => (
                                    <span key={tag} className={`px-2 py-1 rounded border flex items-center gap-1.5 ${getTagColor(tag)}`}>
                                        {getTechIcon(tag)}
                                        <span>{tag}</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white text-sm"
                                >
                                    GitHub
                                </a>
                            )}
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20 transition-all text-sm font-bold"
                                >
                                    Visit Site ↗
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6 text-gray-300 leading-relaxed">
                        <p className="text-lg">
                            {project.description || "No description available."}
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}
