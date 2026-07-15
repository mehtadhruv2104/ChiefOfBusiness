import type { ReactNode } from 'react'

export const STEEL_STROKE = '#8B96A5'
export const STEEL_FILL = '#1B1F24'
export const DIM_COLOR = '#DD9A5F'

interface DiagramFrameProps {
  children: ReactNode
  viewBox?: string
}

/** Common <svg> shell: consistent size, arrowhead marker, dark canvas-safe colours. */
export function DiagramFrame({ children, viewBox = '0 0 260 150' }: DiagramFrameProps) {
  return (
    <svg viewBox={viewBox} role="img" aria-hidden="true" className="mx-auto h-auto w-full max-w-[260px]">
      <defs>
        <marker
          id="dim-arrow"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill={DIM_COLOR} />
        </marker>
      </defs>
      {children}
    </svg>
  )
}

/** Horizontal dimension line with end ticks, arrowheads and a centred label above it. */
export function HDim({ x1, x2, y, label }: { x1: number; x2: number; y: number; label: string }) {
  return (
    <g stroke={DIM_COLOR} strokeWidth={1}>
      <line x1={x1} y1={y - 4} x2={x1} y2={y + 4} />
      <line x1={x2} y1={y - 4} x2={x2} y2={y + 4} />
      <line
        x1={x1}
        y1={y}
        x2={x2}
        y2={y}
        markerStart="url(#dim-arrow)"
        markerEnd="url(#dim-arrow)"
      />
      <text
        x={(x1 + x2) / 2}
        y={y - 7}
        fill={DIM_COLOR}
        stroke="none"
        fontSize={9}
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  )
}

/** Vertical dimension line, label rotated alongside it. */
export function VDim({ x, y1, y2, label }: { x: number; y1: number; y2: number; label: string }) {
  return (
    <g stroke={DIM_COLOR} strokeWidth={1}>
      <line x1={x - 4} y1={y1} x2={x + 4} y2={y1} />
      <line x1={x - 4} y1={y2} x2={x + 4} y2={y2} />
      <line
        x1={x}
        y1={y1}
        x2={x}
        y2={y2}
        markerStart="url(#dim-arrow)"
        markerEnd="url(#dim-arrow)"
      />
      <text
        x={x - 7}
        y={(y1 + y2) / 2}
        fill={DIM_COLOR}
        stroke="none"
        fontSize={9}
        textAnchor="middle"
        transform={`rotate(-90 ${x - 7} ${(y1 + y2) / 2})`}
      >
        {label}
      </text>
    </g>
  )
}

/** Diagonal leader line pointing at a small feature (e.g. wall thickness), label at the far end. */
export function Leader({
  fromX,
  fromY,
  toX,
  toY,
  label,
  anchor = 'start',
}: {
  fromX: number
  fromY: number
  toX: number
  toY: number
  label: string
  anchor?: 'start' | 'end'
}) {
  return (
    <g stroke={DIM_COLOR} strokeWidth={1}>
      <circle cx={fromX} cy={fromY} r={1.5} fill={DIM_COLOR} />
      <line x1={fromX} y1={fromY} x2={toX} y2={toY} />
      <text
        x={toX + (anchor === 'start' ? 4 : -4)}
        y={toY + 3}
        fill={DIM_COLOR}
        stroke="none"
        fontSize={9}
        textAnchor={anchor}
      >
        {label}
      </text>
    </g>
  )
}

/** Dashed length arrow running along the extrusion direction, right of the cross-section. */
export function LengthArrow({ x1, x2, y, label = 'Length' }: { x1: number; x2: number; y: number; label?: string }) {
  return (
    <g stroke={STEEL_STROKE} strokeWidth={1} strokeDasharray="3 3">
      <line
        x1={x1}
        y1={y}
        x2={x2}
        y2={y}
        markerStart="url(#dim-arrow)"
        markerEnd="url(#dim-arrow)"
      />
      <text
        x={(x1 + x2) / 2}
        y={y + 13}
        fill={STEEL_STROKE}
        stroke="none"
        fontSize={9}
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  )
}
