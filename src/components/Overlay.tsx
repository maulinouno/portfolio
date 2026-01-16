import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import profile from '../data/profile.json'
import experiences from '../data/experiences.json'
import contact from '../data/contact.json'
import { getTechIcon, getTagColor } from '../utils/techUtils'
import { ProjectCard } from './ProjectCard'
import { ProjectDetailModal } from './ProjectDetailModal'




interface OverlayProps {
    section: number;
    onSectionChange: (section: number) => void;
}

export const Overlay = ({ section, onSectionChange }: OverlayProps) => {
    const [selectedProject, setSelectedProject] = useState<any>(null)
    const [activeTab, setActiveTab] = useState(0)

    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-between overflow-hidden">
            <header className="px-8 py-6 flex justify-between items-center pointer-events-auto w-full z-10">
                <div className="flex items-center gap-3">
                    <img src="/favicon.png" alt="Ln Icon" className="w-8 h-8 object-contain" />
                    <div>
                        <h1 className="text-2xl font-bold tracking-tighter text-white leading-none">Lanavi</h1>
                        <p className="text-[10px] text-gray-400 tracking-widest leading-none">{profile.role.toUpperCase()}</p>
                    </div>
                </div>
            </header>

            <main className="flex-1 w-full relative">
                <AnimatePresence mode="wait">
                    {section === 0 && (
                        <motion.div
                            key="home"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="absolute top-[15%] left-[5%] md:left-[10%] max-w-2xl pointer-events-auto pr-8"
                        >
                            <h2 className="text-7xl font-extrabold text-white mb-6 leading-none tracking-tighter">
                                Achmad <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Maulana</span>
                            </h2>
                            <div className="space-y-6 text-gray-300 text-lg leading-relaxed backdrop-blur-sm bg-black/20 p-6 rounded-2xl border border-white/5">
                                <p>
                                    <strong className="text-white">{profile.role}</strong> {profile.description.replace('Lead Software Engineer', '').trim()}
                                </p>
                                <p className="text-base text-gray-400">
                                    {profile.subDescription}
                                </p>
                                <div className="pt-4">
                                    <div className="flex gap-2 overflow-x-auto pb-2 mb-2 custom-scrollbar mask-gradient-right">
                                        {profile.skillGroups.map((group, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setActiveTab(idx)}
                                                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${activeTab === idx
                                                        ? 'bg-white text-black border-white'
                                                        : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                                                    }`}
                                            >
                                                {group.category}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="min-h-[120px]">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={activeTab}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex flex-wrap gap-2 text-xs font-mono"
                                            >
                                                {profile.skillGroups[activeTab].items.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className={`px-3 py-1.5 rounded-md border flex items-center gap-2 transition-all hover:scale-105 bg-opacity-20 ${getTagColor(tag)}`}
                                                    >
                                                        <span className="text-sm">{getTechIcon(tag)}</span>
                                                        <span>{tag}</span>
                                                    </span>
                                                ))}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 flex gap-4">
                                <button
                                    onClick={() => onSectionChange(1)}
                                    className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-cyan-50 transition-all hover:scale-105 active:scale-95"
                                >
                                    View Experience
                                </button>
                                <button
                                    onClick={() => onSectionChange(2)}
                                    className="bg-transparent border border-white/30 text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-all"
                                >
                                    Contact
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {section === 1 && (
                        <motion.div
                            key="works"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="absolute inset-0 pointer-events-none z-20 flex flex-col items-start"
                        >
                            <div className="w-full bg-[#171720]/90 backdrop-blur-md border-b border-white/10 pointer-events-auto py-2">
                                <div className="container mx-auto px-4 md:px-10">
                                    <h2 className="text-3xl font-bold text-white">
                                        Professional Experience
                                    </h2>
                                </div>
                            </div>

                            <div className="w-full h-fit overflow-x-auto pointer-events-auto items-start p-4 md:p-10 snap-x snap-mandatory">
                                <div className="flex gap-8 min-w-max">
                                    {experiences.map((exp: any) => (
                                        <div key={exp.id} className="w-[400px] md:w-[500px] h-fit max-h-[25vh] md:max-h-[30vh] overflow-y-auto custom-scrollbar pr-2 bg-[#1a1a24]/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shrink-0 snap-center">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <div className={`text-${exp.color}-400 text-sm font-mono mb-1`}>{exp.date}</div>
                                                    <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                                                    <h4 className="text-lg text-gray-400">{exp.company}</h4>
                                                </div>
                                                <div className={`w-3 h-3 rounded-full bg-${exp.color}-500 ${exp.color === 'cyan' ? 'shadow-[0_0_10px_rgba(6,182,212,0.8)]' : ''}`} />
                                            </div>

                                            {exp.description && (
                                                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                                                    {exp.description}
                                                </p>
                                            )}

                                            {exp.bullets && (
                                                <ul className={`list-disc list-inside text-gray-400 text-sm space-y-1 marker:text-${exp.color}-500`}>
                                                    {exp.bullets.map((bullet: string, i: number) => (
                                                        <li key={i} dangerouslySetInnerHTML={{ __html: bullet.replace('3D Room App', '<span class="text-white">3D Room App</span>') }} />
                                                    ))}
                                                </ul>
                                            )}

                                            {exp.projects && (
                                                <div className={`${exp.company.includes('Tetamba') ? "grid grid-cols-1 gap-3" : "space-y-3"} mt-4`}>
                                                    {exp.projects.map((proj: any, i: number) => (
                                                        <ProjectCard
                                                            key={i}
                                                            project={proj}
                                                            onClick={setSelectedProject}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {section === 2 && (
                        <motion.div
                            key="contact"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                            className="absolute top-1/2 left-[5%] md:left-[10%] -translate-y-1/2 pointer-events-auto"
                        >
                            <div className="bg-[#1a1a24] p-10 rounded-2xl shadow-2xl border border-white/10 text-center max-w-md w-full">
                                <h2 className="text-3xl font-bold text-white mb-2">Get in Touch</h2>
                                <p className="text-gray-400 mb-8">Ready to build scalable systems?</p>

                                <div className="space-y-6 text-left">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-cyan-900/50 flex items-center justify-center text-cyan-400">🔗</div>
                                        <div>
                                            <div className="text-gray-400 text-xs uppercase tracking-wider">{contact.linkedin.label}</div>
                                            <a href={contact.linkedin.url} target="_blank" rel="noreferrer" className="text-white hover:text-cyan-400 transition-colors">
                                                {contact.linkedin.value}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400">📧</div>
                                        <div>
                                            <div className="text-gray-400 text-xs uppercase tracking-wider">{contact.email.label}</div>
                                            <div className="text-white">{contact.email.value}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center text-purple-400">📞</div>
                                        <div>
                                            <div className="text-gray-400 text-xs uppercase tracking-wider">{contact.phone.label}</div>
                                            <div className="text-white">{contact.phone.value}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
                )}
            </AnimatePresence>

            <footer className="p-8 text-center text-gray-500 text-xs relative z-10 pointer-events-none">
                © 2026 {profile.name}.
            </footer>
        </div>
    )
}


