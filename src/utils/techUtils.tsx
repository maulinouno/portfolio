
import { DiJavascript1, DiMsqlServer, DiWindows } from 'react-icons/di'
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
    SiThreedotjs,
    SiGit,
    SiDocker,
    SiLinux,
    SiPython,
} from 'react-icons/si'

import { ReactNode } from 'react'

interface TechConfig {
    match: string[] | ((name: string) => boolean)
    icon: ReactNode
    color: string
}



const TECH_STACKS: TechConfig[] = [
    {
        match: ['go', 'golang'],
        icon: <SiGo title="Go" />,
        color: 'bg-blue-900/50 text-blue-300 border-blue-500/30'
    },
    {
        match: ['java'],
        icon: <FaJava title="Java" />,
        color: 'bg-white/10 text-white border-white/30'
    },
    {
        match: ['python'],
        icon: <SiPython title="Python" />,
        color: 'bg-blue-900/50 text-blue-300 border-blue-500/30'
    },
    {
        match: ['javascript'],
        icon: <DiJavascript1 title="JavaScript" />,
        color: 'bg-blue-900/50 text-blue-300 border-blue-500/30'
    },
    {
        match: ['spring boot'],
        icon: <SiSpringboot title="Spring Boot" />,
        color: 'bg-green-900/50 text-green-300 border-green-500/30'
    },
    {
        match: ['kafka'],
        icon: <SiApachekafka title="Kafka" />,
        color: 'bg-blue-900/50 text-blue-300 border-blue-500/30'
    },
    {
        match: ['redis'],
        icon: <SiRedis title="Redis" />,
        color: 'bg-red-900/50 text-red-300 border-red-500/30'
    },
    {
        match: ['postgresql'],
        icon: <SiPostgresql title="PostgreSQL" />,
        color: 'bg-blue-900/50 text-blue-300 border-blue-500/30'
    },
    {
        match: ['mysql'],
        icon: <SiMysql title="MySQL" />,
        color: 'bg-blue-900/50 text-blue-300 border-blue-500/30'
    },
    {
        match: (name) => ['elastic search', 'elasticsearch'].includes(name),
        icon: <SiElasticsearch title="Elasticsearch" />,
        color: 'bg-blue-900/50 text-blue-300 border-blue-500/30' // Choosing a default query color or keeping it generic
    },
    {
        match: (name) => name === 'ef core' || name.includes('.net'),
        icon: <SiDotnet title=".NET / EF Core" />,
        color: 'bg-purple-900/50 text-purple-300 border-purple-500/30'
    },
    {
        match: (name) => name.includes('c#'),
        icon: <SiSharp title="C#" />,
        color: 'bg-green-900/50 text-green-300 border-green-500/30'
    },
    {
        match: (name) => name.includes('php'),
        icon: <SiPhp title="PHP" />,
        color: 'bg-indigo-900/50 text-indigo-300 border-indigo-500/30'
    },
    {
        match: ['laravel'],
        icon: <SiLaravel title="Laravel" />,
        color: 'bg-red-900/50 text-red-300 border-red-500/30'
    },
    {
        match: ['sentry'],
        icon: <SiSentry title="Sentry" />,
        color: 'bg-pink-900/50 text-pink-300 border-pink-500/30'
    },
    {
        match: (name) => name === 'vite' || name === 'vite.js',
        icon: <SiVite title="Vite" />,
        color: 'bg-purple-900/50 text-purple-300 border-purple-500/30'
    },
    {
        match: (name) => name === 'next.js' || name === 'nextjs',
        icon: <SiNextdotjs title="Next.js" />,
        color: 'bg-black/50 text-white border-white/30'
    },
    {
        match: (name) => name === 'react' || name === 'react.js',
        icon: <SiReact title="React" />,
        color: 'bg-cyan-900/50 text-cyan-300 border-cyan-500/30'
    },
    {
        match: (name) => ['three.js', 'threejs', 'three'].includes(name),
        icon: <SiThreedotjs title="Three.js" />,
        color: 'bg-white/10 text-white border-white/30'
    },
    {
        match: ['sql server'],
        icon: <DiMsqlServer title="SQL Server" />,
        color: 'bg-red-900/50 text-red-300 border-red-500/30'
    },
    {
        match: ['quest db', 'questdb'],
        icon: <span title="QuestDB" className="font-bold text-xs">Q</span>,
        color: 'bg-purple-900/50 text-purple-300 border-purple-500/30'
    },
    {
        match: ['git'],
        icon: <SiGit title="Git" />,
        color: 'bg-orange-900/50 text-orange-300 border-orange-500/30'
    },
    {
        match: ['docker'],
        icon: <SiDocker title="Docker" />,
        color: 'bg-blue-900/50 text-blue-300 border-blue-500/30'
    },
    {
        match: (name) => name.includes('linux') || name.includes('ubuntu'),
        icon: <SiLinux title="Linux" />,
        color: 'bg-yellow-900/50 text-yellow-300 border-yellow-500/30'
    },
    {
        match: ['windows'],
        icon: <DiWindows title="Windows" />,
        color: 'bg-blue-900/50 text-blue-300 border-blue-500/30'
    }
]

const FALLBACK_COLORS = [
    'bg-blue-900/50 text-blue-300 border-blue-500/30',
    'bg-purple-900/50 text-purple-300 border-purple-500/30',
    'bg-green-900/50 text-green-300 border-green-500/30',
    'bg-red-900/50 text-red-300 border-red-500/30',
    'bg-indigo-900/50 text-indigo-300 border-indigo-500/30',
    'bg-yellow-900/50 text-yellow-300 border-yellow-500/30',
    'bg-pink-900/50 text-pink-300 border-pink-500/30',
    'bg-cyan-900/50 text-cyan-300 border-cyan-500/30',
    'bg-teal-900/50 text-teal-300 border-teal-500/30',
]

const getRandomColor = (name: string) => {
    let hash = 0
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    const index = Math.abs(hash) % FALLBACK_COLORS.length
    return FALLBACK_COLORS[index]
}

const findTech = (name: string) => {
    const lower = name.toLowerCase()
    return TECH_STACKS.find(tech => {
        if (Array.isArray(tech.match)) {
            return tech.match.includes(lower)
        }
        return tech.match(lower)
    })
}

export const getTechIcon = (name: string) => {
    const tech = findTech(name)
    if (tech) return tech.icon
    return null
}

export const getTagColor = (name: string) => {
    const tech = findTech(name)
    if (tech) return tech.color
    return getRandomColor(name)
}
