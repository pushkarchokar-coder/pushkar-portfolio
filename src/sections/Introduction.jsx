import { SocialLinks } from '../components/SocialLinks.jsx'
import { profileImage } from '../data/profile.js'

export function Introduction() {
  return <section className="introduction wrap" id="intro" aria-labelledby="intro-title">
    <p className="eyebrow">Frontend Developer · B.Tech Computer Science Student</p>
    <div className="intro-title-row">
      {profileImage ? <img className="profile-picture" src={profileImage} alt="Portrait of Pushkar" /> : <span className="profile-picture profile-monogram" aria-hidden="true">P</span>}
      <h1 id="intro-title">Pushkar Chokar</h1>
    </div>
    <p className="intro-role">Frontend Developer</p>
    <p className="intro-copy">I’m a B.Tech CSE student and frontend developer who enjoys building clean, useful interfaces for the web.</p>
    <p className="intro-stack">HTML · CSS · JavaScript · React.js</p>
    <SocialLinks />
    <p className="intro-status">Currently learning Java &amp; backend development</p>
  </section>
}
