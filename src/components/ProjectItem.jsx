import { FiArrowUpRight } from 'react-icons/fi'

export function ProjectItem({ project, index }) {
  const hasLinks = project.github || project.demo
  return <article className="project-item"><span className="project-number">{String(index + 1).padStart(2, '0')}</span><div className="project-main"><div className="project-title-row"><h3>{project.name}</h3></div><p>{project.description}</p><ul className="technology-list" aria-label="Technologies">{project.tech.map(technology => <li key={technology}>{technology}</li>)}</ul>{hasLinks && <div className="project-links">{project.github && <a href={project.github} target="_blank" rel="noreferrer">GitHub <FiArrowUpRight aria-hidden="true" /></a>}{project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Live Demo <FiArrowUpRight aria-hidden="true" /></a>}</div>}</div></article>
}
