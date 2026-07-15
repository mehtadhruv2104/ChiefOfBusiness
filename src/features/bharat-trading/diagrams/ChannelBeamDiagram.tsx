import { DiagramFrame, HDim, LengthArrow, STEEL_FILL, STEEL_STROKE, VDim } from './shared'

export function ChannelBeamDiagram() {
  const points = '50,30 120,30 120,42 64,42 64,108 120,108 120,120 50,120'
  return (
    <DiagramFrame>
      <polygon points={points} fill={STEEL_FILL} stroke={STEEL_STROKE} strokeWidth={1.5} strokeLinejoin="round" />
      <VDim x={38} y1={30} y2={120} label="Depth" />
      <HDim x1={50} x2={120} y={18} label="Flange Width" />
      <LengthArrow x1={140} x2={248} y={75} />
    </DiagramFrame>
  )
}
