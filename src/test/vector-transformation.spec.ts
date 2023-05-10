import { vectorTransformation } from '../utils/vector-transformation'
import { expect } from 'chai'

describe('vectorTransformation', () => {
  it('Can multiply a vector', () => {
    const baseVector = [1, 0, 0]

    const scaleMatrix = [
      [2, 0, 0],
      [0, 2, 0],
      [0, 0, 2]
    ]

    const rotatedMatrix = vectorTransformation(
      baseVector,
      scaleMatrix
    )

    expect(rotatedMatrix).to.deep.equal([2, 0, 0])
  })
})
