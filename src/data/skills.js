import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGitAlt, FaGithub, FaJava } from 'react-icons/fa'
import { SiNpm, SiVite, SiRedux, SiC } from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'

export const skills = [
    { name: 'HTML5', icon: FaHtml5, color: '#e34f26', description: 'Semantic markup for clear, accessible page structure.', where: 'Every page and interface I build.' },
    { name: 'CSS3', icon: FaCss3Alt, color: '#1572b6', description: 'Responsive layouts, visual hierarchy and interaction states.', where: 'Responsive styling and interface details.' },
    { name: 'JavaScript', icon: FaJs, color: '#f7df1e', description: 'The logic behind dynamic, interactive browser experiences.', where: 'Application behavior and DOM interactions.' },
    { name: 'React.js', icon: FaReact, color: '#61dafb', description: 'Used to build reusable and interactive component-based interfaces.', where: 'Projects and this portfolio.' },
    { name: 'Redux', icon: SiRedux, color: '#764abc', description: 'A predictable way to manage shared application state.', where: 'Learning state management for React applications.' },
    { name: 'Git', icon: FaGitAlt, color: '#f05032', description: 'Version control for tracking and managing code changes.', where: 'Project history and everyday development.' },
    { name: 'GitHub', icon: FaGithub, color: 'var(--text)', description: 'A home for repositories and collaborative development.', where: 'Hosting code and sharing projects.' },
    { name: 'VS Code', icon: VscVscode, color: '#007acc', description: 'My editor for writing and navigating code.', where: 'Daily development.' },
    { name: 'Vite', icon: SiVite, color: '#646cff', description: 'A fast development server and build tool for web projects.', where: 'Running and building React applications.' },
    { name: 'npm', icon: SiNpm, color: '#cb3837', description: 'Package management for JavaScript projects.', where: 'Installing and managing dependencies.' },
    { name: 'Java', icon: FaJava, color: '#e76f00', description: 'Building a stronger foundation in object-oriented programming.', where: 'Coursework and coding practice.' },
    { name: 'C', icon: SiC, color: '#a8b9cc', description: 'Learning programming fundamentals and core computer science concepts.', where: 'Coursework and programming practice.' },
]
