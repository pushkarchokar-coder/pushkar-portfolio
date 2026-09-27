import { FaCss3Alt, FaGitAlt, FaGithub, FaHtml5, FaJava, FaJs, FaReact } from 'react-icons/fa'
import { SiC } from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'

export const skillGroups = [
  { title: 'Frontend', items: [
    { name: 'HTML', Icon: FaHtml5, color: '#e34f26' }, { name: 'CSS', Icon: FaCss3Alt, color: '#1572b6' },
    { name: 'JavaScript', Icon: FaJs, color: '#f7df1e' }, { name: 'React.js', Icon: FaReact, color: '#61dafb' },
  ] },
  { title: 'Programming', items: [{ name: 'C', Icon: SiC, color: '#a8b9cc' }, { name: 'Java', Icon: FaJava, color: '#e76f00' }] },
  { title: 'Tools', items: [{ name: 'Git', Icon: FaGitAlt, color: '#f05032' }, { name: 'GitHub', Icon: FaGithub, color: '#f5f7ff' }, { name: 'VS Code', Icon: VscVscode, color: '#007acc' }] },
]
