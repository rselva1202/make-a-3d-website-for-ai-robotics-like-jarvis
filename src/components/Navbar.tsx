import { useEffect, useState } from 'react'

const LINKS = [
  { id: 'top', label: 'Overview' },
  { id: 'console', label: 'Console' },
  { id: 'domains', label: 'Domains' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'telemetry', label: 'Telemetry' },
  { id: 'deploy', label: 'Deploy' },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [clock, setClock] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const t = setInterval(() => setClock(new Date().toLocaleTimeString()), 1000)
    setClock(new Date().toLocaleTimeString())
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearInterval(t)
    }
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-cyan-400/10 bg-nexus-bg/70 backdrop-blur-xl' : ''
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <button onClick={() => scrollTo('top')} className="group flex items-center gap-2.5">
          <span className="relative grid h-8 w-8 place-items-center">
            <span className="absolute inset-0 rounded-full border border-nexus-cyan/60" />
            <span className="absolute inset-1.5 rounded-full border border-nexus-cyan/30 group-hover:animate-spin" />
            <span className="h-2 w-2 rounded-full bg-nexus-cyan shadow-glow-sm" />
          </span>
          <span className="font-display text-lg font-bold tracking-[0.3em] text-white">
            NEXUS
          </span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="rounded-md px-3 py-1.5 text-sm font-medium tracking-wide text-cyan-100/60 transition hover:bg-cyan-400/10 hover:text-white"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-xs text-cyan-300/70 sm:inline">{clock}</span>
          <button
            onClick={() => scrollTo('console')}
            className="rounded-md border border-nexus-cyan/40 bg-nexus-cyan/10 px-3.5 py-1.5 text-sm font-semibold text-nexus-cyan transition hover:bg-nexus-cyan/20 hover:shadow-glow-sm"
          >
            Talk to NEXUS
          </button>
        </div>
      </nav>
    </header>
  )
}
