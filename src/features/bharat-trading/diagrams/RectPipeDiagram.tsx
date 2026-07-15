import { DiagramFrame, HDim, Leader, LengthArrow, STEEL_FILL, STEEL_STROKE, VDim } from './shared'

export function RectPipeDiagram() {
  return (
    <DiagramFrame>
      <rect x={40} y={36} width={100} height={64} fill={STEEL_FILL} stroke={STEEL_STROKE} strokeWidth={1.5} />
      <rect x={52} y={48} width={76} height={40} fill="var(--color-canvas)" stroke={STEEL_STROKE} strokeWidth={1.5} />
      <HDim x1={40} x2={140} y={24} label="Width" />
      <VDim x={28} y1={36} y2={100} label="Height" />
      <Leader fromX={128} fromY={52} toX={155} toY={36} label="Wall Thickness" anchor="start" />
      <LengthArrow x1={160} x2={248} y={68} />
    </DiagramFrame>
  )
}
