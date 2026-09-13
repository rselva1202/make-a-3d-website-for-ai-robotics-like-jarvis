export type Domain = {
  id: string
  name: string
  tagline: string
  description: string
  icon: string
  stats: { label: string; value: string }[]
  color: string
  units: string
}

export const DOMAINS: Domain[] = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    tagline: 'Autonomous surgical & diagnostic robotics',
    description:
      'Sub-millimeter surgical manipulators, AI triage and continuous patient telemetry. NEXUS fuses imaging, vitals and history to assist clinicians in real time.',
    icon: 'health',
    color: '#2dd4bf',
    units: '4,120 units',
    stats: [
      { label: 'Diagnostic accuracy', value: '99.2%' },
      { label: 'Procedures assisted', value: '1.4M' },
    ],
  },
  {
    id: 'defense',
    name: 'Defense & Security',
    tagline: 'Perimeter autonomy & threat intelligence',
    description:
      'Swarm-coordinated reconnaissance, autonomous perimeter defense and predictive threat modeling — all governed by human-in-the-loop safeguards.',
    icon: 'shield',
    color: '#f43f5e',
    units: '2,880 units',
    stats: [
      { label: 'Threat detection', value: '<40ms' },
      { label: 'Uptime', value: '99.999%' },
    ],
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    tagline: 'Lights-out factories & adaptive assembly',
    description:
      'Self-calibrating assembly cells and predictive maintenance keep production lines running at peak yield with zero-downtime reconfiguration.',
    icon: 'factory',
    color: '#38bdf8',
    units: '9,540 units',
    stats: [
      { label: 'Yield increase', value: '+34%' },
      { label: 'Downtime', value: '-91%' },
    ],
  },
  {
    id: 'agriculture',
    name: 'Agriculture',
    tagline: 'Precision farming at planetary scale',
    description:
      'Autonomous harvesters, drone crop-intelligence and soil-aware irrigation optimize every square meter while cutting water and chemical usage.',
    icon: 'leaf',
    color: '#84cc16',
    units: '6,210 units',
    stats: [
      { label: 'Water saved', value: '−48%' },
      { label: 'Yield / hectare', value: '+27%' },
    ],
  },
  {
    id: 'space',
    name: 'Space & Aerospace',
    tagline: 'Orbital assembly & deep-space autonomy',
    description:
      'Self-repairing satellites, orbital construction robotics and autonomous navigation for missions where a light-speed delay makes remote control impossible.',
    icon: 'rocket',
    color: '#a78bfa',
    units: '318 units',
    stats: [
      { label: 'Autonomy window', value: '∞' },
      { label: 'Missions', value: '46' },
    ],
  },
  {
    id: 'energy',
    name: 'Energy & Utilities',
    tagline: 'Grid intelligence & hazardous inspection',
    description:
      'Robotic inspection of reactors, turbines and pipelines paired with grid-balancing AI that forecasts demand and routes power autonomously.',
    icon: 'bolt',
    color: '#fbbf24',
    units: '3,470 units',
    stats: [
      { label: 'Fault prediction', value: '18h ahead' },
      { label: 'Grid efficiency', value: '+22%' },
    ],
  },
  {
    id: 'logistics',
    name: 'Logistics & Mobility',
    tagline: 'Autonomous fleets & warehouse swarms',
    description:
      'Fleet-wide route optimization, autonomous last-mile delivery and coordinated warehouse swarms that fulfill orders faster with fewer errors.',
    icon: 'truck',
    color: '#22d3ee',
    units: '12,900 units',
    stats: [
      { label: 'Delivery speed', value: '+41%' },
      { label: 'Error rate', value: '0.02%' },
    ],
  },
  {
    id: 'finance',
    name: 'Finance & Markets',
    tagline: 'Risk cognition & fraud interception',
    description:
      'Real-time anomaly detection, autonomous risk hedging and fraud interception across billions of transactions with full auditability.',
    icon: 'chart',
    color: '#34d399',
    units: 'cloud-native',
    stats: [
      { label: 'Fraud caught', value: '$2.1B' },
      { label: 'Latency', value: '<2ms' },
    ],
  },
  {
    id: 'environment',
    name: 'Environment',
    tagline: 'Ocean, wildfire & climate response',
    description:
      'Autonomous cleanup drones, wildfire early-warning networks and climate sensor meshes that give the planet a real-time nervous system.',
    icon: 'globe',
    color: '#2dd4bf',
    units: '5,060 units',
    stats: [
      { label: 'Area monitored', value: '3.2M km²' },
      { label: 'Response time', value: '−67%' },
    ],
  },
]

export type Capability = {
  title: string
  description: string
  metric: string
}

export const CAPABILITIES: Capability[] = [
  {
    title: 'Perception',
    description:
      'Multi-spectral computer vision, LiDAR fusion and spatial mapping build a live 3D model of the world at 240 Hz.',
    metric: '240 Hz sensor fusion',
  },
  {
    title: 'Cognition',
    description:
      'A neuro-symbolic reasoning core plans, predicts and explains every decision it makes — no black boxes.',
    metric: '4.1T parameter core',
  },
  {
    title: 'Language',
    description:
      'Natural conversation across 96 languages with real-time voice, intent parsing and long-horizon memory.',
    metric: '96 languages',
  },
  {
    title: 'Autonomy',
    description:
      'Closed-loop control for manipulation, locomotion and navigation with sub-millisecond reflex arcs.',
    metric: '<1ms reflex loop',
  },
  {
    title: 'Coordination',
    description:
      'Swarm intelligence lets thousands of agents negotiate, share state and act as one distributed organism.',
    metric: '10k-agent swarms',
  },
  {
    title: 'Safety',
    description:
      'Formal verification, human-in-the-loop overrides and hardware fail-safes on every actuator, always.',
    metric: 'ISO 13482 certified',
  },
]

export const STATS = [
  { label: 'Robots online', value: 46921, suffix: '', format: 'int' },
  { label: 'Domains served', value: 9, suffix: '', format: 'int' },
  { label: 'Decisions / sec', value: 3.4, suffix: 'M', format: 'dec' },
  { label: 'Global uptime', value: 99.999, suffix: '%', format: 'pct' },
] as const

export type TimelineItem = { year: string; title: string; body: string }

export const TIMELINE: TimelineItem[] = [
  {
    year: '01',
    title: 'Deploy',
    body: 'NEXUS provisions edge nodes and pairs with your existing hardware in minutes — no rip-and-replace.',
  },
  {
    year: '02',
    title: 'Perceive',
    body: 'Sensor fusion builds a live digital twin of your environment, calibrating to your domain automatically.',
  },
  {
    year: '03',
    title: 'Reason',
    body: 'The cognition core simulates outcomes, plans actions and surfaces explainable recommendations.',
  },
  {
    year: '04',
    title: 'Act',
    body: 'Autonomous agents execute with human-in-the-loop oversight, learning from every cycle.',
  },
]
