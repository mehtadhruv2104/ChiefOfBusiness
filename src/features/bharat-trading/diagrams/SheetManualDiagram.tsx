import { DiagramFrame, STEEL_FILL, STEEL_STROKE } from './shared'

export function SheetManualDiagram() {
  const wave = 'M40,50 q10,-14 20,0 t20,0 t20,0 t20,0 t20,0 t20,0'
  return (
    <DiagramFrame>
      <rect x={40} y={50} width={180} height={50} fill={STEEL_FILL} stroke={STEEL_STROKE} strokeWidth={1.5} />
      <path d={wave} fill="none" stroke={STEEL_STROKE} strokeWidth={1.5} />
      <text x={130} y={118} fill="#6B7480" stroke="none" fontSize={9} textAnchor="middle">
        Weight per sheet entered manually
      </text>
    </DiagramFrame>
  )
}
