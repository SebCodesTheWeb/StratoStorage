import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Box, Line } from '@react-three/drei'

const Cube: React.FC = () => {
  return (
    <Box args={[1, 1, 1]}>
      <meshStandardMaterial color='royalblue' />
    </Box>
  )
}

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

  const offsetedRectangleLines = rectangleLines
  .map((line) =>line
    .map((point) =>point
      .map((coordinate, i) => coordinate + offsets[i])
    )
  )

  console.log(offsetedRectangleLines, offsets)
  return offsetedRectangleLines
}

getRectangleLayer([2, 5, 3], 5, 5)

const DataCenter: React.FC = () => {
  const boxLines = []
  const numLines = 10
  const boxSize = [1, 2, 3]

  for (let i = 0; i < numLines; i++) {
    const xPos = (Math.random() - 0.5) * boxSize[0]
    const yPos = (Math.random() - 0.5) * boxSize[1]
    const zPos = (Math.random() - 0.5) * boxSize[2]
    const start = [xPos, yPos, zPos]

    const endX = (Math.random() - 0.5) * boxSize[0]
    const endY = (Math.random() - 0.5) * boxSize[1]
    const endZ = (Math.random() - 0.5) * boxSize[2]
    const end = [endX, endY, endZ]

    boxLines.push([start, end])
  }

  return (
    <group>
      {boxLines.map((line, index) => (
        <Line key={index} points={line} lineWidth={1} color='blue' />
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
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default App
