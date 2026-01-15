import { motion, AnimatePresence } from 'framer-motion'
import profile from '../data/profile.json'
import experiences from '../data/experiences.json'
import contact from '../data/contact.json'
import { DiMsqlServer } from 'react-icons/di'
import { FaJava } from 'react-icons/fa'
import {
    SiGo,
    SiSpringboot,
    SiApachekafka,
    SiRedis,
    SiPostgresql,
    SiMysql,
    SiElasticsearch,
    SiDotnet,
    SiSharp,
    SiPhp,
    SiLaravel,
    SiSentry,
    SiVite,
    SiNextdotjs,
    SiReact,
    SiThreedotjs
} from 'react-icons/si'

const getTechIcon = (name: string) => {
    const lower = name.toLowerCase()

    if (lower === 'go' || lower === 'golang') return <SiGo title="Go" />
    if (lower === 'java') return <FaJava title="Java" />
    if (lower === 'spring boot') return <SiSpringboot title="Spring Boot" />
    if (lower === 'kafka') return <SiApachekafka title="Kafka" />
    if (lower === 'redis') return <SiRedis title="Redis" />
    if (lower === 'psql' || lower === 'postgresql' || lower === 'postgres') return <SiPostgresql title="PostgreSQL" />
    if (lower === 'mysql') return <SiMysql title="MySQL" />
    if (lower === 'elastic search' || lower === 'elasticsearch') return <SiElasticsearch title="Elasticsearch" />
    if (lower === 'ef core' || lower.includes('.net')) return <SiDotnet title=".NET / EF Core" />
    if (lower.includes('c#')) return <SiSharp title="C#" />
    if (lower === 'php') return <SiPhp title="PHP" />
    if (lower === 'laravel') return <SiLaravel title="Laravel" />
    if (lower === 'sentry') return <SiSentry title="Sentry" />
    if (lower === 'vite' || lower === 'vite.js') return <SiVite title="Vite" />
    if (lower === 'next.js' || lower === 'nextjs') return <SiNextdotjs title="Next.js" />
    if (lower === 'react' || lower === 'react.js') return <SiReact title="React" />
    if (lower === 'three.js' || lower === 'threejs' || lower === 'three') return <SiThreedotjs title="Three.js" />
    if (lower === 'sql server') return <DiMsqlServer title="SQL Server" />
    if (lower === 'quest db' || lower === 'questdb') return <span title="QuestDB" className="font-bold text-xs">QuestDB</span>

    return <span className="text-[10px]">{name}</span>
}

const getTagColor = (name: string) => {
    const lower = name.toLowerCase()
    if (lower === 'go' || lower === 'golang') return 'bg-blue-900/50 text-blue-300 border-blue-500/30'
    if (lower === 'java') return 'bg-white/10 text-white border-white/30'
    if (lower === 'spring boot') return 'bg-green-900/50 text-green-300 border-green-500/30'
    if (lower === 'kafka') return 'bg-blue-900/50 text-blue-300 border-blue-500/30'
    if (lower === 'redis') return 'bg-red-900/50 text-red-300 border-red-500/30'
    if (lower.includes('postgre') || lower.includes('sql') || lower === 'psql') return 'bg-blue-900/50 text-blue-300 border-blue-500/30'
    if (lower === 'questdb' || lower === 'quest db') return 'bg-purple-900/50 text-purple-300 border-purple-500/30'
    if (lower.includes('microservices')) return 'bg-purple-900/50 text-purple-300 border-purple-500/30'
    if (lower === 'php') return 'bg-indigo-900/50 text-indigo-300 border-indigo-500/30'
    if (lower === 'laravel') return 'bg-red-900/50 text-red-300 border-red-500/30'
    if (lower.includes('c#')) return 'bg-green-900/50 text-green-300 border-green-500/30'
    if (lower.includes('ef core') || lower.includes('.net')) return 'bg-purple-900/50 text-purple-300 border-purple-500/30'
    if (lower === 'sentry') return 'bg-pink-900/50 text-pink-300 border-pink-500/30'
    if (lower.includes('vite')) return 'bg-purple-900/50 text-purple-300 border-purple-500/30'
    if (lower.includes('next')) return 'bg-black/50 text-white border-white/30'
    if (lower.includes('react')) return 'bg-cyan-900/50 text-cyan-300 border-cyan-500/30'
    if (lower.includes('three')) return 'bg-white/10 text-white border-white/30'

    return 'bg-white/5 text-gray-300 border-white/10'
}


interface OverlayProps {
    section: number;
    onSectionChange: (section: number) => void;
}

export const Overlay = ({ section, onSectionChange }: OverlayProps) => {
    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-between overflow-hidden">
            {/* Navbar */}
            <header className="px-8 py-6 flex justify-between items-center pointer-events-auto w-full z-10">
                <div>
                    <h1 className="text-2xl font-bold tracking-tighter text-white">ACHMAD.DEV</h1>
                    <p className="text-xs text-gray-400 tracking-widest">{profile.role.toUpperCase()}</p>
                </div>
            </header>

            {/* Content Sections */}
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
                                <div className="flex flex-wrap gap-2 text-xs font-mono pt-2">
                                    {profile.tags.map(tag => (
                                        <span key={tag} className={`px-2 py-1 rounded border flex items-center gap-1.5 ${getTagColor(tag)}`}>
                                            {getTechIcon(tag)}
                                            <span>{tag}</span>
                                        </span>
                                    ))}
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
                            {/* Header Fixed at Top - Reduced Padding */}
                            <div className="w-full bg-[#171720]/90 backdrop-blur-md border-b border-white/10 pointer-events-auto py-2">
                                <div className="container mx-auto px-4 md:px-10">
                                    <h2 className="text-3xl font-bold text-white">
                                        Professional Experience
                                    </h2>
                                </div>
                            </div>

                            {/* Horizontal Scroll Container - h-fit to allow clicks below */}
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
                                                        <div key={i} className="bg-white/5 p-3 rounded-lg border border-white/10">
                                                            {proj.tags ? (
                                                                <div className="flex justify-between items-center mb-1">
                                                                    <strong className="text-white text-sm">{proj.title}</strong>
                                                                    <div className="flex gap-2 flex-wrap justify-end max-w-[50%]">
                                                                        {proj.tags.map((t: string, idx: number) => (
                                                                            <div key={idx} className={`p-1.5 rounded-md border flex items-center justify-center hover:scale-105 transition-all ${getTagColor(t)}`} title={t}>
                                                                                {getTechIcon(t)}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <strong className="text-white block text-sm">{proj.title}</strong>
                                                            )}
                                                            <p className="text-xs text-gray-400 mt-1">{proj.tech}</p>
                                                        </div>
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

            <footer className="p-8 text-center text-gray-500 text-xs relative z-10 pointer-events-none">
                © 2026 {profile.name}. Built with fullstack passion.
            </footer>
        </div>
    )
}
