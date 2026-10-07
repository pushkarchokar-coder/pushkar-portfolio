export const terminalCommands = [
  {
    command: 'whoami',
    output: [
      { text: 'Pushkar Chokar', kind: 'primary' },
      { text: 'Frontend Developer', kind: 'muted' },
    ],
  },
  {
    command: 'skills',
    output: [
      { items: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Java', 'C', 'Git', 'GitHub'], kind: 'skills' },
    ],
  },
  {
    command: 'currently',
    output: [
      { items: [
        'Learning backend development',
        'Exploring APIs & full-stack development',
        'Preparing for software engineering internships',
      ], kind: 'currently' },
    ],
  },
]
