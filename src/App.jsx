import { Navbar } from './components/Navbar.jsx'
import { Hero } from './sections/Hero.jsx'
import { About } from './sections/About.jsx'
import { Skills } from './sections/Skills.jsx'
import { Projects } from './sections/Projects.jsx'
import { GitHub } from './sections/GitHub.jsx'
import { CodingActivity } from './sections/CodingActivity.jsx'
import { Writing } from './sections/Writing.jsx'
import { Contact } from './sections/Contact.jsx'
import { useGitHub } from './hooks/useGitHub.js'
import { siteConfig } from './data/siteConfig.js'

export default function App() {
  const github = useGitHub()
  return <div className="site-shell">
    <div className="ambient ambient-purple" aria-hidden="true" />
    <div className="ambient ambient-cyan" aria-hidden="true" />
    <Navbar />
    <main className="page-width">
      <Hero />
      <About />
      <Skills />
      <Projects repositories={github.repositories} loading={github.loading} error={github.error} />
      <GitHub {...github} />
      <CodingActivity />
      <Writing />
      <Contact />
    </main>
    <footer className="footer page-width"><span>© {new Date().getFullYear()} {siteConfig.name}</span><a href="#top">Back to top ↑</a></footer>
  </div>
}
