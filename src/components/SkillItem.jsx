export function SkillItem({ item }) {
  const Icon = item.Icon
  return <li className="skill-item"><span className="skill-logo" style={{ '--skill-color': item.color }}><Icon aria-hidden="true" /></span><span>{item.name}</span></li>
}
