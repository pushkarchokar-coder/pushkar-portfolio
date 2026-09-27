import { FiArrowRight, FiArrowUpRight, FiGitBranch, FiStar } from 'react-icons/fi'

export function ProjectItem({ project, index }) {
  return <article className="project-row glass-hover">
    <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
    {project.image && <img className="project-preview" src={project.image} alt={`${project.title} preview`} loading="lazy" />}
    <div className="project-copy"><h3>{project.title}</h3><p>{project.description || 'A public repository by Pushkar Chokar.'}</p>
      <div className="tag-row">{project.technologies?.map(tag => <span key={tag}>{tag}</span>)}</div>
    </div>
    <div className="project-facts"><span><FiStar aria-hidden="true" />{project.stars ?? 0}</span><span><FiGitBranch aria-hidden="true" />{project.forks ?? 0}</span></div>
    <div className="project-actions"><a href={project.githubUrl} target="_blank" rel="noreferrer">GitHub <FiArrowUpRight aria-hidden="true" /></a>{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Live demo <FiArrowRight aria-hidden="true" /></a>}</div>
  </article>
}
