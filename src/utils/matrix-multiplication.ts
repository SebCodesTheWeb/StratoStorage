import { transposeMatrix } from './transpose-matrix'
import { hadamardProduct } from './hadamard-product'
import { vecAdd } from './vec-add'

export const matrixMultiplication = (
  maxtrix1: number[][],
  matrix2: number[][]
) => {
  const matrix2Tranpose = transposeMatrix(matrix2)
  const transformedMatrix = maxtrix1.map((vector) =>
    matrix2Tranpose
      .map((vec2) => hadamardProduct(vec2, vector))
      .reduce(vecAdd, [0, 0, 0])
  )

  return transformedMatrix
}
