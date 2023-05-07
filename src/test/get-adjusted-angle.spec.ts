import { expect } from 'chai'
import { getAdjustedAngle } from '../get-adjusted-angle'


describe('getAdjustedAngle', () => {
  it('Should return angle if under 90degrees', () => {
    const modAngle = getAdjustedAngle(Math.PI / 4)
    expect(modAngle).to.equal(Math.PI / 4)
  })
  it('Should return correct angle in 2nd quadrant', () => {
    const modAngle = getAdjustedAngle((Math.PI / 4) * 3)
    expect(modAngle).to.equal(Math.PI / 4)
  })
  it('Should return correct angle in 3nd quadrant', () => {
    const modAngle = getAdjustedAngle((Math.PI / 4) * 5)
    expect(modAngle).to.equal(Math.PI / 4)
  })
  it('Should return correct angle in 4nd quadrant', () => {
    const modAngle = getAdjustedAngle((Math.PI / 4) * 7)
    expect(modAngle).to.equal(Math.PI / 4)
  })
  it('Should return same angle even if over 360 degrees', () => {
    const modAngle = getAdjustedAngle((Math.PI / 4) * 9)
    expect(modAngle).to.equal(Math.PI / 4)
  })
  it('Handles edge case 90 degrees', () => {
    const modAngle = getAdjustedAngle(Math.PI / 2)
    expect(modAngle).to.equal(Math.PI / 2)
  })
  it('Handles edge case 180 degrees', () => {
    const modAngle = getAdjustedAngle(Math.PI)
    expect(modAngle).to.equal(0)
  })
  it('Handles edge case 270 degrees', () => {
    const modAngle = getAdjustedAngle(3 * Math.PI / 2)
    expect(modAngle).to.equal(Math.PI / 2)
  })
  it('Handles edge case 360 degrees', () => {
    const modAngle = getAdjustedAngle(2 * Math.PI)
    expect(modAngle).to.equal(0)
  })
})
