import { DiagramFrame, HDim, LengthArrow, STEEL_FILL, STEEL_STROKE, VDim } from './shared'

export function FlatDiagram() {
  return (
    <DiagramFrame>
      <rect x={30} y={55} width={110} height={22} fill={STEEL_FILL} stroke={STEEL_STROKE} strokeWidth={1.5} />
      <HDim x1={30} x2={140} y={42} label="Width" />
      <VDim x={150} y1={55} y2={77} label="Thickness" />
      <LengthArrow x1={185} x2={248} y={66} />
    </DiagramFrame>
  )
}
