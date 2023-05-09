import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Line } from '@react-three/drei'
import { zipWith, add, slice, dec } from 'ramda'
import { dotProduct } from './utils/dot-product'
import { transposeMatrix } from './utils/transpose-matrix'

const rotationMatrix = (v: number) => [
  [Math.cos(v), Math.sin(v), 0],
  [-Math.sin(v), Math.cos(v), 0],
  [0, 0, 0],
]
const vecAdd = zipWith<number, number, number>(add)

const getRectangleLayer = (
  offsets: number[],
  xLength: number,
  zLength: number
) => {
  const lineOne = [
    [0, 0, 0],
    [xLength, 0, 0],
  ]
  const lineTwo = [
    [xLength, 0, 0],
    [xLength, 0, zLength],
  ]
  const lineThree = [
    [xLength, 0, zLength],
    [0, 0, zLength],
  ]
  const lineFour = [
    [0, 0, zLength],
    [0, 0, 0],
  ]

  const rectangleLines = [lineOne, lineTwo, lineThree, lineFour]

  const offsetedRectangleLines = rectangleLines.map((line) =>
    line.map((point) => vecAdd(point, offsets))
  )

  return offsetedRectangleLines
}

const getVerticalRectangleLayer = (offsets: number[], dimensions: number[]) => {
  const xLength = dimensions[0]
  const yLength = dimensions[1]

  const lineOne = [
    [0, 0, 0],
    [0, yLength, 0],
  ]
  const lineTwo = [
    [0, yLength, 0],
    [xLength, yLength, 0],
  ]
  const lineThree = [
    [xLength, yLength, 0],
    [xLength, 0, 0],
  ]
  const lineFour = [
    [xLength, 0, 0],
    [0, 0, 0],
  ]

  const rectangleLines = [lineOne, lineTwo, lineThree, lineFour]

  const offsetedRectangleLines = rectangleLines.map((line) =>
    line.map((point) => vecAdd(point, offsets))
  )

  return offsetedRectangleLines
}

const getRectangleLines = (offsets: number[], points: number[][]) => {
  const lines = slice(0, -1, points).map((point, index) => [
    point,
    points[index + 1],
  ])

  const offsetedRectangleLines = lines.map((line) =>
    line.map((point) => vecAdd(point, offsets))
  )

  return offsetedRectangleLines
}

const DataCenter: React.FC = () => {
  const baseOffset = [0, 0, 0]
  const rectangleWidth = 3
  const rectangleLength = 2
  const rectangleDimensions = [rectangleWidth, rectangleLength]
  const boxLines: number[][][] = []
  const numLayers = 5
  const layersDistance = 1

  for (let i = 0; i < numLayers; i++) {
    const offset = vecAdd(baseOffset, [0, i * layersDistance, 0])
    const rectangle = getRectangleLayer(
      offset,
      rectangleDimensions[0],
      rectangleDimensions[1]
    )
    rectangle.forEach((line) => {
      boxLines.push(line)
    })
  }

  const sideHeight = dec(numLayers) * layersDistance
  const sideOne = getRectangleLines(baseOffset, [
    [0, 0, 0],
    [rectangleWidth, 0, 0],
    [rectangleWidth, sideHeight, 0],
    [0, sideHeight, 0],
    [0, 0, 0],
  ])
  const sideTwo = getRectangleLines(
    [0, 0, rectangleLength],
    [
      [0, 0, 0],
      [rectangleWidth, 0, 0],
      [rectangleWidth, sideHeight, 0],
      [0, sideHeight, 0],
      [0, 0, 0],
    ]
  )
  sideOne.forEach((line) => {
    boxLines.push(line)
  })
  sideTwo.forEach((line) => {
    boxLines.push(line)
  })

  return (
    <group>
      {boxLines.map((line, index) => (
        <Line key={index} points={line} lineWidth={1} color='blue' />
      ))}
    </group>
  )
}

const getInclinedPlanePoints = ({
  baseOffset,
  rectangleWidth,
  rectangleLength,
  angle,
}: {
  baseOffset: number[]
  rectangleWidth: number
  rectangleLength: number
  angle: number
}) => {
  const calibratedAngle = angle
  const newHeight = Math.sin(calibratedAngle) * rectangleLength
  const newLength = Math.cos(calibratedAngle) * rectangleLength
  const points: number[][] = [
    [0, 0, 0],
    [rectangleWidth, 0, 0],
    [rectangleWidth, newHeight, newLength],
    [0, newHeight, newLength],
    [0, 0, 0],
  ]

  const offsettedPoints = points.map((point) => vecAdd(point, baseOffset))

  return offsettedPoints
}

const GiganticWheel = () => {
  let baseOffset: number[] = [-25, -3, 0]
  const radii = 100
  const thiccness = 50
  const numberOfSegmentsX = 20
  const numberOfSegmentsZ = 100
  const rectangleWidth = thiccness / numberOfSegmentsX
  const rectangleLength = (2 * Math.PI * radii) / numberOfSegmentsZ
  const wheelLines: number[][][] = []

  for (let j = 0; j < numberOfSegmentsX; j++) {
    const horizontalOffset = [j * rectangleWidth, 0, 0]
    for (let i = 0; i < numberOfSegmentsZ; i++) {
      const angle = (i * 2 * Math.PI) / numberOfSegmentsZ
      const rectanglePoints = getInclinedPlanePoints({
        baseOffset: baseOffset,
        rectangleWidth,
        rectangleLength,
        angle,
      })
      const rectangleLines = getRectangleLines([0, 0, 0], rectanglePoints)

      rectangleLines.forEach((line) =>
        wheelLines.push(line.map((point) => vecAdd(point, horizontalOffset)))
      )
      baseOffset = rectanglePoints[3]
    }
  }

  return (
    <group>
      {wheelLines.map((line, index) => (
        <Line key={index} points={line} lineWidth={1} color='green' />
      ))}
    </group>
  )
}

const App: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [2, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <DataCenter />
        <GiganticWheel />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default App
