import { DiagramFrame, HDim, LengthArrow, STEEL_FILL, STEEL_STROKE } from './shared'

export function SquareBarDiagram() {
  return (
    <DiagramFrame>
      <rect x={58} y={34} width={64} height={64} fill={STEEL_FILL} stroke={STEEL_STROKE} strokeWidth={1.5} />
      <HDim x1={58} x2={122} y={22} label="Side" />
      <LengthArrow x1={148} x2={248} y={66} />
    </DiagramFrame>
  )
}
