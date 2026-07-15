import { DiagramFrame, HDim, Leader, LengthArrow, STEEL_FILL, STEEL_STROKE } from './shared'

export function SquarePipeDiagram() {
  return (
    <DiagramFrame>
      <rect x={56} y={32} width={68} height={68} fill={STEEL_FILL} stroke={STEEL_STROKE} strokeWidth={1.5} />
      <rect x={68} y={44} width={44} height={44} fill="var(--color-canvas)" stroke={STEEL_STROKE} strokeWidth={1.5} />
      <HDim x1={56} x2={124} y={20} label="Side" />
      <Leader fromX={118} fromY={80} toX={155} toY={95} label="Wall Thickness" anchor="start" />
      <LengthArrow x1={150} x2={248} y={66} />
    </DiagramFrame>
  )
}
