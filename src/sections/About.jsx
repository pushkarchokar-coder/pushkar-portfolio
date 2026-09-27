import { Section } from '../components/Section.jsx'

export function About() {
  return <Section id="about" eyebrow="A little about me" title="About">
    <div className="about-layout"><p className="about-lead">A computer science student who likes turning a blank screen into something useful.</p>
      <div className="about-detail"><p>I work mainly on frontend development with HTML, CSS, JavaScript and React.</p><p>I enjoy learning by building, and I’m now working deeper into backend development, APIs, Java and the fundamentals that make software reliable.</p><p>I’m interested in software development internships where I can contribute, learn from a team, and keep growing toward full-stack work.</p></div>
    </div>
  </Section>
}
