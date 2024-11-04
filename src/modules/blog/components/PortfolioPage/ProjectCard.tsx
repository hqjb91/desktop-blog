import Link from "next/link"

export type ProjectCardItem = {
    repositoryName: string;
    repositoryUrl: string;
    privacy: string;
    description: string; 
    languageUsed: string;
};

const ProjectCard = ({repositoryName, repositoryUrl, privacy, description, languageUsed} : ProjectCardItem) => {
    return (
        <>
        <div className="max-w-[26rem] whitespace-normal break-words border-2 rounded-2xl p-4 font-sans text-sm font-normal text-blue-gray-500 shadow-lg">
            <div className="mb-2 flex items-center gap-3">
                <Link
                    href={repositoryUrl}
                    className="block font-sans text-base font-medium leading-relaxed tracking-normal text-blue-gray-900  antialiased transition-colors hover:text-pink-500"
                >
                {repositoryName}
                </Link>
                <div className="center relative inline-block select-none whitespace-nowrap rounded-full bg-purple-500 py-1 px-2 align-baseline font-sans text-xs font-medium capitalize leading-none tracking-wide text-white">
                <div className="mt-px">{privacy}</div>
                </div>
            </div>
            <p className="block font-sans text-sm font-normal leading-normal text-gray-700 dark:text-slate-500 antialiased">
                {description}
            </p>
            <div className="mt-4 flex items-center gap-5">
                <div className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-full bg-blue-400"></span>
                <p className="block font-sans text-xs font-normal text-gray-700  antialiased">
                    {languageUsed}
                </p>
                </div>
            </div>
        </div>
        </>
    )
}

export default ProjectCard;