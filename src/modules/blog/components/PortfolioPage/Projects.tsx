import ProjectCard, { ProjectCardItem } from "./ProjectCard";

const Projects = () => {

    const projectItems : ProjectCardItem[] = [
        {
            repositoryName: 'gvatar-workflow', 
            repositoryUrl: 'https://github.com/hqjb91/gvatar-workflow',
            privacy: 'Public',
            description: 'Simple workflow engine as a .NET Class Library.', 
            languageUsed: 'C#'
        },
        {
            repositoryName: 'netcore-webapi-starter-template', 
            repositoryUrl: 'https://github.com/hqjb91/netcore-webapi-starter-template',
            privacy: 'Public',
            description: 'This repository is my personal starter template for Net Core 8 Web API projects.', 
            languageUsed: 'C#'
        },
        {
            repositoryName: 'd3jspsychrometricchart', 
            repositoryUrl: 'https://github.com/hqjb91/d3jspsychrometricchart',
            privacy: 'Public',
            description: 'Dynamic Interactive Psychrometric Chart using D3.JS.', 
            languageUsed: 'Javascript'
        },
    ];

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 text-slate-800">
            {
                projectItems.map((item, index) => 
                    <ProjectCard 
                        repositoryName={item.repositoryName} 
                        repositoryUrl={item.repositoryUrl}
                        privacy={item.privacy}
                        description={item.description} 
                        languageUsed={item.languageUsed} 
                        key={index} 
                    />
                )
            }
            </div>
        </>
    )
}

export default Projects;