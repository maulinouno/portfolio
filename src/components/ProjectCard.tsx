import { getTechIcon, getTagColor } from '../utils/techUtils'

interface ProjectCardProps {
    project: any;
    onClick: (project: any) => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
    const visibleTags = project.tags ? project.tags.slice(0, 3) : [];
    const remainingTags = project.tags ? project.tags.length - 3 : 0;

    return (
        <div
            className="bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all cursor-pointer hover:border-white/30 active:scale-95 group"
            onClick={() => onClick(project)}
        >
            {project.tags ? (
                <div className="flex justify-between items-center mb-1">
                    <strong className="text-white text-sm truncate pr-2 flex-1">{project.title}</strong>
                    <div className="flex gap-1 flex-wrap justify-end shrink-0">
                        {visibleTags.map((t: string, idx: number) => (
                            <div key={idx} className={`p-1 w-6 h-6 rounded-md border flex items-center justify-center ${getTagColor(t)}`} title={t}>
                                {getTechIcon(t)}
                            </div>
                        ))}
                        {remainingTags > 0 && (
                            <div className="px-1.5 h-6 rounded-md border border-white/10 bg-white/5 text-[10px] text-white flex items-center justify-center">
                                +{remainingTags}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <strong className="text-white block text-sm">{project.title}</strong>
            )}
            <p className="text-xs text-gray-400 mt-1 line-clamp-2 group-hover:text-gray-300 transition-colors">
                {project.description}
            </p>
        </div>
    )
}
