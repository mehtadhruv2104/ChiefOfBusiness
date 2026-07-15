import { DiagramFrame, HDim, Leader, LengthArrow, STEEL_FILL, STEEL_STROKE, VDim } from './shared'

export function AngleDiagram() {
  const points = '50,110 50,50 64,50 64,96 110,96 110,110'
  return (
    <DiagramFrame>
      <polygon points={points} fill={STEEL_FILL} stroke={STEEL_STROKE} strokeWidth={1.5} strokeLinejoin="round" />
      <VDim x={38} y1={50} y2={110} label="Leg A" />
      <HDim x1={50} x2={110} y={122} label="Leg B" />
      <Leader fromX={60} fromY={65} toX={85} toY={65} label="Thickness" anchor="start" />
      <LengthArrow x1={130} x2={248} y={80} />
    </DiagramFrame>
  )
}
