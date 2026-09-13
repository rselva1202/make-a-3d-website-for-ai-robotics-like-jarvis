import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
}

export function DomainIcon({ name, ...props }: { name: string } & IconProps) {
  switch (name) {
    case 'health':
      return (
        <svg {...base} {...props}>
          <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z" />
          <path d="M8.5 12h2l1-2 1.5 3 1-1h2" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...base} {...props}>
          <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    case 'factory':
      return (
        <svg {...base} {...props}>
          <path d="M3 21V11l5 3V11l5 3V8l6 3v10H3Z" />
          <path d="M7 21v-3M12 21v-3M17 21v-3" />
        </svg>
      )
    case 'leaf':
      return (
        <svg {...base} {...props}>
          <path d="M4 20c0-8 6-14 16-14 0 10-6 15-14 15" />
          <path d="M6 18C10 13 13 11 18 9" />
        </svg>
      )
    case 'rocket':
      return (
        <svg {...base} {...props}>
          <path d="M12 3c3 1.5 5 4.5 5 8 0 2-.5 3.5-1 5H8c-.5-1.5-1-3-1-5 0-3.5 2-6.5 5-8Z" />
          <circle cx="12" cy="9" r="1.6" />
          <path d="M8 16c-2 1-2 4-2 4s3 0 4-2M16 16c2 1 2 4 2 4s-3 0-4-2" />
        </svg>
      )
    case 'bolt':
      return (
        <svg {...base} {...props}>
          <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
        </svg>
      )
    case 'truck':
      return (
        <svg {...base} {...props}>
          <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
          <circle cx="7" cy="18" r="1.6" />
          <circle cx="17.5" cy="18" r="1.6" />
        </svg>
      )
    case 'chart':
      return (
        <svg {...base} {...props}>
          <path d="M4 20V4M4 20h16" />
          <path d="m7 15 3-4 3 2 4-6" />
        </svg>
      )
    case 'globe':
      return (
        <svg {...base} {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
        </svg>
      )
    default:
      return (
        <svg {...base} {...props}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      )
  }
}

export function MicIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6" />
    </svg>
  )
}

export function SendIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m4 12 16-8-6 16-3-6-7-2Z" />
    </svg>
  )
}

export function SoundOnIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9v6h4l5 4V5L8 9H4Z" />
      <path d="M16 9a4 4 0 0 1 0 6M18.5 7a7 7 0 0 1 0 10" />
    </svg>
  )
}

export function SoundOffIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9v6h4l5 4V5L8 9H4Z" />
      <path d="m16 10 4 4M20 10l-4 4" />
    </svg>
  )
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}
