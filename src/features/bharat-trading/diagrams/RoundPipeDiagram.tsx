import { DiagramFrame, HDim, Leader, LengthArrow, STEEL_FILL, STEEL_STROKE } from '@/components/diagrams/shared'

export function RoundPipeDiagram() {
  return (
    <DiagramFrame>
      <circle cx={90} cy={66} r={34} fill={STEEL_FILL} stroke={STEEL_STROKE} strokeWidth={1.5} />
      <circle cx={90} cy={66} r={22} fill="var(--color-canvas)" stroke={STEEL_STROKE} strokeWidth={1.5} />
      <HDim x1={56} x2={124} y={24} label="Outer Diameter" />
      <Leader fromX={100} fromY={49} toX={135} toY={30} label="Wall Thickness" anchor="start" />
      <LengthArrow x1={150} x2={248} y={66} />
    </DiagramFrame>
  )
}
