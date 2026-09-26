import { useState } from 'react'
import { Section } from '../components/Section.jsx'
import { skills } from '../data/skills.js'

export function Skills() {
  const [selected, setSelected] = useState(null)

  return <Section id="skills" title="Technical Skills" className="skills-section">
    <ul className="technical-skills-list">{skills.map(({ name, icon: Icon, color, description }) => {
          const isSelected = selected === name
          const descriptionId = `skill-description-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
          return <li className={`skill-entry ${isSelected ? 'is-selected' : ''}`} data-skill={name} key={name}>
            <button
              className={`skill-option ${isSelected ? 'is-selected' : ''}`}
              type="button"
              onClick={() => setSelected(name)}
              aria-label={name}
              title={name}
              aria-pressed={isSelected}
              aria-expanded={isSelected}
              aria-describedby={isSelected ? descriptionId : undefined}
              style={{ '--skill-color': color }}
            >
              <Icon className="skill-icon" aria-hidden="true" focusable="false" />
            </button>
            {isSelected && <p className="skill-description" id={descriptionId}>{description}</p>}
          </li>
        })}</ul>
  </Section>
}
