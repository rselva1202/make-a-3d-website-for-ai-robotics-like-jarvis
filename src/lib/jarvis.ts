import { DOMAINS, CAPABILITIES } from '../data/content'

export type JarvisReply = {
  text: string
  domain?: string
  action?: 'scroll'
  target?: string
}

const greetings = [
  "Online and at your service. NEXUS core is nominal across all domains.",
  "Good to see you. All autonomous systems report green.",
  "Systems ready. How shall we proceed?",
]

const fallbacks = [
  "I don't have a specific protocol for that yet — but I can brief you on any domain, our capabilities, or live system status.",
  "That's outside my current directives. Try asking about a domain like healthcare or space, or say 'capabilities'.",
  "Processing… I'd recommend asking about a specific domain, our capabilities, or system status.",
]

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function matchDomain(q: string) {
  return DOMAINS.find((d) => {
    const keys = [d.id, d.name.toLowerCase(), ...d.name.toLowerCase().split(/[\s&]+/)]
    return keys.some((k) => k.length > 2 && q.includes(k))
  })
}

export function respond(input: string): JarvisReply {
  const q = input.toLowerCase().trim()

  if (!q) return { text: 'Awaiting your command.' }

  // Greetings
  if (/\b(hi|hello|hey|greetings|yo|jarvis|nexus)\b/.test(q) && q.length < 24) {
    return { text: pick(greetings) }
  }

  // Help
  if (/\b(help|what can you|commands|how do i|options)\b/.test(q)) {
    return {
      text:
        "I can: brief you on any of our 9 domains (e.g. 'tell me about space'), list 'capabilities', report 'status', run a 'diagnostic', give the 'time', or navigate the interface — try 'show domains'.",
    }
  }

  // Time / date
  if (/\b(time|clock|hour)\b/.test(q)) {
    return { text: `Local time is ${new Date().toLocaleTimeString()}. All chronometers synchronized.` }
  }
  if (/\b(date|day|today)\b/.test(q)) {
    return { text: `Today is ${new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.` }
  }

  // Status / diagnostics
  if (/\b(status|diagnostic|report|health|systems|online)\b/.test(q)) {
    const online = 46921 + Math.floor(Math.random() * 40)
    return {
      text: `Running full diagnostic… ${online.toLocaleString()} robots online across 9 domains. Core temperature nominal. Global uptime 99.999%. No anomalies detected.`,
      action: 'scroll',
      target: 'telemetry',
    }
  }

  // Capabilities
  if (/\b(capab|features|what do you do|abilities|skills|can you do)\b/.test(q)) {
    const list = CAPABILITIES.map((c) => c.title).join(', ')
    return {
      text: `My core faculties: ${list}. Ask about any one, or say 'show capabilities' to inspect the matrix.`,
      action: 'scroll',
      target: 'capabilities',
    }
  }

  // Navigation
  if (/\b(show|open|go to|navigate|take me)\b/.test(q)) {
    if (/domain/.test(q)) return { text: 'Opening the domain grid.', action: 'scroll', target: 'domains' }
    if (/capab/.test(q)) return { text: 'Opening the capability matrix.', action: 'scroll', target: 'capabilities' }
    if (/telemetr|status|stat/.test(q)) return { text: 'Bringing up live telemetry.', action: 'scroll', target: 'telemetry' }
    if (/contact|deploy|demo|start/.test(q)) return { text: 'Routing you to deployment.', action: 'scroll', target: 'deploy' }
  }

  // Capability keyword
  const cap = CAPABILITIES.find((c) => q.includes(c.title.toLowerCase()))
  if (cap) {
    return { text: `${cap.title}: ${cap.description} (${cap.metric})`, action: 'scroll', target: 'capabilities' }
  }

  // Domain lookup
  const domain = matchDomain(q)
  if (domain) {
    return {
      text: `${domain.name} — ${domain.tagline}. ${domain.description} Currently ${domain.units} deployed.`,
      domain: domain.id,
      action: 'scroll',
      target: 'domains',
    }
  }

  // Which domains
  if (/\b(domains|industries|sectors|areas|fields)\b/.test(q)) {
    return {
      text: `NEXUS operates across ${DOMAINS.length} domains: ${DOMAINS.map((d) => d.name).join(', ')}. Ask about any of them.`,
      action: 'scroll',
      target: 'domains',
    }
  }

  // Who/what are you
  if (/\b(who are you|what are you|your name|about you)\b/.test(q)) {
    return {
      text:
        "I am NEXUS — a JARVIS-class artificial intelligence that perceives, reasons and orchestrates autonomous robotics across every domain of human endeavor.",
    }
  }

  // Thanks
  if (/\b(thanks|thank you|appreciate|good job|nice)\b/.test(q)) {
    return { text: 'Always a pleasure. Standing by for your next command.' }
  }

  return { text: pick(fallbacks) }
}

export const SUGGESTIONS = [
  'System status',
  'Tell me about space',
  'Show capabilities',
  'Which domains?',
  'Run diagnostic',
]
