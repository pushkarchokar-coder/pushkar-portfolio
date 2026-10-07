import { Section } from '../components/Section.jsx'

export function About() {
  return <Section id="about" eyebrow="A little about me" title="About">
    <div className="about-layout">
      <div className="about-highlight">
        <span className="about-focus-label">MY FOCUS</span>
        <p className="about-lead">I’m a computer science student focused on <strong>frontend development</strong> and building useful digital experiences.</p>
      </div>
      <div className="about-detail">
        <p className="about-detail-intro">What I’m working toward</p>
        <ul className="about-points">
          <li>Creating responsive interfaces with HTML, CSS, JavaScript and React.</li>
          <li>Learning backend development, APIs, Java and software fundamentals by building.</li>
          <li>Preparing for software engineering internships and growing toward full-stack work.</li>
        </ul>
      </div>
    </div>
  </Section>
}
