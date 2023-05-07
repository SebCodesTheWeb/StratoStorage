import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Box, Line } from '@react-three/drei'
import {
  pipe,
  map,
  identity,
  zipWith,
  add,
  slice,
  __,
  zip,
  flatten,
  chain,
} from 'ramda'

const Cube: React.FC = () => {
  return (
    <Box args={[1, 1, 1]}>
      <meshStandardMaterial color='royalblue' />
    </Box>
  )
}

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

  console.log({ lines })

  const offsetedRectangleLines = lines.map((line) =>
    line.map((point) => vecAdd(point, offsets))
  )

  return offsetedRectangleLines
}

const DataCenter: React.FC = () => {
  const baseOffset = [0, 0, 0]
  const rectangleDimensions = [50, 30]
  const boxLines: number[][][] = []
  const numLayers = 10
  const layersDistance = 5

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

  const sideOne = getRectangleLines(baseOffset, [
    [0, 0, 0],
    [50, 0, 0],
    [50, 9 * layersDistance, 0],
    [0, 9 * layersDistance, 0],
    [0, 0, 0],
  ])
  const sideTwo = getRectangleLines(
    [0, 0, 30],
    [
      [0, 0, 0],
      [50, 0, 0],
      [50, 9 * layersDistance, 0],
      [0, 9 * layersDistance, 0],
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

const getAdjustedAngle = (angle: number): number => {
  const modAngle = (angle % 2) * Math.PI
  switch (true) {
    case modAngle < Math.PI / 2:
      return modAngle
    case modAngle > Math.PI / 2 && modAngle < Math.PI:
      return Math.PI - modAngle
    case modAngle > Math.PI && modAngle < (3 * Math.PI) / 2:
      return modAngle - Math.PI
    case modAngle > (3 * Math.PI) / 2 && modAngle < 2 * Math.PI:
      return 2 * Math.PI - modAngle
    default:
      throw new Error('Could not find appropiate angle')
  }
}

const getInclinedPlanePoints = (
  baseOffset: number[],
  rectangleWidth: number,
  rectangleLength: number,
  angle: number
) => {
  const points: number[][] = [
    [0, 0, 0],
    [rectangleWidth, 0, 0],
  ]
  if (angle < Math.PI / 2) {
    const newHeight = Math.sin(angle) * rectangleLength
    const newLength = Math.cos(angle) * rectangleLength
    points.push([rectangleWidth, newHeight, newLength])
    points.push([0, newHeight, newLength])
  }
}

const GiganticWheel = () => {
  const radii = 100
  const thiccness = 20
  const numberOfSegmentsX = 4
  const numberOfSegmentsZ = 50
  const rectangleWidth = thiccness / numberOfSegmentsX
  const rectangleLength = (2 * Math.PI * radii) / numberOfSegmentsZ
}

const App: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [2, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <DataCenter />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default App
