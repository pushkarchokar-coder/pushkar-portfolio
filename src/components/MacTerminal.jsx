import { useEffect, useState } from 'react'
import { terminalCommands } from '../data/terminalContent.js'

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function MacTerminal() {
  const [visibleCount, setVisibleCount] = useState(() => prefersReducedMotion() ? terminalCommands.length : 0)
  const [typedCommand, setTypedCommand] = useState('')
  const [loginTime] = useState(() => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date()))

  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    let index = 0
    let intervalId
    let cancelled = false
    const timers = []

    function typeNextCommand() {
      if (cancelled || index >= terminalCommands.length) return
      const command = terminalCommands[index].command
      let characterCount = 0
      setTypedCommand('')
      intervalId = window.setInterval(() => {
        characterCount += 1
        setTypedCommand(command.slice(0, characterCount))
        if (characterCount >= command.length) {
          window.clearInterval(intervalId)
          timers.push(window.setTimeout(() => {
            if (cancelled) return
            setVisibleCount(index + 1)
            setTypedCommand('')
            index += 1
            timers.push(window.setTimeout(typeNextCommand, 560))
          }, 430))
        }
      }, 78)
    }

    timers.push(window.setTimeout(typeNextCommand, 500))
    return () => {
      cancelled = true
      window.clearInterval(intervalId)
      timers.forEach(window.clearTimeout)
    }
  }, [])

  return <section className="mac-terminal" role="region" aria-label="Terminal-style introduction">
    <header className="mac-terminal-bar">
      <span className="mac-traffic-lights" aria-hidden="true"><i /><i /><i /></span>
      <span className="mac-terminal-title">pushkar@portfolio — zsh</span>
      <span className="mac-terminal-status"><i />Online</span>
    </header>
    <div className="mac-terminal-body">
      <p className="terminal-login">Last login: today at {loginTime}</p>
      {terminalCommands.slice(0, visibleCount).map(item => <div className="mac-terminal-block" key={item.command}>
        <p className="mac-command"><span>pushkar@portfolio ~ %</span> {item.command}</p>
        {item.output.map((line, lineIndex) => line.items
          ? <ul className={`mac-output-list mac-output-${line.kind}`} key={`${item.command}-${lineIndex}`}>{line.items.map(output => <li key={output}>{output}</li>)}</ul>
          : <p className={`mac-output mac-output-${line.kind}`} key={`${item.command}-${lineIndex}`}>{line.text}</p>)}
      </div>)}
      {visibleCount < terminalCommands.length && <p className="mac-command mac-command-current"><span>pushkar@portfolio ~ %</span> {typedCommand}<i className="terminal-cursor" aria-hidden="true" /></p>}
      {visibleCount === terminalCommands.length && <p className="mac-command mac-command-current"><span>pushkar@portfolio ~ %</span> <i className="terminal-cursor" aria-hidden="true" /></p>}
    </div>
  </section>
}
