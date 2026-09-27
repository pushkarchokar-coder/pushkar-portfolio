import { useEffect, useRef, useState } from 'react'
import { FiTerminal, FiX } from 'react-icons/fi'

export function EasterEgg() {
  const dialogRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [aside, setAside] = useState('// You weren’t supposed to find this... 👀')

  useEffect(() => {
    const dialog = dialogRef.current
    if (!open || !dialog) return undefined
    setAside('// You weren’t supposed to find this... 👀')
    dialog.showModal()
    const timer = window.setTimeout(() => setAside("// But I'm glad you did."), 1800)
    return () => window.clearTimeout(timer)
  }, [open])

  function close() {
    if (dialogRef.current?.open) dialogRef.current.close()
    setOpen(false)
  }

  return <>
    <button className="easter-trigger" type="button" aria-label="Open developer secret" title="A small developer secret" onClick={() => setOpen(true)}>
      <FiTerminal aria-hidden="true" />
    </button>
    <dialog ref={dialogRef} className="easter-dialog" aria-labelledby="easter-title" onClose={() => setOpen(false)} onClick={event => { if (event.target === dialogRef.current) close() }}>
      <div className="easter-window">
        <div className="easter-window-bar"><span className="terminal-lights" aria-hidden="true"><i /><i /><i /></span><span>pushkar@portfolio ~</span><button className="easter-close" type="button" aria-label="Close Easter egg" onClick={close}><FiX aria-hidden="true" /></button></div>
        <div className="easter-content">
          <p className="easter-aside" aria-live="polite">{aside}</p>
          <h2 id="easter-title">Hey <span aria-hidden="true">👋</span> You found the secret.</h2>
          <p className="easter-built">Built by Pushkar Chokar.</p>
          <p className="easter-note">Still debugging. Still learning. Still building.</p>
          <div className="terminal-lines" aria-label="Developer status">
            <p><span>$</span> whoami</p><p className="terminal-result">pushkar-chokar</p>
            <p><span>$</span> status</p><p className="terminal-result">building<span className="terminal-cursor" aria-hidden="true">_</span></p>
            <p><span>$</span> next</p><p className="terminal-result">full-stack developer</p>
          </div>
        </div>
      </div>
    </dialog>
  </>
}
