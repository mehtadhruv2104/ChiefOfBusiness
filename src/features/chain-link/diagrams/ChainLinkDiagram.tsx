import { DiagramFrame, DIM_COLOR, Leader, STEEL_STROKE, VDim } from '@/components/diagrams/shared'

const FABRIC = { x: 60, y: 25, width: 130, height: 100 }
const PITCH = 22

function latticeLines() {
  const forward: { x1: number; y1: number; x2: number; y2: number }[] = []
  const backward: { x1: number; y1: number; x2: number; y2: number }[] = []
  const span = FABRIC.height
  for (let x = FABRIC.x - span; x < FABRIC.x + FABRIC.width + span; x += PITCH) {
    forward.push({ x1: x, y1: FABRIC.y + FABRIC.height, x2: x + span, y2: FABRIC.y })
    backward.push({ x1: x, y1: FABRIC.y, x2: x + span, y2: FABRIC.y + FABRIC.height })
  }
  return { forward, backward }
}

export function ChainLinkDiagram() {
  const { forward, backward } = latticeLines()
  const diamond = '125,57 143,75 125,93 107,75'

  return (
    <DiagramFrame>
      <defs>
        <clipPath id="chain-link-clip">
          <rect x={FABRIC.x} y={FABRIC.y} width={FABRIC.width} height={FABRIC.height} />
        </clipPath>
      </defs>

      <rect
        x={FABRIC.x}
        y={FABRIC.y}
        width={FABRIC.width}
        height={FABRIC.height}
        fill="var(--color-surface-raised)"
        stroke={STEEL_STROKE}
        strokeWidth={1}
      />
      <g clipPath="url(#chain-link-clip)" stroke={STEEL_STROKE} strokeWidth={1}>
        {forward.map((l) => (
          <line key={`f-${l.x1}`} {...l} />
        ))}
        {backward.map((l) => (
          <line key={`b-${l.x1}`} {...l} />
        ))}
      </g>

      <polygon points={diamond} fill="none" stroke={DIM_COLOR} strokeWidth={1.5} />
      <Leader fromX={134} fromY={66} toX={175} toY={48} label="Mesh Size" anchor="start" />
      <Leader fromX={170} fromY={50} toX={185} toY={32} label="Wire Diameter" anchor="start" />
      <VDim x={48} y1={FABRIC.y} y2={FABRIC.y + FABRIC.height} label="Roll Height" />
    </DiagramFrame>
  )
}
