import { DiagramFrame, HDim, LengthArrow, STEEL_FILL, STEEL_STROKE } from './shared'

export function RoundBarDiagram() {
  return (
    <DiagramFrame>
      <circle cx={90} cy={66} r={32} fill={STEEL_FILL} stroke={STEEL_STROKE} strokeWidth={1.5} />
      <HDim x1={58} x2={122} y={66} label="Diameter" />
      <LengthArrow x1={148} x2={248} y={66} />
    </DiagramFrame>
  )
}
