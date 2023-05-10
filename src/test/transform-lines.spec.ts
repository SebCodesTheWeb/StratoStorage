import { expect } from 'chai'
import { transformLines } from '../utils/transform-lines'

describe('transformLines', () => {
  it('Transforms lines appropiately', () => {
    const lines = [
      [
        [0, 3, 0],
        [3, 3, 0],
      ],
      [
        [3, 3, 0],
        [3, 3, 3],
      ],
      [
        [3, 3, 3],
        [-2, 7, 5],
      ],
    ]

    const scaleMatrix = [
      [2, 0, 0],
      [0, 2, 0],
      [0, 0, 2],
    ]

    const transformedLines = transformLines(lines, scaleMatrix)

    expect(transformedLines).to.deep.equal([
      [
        [0, 6, 0],
        [6, 6, 0],
      ],
      [
        [6, 6, 0],
        [6, 6, 6],
      ],
      [
        [6, 6, 6],
        [-4, 14, 10],
      ],
    ])
  })
})
