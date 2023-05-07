
/**
    Gets angle of inclined planes independent of orientation
    @param angle angle of plane in radian
*/

export const getAdjustedAngle = (angle: number): number => {
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