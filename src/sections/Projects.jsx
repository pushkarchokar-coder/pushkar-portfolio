import { Section } from '../components/Section.jsx'
import { ProjectItem } from '../components/ProjectItem.jsx'
import { projects } from '../data/projects.js'

export function Projects() {
  return <Section id="projects" title="Selected Projects">
    {projects.length ? <div className="project-list">{projects.map((project, index) => <ProjectItem key={project.name} project={project} index={index} />)}</div> : <p className="data-note projects-coming-soon">Coming soon.</p>}
  </Section>
}
