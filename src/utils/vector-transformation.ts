import { matrixMultiplication } from './matrix-multiplication'

export const vectorTransformation = (
  vec: number[],
  transformationMatrix: number[][]
): number[] => {
  const placeholderMatrix = [vec, [0, 1, 0], [0, 0, 1]]
  const transformedMatrix = matrixMultiplication(
    placeholderMatrix,
    transformationMatrix
  )

  return transformedMatrix[0]
}
