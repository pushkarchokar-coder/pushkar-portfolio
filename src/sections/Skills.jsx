import { Section } from '../components/Section.jsx'
import { SkillItem } from '../components/SkillItem.jsx'
import { skillGroups } from '../data/skills.js'

export function Skills() {
  return <Section id="skills" eyebrow="What I work with" title="Skills">
    <div className="skill-groups">{skillGroups.map((group, index) => <article className="skill-group" key={group.title} style={{ '--group-index': index }}><div className="skill-group-heading"><span className="skill-group-index">0{index + 1}</span><h3>{group.title}</h3><span className="skill-group-count">{String(group.items.length).padStart(2, '0')}</span></div><ul>{group.items.map(item => <SkillItem item={item} key={item.name} />)}</ul></article>)}</div>
  </Section>
}
